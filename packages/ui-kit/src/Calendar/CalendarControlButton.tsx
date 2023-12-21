import React from 'react';
import { useTheme } from '@emotion/react';

import Button, { ButtonProps } from '../Button';

export type CalendarControlButtonProps = ButtonProps;

const CalendarControlButton: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  CalendarControlButtonProps
> = (props, ref) => {
  const { children, ...restProps } = props;
  const { color } = useTheme();

  return (
    <Button
      type="button"
      variant="plain"
      color={color.accentSecondaryContrast.toString()}
      {...restProps}
      ref={ref}
    >
      {children}
    </Button>
  );
};

export default React.forwardRef(CalendarControlButton);
