import React from 'react';
import styled from '@emotion/styled';
import Swiper, { SwiperSlide } from '@via-profit/ui-kit/src/Swiper';
import { useIntl } from 'react-intl';

const Slide = styled(SwiperSlide)`
  flex-direction: column;
  gap: 0.5em;
  height: 12em;
  padding: 1em;
  text-align: center;
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  background-color: ${({ theme }) => theme.color.surface.darken(20).toString()};

  & h3 {
    margin: 0;
    font-size: 1.6em;
  }
`;

const ExampleSwiperBasic: React.FC = () => {
  const intl = useIntl();
  const slides = [
    {
      title: intl.formatMessage({ defaultMessage: 'Шаг 1. Выберите товар' }),
      text: intl.formatMessage({ defaultMessage: 'Добавьте его в корзину' }),
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Шаг 2. Оформите заказ' }),
      text: intl.formatMessage({ defaultMessage: 'Укажите адрес и способ оплаты' }),
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Шаг 3. Получите посылку' }),
      text: intl.formatMessage({ defaultMessage: 'Курьер привезёт её за 1–2 дня' }),
    },
  ];

  return (
    <Swiper aria-label={intl.formatMessage({ defaultMessage: 'Как сделать заказ' })}>
      {slides.map(slide => (
        <Slide key={slide.title}>
          <h3>{slide.title}</h3>
          <span>{slide.text}</span>
        </Slide>
      ))}
    </Swiper>
  );
};

export default ExampleSwiperBasic;
