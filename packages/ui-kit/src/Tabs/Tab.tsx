import React from 'react';
import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';

import Color from '../Color';
import Badge from '../Badge';
import { TAB_SIZES, TabsOrientation, TabsSize, TabsVariant, useTabsContext } from './context';
import { themeFocusRing } from '../ThemeProvider/tokens';

export type TabProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> & {
  /**
   * The value of the tab. The panel with the same value is shown when the tab is selected
   */
  readonly value: string;

  /**
   * The counter after the label: the badge of the color of the tabs, grey for zero
   */
  readonly counter?: number;
};

type StyledProps = {
  readonly $color: Color;
  readonly $selected: boolean;
  readonly $orientation: TabsOrientation;
  readonly $variant: TabsVariant;
  readonly $size: TabsSize;
  readonly $fullWidth: boolean;
};

const underlineStyles = ({
  theme,
  $color,
  $selected,
  $orientation,
}: StyledProps & { theme: Theme }) =>
  $orientation === 'vertical'
    ? css`
        /* The indicator of the selected tab on the right edge of the list */
        &::after {
          content: '';
          position: absolute;
          top: 0.3em;
          bottom: 0.3em;
          right: -1px;
          width: 2px;
          border-radius: 2px;
          background-color: ${$color.toString()};
          transform: scaleY(${$selected ? 1 : 0});
          transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        &:hover:not(:disabled) {
          background-color: ${theme.color.textPrimary.alpha(0.05).toString()};
        }
      `
    : css`
        /* The hover is the rounded background over the line, the line is under the text only */
        &::before {
          content: '';
          position: absolute;
          inset: 0.2em 0 0.3em 0;
          z-index: -1;
          border-radius: inherit;
          transition: background-color 150ms ease-out;
        }
        &:hover:not(:disabled)::before {
          background-color: ${theme.color.textPrimary.alpha(0.05).toString()};
        }
        &::after {
          content: '';
          position: absolute;
          left: var(--tab-x);
          right: var(--tab-x);
          bottom: 0;
          height: 2px;
          border-radius: 2px;
          background-color: ${$color.toString()};
          transform: scaleX(${$selected ? 1 : 0});
          transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }
      `;

const segmentedStyles = ({ theme, $color, $selected }: StyledProps & { theme: Theme }) => css`
  &:hover:not(:disabled) {
    background-color: ${$selected
      ? $color.alpha(0.2).toString()
      : theme.color.textPrimary.alpha(0.05).toString()};
  }
  ${$selected &&
  css`
    background-color: ${$color.alpha(0.14).toString()};
  `}
`;

const StyledTab = styled.button<StyledProps>`
  --tab-x: ${({ $size }) => TAB_SIZES[$size].x};
  position: relative;
  /* The own stacking context: the hover background lies under the text, over the panel */
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  flex-shrink: 0;
  box-sizing: border-box;
  margin: 0;
  padding: ${({ $size }) => `${TAB_SIZES[$size].y} var(--tab-x)`};
  border: 0;
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  background: none;
  font: inherit;
  font-size: ${({ $size }) => TAB_SIZES[$size].fontSize};
  /* light: the tabs are the navigation, not the headings */
  font-weight: ${({ $selected }) => ($selected ? 500 : 400)};
  white-space: nowrap;
  cursor: pointer;
  color: ${({ theme, $color, $selected }) =>
    $selected ? $color.darken(20).toString() : theme.color.textSecondary.toString()};
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
    color: ${({ theme, $color, $selected }) =>
      $selected ? $color.darken(20).toString() : theme.color.textPrimary.toString()};
  }

  &:focus-visible {
    outline: 2px solid ${({ $color }) => $color.toString()};
    outline-offset: -2px;
  }

  &:disabled {
    cursor: default;
    opacity: 0.45;
  }

  ${props => (props.$variant === 'segmented' ? segmentedStyles(props) : underlineStyles(props))}

  @media (prefers-reduced-motion: reduce) {
    &,
    &::before,
    &::after {
      transition: none;
    }
  }
  ${({ theme }) => themeFocusRing(theme)}
`;

const Tab: React.ForwardRefRenderFunction<HTMLButtonElement, TabProps> = (props, ref) => {
  const { value, counter, children, onClick, disabled, ...nativeProps } = props;
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
      $variant={context.variant}
      $size={context.size}
      $fullWidth={context.fullWidth}
      ref={tabRef}
    >
      {children}
      {typeof counter === 'number' && (
        // soft: the pale background of the color — the counter does not argue with the label
        <Badge variant="soft" color={counter > 0 ? context.color.toString() : 'default'}>
          {String(counter)}
        </Badge>
      )}
    </StyledTab>
  );
};

export default React.forwardRef(Tab);
