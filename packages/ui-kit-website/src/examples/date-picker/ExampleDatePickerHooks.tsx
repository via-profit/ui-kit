import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from '@emotion/styled';
import Paragraph from '@via-profit/ui-kit/src/Typography/Paragraph';
import Strong from '@via-profit/ui-kit/src/Typography/Strong';
import { useDatePickerFormat } from '@via-profit/ui-kit/src/DatePicker';

const Tempalte = styled.span`
  color: ${({ theme }) => theme.color.accentPrimary.toString()};
  padding: 0.1em 0.24em;
  font-size: 0.9em;
  background-color: ${({ theme }) => theme.color.accentPrimary.alpha(0.1).toString()};
  border-radius: ${({ theme }) => theme.shape.radiusFactor}em;
  font-weight: 600;
`;

const ExampleDatePickerHooks: React.FC = () => {
  const { formatInputByTemplate, parseInputByTemplate } = useDatePickerFormat();

  return (
    <>
      <Paragraph>
        <FormattedMessage
          defaultMessage="Текущая дата в шаблоном {template} — {result}"
          values={{
            template: <Tempalte>d.m.Y</Tempalte>,
            result: <Strong>{formatInputByTemplate(new Date(), 'd.m.Y')}</Strong>,
          }}
        />
      </Paragraph>
      <Paragraph>
        <FormattedMessage
          defaultMessage="Текущая дата в шаблоном {template} — {result}"
          values={{
            template: <Tempalte>yyyy/mm/dd</Tempalte>,
            result: <Strong>{formatInputByTemplate(new Date(), 'yyyy/mm/dd')}</Strong>,
          }}
        />
      </Paragraph>
      <Paragraph>
        <FormattedMessage
          defaultMessage="Строка 22.02.2003 распарсенная с шаблоном {template} — {result}"
          values={{
            template: <Tempalte>dd.mm.yyyy</Tempalte>,
            result: (
              <Strong>
                {parseInputByTemplate('22.02.2003', 'dd.mm.yyyy')?.toLocaleString('ru-RU')}
              </Strong>
            ),
          }}
        />
      </Paragraph>
    </>
  );
};

export default ExampleDatePickerHooks;
