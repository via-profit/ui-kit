import '@emotion/react';

declare module '@emotion/react' {
  import { UITheme } from '@via-profit/ui-kit';

  export interface Theme extends UITheme {}
}
