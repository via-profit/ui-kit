declare module '@via-profit/ui-kit/ThemeProvider' {
  import { UITheme, UIThemeOverrides } from '@via-profit/ui-kit';

  export type { UITheme, UIThemeOverrides };

  export type CreateTheme = (overrides?: UIThemeOverrides) => UITheme;

  export interface ThemeProviderProps {
    readonly children: React.ReactNode | readonly React.ReactNode[];
    readonly theme: UITheme;
  }

  const ThemeProvider: React.FC<ThemeProviderProps>;

  export default ThemeProvider;
}
