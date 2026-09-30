import { useTheme } from '@emotion/react';
import type { UIThemeOverrides } from '@via-profit/ui-kit/src/ThemeProvider';

import themeDark from '~/themes/dark';
import themeLight from '~/themes/light';

// The site themes always define all the colors
type SiteThemeOverrides = UIThemeOverrides & {
  readonly color: NonNullable<UIThemeOverrides['color']>;
};

/**
 * The overrides of the current site theme: the examples build their themes on top of it,
 * so they look right both in the light and in the dark mode of the site
 */
const useSiteThemeOverrides = (): SiteThemeOverrides => {
  const { isDark } = useTheme();

  return (isDark ? themeDark : themeLight) as SiteThemeOverrides;
};

export default useSiteThemeOverrides;
