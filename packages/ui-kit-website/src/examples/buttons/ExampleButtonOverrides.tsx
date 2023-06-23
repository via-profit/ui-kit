import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import styled from '@emotion/styled';

const TextWrapper = styled.span`
  padding: 0.2em;
  font-weight: 600;
  border-radius: 0.4em;
  background-color: ${({ theme }) => theme.colors.surface.toString()};
  color: ${({ theme }) => theme.colors.accentPrimary.darken(50).toString()};
`;

const ExampleButtonOverrides: React.FC = () => (
  <>
    <Button
      type="button"
      color="primary"
      overrides={{
        TextWrapper: React.forwardRef(function Wrapper(props, ref) {
          const { children } = props;

          return <TextWrapper ref={ref}>{children}</TextWrapper>;
        }),
      }}
    >
      Overrided
    </Button>
  </>
);

export default ExampleButtonOverrides;