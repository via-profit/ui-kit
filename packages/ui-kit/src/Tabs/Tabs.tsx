import React from 'react';
import styled from '@emotion/styled';

import { TabsContext, TabsContextValue, TabsOrientation } from './context';
import useTabsColor from './useTabsColor';

export type TabsProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> & {
  /**
   * The selected tab of the controlled tabs. Pass it together with `onChange`
   * Default: undefined
   */
  readonly value?: string | null;

  /**
   * The initially selected tab of the uncontrolled tabs
   * Default: the first enabled tab
   */
  readonly defaultValue?: string;

  /**
   * Called when the user selects a tab
   */
  readonly onChange?: (value: string, event: React.SyntheticEvent) => void;

  /**
   * `vertical` puts the tabs in a column to the left of the panels, the arrows ↑/↓ move between them
   * Default: `horizontal`
   */
  readonly orientation?: TabsOrientation;

  /**
   * `auto`: the arrows select the tab at once.\
   * `manual`: the arrows only move the focus, Enter or Space selects the tab.
   * Use `manual` when the panel loads slowly, e.g. from the server
   * Default: `auto`
   */
  readonly activation?: 'auto' | 'manual';

  /**
   * The tabs share the whole width of the list
   * Default: false
   */
  readonly fullWidth?: boolean;

  /**
   * The color of the selected tab: the primary, default, secondary name of the colors or your specified color value
   * Default: `default`
   */
  readonly color?: 'default' | 'primary' | 'secondary' | string;
};

const StyledTabs = styled.div<{ $orientation: TabsOrientation }>`
  display: ${({ $orientation }) => ($orientation === 'vertical' ? 'flex' : 'block')};
  align-items: flex-start;
`;

/**
 * Turns any value into the part of the id: the id must not contain spaces
 */
const escapeId = (value: string) =>
  value.replace(/[^\w-]/g, char => `_${char.charCodeAt(0).toString(16)}`);

const Tabs: React.ForwardRefRenderFunction<HTMLDivElement, TabsProps> = (props, ref) => {
  const {
    value,
    defaultValue,
    onChange,
    orientation = 'horizontal',
    activation = 'auto',
    fullWidth = false,
    color,
    children,
    ...nativeProps
  } = props;

  const isControlled = typeof value !== 'undefined';
  const [internalValue, setInternalValue] = React.useState<string | null>(defaultValue ?? null);
  const currentValue = isControlled ? value : internalValue;
  const $color = useTabsColor(color);
  const baseId = `tabs-${React.useId().replace(/:/g, '')}`;

  // Warn once, not on every render
  const isControlledWithoutOnChange = isControlled && typeof onChange === 'undefined';
  React.useEffect(() => {
    if (isControlledWithoutOnChange) {
      console.error(
        'The property «onChange» should be passed with prop «value» to make component controlled',
      );
    }
  }, [isControlledWithoutOnChange]);

  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  const select = React.useCallback(
    (next: string, event: React.SyntheticEvent) => {
      if (next === currentValue) {
        return;
      }

      if (!isControlled) {
        setInternalValue(next);
      }

      onChangeRef.current?.(next, event);
    },
    [currentValue, isControlled],
  );

  const context = React.useMemo<TabsContextValue>(
    () => ({
      value: currentValue,
      select,
      selectInitial: setInternalValue,
      isUncontrolledEmpty: !isControlled && internalValue === null,
      orientation,
      activation,
      fullWidth,
      color: $color,
      getTabId: tabValue => `${baseId}-tab-${escapeId(tabValue)}`,
      getPanelId: tabValue => `${baseId}-panel-${escapeId(tabValue)}`,
    }),
    [
      currentValue,
      select,
      isControlled,
      internalValue,
      orientation,
      activation,
      fullWidth,
      $color,
      baseId,
    ],
  );

  return (
    <TabsContext.Provider value={context}>
      <StyledTabs {...nativeProps} $orientation={orientation} ref={ref}>
        {children}
      </StyledTabs>
    </TabsContext.Provider>
  );
};

export default React.forwardRef(Tabs);
