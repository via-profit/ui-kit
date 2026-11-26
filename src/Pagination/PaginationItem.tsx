import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Button, { ButtonProps } from '../Button';
import { controlHeight } from '../ThemeProvider/tokens';
import type { PaginationItemKind } from './usePagination';

export type PaginationItemProps = ButtonProps & {
  /**
   * What the button does: opens a page or goes to the first, previous, next or last page
   */
  readonly kind: PaginationItemKind;

  /**
   * The page the button opens, starts from 1
   */
  readonly page: number;

  /**
   * The button of the current page
   */
  readonly selected?: boolean;

  /**
   * The not selected page in the `standard` variant: a soft fill instead of the surface color,
   * so the buttons are visible on the surface
   */
  readonly soft?: boolean;
};

type StyledProps = {
  readonly $soft: boolean;
};

/**
 * `&&` raises the specificity above the own styles of the button.
 * The button is a square of the height of the controls, the numbers of several digits make it wider
 */
const StyledButton = styled(Button)<StyledProps>`
  && {
    box-sizing: border-box;
    min-width: ${({ theme }) => controlHeight(theme)};
    height: ${({ theme }) => controlHeight(theme)};
    padding: 0 0.6em;
    justify-content: center;
    font-variant-numeric: tabular-nums;
  }

  ${({ $soft, disabled, theme }) =>
    $soft &&
    css`
      && {
        background-color: ${theme.color.textPrimary.alpha(0.06).toString()};
        color: ${disabled
          ? theme.color.textPrimary.alpha(0.3).toString()
          : theme.color.textPrimary.toString()};
      }

      &&:hover {
        background-color: ${disabled
          ? theme.color.textPrimary.alpha(0.06).toString()
          : theme.color.textPrimary.alpha(0.1).toString()};
      }
    `}
`;

/**
 * The button of the page or of the navigation (first, previous, next, last)
 */
const PaginationItem: React.ForwardRefRenderFunction<HTMLButtonElement, PaginationItemProps> = (
  props,
  ref,
) => {
  const { selected, soft, kind, page, ...buttonProps } = props;

  return (
    <StyledButton
      type="button"
      aria-current={selected ? 'page' : undefined}
      data-kind={kind}
      $soft={Boolean(soft)}
      {...buttonProps}
      ref={ref}
    />
  );
};

export default React.forwardRef(PaginationItem);
