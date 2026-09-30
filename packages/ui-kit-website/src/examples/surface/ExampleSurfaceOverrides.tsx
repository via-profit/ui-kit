import React from 'react';
import styled from '@emotion/styled';
import Surface from '@via-profit/ui-kit/src/Surface';
import SurfaceHeader from '@via-profit/ui-kit/src/Surface/SurfaceHeader';
import Paragraph from '@via-profit/ui-kit/src/Typography/Paragraph';
import { FormattedMessage } from 'react-intl';

// Defined once at module level, not during the render
const Header = styled(SurfaceHeader)`
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.accentPrimary.alpha(0.4).toString()};
  color: ${({ theme }) => theme.color.accentPrimary.toString()};
`;

const overrides = { Header };

const ExampleSurfaceOverrides: React.FC = () => (
  <Surface header={<FormattedMessage defaultMessage="Уведомления" />} overrides={overrides}>
    <Paragraph noMargin>
      <FormattedMessage defaultMessage="Новых уведомлений нет" />
    </Paragraph>
  </Surface>
);

export default ExampleSurfaceOverrides;
