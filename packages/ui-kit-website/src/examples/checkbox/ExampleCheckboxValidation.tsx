import React from 'react';
import Checkbox from '@via-profit/ui-kit/src/Checkbox';
import { FormattedMessage } from 'react-intl';

const ExampleCheckboxValidation: React.FC = () => {
  const [accepted, setAccepted] = React.useState(false);

  return (
    <Checkbox
      requiredAsterisk
      checked={accepted}
      onChange={event => setAccepted(event.currentTarget.checked)}
      error={!accepted}
      errorText={<FormattedMessage defaultMessage="Без согласия продолжить нельзя" />}
    >
      <FormattedMessage defaultMessage="Я принимаю условия использования" />
    </Checkbox>
  );
};

export default ExampleCheckboxValidation;
