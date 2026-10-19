/**
 * Xperienced — réception des formulaires dans une feuille Google Sheets (gratuit).
 *
 * Mise en place (10 minutes) :
 * 1. Créez une feuille Google Sheets « Xperienced — inscriptions ».
 * 2. Menu Extensions › Apps Script. Remplacez le contenu par ce fichier.
 * 3. Remplacez SECRET ci-dessous par une longue phrase aléatoire (la même que FORM_WEBHOOK_SECRET).
 * 4. Déployer › Nouveau déploiement › Type « Application Web »
 *      - Exécuter en tant que : Moi
 *      - Qui a accès : Tout le monde
 *    Copiez l'URL obtenue (https://script.google.com/macros/s/…/exec).
 * 5. Dans Render, définissez FORM_WEBHOOK_URL = cette URL et FORM_WEBHOOK_SECRET = votre secret.
 *
 * Chaque type de formulaire arrive dans son propre onglet (individu, opportunite, soutien, mur),
 * avec une colonne « statut » à remplir à la main (nouveau, contacté, mis en relation…) :
 * c'est la base du tableau de bord.
 *
 * Protection des données : Google traite ces données hors de Suisse. Mentionnez-le dans la
 * politique de confidentialité (section « Transferts à l'étranger »), limitez l'accès à la feuille
 * aux seules personnes qui traitent les demandes et activez la validation en deux étapes.
 */
const SECRET = 'REMPLACEZ-MOI-PAR-UNE-LONGUE-PHRASE-SECRETE';

function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  if (body.secret !== SECRET) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false })).setMimeType(ContentService.MimeType.JSON);
  }
  const sheet = getSheet_(body.kind);
  const row = Object.assign({ id: body.id, recu_le: body.received_at, statut: 'nouveau' }, flatten_(body.data), flatten_(body.meta));
  let headers = sheet.getLastRow() ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];
  const missing = Object.keys(row).filter((k) => headers.indexOf(k) === -1);
  if (missing.length) {
    headers = headers.concat(missing);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  sheet.appendRow(headers.map((h) => (h in row ? row[h] : '')));
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}

function getSheet_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function flatten_(obj) {
  const out = {};
  Object.keys(obj || {}).forEach((k) => {
    const v = obj[k];
    out[k] = Array.isArray(v) ? v.join(', ') : typeof v === 'boolean' ? (v ? 'oui' : 'non') : v;
  });
  return out;
}
