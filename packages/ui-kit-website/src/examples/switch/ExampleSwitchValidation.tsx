import React from 'react';
import Switch from '@via-profit/ui-kit/src/Switch';
import { FormattedMessage } from 'react-intl';

const ExampleSwitchValidation: React.FC = () => {
  const [accepted, setAccepted] = React.useState(false);

  return (
    <Switch
      requiredAsterisk
      checked={accepted}
      onChange={event => setAccepted(event.currentTarget.checked)}
      error={!accepted}
      errorText={<FormattedMessage defaultMessage="Без согласия продолжить нельзя" />}
    >
      <FormattedMessage defaultMessage="Я принимаю условия использования" />
    </Switch>
  );
};

export default ExampleSwitchValidation;
