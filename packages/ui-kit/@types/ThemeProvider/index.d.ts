declare module '@via-profit/ui-kit/ThemeProvider' {
  import { UITheme, UIThemeOverrides } from '@via-profit/ui-kit';

  export type CreateTheme = (overrides?: UIThemeOverrides) => UITheme;
}
