import React from 'react';
import Stepper, { Step } from '@via-profit/ui-kit/src/Stepper';
import { FormattedMessage } from 'react-intl';

const ExampleStepperVertical: React.FC = () => (
  <Stepper activeStep={1} orientation="vertical">
    <Step>
      <FormattedMessage defaultMessage="Создана" />
    </Step>
    <Step caption={<FormattedMessage defaultMessage="1 из 2" />} status="warning">
      <FormattedMessage defaultMessage="Водитель назначен" />
    </Step>
    <Step caption={<FormattedMessage defaultMessage="0 из 2" />}>
      <FormattedMessage defaultMessage="Водитель принял" />
    </Step>
    <Step>
      <FormattedMessage defaultMessage="Выполнена" />
    </Step>
  </Stepper>
);

export default ExampleStepperVertical;
