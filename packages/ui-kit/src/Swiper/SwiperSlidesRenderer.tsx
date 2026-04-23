import * as React from 'react';
import { SwiperSlideElement } from './Swiper';

export type SwiperSlidesRendererProps = {
  readonly slides: readonly SwiperSlideElement[];
  readonly slidesPerView: number;
  readonly realIndex: number;
  readonly realSlidesCount: number;
  readonly getSlideRealIndex: (index: number) => number;
};

const SwiperSlidesRenderer: React.FC<SwiperSlidesRendererProps> = props => {
  const { slides, slidesPerView, realIndex, realSlidesCount, getSlideRealIndex } = props;

  // Мемоизируем вычисления видимости
  const visibilityMap = React.useMemo(() => {
    const map = new Map<number, { isVisible: boolean; isNearby: boolean }>();

    if (realSlidesCount <= slidesPerView) {
      slides.forEach((_, i) => {
        map.set(i, { isVisible: true, isNearby: false });
      });
    } else {
      const visibleIndices: number[] = [];
      for (let j = 0; j < slidesPerView; j++) {
        visibleIndices.push((realIndex + j) % realSlidesCount);
      }

      const prevIndex = (realIndex - 1 + realSlidesCount) % realSlidesCount;
      const nextIndex = (realIndex + slidesPerView) % realSlidesCount;

      slides.forEach((_, i) => {
        const slideRealIndex = getSlideRealIndex(i);
        const isVisible = visibleIndices.includes(slideRealIndex);
        const isNearby =
          !isVisible && (slideRealIndex === prevIndex || slideRealIndex === nextIndex);

        map.set(i, { isVisible, isNearby });
      });
    }

    return map;
  }, [slides, slidesPerView, realIndex, realSlidesCount, getSlideRealIndex]);

  return (
    <>
      {slides.map((slide, i) => {
        const { isVisible, isNearby } = visibilityMap.get(i) || {
          isVisible: false,
          isNearby: false,
        };
        const slideRealIndex = getSlideRealIndex(i);

        // Не клонируем заново, если пропсы не изменились
        if (
          slide.props.slidesPerView === slidesPerView &&
          slide.props.isVisible === isVisible &&
          slide.props.isNearby === isNearby
        ) {
          return slide;
        }

        return React.cloneElement(slide, {
          slidesPerView,
          isVisible,
          isNearby,
          'data-index': i,
          'data-real-index': slideRealIndex,
        } as any);
      })}
    </>
  );
};

export default React.memo(SwiperSlidesRenderer);
