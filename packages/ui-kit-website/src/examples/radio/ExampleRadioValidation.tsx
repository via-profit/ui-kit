import React from 'react';
import styled from '@emotion/styled';
import Radio from '@via-profit/ui-kit/src/Radio';
import RadioGroup from '@via-profit/ui-kit/src/RadioGroup';
import Button from '@via-profit/ui-kit/src/Button';
import { FormattedMessage } from 'react-intl';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1em;
`;

const ExampleRadioValidation: React.FC = () => {
  const [answer, setAnswer] = React.useState<string | null>(null);
  const [submitted, setSubmitted] = React.useState(false);
  const hasError = submitted && answer === null;

  return (
    <Form
      noValidate
      onSubmit={event => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <RadioGroup
        value={answer}
        onChange={setAnswer}
        required
        requiredAsterisk
        error={hasError}
        errorText={<FormattedMessage defaultMessage="Выберите вариант ответа" />}
        label={<FormattedMessage defaultMessage="Как вы о нас узнали?" />}
      >
        <Radio value="search">
          <FormattedMessage defaultMessage="Из поиска" />
        </Radio>
        <Radio value="friends">
          <FormattedMessage defaultMessage="От друзей" />
        </Radio>
        <Radio value="ads">
          <FormattedMessage defaultMessage="Из рекламы" />
        </Radio>
      </RadioGroup>
      <Button type="submit" color="primary">
        <FormattedMessage defaultMessage="Отправить" />
      </Button>
      {submitted && answer && <FormattedMessage defaultMessage="Спасибо за ответ!" />}
    </Form>
  );
};

export default ExampleRadioValidation;
