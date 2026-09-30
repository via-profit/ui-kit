import React from 'react';
import styled from '@emotion/styled';
import TextField from '@via-profit/ui-kit/src/TextField';
import TextFieldInputWrapper from '@via-profit/ui-kit/src/TextField/TextFieldInputWrapper';
import { FormattedMessage, useIntl } from 'react-intl';

// Defined once at module level: a component created during the render is remounted
// on every render, and the input loses the focus while typing
const InputWrapper = styled(TextFieldInputWrapper)`
  border-radius: 2em;
  border-width: 2px;
`;

const overrides = { InputWrapper };

const ExampleTextFieldOverrides: React.FC = () => {
  const intl = useIntl();

  return (
    <TextField
      label={<FormattedMessage defaultMessage="Имя" />}
      placeholder={intl.formatMessage({ defaultMessage: 'Иван Петров' })}
      overrides={overrides}
    />
  );
};

export default ExampleTextFieldOverrides;
