import React from 'react';
import Stack from '@via-profit/ui-kit/src/Stack';
import TextField from '@via-profit/ui-kit/src/TextField';
import Checkbox from '@via-profit/ui-kit/src/Checkbox';
import Button from '@via-profit/ui-kit/src/Button';
import { FormattedMessage } from 'react-intl';

const ExampleStackBasic: React.FC = () => (
  <Stack gap="md" style={{ maxWidth: '22em' }}>
    <TextField fullWidth label={<FormattedMessage defaultMessage="Email" />} />
    <TextField fullWidth type="password" label={<FormattedMessage defaultMessage="Пароль" />} />
    <Checkbox>
      <FormattedMessage defaultMessage="Запомнить меня" />
    </Checkbox>
    <Button color="primary">
      <FormattedMessage defaultMessage="Войти" />
    </Button>
  </Stack>
);

export default ExampleStackBasic;
