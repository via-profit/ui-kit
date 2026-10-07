import React from 'react';
import styled from '@emotion/styled';

import { resolveSpacing, Spacing } from '../utils/spacing';

export type { Spacing };

export type StackProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * `column` — the elements go one under another, `row` — in a line\
   * **Default:** `column`
   */
  readonly direction?: 'column' | 'row';

  /**
   * The gap between the elements: a step of the theme spacing scale or any CSS length\
   * **Default:** `md`
   */
  readonly gap?: Spacing;

  /**
   * The alignment across the direction (`align-items`)\
   * **Default:** `stretch` for the column, `center` for the row
   */
  readonly align?: React.CSSProperties['alignItems'];

  /**
   * The alignment along the direction (`justify-content`)
   */
  readonly justify?: React.CSSProperties['justifyContent'];

  /**
   * The elements of the row wrap to the next line when they do not fit
   */
  readonly wrap?: boolean;

  /**
   * The stack takes the width of its content (`inline-flex`) instead of the full width
   */
  readonly inline?: boolean;

  /**
   * The element of the stack: `ul`, `ol`, `dl`, `nav`, `section` and others.
   * The lists lose the default margins and markers\
   * **Default:** `div`
   */
  readonly as?: React.ElementType;
};

type StyledProps = {
  readonly $direction: 'column' | 'row';
  readonly $gap: Spacing;
  readonly $align?: React.CSSProperties['alignItems'];
  readonly $justify?: React.CSSProperties['justifyContent'];
  readonly $wrap: boolean;
  readonly $inline: boolean;
  readonly $isList: boolean;
};

/**
 * The lists are the rows of the elements here: no default margins and markers
 */
const LIST_TAGS: readonly React.ElementType[] = ['ul', 'ol', 'dl'];

const StyledStack = styled.div<StyledProps>`
  display: ${({ $inline }) => ($inline ? 'inline-flex' : 'flex')};
  flex-direction: ${({ $direction }) => $direction};
  flex-wrap: ${({ $wrap }) => ($wrap ? 'wrap' : 'nowrap')};
  align-items: ${({ $align, $direction }) =>
    $align ?? ($direction === 'row' ? 'center' : 'stretch')};
  justify-content: ${({ $justify }) => $justify ?? 'flex-start'};
  gap: ${({ theme, $gap }) => resolveSpacing(theme, $gap)};
  /* A flex child shrinks below its content only with min-width: 0 */
  min-width: 0;
  ${({ $isList }) => ($isList ? 'margin: 0; padding: 0; list-style: none;' : '')}
`;

/**
 * The elements in a column or in a row with the same gap between them.
 * The children stay the plain elements: no wrappers for the items
 */
const Stack: React.ForwardRefRenderFunction<HTMLDivElement, StackProps> = (props, ref) => {
  const {
    children,
    direction = 'column',
    gap = 'md',
    align,
    justify,
    wrap = false,
    inline = false,
    as,
    ...nativeProps
  } = props;

  return (
    <StyledStack
      {...nativeProps}
      $direction={direction}
      $gap={gap}
      $align={align}
      $justify={justify}
      $wrap={wrap}
      $inline={inline}
      $isList={Boolean(as && LIST_TAGS.includes(as))}
      as={as}
      ref={ref}
    >
      {children}
    </StyledStack>
  );
};

export default React.forwardRef(Stack);
