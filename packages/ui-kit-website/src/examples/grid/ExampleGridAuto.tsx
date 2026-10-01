import React from 'react';
import Grid from '@via-profit/ui-kit/src/Grid';
import TextField from '@via-profit/ui-kit/src/TextField';
import { FormattedMessage } from 'react-intl';

const ExampleGridAuto: React.FC = () => (
  <Grid minColumnWidth="14em" gap="lg" rowGap="sm">
    <TextField fullWidth label={<FormattedMessage defaultMessage="Фамилия" />} />
    <TextField fullWidth label={<FormattedMessage defaultMessage="Имя" />} />
    <TextField fullWidth label={<FormattedMessage defaultMessage="Отчество" />} />
    <TextField fullWidth label={<FormattedMessage defaultMessage="Город" />} />
    <TextField fullWidth label={<FormattedMessage defaultMessage="Улица" />} />
    <TextField fullWidth label={<FormattedMessage defaultMessage="Дом" />} />
  </Grid>
);

export default ExampleGridAuto;
