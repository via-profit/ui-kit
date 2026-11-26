import '@via-profit/ui-kit/ThemeProvider';
import type { SiteColors } from '../src/themes/createSiteTheme';

// The site extends the theme of the kit. This declaration is scoped to the
// website's TypeScript project and does not enter the published library.
declare module '@via-profit/ui-kit/ThemeProvider' {
  export interface UIThemeOverrideColor extends Partial<SiteColors> {}
}
