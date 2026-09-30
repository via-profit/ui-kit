import React from 'react';
import { Paragraph, Strong, Em, Del, U } from '@via-profit/ui-kit/src/Typography';
import { FormattedMessage } from 'react-intl';

const ExampleTypographyText: React.FC = () => (
  <>
    <Paragraph>
      <FormattedMessage
        defaultMessage="Заказ оформлен. <strong>Курьер привезёт его завтра</strong> с 10:00 до 14:00 — <em>за час до приезда</em> он позвонит."
        values={{
          strong: chunks => <Strong>{chunks}</Strong>,
          em: chunks => <Em>{chunks}</Em>,
        }}
      />
    </Paragraph>
    <Paragraph>
      <FormattedMessage
        defaultMessage="Стоимость доставки: <del>300 ₽</del> <u>бесплатно</u>."
        values={{
          del: chunks => <Del>{chunks}</Del>,
          u: chunks => <U>{chunks}</U>,
        }}
      />
    </Paragraph>
    <Paragraph noMargin>
      <FormattedMessage defaultMessage="Абзац с noMargin — без нижнего отступа." />
    </Paragraph>
  </>
);

export default ExampleTypographyText;
