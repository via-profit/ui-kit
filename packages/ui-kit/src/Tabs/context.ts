import React from 'react';

import Color from '../Color';

export type TabsOrientation = 'horizontal' | 'vertical';

/**
 * `underline` — the line under the selected tab, `segmented` — the tabs in the tray, the selected one is the plate
 */
export type TabsVariant = 'underline' | 'segmented';

/**
 * The height of the tab at the text of 14px: `s` — 32px, `m` — 40px, `l` — 48px
 */
export type TabsSize = 's' | 'm' | 'l';

/**
 * The size of the text and the paddings of the tab, in the `em` of the tabs
 */
export const TAB_SIZES: Record<
  TabsSize,
  { readonly fontSize: string; readonly y: string; readonly x: string }
> = {
  s: { fontSize: '0.857em', y: '0.5em', x: '0.7em' },
  m: { fontSize: '0.929em', y: '0.75em', x: '0.9em' },
  l: { fontSize: '1em', y: '1em', x: '1.05em' },
};

export interface TabsContextValue {
  /**
   * The selected tab or `null` if nothing is selected
   */
  readonly value: string | null;
  readonly select: (value: string, event: React.SyntheticEvent) => void;

  /**
   * Selects the tab without `onChange`: the initial tab of the uncontrolled tabs without `defaultValue`
   */
  readonly selectInitial: (value: string) => void;
  readonly isUncontrolledEmpty: boolean;
  readonly orientation: TabsOrientation;
  readonly activation: 'auto' | 'manual';
  readonly fullWidth: boolean;
  readonly variant: TabsVariant;
  readonly size: TabsSize;
  readonly color: Color;
  readonly getTabId: (value: string) => string;
  readonly getPanelId: (value: string) => string;
}

export const TabsContext = React.createContext<TabsContextValue | null>(null);

export const useTabsContext = (component: string): TabsContextValue => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error(`<${component}> should be placed inside <Tabs>`);
  }

  return context;
};
