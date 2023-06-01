import '@emotion/react';
import { UITheme } from '@via-profit/ui-kit/src/ThemeProvider/createTheme';

declare module '@emotion/react' {
  export interface Theme extends UITheme {}
}
