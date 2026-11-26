/**
 * Scrolls the window to the heading anchor taking the sticky header into account.
 * Returns `false` if the anchor is not found
 */
const scrollToAnchor = (anchorName: string, behavior: ScrollBehavior = 'smooth'): boolean => {
  const element = document.getElementById(anchorName);

  if (!element) {
    return false;
  }

  const headerHeight = parseFloat(getComputedStyle(document.documentElement).fontSize) * 3.75;
  const y = element.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
  window.scrollTo({ top: y, behavior });

  return true;
};

/**
 * Updates the hash in the URL without a new history entry.
 * The current history state is kept, React Router stores its own data there
 */
export const setLocationHash = (anchorName: string) => {
  const { pathname, search } = window.location;
  window.history.replaceState(window.history.state, '', `${pathname}${search}#${anchorName}`);
};

export default scrollToAnchor;
