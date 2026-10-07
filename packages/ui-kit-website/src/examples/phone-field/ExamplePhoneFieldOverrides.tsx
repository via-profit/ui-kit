import React from 'react';
import styled from '@emotion/styled';
import PhoneField, { PhonePayload } from '@via-profit/ui-kit/src/PhoneField';
import templates from '@via-profit/ui-kit/src/PhoneField/templates';
import TextFieldInputWrapper from '@via-profit/ui-kit/src/TextField/TextFieldInputWrapper';
import TextFieldLabel from '@via-profit/ui-kit/src/TextField/TextFieldLabel';
import { FormattedMessage } from 'react-intl';

// The rounded field, as the buttons of the landing page
const InputWrapper = styled(TextFieldInputWrapper)`
  border-radius: 2em;
`;

const Label = styled(TextFieldLabel)`
  padding-left: 1.2em;
`;

// Created once, outside of the component
const overrides = { InputWrapper, Label };

const ExamplePhoneFieldOverrides: React.FC = () => {
  const [payload, setPayload] = React.useState<PhonePayload | null>(null);

  return (
    <PhoneField
      label={<FormattedMessage defaultMessage="Телефон для связи" />}
      templates={templates}
      value={payload?.value ?? ''}
      overrides={overrides}
      onChange={(_event, newPayload) => setPayload(newPayload)}
    />
  );
};

export default ExamplePhoneFieldOverrides;
