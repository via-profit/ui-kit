import { css, Theme } from '@emotion/react';

import type { ThemePadding, ThemeElevation } from './index';

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
 * The default shadows of the levels: the components of one level have the same shadow.
 * In `px`, not in `em`: the tooltip and the toast have a smaller font, but the same shadow as the menu
 */
export const defaultElevation = (theme: Theme): Record<ThemeElevation, string> => ({
  popup: `0 8px 24px ${theme.color.surface.darken(50).alpha(0.6).toString()}`,
  surface: `0 8px 32px -13px ${theme.color.surface.darken(100).alpha(0.4).toString()}`,
  control: `0 1px 3px ${theme.color.surface.darken(100).alpha(0.35).toString()}`,
});

/**
 * The shadow of the level: the `elevation` of the theme or the default shadow of the level.
 * `own` replaces the default shadow, the shadow of the theme wins over both
 */
export const elevation = (theme: Theme, level: ThemeElevation, own?: string) =>
  theme.elevation[level] ?? own ?? defaultElevation(theme)[level];

/**
 * The height of the text line in the controls, in the `em` of the control. Set as a length,
 * the line height is inherited as is by the text of any size: the label of the button and the value of the field
 */
export const CONTROL_LINE_HEIGHT = '1.2em';

/**
 * The width of the borders of the components: `1px` at the font size of `16px`.
 * In `em`: the border grows together with the font, and at the usual sizes the browser draws `1px`
 */
export const BORDER_WIDTH = '0.0625em';

/**
 * The border of the buttons. The standard and the plain buttons have no border:
 * their padding is larger by this width, so all the variants have the same size
 */
export const CONTROL_BORDER = BORDER_WIDTH;

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
 * The border of the field: the border of the buttons in the `em` of the field with the font size `fontScale`
 */
export const fieldBorder = (fontScale = 1) => `calc(${CONTROL_BORDER} / ${fontScale})`;

/**
 * The padding of the field with the `fieldBorder`, so the field has the height of the button.
 * `fontScale` is the font size of the element relative to the control: the `em` of the padding are its own
 */
export const fieldPadding = (theme: Theme, fontScale = 1) =>
  themePadding(theme, 'control', fontScale);

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
