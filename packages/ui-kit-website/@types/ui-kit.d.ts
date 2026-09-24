import { UIThemeOverrideColor as Colors } from '@via-profit/ui-kit/src';

declare module '@via-profit/ui-kit/src' {
  export interface UIThemeOverrideColor extends Colors {
    readonly mainSidebar: string;
    readonly mainSidebarContrast: string;

    /**
     * Borders and dividers of the site layout
     */
    readonly border: string;

    /**
     * Background of the code blocks
     */
    readonly codeBackground: string;
  }
}
