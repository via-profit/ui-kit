import React from 'react';
import TextArea from '@via-profit/ui-kit/src/TextArea';
import { FormattedMessage } from 'react-intl';

const MAX_LENGTH = 100;

const ExampleTextAreaValidation: React.FC = () => {
  const [value, setValue] = React.useState(
    'Короткое описание товара. Попробуйте дописать текст так, чтобы он стал длиннее ста символов.',
  );
  const isTooLong = value.length > MAX_LENGTH;

  return (
    <TextArea
      label={
        <FormattedMessage
          defaultMessage="Описание ({length} из {max})"
          values={{ length: value.length, max: MAX_LENGTH }}
        />
      }
      requiredAsterisk
      rows={3}
      fullWidth
      value={value}
      error={isTooLong}
      errorText={
        <FormattedMessage
          defaultMessage="Сократите описание на {count} симв."
          values={{ count: value.length - MAX_LENGTH }}
        />
      }
      onChange={event => setValue(event.currentTarget.value)}
    />
  );
};

export default ExampleTextAreaValidation;
