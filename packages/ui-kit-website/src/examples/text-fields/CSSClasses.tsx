import React from 'react';
import styled from '@emotion/styled';
import TextField from '@via-profit/ui-kit/src/TextField';

const StyledTextField = styled(TextField)`
  & .text-field-input {
    color: green;
  }
  & .text-field-label {
    font-weight: 800;
    color: green;
  }
  & .text-field-input-wrapper {
    background-color: transparent;
  }
`;

const CSSClasses: React.FC = () => (
  <StyledTextField label="Имя:" placeholder="Севастьян" defaultValue="Севастьян" />
);

export default CSSClasses;
