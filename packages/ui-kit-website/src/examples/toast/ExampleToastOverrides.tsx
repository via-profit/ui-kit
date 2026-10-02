import React from 'react';
import styled from '@emotion/styled';
import Button from '@via-profit/ui-kit/src/Button';
import { toast, ToastContainer } from '@via-profit/ui-kit/src/Toast';
import ToastCard from '@via-profit/ui-kit/src/Toast/ToastCard';
import { FormattedMessage, useIntl } from 'react-intl';

// Defined once at module level, not during the render
const Toast = styled(ToastCard)`
  border: 0;
  border-radius: 2em;
  padding: 0.5em 1.25em;
  background-color: rgba(11, 22, 67, 0.92);
  color: #fff;
  backdrop-filter: blur(4px);
`;

const overrides = { Toast };

const ExampleToastOverrides: React.FC = () => {
  const intl = useIntl();

  return (
    <>
      <Button
        variant="outlined"
        onClick={() =>
          toast.success(intl.formatMessage({ defaultMessage: 'Ссылка скопирована' }), {
            containerId: 'pill',
          })
        }
      >
        <FormattedMessage defaultMessage="Скопировать ссылку" />
      </Button>
      <ToastContainer
        containerId="pill"
        position="bottom-center"
        autoClose={2000}
        closeButton={false}
        hotkey={null}
        overrides={overrides}
      />
    </>
  );
};

export default ExampleToastOverrides;
