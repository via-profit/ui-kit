import createTheme from '@via-profit/ui-kit/ThemeProvider/createTheme';
import type { UITheme, UIThemeOverrides } from '@via-profit/ui-kit/ThemeProvider';
import Color from '@via-profit/ui-kit/Color';

/**
 * Colors of the site layout, which are not a part of the ui-kit theme
 */
export interface SiteColors {
  readonly mainSidebar: string;
  readonly mainSidebarContrast: string;

  /**
   * Borders and dividers of the site layout
   */
  readonly border: string;

  /**
   * Background of the code blocks and editors
   */
  readonly codeBackground: string;
}

/**
 * The theme of the site sets every token of the kit: the theme is the sample of all the fields,
 * and a new token of ui-kit is a type error here until it gets a value
 */
export type SiteThemeOverrides = Required<UIThemeOverrides> & {
  readonly siteColor: Required<SiteColors>;
};

export type SiteTheme = Omit<UITheme, 'color'> & {
  readonly color: UITheme['color'] & Record<keyof SiteColors, Color>;
};

/**
 * Creates the ui-kit theme and extends it with the site colors
 */
const createSiteTheme = (overrides: SiteThemeOverrides): SiteTheme => {
  const { siteColor, ...uiKitOverrides } = overrides;
  const theme = createTheme(uiKitOverrides);

  const siteColors = Object.fromEntries(
    Object.entries(siteColor).map(([name, value]) => [name, Color.fromString(value)]),
  ) as Record<keyof SiteColors, Color>;

  return {
    ...theme,
    color: {
      ...theme.color,
      ...siteColors,
    },
  };
};

export default createSiteTheme;
