import React from 'react';
import styled from '@emotion/styled';
import Swiper, { SwiperSlide } from '@via-profit/ui-kit/src/Swiper';
import { useIntl } from 'react-intl';

const Slide = styled(SwiperSlide)`
  padding: 0.4em;
`;

const Logo = styled.div`
  width: 100%;
  padding: 1em 0.5em;
  border-radius: 0.5em;
  text-align: center;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
  background-color: ${({ theme }) => theme.color.textPrimary.alpha(0.06).toString()};
`;

const clients = ['Кофемания', 'Зерно', 'Арабика', 'Турка', 'Бариста', 'Обжарка', 'Эспрессо'];

const ExampleSwiperTicker: React.FC = () => {
  const intl = useIntl();

  return (
    <Swiper
      autoScroll={40}
      slidesPerView={4}
      aria-label={intl.formatMessage({ defaultMessage: 'Наши клиенты' })}
    >
      {clients.map(client => (
        <Slide key={client}>
          <Logo>{client}</Logo>
        </Slide>
      ))}
    </Swiper>
  );
};

export default ExampleSwiperTicker;
