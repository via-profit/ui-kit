import React from 'react';
import styled from '@emotion/styled';
import Button from '@via-profit/ui-kit/src/Button';
import { toast } from '@via-profit/ui-kit/src/Toast';
import { FormattedMessage, useIntl } from 'react-intl';

const List = styled.ul`
  margin: 0 0 1em;
  padding-left: 1.2em;
`;

const ExampleToastActions: React.FC = () => {
  const intl = useIntl();
  const [services, setServices] = React.useState(['Грузчики', 'Упаковка', 'Страховка груза']);

  const remove = (service: string) => {
    const index = services.indexOf(service);
    setServices(current => current.filter(item => item !== service));

    toast(intl.formatMessage({ defaultMessage: 'Услуга «{service}» удалена' }, { service }), {
      autoClose: 6000,
      position: 'bottom-right',
      actions: [
        {
          label: intl.formatMessage({ defaultMessage: 'Отменить' }),
          onClick: () =>
            setServices(current => [...current.slice(0, index), service, ...current.slice(index)]),
        },
      ],
    });
  };

  return (
    <>
      <List>
        {services.map(service => (
          <li key={service}>
            {service}{' '}
            <Button variant="plain" onClick={() => remove(service)}>
              <FormattedMessage defaultMessage="Удалить" />
            </Button>
          </li>
        ))}
      </List>
      {services.length === 0 && <FormattedMessage defaultMessage="Все услуги удалены" />}
    </>
  );
};

export default ExampleToastActions;
