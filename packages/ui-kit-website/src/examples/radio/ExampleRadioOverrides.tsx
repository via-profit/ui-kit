import React from 'react';
import styled from '@emotion/styled';
import Radio from '@via-profit/ui-kit/src/Radio';
import RadioGroup from '@via-profit/ui-kit/src/RadioGroup';
import RadioBox from '@via-profit/ui-kit/src/Radio/RadioBox';
import RadioContainer from '@via-profit/ui-kit/src/Radio/RadioContainer';
import { FormattedMessage } from 'react-intl';

// Defined once at module level, not during the render.
// The whole option is a card, the selected card is highlighted
const Container = styled(RadioContainer)`
  padding: 0.75em 1em;
  border-radius: 0.6em;
  border: 1px solid ${({ theme }) => theme.color.textPrimary.alpha(0.15).toString()};

  &:has(input:checked) {
    border-color: ${({ theme }) => theme.color.accentPrimary.toString()};
    background-color: ${({ theme }) => theme.color.accentPrimary.alpha(0.08).toString()};
  }
`;

const Box = styled(RadioBox)`
  font-size: 1.2em;
`;

const overrides = { Container, Box };

const ExampleRadioOverrides: React.FC = () => (
  <RadioGroup
    orientation="horizontal"
    defaultValue="card"
    label={<FormattedMessage defaultMessage="Оплата" />}
  >
    <Radio value="card" overrides={overrides}>
      <FormattedMessage defaultMessage="Картой онлайн" />
    </Radio>
    <Radio value="cash" overrides={overrides}>
      <FormattedMessage defaultMessage="При получении" />
    </Radio>
  </RadioGroup>
);

export default ExampleRadioOverrides;
