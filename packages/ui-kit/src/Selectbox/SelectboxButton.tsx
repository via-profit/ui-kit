import * as React from 'react';
import styled from '@emotion/styled';

import Button, { ButtonProps } from '../Button';
import ButtonTextWrapper from '../Button/ButtonTextWrapper';

export type SelectboxButtonProps = Omit<ButtonProps, 'type'> & {
  readonly fullWidth?: boolean;
  readonly error?: boolean;
};

type StyleProps = {
  readonly $fullWidth?: boolean;
  readonly $error?: boolean;
};

const StyledSelectboxButton = styled(Button)<StyleProps>`
  flex: 1;
  padding: 1em 1.2em;
  font-size: 1em;
  background: none;
  border-radius: inherit;
  margin: 0;
  border: 0;
  width: 100%;
`;

const StyledButtonTextWrapper = styled(ButtonTextWrapper)`
  flex: 1;
`;

const SelectboxButton: React.ForwardRefRenderFunction<HTMLButtonElement, SelectboxButtonProps> = (
  props,
  ref,
) => {
  const { children, fullWidth, error, ...nativeProps } = props;

  return (
    <StyledSelectboxButton
      $fullWidth={fullWidth}
      $error={error}
      {...nativeProps}
      overrides={{
        TextWrapper: React.forwardRef(function SelectboxButtonTextWrapper(p, r) {
          return <StyledButtonTextWrapper {...p} ref={r} />;
        }),
      }}
      ref={ref}
    >
      {children}
    </StyledSelectboxButton>
  );
};

export default React.forwardRef(SelectboxButton);
