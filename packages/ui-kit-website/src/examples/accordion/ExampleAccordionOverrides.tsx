import React from 'react';
import Accordion from '@via-profit/ui-kit/src/Accordion';
import AccordionContent from '@via-profit/ui-kit/src/Accordion/AccordionContent';
import AccordionHeader from '@via-profit/ui-kit/src/Accordion/AccordionHeader';
import styled from '@emotion/styled';

const StyledContent = styled(AccordionContent)`
  font-weight: 600;
  border-radius: 0.4em;
  background-color: ${({ theme }) => theme.color.accentPrimary.toString()};
  color: ${({ theme }) => theme.color.accentPrimaryContrast.toString()};
`;

const StyledHeader = styled(AccordionHeader)`
  font-weight: 600;
  border-radius: 0.4em;
  padding: 1em;
  background-color: ${({ theme }) => theme.color.accentSecondary.toString()};
  color: ${({ theme }) => theme.color.accentSecondaryContrast.toString()};
`;

const ExampleAccordionOverrides: React.FC = () => (
  <>
    <Accordion
      header={<>Overrided</>}
      overrides={{
        Content: React.forwardRef(function Content(props, ref) {
          const { children } = props;

          return (
            <StyledContent ref={ref} {...props}>
              {children}
            </StyledContent>
          );
        }),
        Header: React.forwardRef(function Header(props, ref) {
          const { children } = props;

          return (
            <StyledHeader ref={ref} {...props}>
              {children}
            </StyledHeader>
          );
        }),
      }}
    >
      Overrided
    </Accordion>
  </>
);

export default ExampleAccordionOverrides;
