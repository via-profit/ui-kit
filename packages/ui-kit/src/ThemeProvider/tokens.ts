import { css, Theme } from '@emotion/react';

import type { ThemePadding } from './index';

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

/**
 * The height of the text line in the controls, in the `em` of the control. Set as a length,
 * the line height is inherited as is by the text of any size: the label of the button and the value of the field
 */
export const CONTROL_LINE_HEIGHT = '1.2em';

/**
 * The border of the buttons. The standard and the plain buttons have no border:
 * their padding is larger by this width, so all the variants have the same size
 */
export const CONTROL_BORDER = '0.14em';

/**
 * The size of the text in the fields (TextField, TextArea, Selectbox) relative to the control
 */
export const FIELD_TEXT_SCALE = 0.9;

/**
 * The height of the one-line control: the icon buttons are squares of this size
 */
export const controlHeight = (theme: Theme) =>
  `calc(${CONTROL_LINE_HEIGHT} + 2 * ${theme.padding.control.y} + 2 * ${CONTROL_BORDER})`;

/**
 * The padding of the field with the `1px` border, so the field has the height of the button.
 * `fontScale` is the font size of the element relative to the control: the `em` of the padding are its own
 */
export const fieldPadding = (theme: Theme, fontScale = 1) => {
  const { y } = theme.padding.control;

  return {
    y: `calc((${y} + ${CONTROL_BORDER}) / ${fontScale} - 1px)`,
    x: themePadding(theme, 'control', fontScale).x,
  };
};

/**
 * The padding of the class for the element with its own font size.
 * `fontScale` is the font size of the element relative to the parent: the padding is in the `em` of the parent,
 * so the header with a larger font has the same padding as the content under it
 */
export const themePadding = (theme: Theme, kind: ThemePadding, fontScale = 1) => {
  const { y, x } = theme.padding[kind];

  return fontScale === 1
    ? { y, x }
    : { y: `calc(${y} / ${fontScale})`, x: `calc(${x} / ${fontScale})` };
};
