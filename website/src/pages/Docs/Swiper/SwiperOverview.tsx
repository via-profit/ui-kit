import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleSwiperBasic from '~/examples/swiper/ExampleSwiperBasic';
import ExampleSwiperInfinite from '~/examples/swiper/ExampleSwiperInfinite';
import ExampleSwiperApi from '~/examples/swiper/ExampleSwiperApi';
import ExampleSwiperSlidesPerView from '~/examples/swiper/ExampleSwiperSlidesPerView';
import ExampleSwiperFree from '~/examples/swiper/ExampleSwiperFree';
import ExampleSwiperCentered from '~/examples/swiper/ExampleSwiperCentered';
import ExampleSwiperVertical from '~/examples/swiper/ExampleSwiperVertical';
import ExampleSwiperFade from '~/examples/swiper/ExampleSwiperFade';
import ExampleSwiperTicker from '~/examples/swiper/ExampleSwiperTicker';

/**
 * The page of the component: the documentation with the live examples
 */
const SwiperOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleSwiperBasic,
      ExampleSwiperInfinite,
      ExampleSwiperApi,
      ExampleSwiperSlidesPerView,
      ExampleSwiperFree,
      ExampleSwiperCentered,
      ExampleSwiperVertical,
      ExampleSwiperFade,
      ExampleSwiperTicker,
    }}
  />
);

export default SwiperOverview;
