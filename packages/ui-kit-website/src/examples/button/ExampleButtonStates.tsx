import React from 'react';
import styled from '@emotion/styled';
import Button from '@via-profit/ui-kit/src/Button';
import Spinner from '@via-profit/ui-kit/src/LoadingIndicator';
import { FormattedMessage } from 'react-intl';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5em;
`;

const ExampleButtonStates: React.FC = () => {
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  return (
    <Row>
      <Button disabled>
        <FormattedMessage defaultMessage="Недоступна" />
      </Button>
      <Button
        color="primary"
        disabled={isSaving}
        startIcon={isSaving ? <Spinner size="1.2em" fill={false} /> : undefined}
        onClick={() => {
          setIsSaving(true);
          setTimeout(() => setIsSaving(false), 2000);
        }}
      >
        {isSaving ? (
          <FormattedMessage defaultMessage="Сохранение…" />
        ) : (
          <FormattedMessage defaultMessage="Сохранить" />
        )}
      </Button>
      <Button
        color="primary"
        variant={isSubscribed ? 'standard' : 'outlined'}
        aria-pressed={isSubscribed}
        onClick={() => setIsSubscribed(value => !value)}
      >
        {isSubscribed ? (
          <FormattedMessage defaultMessage="Вы подписаны" />
        ) : (
          <FormattedMessage defaultMessage="Подписаться" />
        )}
      </Button>
    </Row>
  );
};

export default ExampleButtonStates;
