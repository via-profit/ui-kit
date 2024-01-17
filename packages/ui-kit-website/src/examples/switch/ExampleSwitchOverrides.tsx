import React from 'react';
import Switch from '@via-profit/ui-kit/src/Switch';
import SwitchDot from '@via-profit/ui-kit/src/Switch/SwitchDot';
import styled from '@emotion/styled';

const TextWrapper = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.color.success.toString()};
`;

const StyledDot = styled(SwitchDot)`
  & span {
    border-radius: 0;
  }
`;

const ExampleButtonOverrides: React.FC = () => (
  <>
    <Switch
      type="button"
      color="primary"
      overrides={{
        TextWrapper: React.forwardRef(function Wrapper(props, ref) {
          const { children } = props;

          return <TextWrapper ref={ref}>{children}</TextWrapper>;
        }),
        Dot: React.forwardRef(function NewDot(props, ref) {
          const { children, ...otherProps } = props;

          return (
            <StyledDot {...otherProps} ref={ref}>
              {children}
            </StyledDot>
          );
        }),
      }}
    >
      Overrided
    </Switch>
  </>
);

export default ExampleButtonOverrides;
