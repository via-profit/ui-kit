import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type FileDropzoneAreaProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * A file is dragged over the area
   */
  readonly active: boolean;
  /**
   * The file is chosen: the solid border instead of the dashed one
   */
  readonly filled: boolean;
  readonly disabled: boolean;
};

const StyledArea = styled.div<{
  readonly $active: boolean;
  readonly $filled: boolean;
  readonly $disabled: boolean;
}>`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  min-height: 6.5em;
  padding: 1em;
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 1.6}em;
  border: 1px ${({ $filled }) => ($filled ? 'solid' : 'dashed')}
    ${({ theme, $active }) =>
      ($active ? theme.color.accentPrimary : theme.color.textSecondary.alpha(0.45)).toString()};
  background-color: ${({ theme, $active }) =>
    ($active
      ? theme.color.accentPrimary.alpha(0.1)
      : theme.color.textPrimary.alpha(0.03)
    ).toString()};
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  transition:
    border-color 120ms ease-out,
    background-color 120ms ease-out;

  ${({ $filled, $disabled, theme }) =>
    !$filled &&
    !$disabled &&
    css`
      cursor: pointer;

      &:hover,
      &:focus-visible {
        border-color: ${theme.color.accentPrimary.toString()};
      }
    `}

  ${({ $filled }) =>
    $filled
      ? css`
          flex-direction: row;
          align-items: center;
          gap: 0.75em;
        `
      : css`
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.3em;
          text-align: center;
        `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
      cursor: default;
    `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accentPrimary.alpha(0.4).toString()};
    outline-offset: 2px;
  }
`;

/**
 * The area: without the file — the icon and two lines in the middle (it chooses the file),
 * with the file — the row of the file
 */
const FileDropzoneArea: React.ForwardRefRenderFunction<HTMLDivElement, FileDropzoneAreaProps> = (
  props,
  ref,
) => {
  const { active, filled, disabled, ...nativeProps } = props;

  return (
    <StyledArea {...nativeProps} $active={active} $filled={filled} $disabled={disabled} ref={ref} />
  );
};

export default React.forwardRef(FileDropzoneArea);
