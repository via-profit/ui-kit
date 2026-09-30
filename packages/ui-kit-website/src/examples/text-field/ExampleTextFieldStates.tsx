import React from 'react';
import styled from '@emotion/styled';
import TextField from '@via-profit/ui-kit/src/TextField';
import { FormattedMessage } from 'react-intl';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16em, 1fr));
  gap: 1em;
`;

const ExampleTextFieldStates: React.FC = () => (
  <>
    <Grid>
      <TextField
        label={<FormattedMessage defaultMessage="Недоступно" />}
        defaultValue="disabled"
        disabled
      />
      <TextField
        label={<FormattedMessage defaultMessage="Только чтение" />}
        defaultValue="readOnly"
        readOnly
      />
    </Grid>
    <p />
    <TextField
      label={<FormattedMessage defaultMessage="На всю ширину" />}
      defaultValue="fullWidth"
      fullWidth
    />
  </>
);

export default ExampleTextFieldStates;
