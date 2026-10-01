import React from 'react';
import styled from '@emotion/styled';
import Radio from '@via-profit/ui-kit/src/Radio';
import RadioGroup from '@via-profit/ui-kit/src/RadioGroup';
import { FormattedMessage, useIntl } from 'react-intl';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const Option = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.15em;
`;

const Hint = styled.span`
  font-size: 0.85em;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const ExampleRadioControlled: React.FC = () => {
  const intl = useIntl();
  const [plan, setPlan] = React.useState<string | null>('team');
  const plans = [
    {
      value: 'start',
      title: intl.formatMessage({ defaultMessage: 'Старт' }),
      hint: intl.formatMessage({ defaultMessage: '1 пользователь, 5 ГБ — бесплатно' }),
    },
    {
      value: 'team',
      title: intl.formatMessage({ defaultMessage: 'Команда' }),
      hint: intl.formatMessage({ defaultMessage: 'до 10 пользователей, 100 ГБ — 990 ₽ в месяц' }),
    },
    {
      value: 'company',
      title: intl.formatMessage({ defaultMessage: 'Компания' }),
      hint: intl.formatMessage({ defaultMessage: 'без ограничений — 4 900 ₽ в месяц' }),
    },
  ];

  return (
    <Column>
      <RadioGroup
        value={plan}
        onChange={setPlan}
        color="secondary"
        label={<FormattedMessage defaultMessage="Тариф" />}
      >
        {plans.map(item => (
          <Radio key={item.value} value={item.value}>
            <Option>
              {item.title}
              <Hint>{item.hint}</Hint>
            </Option>
          </Radio>
        ))}
      </RadioGroup>
      <span>
        <FormattedMessage
          defaultMessage="Выбран тариф: {plan}"
          values={{ plan: plans.find(item => item.value === plan)?.title ?? '—' }}
        />
      </span>
    </Column>
  );
};

export default ExampleRadioControlled;
