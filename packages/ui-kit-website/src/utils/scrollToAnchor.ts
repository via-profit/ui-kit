// Header height (3.75rem) plus a gap
const HEADER_HEIGHT = 76;

/**
 * Scrolls the window to the markdown heading anchor (`<a id="...">`) taking the header into account.
 * Returns `false` if the anchor is not found
 */
const scrollToAnchor = (anchorName: string, behavior: ScrollBehavior = 'smooth'): boolean => {
  const element = document.getElementById(anchorName);

  if (!element) {
    return false;
  }

  const y = element.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
  window.scrollTo({ top: y, behavior });

  return true;
};

/**
 * Updates the hash in the URL without a new history entry.
 * The current history state is kept, React Router stores its own data (key, idx) there
 */
export const setLocationHash = (pathname: string, anchorName: string) => {
  window.history.replaceState(window.history.state, '', `${pathname}#${anchorName}`);
};

export default scrollToAnchor;
