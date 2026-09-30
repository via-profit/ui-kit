import React from 'react';
import styled from '@emotion/styled';
import TextArea from '@via-profit/ui-kit/src/TextArea';
import TextAreaInput from '@via-profit/ui-kit/src/TextArea/TextAreaInput';
import { FormattedMessage } from 'react-intl';

// Defined once at module level: a component created during the render is remounted
// on every render, and the textarea loses the focus while typing
const Input = styled(TextAreaInput)`
  resize: vertical;
  min-height: 4em;
`;

const overrides = { Input };

const ExampleTextAreaOverrides: React.FC = () => (
  <TextArea
    label={<FormattedMessage defaultMessage="Потяните за правый нижний угол" />}
    rows={3}
    fullWidth
    overrides={overrides}
  />
);

export default ExampleTextAreaOverrides;
