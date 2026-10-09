import React from 'react';
import styled from '@emotion/styled';
import Swiper, { SwiperSlide } from '@via-profit/ui-kit/src/Swiper';
import { useIntl } from 'react-intl';

const StyledSwiper = styled(Swiper)`
  height: 12em;
`;

const Slide = styled(SwiperSlide)`
  flex-direction: column;
  gap: 0.25em;
  padding: 1em;
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  background-color: ${({ theme }) => theme.color.surface.darken(20).toString()};
  border-bottom: 1px solid ${({ theme }) => theme.color.surface.toString()};

  & strong {
    font-size: 1.2em;
  }
`;

const ExampleSwiperVertical: React.FC = () => {
  const intl = useIntl();
  const news = [
    {
      title: intl.formatMessage({ defaultMessage: 'Открыли пункт выдачи на Ленина, 12' }),
      date: intl.formatMessage({ defaultMessage: '2 октября' }),
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Доставка по выходным' }),
      date: intl.formatMessage({ defaultMessage: '28 сентября' }),
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Новый сорт кофе из Эфиопии' }),
      date: intl.formatMessage({ defaultMessage: '21 сентября' }),
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Оплата при получении' }),
      date: intl.formatMessage({ defaultMessage: '14 сентября' }),
    },
  ];

  return (
    <StyledSwiper
      direction="vertical"
      slidesPerView={2}
      infinite
      autoplay
      aria-label={intl.formatMessage({ defaultMessage: 'Новости' })}
    >
      {news.map(item => (
        <Slide key={item.title}>
          <strong>{item.title}</strong>
          <span>{item.date}</span>
        </Slide>
      ))}
    </StyledSwiper>
  );
};

export default ExampleSwiperVertical;
