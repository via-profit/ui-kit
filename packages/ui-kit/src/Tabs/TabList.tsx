import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { TabsOrientation, useTabsContext } from './context';

export type TabListProps = React.HTMLAttributes<HTMLDivElement>;

const StyledList = styled.div<{ $orientation: TabsOrientation }>`
  display: flex;
  box-sizing: border-box;
  ${({ theme, $orientation }) =>
    $orientation === 'vertical'
      ? css`
          flex-direction: column;
          flex-shrink: 0;
          border-right: 1px solid ${theme.color.textPrimary.alpha(0.12).toString()};
        `
      : css`
          flex-direction: row;
          /* Many tabs on the narrow screen scroll instead of breaking the layout */
          overflow-x: auto;
          scrollbar-width: none;
          border-bottom: 1px solid ${theme.color.textPrimary.alpha(0.12).toString()};
          &::-webkit-scrollbar {
            display: none;
          }
        `}
`;

const getEnabledTabs = (list: HTMLElement) =>
  Array.from(list.querySelectorAll<HTMLElement>('[role="tab"]')).filter(
    tab => tab.closest('[role="tablist"]') === list && !tab.hasAttribute('disabled'),
  );

const TabList: React.ForwardRefRenderFunction<HTMLDivElement, TabListProps> = (props, ref) => {
  const { children, onKeyDown, ...nativeProps } = props;
  const { orientation, activation, value, isUncontrolledEmpty, selectInitial } =
    useTabsContext('TabList');
  const listRef = React.useRef<HTMLDivElement | null>(null);

  React.useImperativeHandle(ref, () => listRef.current as HTMLDivElement);

  // The tab order needs one focusable tab. Normally it is the selected one,
  // without it — the first enabled tab
  React.useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }

    const tabs = getEnabledTabs(list);
    if (isUncontrolledEmpty && tabs[0]) {
      selectInitial(tabs[0].dataset.tabValue as string);

      return;
    }

    // Set on every tab: the first tab may keep 0 from the previous render without a selected tab
    const focusable = tabs.find(tab => tab.getAttribute('aria-selected') === 'true') || tabs[0];
    tabs.forEach(tab => {
      tab.tabIndex = tab === focusable ? 0 : -1;
    });
  });

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = event => {
    onKeyDown?.(event);

    const list = listRef.current;
    if (event.defaultPrevented || !list) {
      return;
    }

    const tabs = getEnabledTabs(list);
    const index = tabs.indexOf(document.activeElement as HTMLElement);
    if (index === -1) {
      return;
    }

    const prevKey = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';
    const nextKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
    let nextIndex: number;

    switch (event.key) {
      case prevKey:
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        break;
      case nextKey:
        nextIndex = (index + 1) % tabs.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();

    const target = tabs[nextIndex];
    target.focus();
    if (activation === 'auto' && target.dataset.tabValue !== value) {
      target.click();
    }
  };

  return (
    <StyledList
      role="tablist"
      aria-orientation={orientation}
      {...nativeProps}
      onKeyDown={handleKeyDown}
      $orientation={orientation}
      ref={listRef}
    >
      {children}
    </StyledList>
  );
};

export default React.forwardRef(TabList);
