import React from 'react';
import Stepper, { Step } from '@via-profit/ui-kit/src/Stepper';
import { FormattedMessage } from 'react-intl';

const ExampleStepperBasic: React.FC = () => (
  <Stepper activeStep={2}>
    <Step>
      <FormattedMessage defaultMessage="Создана" />
    </Step>
    <Step>
      <FormattedMessage defaultMessage="Назначен" />
    </Step>
    <Step>
      <FormattedMessage defaultMessage="Принял" />
    </Step>
    <Step>
      <FormattedMessage defaultMessage="Выполнена" />
    </Step>
    <Step>
      <FormattedMessage defaultMessage="Оплачена" />
    </Step>
  </Stepper>
);

export default ExampleStepperBasic;
