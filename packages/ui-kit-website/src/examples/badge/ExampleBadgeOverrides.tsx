import React from 'react';
import styled from '@emotion/styled';
import Badge from '@via-profit/ui-kit/src/Badge';
import BadgeContainer from '@via-profit/ui-kit/src/Badge/BadgeContainer';
import BadgeTextWrapper from '@via-profit/ui-kit/src/Badge/BadgeTextWrapper';
import { FormattedMessage } from 'react-intl';

// Defined once at module level, not during the render
const Container = styled(BadgeContainer)`
  border-radius: 0.25em;
  border-style: dashed;
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  background-color: ${({ theme }) => theme.color.surface.toString()};

  &:hover {
    background-color: ${({ theme }) => theme.color.surface.darken(5).toString()};
  }
`;

const TextWrapper = styled(BadgeTextWrapper)`
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const overrides = { Container, TextWrapper };

const ExampleBadgeOverrides: React.FC = () => (
  <Badge variant="soft" dot color="primary" overrides={overrides}>
    <FormattedMessage defaultMessage="Скидка 20%" />
  </Badge>
);

export default ExampleBadgeOverrides;
