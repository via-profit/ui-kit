import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import styled from '@emotion/styled';

const TextWrapper = styled.span<{iconOnly?: boolean}>`
  padding: 0.2em;
  font-weight: 600;
  border-radius: 0.4em;
  background-color: ${({ theme }) => theme.color.surface.toString()};
  color: ${({ theme }) => theme.color.accentPrimary.darken(50).toString()};
`;

const ExampleButtonOverrides: React.FC = () => (
  <>
    <Button
      type="button"
      color="primary"
      overrides={{
        TextWrapper: React.forwardRef(function Wrapper(props, ref) {
          const {iconOnly, children } = props;

          return <TextWrapper iconOnly={iconOnly} ref={ref}>{children}</TextWrapper>;
        }),
      }}
    >
      Overrided
    </Button>
  </>
);

export default ExampleButtonOverrides;
