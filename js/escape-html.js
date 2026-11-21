export function escapeHTML(text) {
  return text.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}
