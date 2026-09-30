import React from 'react';
import { Ul, Ol, Li, Blockquote, Paragraph } from '@via-profit/ui-kit/src/Typography';
import { FormattedMessage } from 'react-intl';

const ExampleTypographyLists: React.FC = () => (
  <>
    <Ul>
      <Li>
        <FormattedMessage defaultMessage="Бесплатная доставка от 3 000 ₽" />
      </Li>
      <Li>
        <FormattedMessage defaultMessage="Возврат в течение 14 дней" />
      </Li>
      <Li>
        <FormattedMessage defaultMessage="Оплата картой или при получении" />
      </Li>
    </Ul>
    <Ol>
      <Li>
        <FormattedMessage defaultMessage="Добавьте товары в корзину" />
      </Li>
      <Li>
        <FormattedMessage defaultMessage="Укажите адрес доставки" />
      </Li>
      <Li>
        <FormattedMessage defaultMessage="Оплатите заказ" />
      </Li>
    </Ol>
    <Blockquote>
      <Paragraph>
        <FormattedMessage defaultMessage="Заказ пришёл на следующий день, всё аккуратно упаковано. Буду заказывать ещё." />
      </Paragraph>
      <Paragraph>
        <FormattedMessage defaultMessage="— Анна, Москва" />
      </Paragraph>
    </Blockquote>
  </>
);

export default ExampleTypographyLists;
