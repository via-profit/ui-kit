import { css, Theme } from '@emotion/react';

/**
 * True if the theme sets the focus ring
 */
export const hasThemeFocusRing = (theme: Theme) =>
  typeof theme.focusRing.width !== 'undefined' || typeof theme.focusRing.color !== 'undefined';

/**
 * The focus ring of the theme for the `selector` of the focused element.
 * Put it at the end of the styles: it replaces the own focus of the component.
 * Without `focusRing` in the theme it returns nothing and the component keeps its own focus
 */
export const themeFocusRing = (theme: Theme, selector = '&:focus-visible') => {
  if (!hasThemeFocusRing(theme)) {
    return undefined;
  }

  const {
    width = '2px',
    offset = '1px',
    color = theme.color.accentPrimary.toString(),
  } = theme.focusRing;

  return css`
    ${selector} {
      outline: ${width} solid ${color};
      outline-offset: ${offset};
    }
  `;
};

/**
 * The shadow of the level: the `elevation` of the theme, or the own shadow of the component
 */
export const elevation = (theme: Theme, level: 'popup' | 'surface', own: string) =>
  theme.elevation[level] ?? own;
