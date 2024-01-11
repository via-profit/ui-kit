import React from 'react';
import Accordion from '@via-profit/ui-kit/src/Accordion';
import styled from '@emotion/styled';

const StyledContent = styled.div`
  padding: 2em;
  font-weight: 600;
  border-radius: 0.4em;
  background-color: ${({ theme }) => theme.color.accentPrimary.toString()};
  color: ${({ theme }) => theme.color.accentPrimaryContrast.toString()};
`;

const ExampleAccordionOverrides: React.FC = () => (
  <>
    <Accordion
      overrides={{
        Content: React.forwardRef(function Content(props, ref) {
          const { children } = props;

          return <StyledContent ref={ref}>{children}</StyledContent>;
        }),
      }}
    >
      Overrided
    </Accordion>
  </>
);

export default ExampleAccordionOverrides;
