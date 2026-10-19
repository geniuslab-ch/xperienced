/** Échappe le texte puis transforme *mot* en <em>mot</em> (accent manuscrit). */
export function rich(text: string): string {
  const escaped = text.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
  return escaped.replace(/\*(.+?)\*/g, '<em>$1</em>');
}
