import React from 'react';
import styled from '@emotion/styled';
import TextArea from '@via-profit/ui-kit/src/TextArea';
import { FormattedMessage } from 'react-intl';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16em, 1fr));
  gap: 1em;
`;

const ExampleTextAreaStates: React.FC = () => (
  <Grid>
    <TextArea
      label={<FormattedMessage defaultMessage="Недоступно" />}
      defaultValue="disabled"
      rows={2}
      disabled
    />
    <TextArea
      label={<FormattedMessage defaultMessage="Только чтение" />}
      defaultValue="readOnly"
      rows={2}
      readOnly
    />
  </Grid>
);

export default ExampleTextAreaStates;
