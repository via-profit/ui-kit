import React from 'react';

import Color from '../Color';

export type TabsOrientation = 'horizontal' | 'vertical';

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
