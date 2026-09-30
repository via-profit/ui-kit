import React from 'react';
import styled from '@emotion/styled';
import Button from '@via-profit/ui-kit/src/Button';
import ButtonTextWrapper from '@via-profit/ui-kit/src/Button/ButtonTextWrapper';
import { FormattedMessage } from 'react-intl';

// Defined once at module level, not during the render
const TextWrapper = styled(ButtonTextWrapper)`
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const overrides = { TextWrapper };

const ExampleButtonOverrides: React.FC = () => (
  <Button color="primary" overrides={overrides}>
    <FormattedMessage defaultMessage="Купить" />
  </Button>
);

export default ExampleButtonOverrides;
