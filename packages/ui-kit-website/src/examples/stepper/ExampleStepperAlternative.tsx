import React from 'react';
import Stepper, { Step } from '@via-profit/ui-kit/src/Stepper';
import { FormattedMessage } from 'react-intl';

const ExampleStepperAlternative: React.FC = () => (
  <Stepper activeStep={2} alternativeLabel>
    <Step caption="19.10 14:20">
      <FormattedMessage defaultMessage="Создана" />
    </Step>
    <Step caption="09:12">
      <FormattedMessage defaultMessage="Назначен" />
    </Step>
    <Step>
      <FormattedMessage defaultMessage="Принял" />
    </Step>
    <Step>
      <FormattedMessage defaultMessage="Выполнена" />
    </Step>
    <Step completed caption={<FormattedMessage defaultMessage="заранее" />}>
      <FormattedMessage defaultMessage="Оплачена" />
    </Step>
  </Stepper>
);

export default ExampleStepperAlternative;
