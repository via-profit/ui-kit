import React from 'react';
import styled from '@emotion/styled';

export type SwitchTrackProps = React.HTMLAttributes<HTMLSpanElement>;

type StyleProps = {
  readonly color?: SwitchToggleProps['color'];
  readonly checked: boolean;
};

const Track = styled.span<StyleProps>`
  height: 100%;
  width: 100%;
  border-radius: 7px;
  transition:
    opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: ${({ color, checked, theme }) => {
    switch (true) {
      case !checked:
        return theme.isDark
          ? theme.color.textPrimary.darken(10).toString()
          : theme.color.surface.darken(200).toString();
      case typeof color === 'undefined':
      default:
        return theme.color.accentPrimary.toString();
    }
  }};
  opacity: 0.5;
`;

const SwitchTrack: React.ForwardRefRenderFunction<HTMLSpanElement, SwitchTrackProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return <Track {...nativeProps} ref={ref} color={color} checked={checked} />;
};

export default React.forwardRef(SwitchTrack);
