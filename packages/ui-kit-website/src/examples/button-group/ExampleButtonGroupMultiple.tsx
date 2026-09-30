import React from 'react';
import styled from '@emotion/styled';
import ButtonGroup from '@via-profit/ui-kit/src/ButtonGroup';
import Button from '@via-profit/ui-kit/src/Button';
import { FormattedMessage, useIntl } from 'react-intl';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1em;
`;

const Preview = styled.span<{ $styles: readonly string[] }>`
  font-size: 1.2em;
  font-weight: ${({ $styles }) => ($styles.includes('bold') ? 700 : 400)};
  font-style: ${({ $styles }) => ($styles.includes('italic') ? 'italic' : 'normal')};
  text-decoration: ${({ $styles }) => ($styles.includes('underline') ? 'underline' : 'none')};
`;

const ExampleButtonGroupMultiple: React.FC = () => {
  const intl = useIntl();
  const [styles, setStyles] = React.useState<string[]>(['bold']);

  return (
    <Column>
      <ButtonGroup
        multiple
        aria-label={intl.formatMessage({ defaultMessage: 'Начертание' })}
        value={styles}
        onChange={setStyles}
      >
        <Button iconOnly value="bold" aria-label={intl.formatMessage({ defaultMessage: 'Жирный' })}>
          <b>Ж</b>
        </Button>
        <Button
          iconOnly
          value="italic"
          aria-label={intl.formatMessage({ defaultMessage: 'Курсив' })}
        >
          <i>К</i>
        </Button>
        <Button
          iconOnly
          value="underline"
          aria-label={intl.formatMessage({ defaultMessage: 'Подчёркнутый' })}
        >
          <u>Ч</u>
        </Button>
      </ButtonGroup>
      <Preview $styles={styles}>
        <FormattedMessage defaultMessage="Пример текста" />
      </Preview>
    </Column>
  );
};

export default ExampleButtonGroupMultiple;
