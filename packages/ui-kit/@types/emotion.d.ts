import '@emotion/react';
import { UITheme } from '../src/ThemeProvider';

declare module '@emotion/react' {
  export interface Theme extends UITheme {}
}
