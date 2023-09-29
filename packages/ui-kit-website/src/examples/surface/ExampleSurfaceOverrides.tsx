import React from 'react';
import Surface from '@via-profit/ui-kit/src/Surface';
import styled from '@emotion/styled';

const StyledContent = styled.div`
  padding: 2em;
  font-weight: 600;
  border-radius: 0.4em;
  background-color: ${({ theme }) => theme.color.accentPrimary.toString()};
  color: ${({ theme }) => theme.color.accentPrimaryContrast.toString()};
`;

const ExampleSurfaceOverrides: React.FC = () => (
  <>
    <Surface
      overrides={{
        Content: React.forwardRef(function Content(props, ref) {
          const { children } = props;

          return <StyledContent ref={ref}>{children}</StyledContent>;
        }),
      }}
    >
      Overrided
    </Surface>
  </>
);

export default ExampleSurfaceOverrides;
