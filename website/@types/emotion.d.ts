import '@emotion/react';
import type { SiteTheme } from '../src/themes/createSiteTheme';

declare module '@emotion/react' {
  export interface Theme extends SiteTheme {}
}
