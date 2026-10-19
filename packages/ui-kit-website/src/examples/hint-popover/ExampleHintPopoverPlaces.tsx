import React from 'react';
import styled from '@emotion/styled';
import HintPopover from '@via-profit/ui-kit/src/HintPopover';
import TextField from '@via-profit/ui-kit/src/TextField';
import Stack from '@via-profit/ui-kit/src/Stack';
import { FormattedMessage, useIntl } from 'react-intl';

/**
 * Like the colored header of a dialog
 */
const Header = styled.div`
  padding: 0.6em 1em;
  font-weight: 700;
  border-radius: ${({ theme }) => theme.shape.radiusFactor}em;
  background-color: ${({ theme }) => theme.color.accentPrimary.toString()};
  color: ${({ theme }) => theme.color.accentPrimaryContrast.toString()};
`;

const ExampleHintPopoverPlaces: React.FC = () => {
  const intl = useIntl();

  return (
    <Stack gap="md" style={{ maxWidth: '24em' }}>
      <TextField
        fullWidth
        label={
          <>
            <FormattedMessage defaultMessage="Срок вывоза, дней" />
            <HintPopover label={intl.formatMessage({ defaultMessage: 'Что такое срок вывоза' })}>
              <FormattedMessage defaultMessage="Сколько дней после заявки у компании есть на вывоз по договору." />
            </HintPopover>
          </>
        }
      />
      <Header>
        <FormattedMessage defaultMessage="Зарплатный лист за октябрь" />
        <HintPopover label={intl.formatMessage({ defaultMessage: 'Как устроен зарплатный лист' })}>
          <FormattedMessage defaultMessage="Начисления за месяц минус штрафы и выплаты — то, что осталось выдать." />
        </HintPopover>
      </Header>
    </Stack>
  );
};

export default ExampleHintPopoverPlaces;
