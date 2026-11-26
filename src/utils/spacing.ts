import type { Theme } from '@emotion/react';

import type { ThemeSpacing } from '../ThemeProvider';

/**
 * A step of the theme spacing scale (`xs`…`xl`), any CSS length (`'0.75em'`, `'12px'`)
 * or a number of pixels
 */
// `string & {}` keeps the autocomplete of the scale steps while any string is allowed
// eslint-disable-next-line @typescript-eslint/ban-types
export type Spacing = ThemeSpacing | (string & {}) | number;

/**
 * Resolves the spacing to a CSS value
 */
export const resolveSpacing = (theme: Theme, value: Spacing): string => {
  if (typeof value === 'number') {
    return `${value}px`;
  }

  return theme.spacing[value as ThemeSpacing] ?? value;
};
