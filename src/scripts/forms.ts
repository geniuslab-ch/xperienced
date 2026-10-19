/**
 * Formulaires : validation accessible en français, envoi sans rechargement,
 * confirmation claire. Sans JavaScript, les formulaires fonctionnent quand même
 * (envoi classique puis page /merci).
 */
import { getAttribution, track } from './analytics';

const MESSAGES = {
  valueMissing: 'Ce champ est nécessaire.',
  typeMismatch: 'Ce format ne semble pas valide.',
  patternMismatch: 'Ce format ne semble pas valide.',
  tooLong: 'Ce texte est un peu trop long.',
  group: 'Cochez au moins une possibilité.',
};

function errorEl(form: HTMLFormElement, name: string) {
  return form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
}

function setError(form: HTMLFormElement, name: string, message: string) {
  const el = errorEl(form, name);
  if (el) el.textContent = message;
  form.querySelectorAll<HTMLElement>(`[name="${name}"]`).forEach((input) => {
    if (message) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  });
  const group = form.querySelector<HTMLElement>(`[data-group="${name}"]`);
  if (group) {
    if (message) group.setAttribute('aria-invalid', 'true');
    else group.removeAttribute('aria-invalid');
  }
}

function clearErrors(form: HTMLFormElement) {
  form.querySelectorAll<HTMLElement>('[data-error-for]').forEach((el) => (el.textContent = ''));
  form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
}

/** Contact par e-mail ou par téléphone : seul le champ choisi devient obligatoire. */
function syncContactPreference(form: HTMLFormElement) {
  const pref = form.querySelector<HTMLInputElement>('[name="contact_pref"]:checked')?.value;
  const email = form.querySelector<HTMLInputElement>('[name="email"]');
  const tel = form.querySelector<HTMLInputElement>('[name="telephone"]');
  if (!email || !tel || !form.querySelector('[name="contact_pref"]')) return;
  email.required = pref === 'email';
  tel.required = pref === 'telephone';
  form.querySelectorAll<HTMLElement>('[data-req-for]').forEach((el) => {
    const forPref = el.dataset.reqFor;
    el.textContent = forPref === pref ? '(obligatoire)' : '(facultatif)';
  });
}

function validateClient(form: HTMLFormElement): boolean {
  clearErrors(form);
  let firstInvalid: HTMLElement | null = null;
  const seen = new Set<string>();

  form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea').forEach((el) => {
    if (!el.name || seen.has(el.name) || el.type === 'hidden' || el.closest('.hp')) return;
    if (el.validity.valid) return;
    seen.add(el.name);
    const v = el.validity;
    const msg =
      (v.valueMissing && (el.dataset.msgRequired || MESSAGES.valueMissing)) ||
      (v.typeMismatch && (el.dataset.msgFormat || MESSAGES.typeMismatch)) ||
      (v.patternMismatch && (el.dataset.msgFormat || MESSAGES.patternMismatch)) ||
      (v.tooLong && MESSAGES.tooLong) ||
      MESSAGES.valueMissing;
    setError(form, el.name, msg);
    firstInvalid ||= el;
  });

  // Groupes de cases à cocher où au moins une case est requise.
  form.querySelectorAll<HTMLElement>('[data-group-required]').forEach((group) => {
    const name = group.dataset.group!;
    const checked = group.querySelectorAll('input:checked').length;
    if (!checked) {
      setError(form, name, group.dataset.msgRequired || MESSAGES.group);
      firstInvalid ||= group.querySelector('input');
    }
  });

  if (firstInvalid) {
    (firstInvalid as HTMLElement).focus();
    return false;
  }
  return true;
}

function showSuccess(form: HTMLFormElement) {
  const tpl = form.parentElement?.querySelector<HTMLTemplateElement>('template[data-success]');
  if (!tpl) return;
  const node = tpl.content.firstElementChild!.cloneNode(true) as HTMLElement;
  form.replaceWith(node);
  node.setAttribute('tabindex', '-1');
  node.focus();
}

export function initForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-xp-form]').forEach((form) => {
    form.noValidate = true; // validation prise en charge ici, avec des messages en français
    const ts = form.querySelector<HTMLInputElement>('[name="ts"]');
    if (ts) ts.value = String(Date.now());

    syncContactPreference(form);
    form.addEventListener('change', (e) => {
      const t = e.target as HTMLInputElement;
      if (t.name === 'contact_pref') syncContactPreference(form);
      // Cases et listes : on efface l'erreur au changement. Les champs texte, eux, sont effacés
      // pendant la saisie (voir plus bas) : effacer au moment où l'on quitte le champ décalerait
      // la mise en page sous le clic suivant.
      if (['checkbox', 'radio', 'select-one'].includes(t.type) && t.getAttribute('aria-invalid')) setError(form, t.name, '');
      if (['checkbox', 'radio'].includes(t.type) && t.closest('[data-group][aria-invalid]')) setError(form, t.name, '');
    });

    let started = false;
    form.addEventListener('input', (e) => {
      const t = e.target as HTMLInputElement;
      if (t.getAttribute('aria-invalid') && t.type !== 'checkbox' && t.type !== 'radio') setError(form, t.name, '');
      if (!started) {
        started = true;
        track('Formulaire commencé', { formulaire: form.dataset.kind || '' });
      }
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = form.querySelector<HTMLElement>('[data-form-status]');
      if (status) status.textContent = '';
      if (!validateClient(form)) {
        if (status) {
          status.dataset.tone = 'error';
          status.textContent = form.dataset.msgInvalid || '';
        }
        return;
      }

      const fd = new FormData(form);
      const attribution = getAttribution();
      for (const [k, v] of Object.entries(attribution)) fd.set(k, v);
      if (!fd.get('landing')) fd.set('landing', location.pathname);

      const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
      const label = button?.textContent;
      if (button) {
        button.disabled = true;
        button.textContent = form.dataset.msgSending || '…';
      }

      try {
        const res = await fetch(form.action, { method: 'POST', body: fd, headers: { accept: 'application/json' } });
        const body = await res.json().catch(() => ({}));
        if (res.ok && body.ok) {
          track('Inscription', { formulaire: form.dataset.kind || '' });
          showSuccess(form);
          return;
        }
        if (body.fields) {
          for (const [name, msg] of Object.entries(body.fields as Record<string, string>)) setError(form, name, msg);
          form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
        }
        if (status) {
          status.dataset.tone = 'error';
          status.textContent = form.dataset[`msg${capitalize(body.error || 'delivery_failed')}`] || form.dataset.msgDelivery_failed || '';
        }
        track('Erreur formulaire', { formulaire: form.dataset.kind || '', erreur: String(body.error || res.status) });
      } catch {
        if (status) {
          status.dataset.tone = 'error';
          status.textContent = form.dataset.msgNetwork || '';
        }
      } finally {
        if (button && document.contains(button)) {
          button.disabled = false;
          button.textContent = label || '';
        }
      }
    });
  });
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
