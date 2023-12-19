import { UIThemeOverrideColor as Colors } from '@via-profit/ui-kit/src';

declare module '@via-profit/ui-kit/src' {
  export interface UIThemeOverrideColor extends Colors {
    readonly mainSidebar: string;
    readonly mainSidebarContrast: string;
  }
}
