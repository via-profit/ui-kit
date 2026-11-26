import React from 'react';
import Stack from '@via-profit/ui-kit/Stack';
import TextField from '@via-profit/ui-kit/TextField';
import Checkbox from '@via-profit/ui-kit/Checkbox';
import Button from '@via-profit/ui-kit/Button';
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
