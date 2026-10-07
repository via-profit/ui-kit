import React from 'react';
import { ThemeProvider as EmotionProvider, useTheme } from '@emotion/react';

import type Color from '../Color';

export { useTheme };

export * from './createTheme';
export * from './tokens';

export type UITheme = Required<
  Omit<
    UIThemeOverrides,
    | 'isDark'
    | 'fontSize'
    | 'zIndex'
    | 'shape'
    | 'color'
    | 'spacing'
    | 'padding'
    | 'typography'
    | 'focusRing'
    | 'elevation'
  >
> & {
  readonly typography: UIThemeOverrideTypography;
  readonly focusRing: UIThemeOverrideFocusRing;
  readonly elevation: UIThemeOverrideElevation;
  readonly isDark: boolean;
  readonly fontSize: Record<keyof UIThemeOverrideFontSize, number>;
  readonly zIndex: Required<UIThemeOverrideZIndex>;
  readonly color: Record<keyof UIThemeOverrideColor, Color>;
  readonly shape: Required<UIThemeOverrideShape>;
  readonly spacing: Required<UIThemeOverrideSpacing>;
  readonly padding: Record<ThemePadding, Required<UIThemeOverridePaddingValue>>;
};

export interface UIThemeOverrideColor {
  readonly backgroundPrimary?: string;
  readonly backgroundSecondary?: string;
  readonly surface?: string;
  readonly textPrimary?: string;
  readonly textSecondary?: string;
  readonly accentPrimary?: string;
  readonly accentPrimaryContrast?: string;
  readonly accentSecondary?: string;
  readonly accentSecondaryContrast?: string;
  readonly error?: string;
  readonly errorContrast?: string;
  readonly warning?: string;
  readonly warningContrast?: string;
  readonly success?: string;
  readonly successContrast?: string;
}

/**
 * The font of the theme. The components inherit the font of the page:
 * apply `theme.typography.fontFamily` to the `body` of your application
 */
export interface UIThemeOverrideTypography {
  readonly fontFamily?: string;
}

/**
 * The outline of the focused element. Without these values every component draws its own focus
 */
export interface UIThemeOverrideFocusRing {
  /**
   * e.g. `2px`
   */
  readonly width?: string;

  /**
   * The gap between the element and the outline, e.g. `1px`
   */
  readonly offset?: string;

  /**
   * Any CSS color. Without it the outline has the color of the component
   */
  readonly color?: string;
}

/**
 * The shadows. Without these values every component has its own shadow
 */
export interface UIThemeOverrideElevation {
  /**
   * The elements over the page: the menus, the calendar of the date picker, the toasts
   */
  readonly popup?: string;

  /**
   * The cards and the panels on the page: Surface, Accordion, Table
   */
  readonly surface?: string;
}

export interface UIThemeOverrideZIndex {
  readonly header?: number;
  readonly modal?: number;
}

export interface UIThemeOverrideShape {
  readonly radiusFactor?: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
}

/**
 * The spacing scale: the gaps between the elements (`<Stack>`, `<Grid>`) and the paddings.
 * Any CSS length, `em` is recommended: the spacing grows together with the font size
 */
export interface UIThemeOverrideSpacing {
  readonly xs?: string;
  readonly sm?: string;
  readonly md?: string;
  readonly lg?: string;
  readonly xl?: string;
}

export type ThemeSpacing = keyof UIThemeOverrideSpacing;

/**
 * The inner padding of one class of the elements. Any CSS length, `em` is recommended:
 * the padding grows together with the font size
 */
export interface UIThemeOverridePaddingValue {
  /**
   * The top and the bottom padding
   */
  readonly y?: string;

  /**
   * The left and the right padding
   */
  readonly x?: string;
}

/**
 * The inner paddings of the components, by the class of the elements.
 * Smaller paddings make a denser interface without changing the font size
 */
export interface UIThemeOverridePadding {
  /**
   * The controls: Button, TextField, TextArea, Selectbox, DatePicker, Autocomplete.
   * `y` sets the height of the controls, all of them have the same height
   */
  readonly control?: UIThemeOverridePaddingValue;

  /**
   * The rows of the lists: the menu items, the table cells, the tabs, the accordion headers
   */
  readonly item?: UIThemeOverridePaddingValue;

  /**
   * The content of the panels: Surface, Accordion, the modal windows, Drawer, Toast
   */
  readonly container?: UIThemeOverridePaddingValue;
}

export type ThemePadding = keyof UIThemeOverridePadding;

export interface UIThemeOverrideFontSize {
  readonly small?: number;
  readonly normal?: number;
  readonly medium?: number;
  readonly large?: number;
}

export interface UIThemeOverrides {
  /**
   * **Default:** `false`
   */
  readonly isDark?: boolean;

  readonly fontSize?: UIThemeOverrideFontSize;
  readonly typography?: UIThemeOverrideTypography;
  readonly focusRing?: UIThemeOverrideFocusRing;
  readonly elevation?: UIThemeOverrideElevation;
  readonly zIndex?: UIThemeOverrideZIndex;
  readonly shape?: UIThemeOverrideShape;
  readonly spacing?: UIThemeOverrideSpacing;
  readonly padding?: UIThemeOverridePadding;
  readonly color?: UIThemeOverrideColor;
}

const ThemeProvider: React.FC<ThemeProviderProps> = props => {
  const { children, theme } = props;

  return <EmotionProvider theme={theme}>{children}</EmotionProvider>;
};

export type CreateTheme = (overrides?: UIThemeOverrides) => UITheme;

export interface ThemeProviderProps {
  readonly children: React.ReactNode | readonly React.ReactNode[];
  readonly theme: UITheme;
}

export default ThemeProvider;
