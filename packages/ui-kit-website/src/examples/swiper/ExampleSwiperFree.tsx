import React from 'react';
import styled from '@emotion/styled';
import Swiper, { SwiperSlide } from '@via-profit/ui-kit/src/Swiper';
import { useIntl } from 'react-intl';

const Slide = styled(SwiperSlide)`
  padding: 0.4em;
`;

const Category = styled.div`
  width: 100%;
  padding: 1.5em 0.5em;
  border-radius: 0.5em;
  text-align: center;
  font-weight: 600;
  background-color: ${({ theme }) => theme.color.textPrimary.alpha(0.06).toString()};
`;

const ExampleSwiperFree: React.FC = () => {
  const intl = useIntl();
  const categories = [
    intl.formatMessage({ defaultMessage: 'Кофе' }),
    intl.formatMessage({ defaultMessage: 'Чай' }),
    intl.formatMessage({ defaultMessage: 'Сладости' }),
    intl.formatMessage({ defaultMessage: 'Посуда' }),
    intl.formatMessage({ defaultMessage: 'Кофемашины' }),
    intl.formatMessage({ defaultMessage: 'Подарки' }),
    intl.formatMessage({ defaultMessage: 'Аксессуары' }),
    intl.formatMessage({ defaultMessage: 'Распродажа' }),
  ];

  return (
    <Swiper
      snap={false}
      slidesPerView={4}
      aria-label={intl.formatMessage({ defaultMessage: 'Категории' })}
    >
      {categories.map(category => (
        <Slide key={category}>
          <Category>{category}</Category>
        </Slide>
      ))}
    </Swiper>
  );
};

export default ExampleSwiperFree;
