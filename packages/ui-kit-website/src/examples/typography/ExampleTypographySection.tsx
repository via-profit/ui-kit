import React from 'react';
import { SectionTitle, SectionDescription } from '@via-profit/ui-kit/src/Typography';
import { FormattedMessage } from 'react-intl';

const ExampleTypographySection: React.FC = () => (
  <>
    <SectionTitle>
      <FormattedMessage defaultMessage="Почему выбирают нас" />
    </SectionTitle>
    <SectionDescription>
      <FormattedMessage defaultMessage="Более 10 000 покупателей каждый месяц доверяют нам свои заказы." />
    </SectionDescription>
  </>
);

export default ExampleTypographySection;
