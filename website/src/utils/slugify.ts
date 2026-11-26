/**
 * GitHub-compatible anchor of the heading: the documentation links (`#ключ-разрешения-permission-key`)
 * are written for GitHub, so the site must generate the same anchors
 */
const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}\p{Pc}\- ]/gu, '')
    .replace(/ /g, '-');

export default slugify;
