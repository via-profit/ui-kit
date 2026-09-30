import React from 'react';
import styled from '@emotion/styled';
import Accordion from '@via-profit/ui-kit/src/Accordion';
import AccordionHeader from '@via-profit/ui-kit/src/Accordion/AccordionHeader';
import { FormattedMessage } from 'react-intl';

// Defined once at module level, not during the render
const Header = styled(AccordionHeader)`
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.color.accentPrimary.toString()};
`;

const overrides = { Header };

const ExampleAccordionOverrides: React.FC = () => (
  <Accordion header={<FormattedMessage defaultMessage="Характеристики" />} overrides={overrides}>
    <FormattedMessage defaultMessage="Вес 1,2 кг, размеры 30 × 20 × 5 см, гарантия 2 года." />
  </Accordion>
);

export default ExampleAccordionOverrides;
