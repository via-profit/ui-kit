import React from 'react';
import styled from '@emotion/styled';
import Badge from '@via-profit/ui-kit/src/Badge';
import BadgeTextWrapper from '@via-profit/ui-kit/src/Badge/BadgeTextWrapper';
import { FormattedMessage } from 'react-intl';

// Defined once at module level, not during the render
const TextWrapper = styled(BadgeTextWrapper)`
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const overrides = { TextWrapper };

const ExampleBadgeOverrides: React.FC = () => (
  <Badge color="primary" overrides={overrides}>
    <FormattedMessage defaultMessage="Скидка 20%" />
  </Badge>
);

export default ExampleBadgeOverrides;
