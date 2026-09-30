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
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default SwiperOverview;
