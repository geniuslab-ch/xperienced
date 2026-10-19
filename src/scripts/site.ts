/**
 * Comportements du site : suivi des CTA, mémorisation de la campagne d'origine,
 * apparitions au défilement, menu mobile, partage et formulaires.
 */
import { initForms } from './forms';
import { captureAttribution, track } from './analytics';

/* ---------- Suivi des clics sur les éléments marqués data-track ---------- */
function initTracking() {
  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-track]');
    if (el) track('CTA', { id: el.dataset.track || 'inconnu' });
  });
}

/* ---------- Apparitions au défilement ---------- */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  items.forEach((el) => io.observe(el));
}

/* ---------- Menu mobile ---------- */
function initMenu() {
  const btn = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const panel = document.getElementById('menu');
  if (!btn || !panel) return;
  const close = () => {
    btn.setAttribute('aria-expanded', 'false');
    panel.dataset.open = 'false';
    document.body.style.overflow = '';
  };
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    panel.dataset.open = String(open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) panel.querySelector<HTMLElement>('a')?.focus();
  });
  panel.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      close();
      btn.focus();
    }
  });
  window.matchMedia('(min-width: 960px)').addEventListener('change', close);
}

/* ---------- Partage / recommandation ---------- */
function shareUrl(channel: string) {
  const url = new URL('/', location.origin);
  url.searchParams.set('utm_source', 'recommandation');
  url.searchParams.set('utm_medium', 'partage');
  url.searchParams.set('utm_campaign', channel);
  url.searchParams.set('ref', 'ami');
  return url.toString();
}

function initShare() {
  document.querySelectorAll<HTMLElement>('[data-share]').forEach((root) => {
    const text = root.dataset.shareText || '';
    const copied = root.dataset.copied || 'Lien copié.';
    const status = root.querySelector<HTMLElement>('[data-share-status]');
    const native = root.querySelector<HTMLButtonElement>('[data-share-native]');

    const links: Record<string, (u: string) => string> = {
      whatsapp: (u) => `https://wa.me/?text=${encodeURIComponent(`${text} ${u}`)}`,
      email: (u) => `mailto:?subject=${encodeURIComponent('Xperienced')}&body=${encodeURIComponent(`${text}\n\n${u}`)}`,
      linkedin: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}`,
      facebook: (u) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`,
    };
    root.querySelectorAll<HTMLAnchorElement>('[data-share-channel]').forEach((a) => {
      const channel = a.dataset.shareChannel!;
      a.href = links[channel]?.(shareUrl(channel)) || a.href;
      a.addEventListener('click', () => track('Partage', { canal: channel }));
    });

    if (native && typeof navigator.share === 'function') {
      native.hidden = false;
      native.addEventListener('click', async () => {
        try {
          await navigator.share({ title: 'Xperienced', text, url: shareUrl('natif') });
          track('Partage', { canal: 'natif' });
        } catch {
          /* partage annulé */
        }
      });
    }

    root.querySelector<HTMLButtonElement>('[data-share-copy]')?.addEventListener('click', async () => {
      const u = shareUrl('lien');
      try {
        await navigator.clipboard.writeText(u);
      } catch {
        window.prompt('Copiez ce lien :', u);
      }
      if (status) status.textContent = copied;
      track('Partage', { canal: 'lien' });
    });
  });
}

/* ---------- Boutons qui pré-remplissent un formulaire ---------- */
function initPresets() {
  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-preset]');
    if (!el) return;
    for (const preset of (el.dataset.preset || '').split('|')) {
      const [formId, field, ...values] = preset.split(':');
      const form = document.getElementById(formId!) as HTMLFormElement | null;
      if (!form || !field) continue;
      form.querySelectorAll<HTMLInputElement | HTMLSelectElement>(`[name="${field}"]`).forEach((input) => {
        if (input instanceof HTMLInputElement && (input.type === 'checkbox' || input.type === 'radio')) {
          input.checked = values.includes(input.value);
        } else {
          input.value = values[0] || '';
        }
      });
    }
  });
}

captureAttribution();
initTracking();
initReveal();
initMenu();
initShare();
initPresets();
initForms();
