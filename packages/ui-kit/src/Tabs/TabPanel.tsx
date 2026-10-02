import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { TabsOrientation, useTabsContext } from './context';
import { themeFocusRing } from '../ThemeProvider/tokens';

export type TabPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * The value of the tab this panel belongs to
   */
  readonly value: string;

  /**
   * Keeps the hidden panel in the DOM, e.g. to keep the state of the form inside it.
   * By default the hidden panel is unmounted
   * Default: false
   */
  readonly keepMounted?: boolean;
};

const StyledPanel = styled.div<{ $orientation: TabsOrientation }>`
  box-sizing: border-box;
  ${({ $orientation }) =>
    $orientation === 'vertical'
      ? css`
          flex: 1;
          min-width: 0;
          padding: 0 0 0 1.25em;
        `
      : css`
          padding: 1.25em 0 0;
        `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accentPrimary.alpha(0.5).toString()};
    outline-offset: 2px;
  }
  ${({ theme }) => themeFocusRing(theme)}
`;

const TabPanel: React.ForwardRefRenderFunction<HTMLDivElement, TabPanelProps> = (props, ref) => {
  const { value, keepMounted = false, children, ...nativeProps } = props;
  const context = useTabsContext('TabPanel');
  const isSelected = context.value === value;

  if (!isSelected && !keepMounted) {
    return null;
  }

  return (
    <StyledPanel
      role="tabpanel"
      id={context.getPanelId(value)}
      aria-labelledby={context.getTabId(value)}
      // The panel is reachable by Tab even if it has no focusable elements
      tabIndex={0}
      hidden={!isSelected}
      {...nativeProps}
      $orientation={context.orientation}
      ref={ref}
    >
      {children}
    </StyledPanel>
  );
};

export default React.forwardRef(TabPanel);
