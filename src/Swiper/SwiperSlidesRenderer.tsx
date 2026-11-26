import * as React from 'react';
import { SwiperSlideElement } from './Swiper';

export type SwiperSlidesRendererProps = {
  readonly slides: readonly SwiperSlideElement[];
  readonly slidesPerView: number;
  readonly realIndex: number;

  /**
   * The real index of the first slide that is at least partially in the view
   * and the count of such slides. In the free mode (snap=false) the track stops between the slides,
   * then one more slide is partially visible
   */
  readonly firstVisibleIndex?: number;
  readonly visibleCount?: number;
  readonly realSlidesCount: number;
  readonly getSlideRealIndex: (index: number) => number;
  readonly slideLabel: (index: number, total: number) => string;

  /**
   * The index of the slide in the DOM shown by the fade effect, `null` for the slide effect
   */
  readonly activeDomIndex?: number | null;
};

// React 19 supports the boolean `inert`, React 18 passes only the string value to the DOM
const INERT_VALUE = parseInt(React.version, 10) >= 19 ? true : '';

const SwiperSlidesRenderer: React.FC<SwiperSlidesRendererProps> = props => {
  const {
    slides,
    slidesPerView,
    realIndex,
    realSlidesCount,
    getSlideRealIndex,
    slideLabel,
    firstVisibleIndex = realIndex,
    visibleCount = Math.ceil(slidesPerView),
    activeDomIndex = null,
  } = props;

  const visibilityMap = React.useMemo(() => {
    const map = new Map<number, { isVisible: boolean; isNearby: boolean }>();

    if (realSlidesCount <= visibleCount) {
      slides.forEach((_, i) => {
        map.set(i, { isVisible: true, isNearby: false });
      });
    } else {
      const visibleIndices: number[] = [];
      for (let j = 0; j < visibleCount; j++) {
        visibleIndices.push((firstVisibleIndex + j) % realSlidesCount);
      }

      const prevIndex = (firstVisibleIndex - 1 + realSlidesCount) % realSlidesCount;
      const nextIndex = (firstVisibleIndex + visibleCount) % realSlidesCount;

      slides.forEach((_, i) => {
        const slideRealIndex = getSlideRealIndex(i);
        const isVisible = visibleIndices.includes(slideRealIndex);
        const isNearby =
          !isVisible && (slideRealIndex === prevIndex || slideRealIndex === nextIndex);

        map.set(i, { isVisible, isNearby });
      });
    }

    return map;
  }, [slides, visibleCount, firstVisibleIndex, realSlidesCount, getSlideRealIndex]);

  return (
    <>
      {slides.map((slide, i) => {
        const { isVisible, isNearby } = visibilityMap.get(i) || {
          isVisible: false,
          isNearby: false,
        };
        const slideRealIndex = getSlideRealIndex(i);

        const isClone =
          typeof (slide.props as unknown as Record<string, unknown>)['data-clone'] !== 'undefined';

        // The slides out of the view are inert: Tab does not go into them (it would scroll the track)
        // and screen readers skip them. The clones are always hidden from screen readers
        return React.cloneElement(slide, {
          slidesPerView,
          isVisible,
          isNearby,
          role: 'group',
          'aria-roledescription': 'slide',
          'aria-label': slideLabel(slideRealIndex, realSlidesCount),
          'aria-hidden': isClone || !isVisible ? true : undefined,
          inert: isVisible && !isClone ? undefined : INERT_VALUE,
          'data-index': i,
          'data-active': activeDomIndex === null ? undefined : activeDomIndex === i,
          'data-real-index': slideRealIndex,
        } as any);
      })}
    </>
  );
};

export default React.memo(SwiperSlidesRenderer);
