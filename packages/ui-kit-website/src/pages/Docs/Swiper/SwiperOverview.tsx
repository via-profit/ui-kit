import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/swiper/README.md';
import ExampleSwiperBasic from '~/examples/swiper/ExampleSwiperBasic';
import ExampleSwiperInfinite from '~/examples/swiper/ExampleSwiperInfinite';
import ExampleSwiperApi from '~/examples/swiper/ExampleSwiperApi';
import ExampleSwiperSlidesPerView from '~/examples/swiper/ExampleSwiperSlidesPerView';
import ExampleSwiperFree from '~/examples/swiper/ExampleSwiperFree';
import ExampleSwiperCentered from '~/examples/swiper/ExampleSwiperCentered';
import ExampleSwiperVertical from '~/examples/swiper/ExampleSwiperVertical';
import ExampleSwiperFade from '~/examples/swiper/ExampleSwiperFade';
import ExampleSwiperTicker from '~/examples/swiper/ExampleSwiperTicker';

const SwiperOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
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
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default SwiperOverview;
