import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Color from '../Color';
import { TabsOrientation, useTabsContext } from './context';
import { themeFocusRing } from '../ThemeProvider/tokens';

export type TabProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> & {
  /**
   * The value of the tab. The panel with the same value is shown when the tab is selected
   */
  readonly value: string;
};

type StyledProps = {
  readonly $color: Color;
  readonly $selected: boolean;
  readonly $orientation: TabsOrientation;
  readonly $fullWidth: boolean;
};

const StyledTab = styled.button<StyledProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  flex-shrink: 0;
  box-sizing: border-box;
  margin: 0;
  padding: 0.75em 1.1em;
  border: 0;
  background: none;
  font: inherit;
  font-size: 0.9em;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  color: ${({ theme, $color, $selected }) =>
    $selected ? $color.toString() : theme.color.textSecondary.toString()};
  transition:
    color 150ms ease-out,
    background-color 150ms ease-out;
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      flex: 1 1 0;
    `}
  ${({ $orientation }) =>
    $orientation === 'vertical' &&
    css`
      justify-content: flex-start;
      text-align: left;
    `}

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.color.textPrimary.alpha(0.05).toString()};
  }

  &:focus-visible {
    outline: 2px solid ${({ $color }) => $color.toString()};
    outline-offset: -2px;
  }

  &:disabled {
    cursor: default;
    opacity: 0.45;
  }

  /* The indicator of the selected tab: under the tab or on its right edge */
  &::after {
    content: '';
    position: absolute;
    background-color: ${({ $color }) => $color.toString()};
    transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
    ${({ $orientation, $selected }) =>
      $orientation === 'vertical'
        ? css`
            top: 0;
            bottom: 0;
            right: -1px;
            width: 2px;
            transform: scaleY(${$selected ? 1 : 0});
          `
        : css`
            left: 0;
            right: 0;
            bottom: 0;
            height: 2px;
            transform: scaleX(${$selected ? 1 : 0});
          `}
  }

  @media (prefers-reduced-motion: reduce) {
    &,
    &::after {
      transition: none;
    }
  }
  ${({ theme }) => themeFocusRing(theme)}
`;

const Tab: React.ForwardRefRenderFunction<HTMLButtonElement, TabProps> = (props, ref) => {
  const { value, children, onClick, disabled, ...nativeProps } = props;
  const context = useTabsContext('Tab');
  const isSelected = context.value === value;
  const tabRef = React.useRef<HTMLButtonElement | null>(null);

  React.useImperativeHandle(ref, () => tabRef.current as HTMLButtonElement);

  // The selected tab is kept visible in the scrolled list
  React.useEffect(() => {
    if (isSelected && tabRef.current) {
      const tab = tabRef.current;
      const list = tab.parentElement;
      if (list && list.scrollWidth > list.clientWidth) {
        const left = tab.offsetLeft - list.offsetLeft;
        if (left < list.scrollLeft || left + tab.offsetWidth > list.scrollLeft + list.clientWidth) {
          list.scrollTo({
            left: left - (list.clientWidth - tab.offsetWidth) / 2,
            behavior: 'smooth',
          });
        }
      }
    }
  }, [isSelected]);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = event => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      context.select(value, event);
    }
  };

  return (
    <StyledTab
      type="button"
      role="tab"
      id={context.getTabId(value)}
      aria-controls={context.getPanelId(value)}
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      data-tab-value={value}
      {...nativeProps}
      disabled={disabled}
      onClick={handleClick}
      $color={context.color}
      $selected={isSelected}
      $orientation={context.orientation}
      $fullWidth={context.fullWidth}
      ref={tabRef}
    >
      {children}
    </StyledTab>
  );
};

export default React.forwardRef(Tab);
