import React from 'react';

import type { ButtonProps } from '../Button';
import PaginationContainer, {
  PaginationContainerProps,
  PaginationSize,
} from './PaginationContainer';
import PaginationItem, { PaginationItemProps } from './PaginationItem';
import PaginationGap, { PaginationGapProps } from './PaginationGap';
import { IconFirst, IconLast, IconNext, IconPrevious } from './PaginationIcons';
import usePagination, {
  UsePaginationParams,
  PaginationItemKind,
  PaginationNavigationKind,
} from './usePagination';
import getPaginationItems from './getPaginationItems';

export * from './usePagination';
export * from './PaginationContainer';
export * from './PaginationItem';
export * from './PaginationGap';
export * from './PaginationIcons';
export * from './getPaginationItems';
export { usePagination, getPaginationItems };

type ButtonVariant = NonNullable<ButtonProps['variant']>;

export type PaginationColor = 'default' | 'primary' | 'secondary' | string;

export type PaginationProps = Omit<React.HTMLAttributes<HTMLElement>, 'onChange' | 'color'> &
  UsePaginationParams & {
    /**
     * The variant of the not selected page buttons\
     * **Default:** `standard`
     */
    readonly variant?: ButtonVariant;

    /**
     * The color of the selected page button\
     * **Default:** `primary`
     */
    readonly color?: PaginationColor;

    /**
     * The variant of the navigation buttons (first, previous, next, last)\
     * **Default:** `outlined`
     */
    readonly navigationVariant?: ButtonVariant;

    /**
     * The color of the navigation buttons\
     * **Default:** the `color` for the `standard` navigation variant, otherwise `default`
     */
    readonly navigationColor?: PaginationColor;

    /**
     * `small` — the compact variant\
     * **Default:** `medium`
     */
    readonly size?: PaginationSize;

    /**
     * Returns the label of the button for the screen readers\
     * **Default:** the english labels, e.g. «Go to page 3»
     */
    readonly getItemLabel?: (kind: PaginationItemKind, page: number, selected: boolean) => string;

    /**
     * Overridable components map
     */
    readonly overrides?: PaginationOverrides;
  };

export interface PaginationOverrides {
  /**
   * The `<nav>` around the buttons
   */
  readonly Container?: React.ComponentType<
    PaginationContainerProps & React.RefAttributes<HTMLElement>
  >;

  /**
   * The button of the page and the navigation buttons. Gets the `kind` and the `page` it opens:
   * e.g. render a link of your router instead of the button
   */
  readonly Item?: React.ComponentType<PaginationItemProps & React.RefAttributes<HTMLButtonElement>>;

  /**
   * The skipped range of the pages, `…`
   */
  readonly Gap?: React.ComponentType<PaginationGapProps & React.RefAttributes<HTMLSpanElement>>;
}

const defaultGetItemLabel: NonNullable<PaginationProps['getItemLabel']> = (
  kind,
  page,
  selected,
) => {
  switch (kind) {
    case 'first':
      return 'Go to first page';
    case 'previous':
      return 'Go to previous page';
    case 'next':
      return 'Go to next page';
    case 'last':
      return 'Go to last page';
    default:
      return selected ? `Page ${page}` : `Go to page ${page}`;
  }
};

const navigationIcons: Record<PaginationNavigationKind, React.ReactElement> = {
  first: <IconFirst />,
  previous: <IconPrevious />,
  next: <IconNext />,
  last: <IconLast />,
};

const Pagination: React.ForwardRefRenderFunction<HTMLElement, PaginationProps> = (props, ref) => {
  const {
    count,
    page,
    defaultPage,
    onChange,
    siblings,
    boundaries,
    showPrevNext,
    showFirstLast,
    disabled,
    variant = 'standard',
    color = 'primary',
    navigationVariant = 'outlined',
    navigationColor,
    size = 'medium',
    getItemLabel = defaultGetItemLabel,
    overrides,
    'aria-label': ariaLabel = 'Pagination',
    ...nativeProps
  } = props;

  const { items } = usePagination({
    count,
    page,
    defaultPage,
    onChange,
    siblings,
    boundaries,
    showPrevNext,
    showFirstLast,
    disabled,
  });

  const overridesMap = React.useMemo(
    () => ({
      Container: overrides?.Container || PaginationContainer,
      Item: overrides?.Item || PaginationItem,
      Gap: overrides?.Gap || PaginationGap,
    }),
    [overrides],
  );

  const navColor = navigationColor ?? (navigationVariant === 'standard' ? color : 'default');

  return (
    <overridesMap.Container size={size} aria-label={ariaLabel} {...nativeProps} ref={ref}>
      {items.map(item => {
        if (item.type === 'gap') {
          return <overridesMap.Gap key={`gap-${item.position}`} />;
        }

        const label = getItemLabel(item.type, item.page, item.selected);

        if (item.type !== 'page') {
          // The disabled navigation button gets the soft fill, as the not selected page
          return (
            <overridesMap.Item
              key={item.type}
              kind={item.type}
              page={item.page}
              variant={item.disabled ? 'standard' : navigationVariant}
              color={item.disabled ? 'default' : navColor}
              soft={item.disabled}
              disabled={item.disabled}
              aria-label={label}
              onClick={item.onClick}
            >
              {navigationIcons[item.type]}
            </overridesMap.Item>
          );
        }

        return (
          <overridesMap.Item
            key={item.page}
            kind="page"
            page={item.page}
            selected={item.selected}
            variant={item.selected ? 'standard' : variant}
            color={item.selected ? color : 'default'}
            soft={!item.selected && variant === 'standard'}
            disabled={item.disabled}
            aria-label={label}
            onClick={item.onClick}
          >
            {item.page}
          </overridesMap.Item>
        );
      })}
    </overridesMap.Container>
  );
};

export default React.forwardRef(Pagination);
