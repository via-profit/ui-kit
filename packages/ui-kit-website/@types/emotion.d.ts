import '@emotion/react';
import { UITheme } from '../../ui-kit/src/ThemeProvider';

declare module '@emotion/react' {
  export interface Theme extends UITheme {}
}
