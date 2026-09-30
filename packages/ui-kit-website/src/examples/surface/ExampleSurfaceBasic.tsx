import React from 'react';
import Surface from '@via-profit/ui-kit/src/Surface';
import { FormattedMessage } from 'react-intl';

const ExampleSurfaceBasic: React.FC = () => (
  <Surface>
    <FormattedMessage defaultMessage="Содержимое поверхности" />
  </Surface>
);

export default ExampleSurfaceBasic;
