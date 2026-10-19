import React from 'react';
import styled from '@emotion/styled';
import InfoNote from '@via-profit/ui-kit/src/InfoNote';
import InfoNoteContainer from '@via-profit/ui-kit/src/InfoNote/InfoNoteContainer';
import { FormattedMessage } from 'react-intl';

// Defined once at module level, not during the render
const Container = styled(InfoNoteContainer)`
  border-left: none;
  padding: 0.8em 1em;
`;

const overrides = { Container };

const ExampleInfoNoteOverrides: React.FC = () => (
  <InfoNote overrides={overrides} style={{ maxWidth: '32em' }}>
    <FormattedMessage defaultMessage="Оплата поступит в течение дня." />
  </InfoNote>
);

export default ExampleInfoNoteOverrides;
