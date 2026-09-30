import React from 'react';
import styled from '@emotion/styled';
import Checkbox from '@via-profit/ui-kit/src/Checkbox';
import CheckboxBox from '@via-profit/ui-kit/src/Checkbox/CheckboxBox';
import { FormattedMessage } from 'react-intl';

// Defined once at module level, not during the render
const Box = styled(CheckboxBox)`
  & [data-checkbox-square] {
    border-radius: 50%;
  }
`;

const overrides = { Box };

const ExampleCheckboxOverrides: React.FC = () => (
  <Checkbox defaultChecked color="secondary" overrides={overrides}>
    <FormattedMessage defaultMessage="Круглый чекбокс" />
  </Checkbox>
);

export default ExampleCheckboxOverrides;
