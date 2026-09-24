import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/swiper/README.md';
import ExampleSwiperBasic from '~/examples/swiper/ExampleSwiperBasic';
import ExampleSwiperInfinite from '~/examples/swiper/ExampleSwiperInfinite';
import ExampleSwiperChangeSlides from '~/examples/swiper/ExampleSwiperChangeSlides';
import ExampleSwiperApi from '~/examples/swiper/ExampleSwiperApi';
import ExampleSwiperSlidesPerView from '~/examples/swiper/ExampleSwiperSlidesPerView';

const SwiperOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleSwiperBasic,
          ExampleSwiperInfinite,
          ExampleSwiperChangeSlides,
          ExampleSwiperApi,
          ExampleSwiperSlidesPerView,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default SwiperOverview;
