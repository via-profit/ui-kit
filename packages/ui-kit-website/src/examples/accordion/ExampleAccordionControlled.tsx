import React from 'react';
import Accordion from '@via-profit/ui-kit/src/Accordion';
import { FormattedMessage, useIntl } from 'react-intl';

const ExampleAccordionControlled: React.FC = () => {
  const intl = useIntl();
  const [openedStep, setOpenedStep] = React.useState<number | null>(0);
  const steps = [
    {
      title: intl.formatMessage({ defaultMessage: '1. Контактные данные' }),
      content: intl.formatMessage({ defaultMessage: 'Имя, телефон и email получателя.' }),
    },
    {
      title: intl.formatMessage({ defaultMessage: '2. Адрес доставки' }),
      content: intl.formatMessage({ defaultMessage: 'Город, улица, дом и квартира.' }),
    },
    {
      title: intl.formatMessage({ defaultMessage: '3. Способ оплаты' }),
      content: intl.formatMessage({ defaultMessage: 'Картой на сайте или при получении.' }),
    },
  ];

  return (
    <>
      <p>
        <FormattedMessage defaultMessage="Одновременно открыт только один шаг." />
      </p>
      <div>
        {steps.map((step, index) => (
          <Accordion
            key={step.title}
            header={step.title}
            isOpen={openedStep === index}
            onOpen={isOpen => setOpenedStep(isOpen ? index : null)}
          >
            {step.content}
          </Accordion>
        ))}
      </div>
    </>
  );
};

export default ExampleAccordionControlled;
