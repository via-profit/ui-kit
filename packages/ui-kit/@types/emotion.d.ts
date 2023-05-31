import '@emotion/react';
import { UITheme } from '@via-profit/ui-kit';

declare module '@emotion/react' {
  export interface Theme extends UITheme {}
}
