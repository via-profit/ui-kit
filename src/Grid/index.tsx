import React from 'react';
import styled from '@emotion/styled';

import { resolveSpacing, Spacing } from '../utils/spacing';

export type { Spacing };

export type GridProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * The adaptive grid: as many columns as fit, every column is not narrower than this width.
   * On a narrow screen the columns become one column by themselves, without breakpoints.\
   * Wins over `columns`
   */
  readonly minColumnWidth?: string;

  /**
   * A number — that many equal columns, a string — the `grid-template-columns` value
   * (e.g. `'2fr 1fr'` or `'auto 1fr'`)\
   * **Default:** `1`
   */
  readonly columns?: number | string;

  /**
   * The gap between the cells: a step of the theme spacing scale or any CSS length\
   * **Default:** `md`
   */
  readonly gap?: Spacing;

  /**
   * The gap between the rows, if it differs from `gap`
   */
  readonly rowGap?: Spacing;

  /**
   * The vertical alignment of the cells in a row (`align-items`)\
   * **Default:** `stretch`
   */
  readonly align?: React.CSSProperties['alignItems'];

  /**
   * The element of the grid: `ul`, `ol`, `dl`, `nav`, `section` and others.
   * The lists lose the default margins and markers\
   * **Default:** `div`
   */
  readonly as?: React.ElementType;
};

type StyledProps = {
  readonly $template: string;
  readonly $gap: Spacing;
  readonly $rowGap?: Spacing;
  readonly $align?: React.CSSProperties['alignItems'];
  readonly $isList: boolean;
};

/**
 * The lists are the rows of the elements here: no default margins and markers
 */
const LIST_TAGS: readonly React.ElementType[] = ['ul', 'ol', 'dl'];

const StyledGrid = styled.div<StyledProps>`
  display: grid;
  grid-template-columns: ${({ $template }) => $template};
  gap: ${({ theme, $gap }) => resolveSpacing(theme, $gap)};
  ${({ theme, $rowGap }) =>
    typeof $rowGap !== 'undefined' ? `row-gap: ${resolveSpacing(theme, $rowGap)};` : ''}
  align-items: ${({ $align }) => $align ?? 'stretch'};
  min-width: 0;
  ${({ $isList }) => ($isList ? 'margin: 0; padding: 0; list-style: none;' : '')}
`;

const getTemplate = (minColumnWidth: string | undefined, columns: number | string) => {
  if (minColumnWidth) {
    // min(…, 100%): a column wider than the container does not overflow it
    return `repeat(auto-fit, minmax(min(${minColumnWidth}, 100%), 1fr))`;
  }

  // minmax(0, 1fr): a long word or a wide child does not stretch its column
  return typeof columns === 'number' ? `repeat(${columns}, minmax(0, 1fr))` : columns;
};

/**
 * The grid of cells with the same gap. The children are the cells: no wrappers for the items
 */
const Grid: React.ForwardRefRenderFunction<HTMLDivElement, GridProps> = (props, ref) => {
  const {
    children,
    minColumnWidth,
    columns = 1,
    gap = 'md',
    rowGap,
    align,
    as,
    ...nativeProps
  } = props;

  return (
    <StyledGrid
      {...nativeProps}
      $template={getTemplate(minColumnWidth, columns)}
      $gap={gap}
      $rowGap={rowGap}
      $align={align}
      $isList={Boolean(as && LIST_TAGS.includes(as))}
      as={as}
      ref={ref}
    >
      {children}
    </StyledGrid>
  );
};

export default React.forwardRef(Grid);
