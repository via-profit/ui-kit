import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import Spinner from '@via-profit/ui-kit/src/LoadingIndicator';
import { FormattedMessage } from 'react-intl';

const ExampleLoadingIndicatorButton: React.FC = () => {
  const [isSaving, setIsSaving] = React.useState(false);

  const save = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  return (
    <Button
      color="primary"
      disabled={isSaving}
      startIcon={isSaving ? <Spinner size="1.2em" fill={false} /> : undefined}
      onClick={save}
    >
      {isSaving ? (
        <FormattedMessage defaultMessage="Сохранение…" />
      ) : (
        <FormattedMessage defaultMessage="Сохранить" />
      )}
    </Button>
  );
};

export default ExampleLoadingIndicatorButton;
