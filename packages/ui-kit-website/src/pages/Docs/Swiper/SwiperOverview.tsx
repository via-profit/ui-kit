import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/swiper/README.md';
import ExampleSwiperBasic from '~/examples/swiper/ExampleSwiperBasic';

const SwiperOverview: React.FC = () => (
  <>
    <Surface>
      <RenderMarkdown
        overrides={{ ExampleSwiperBasic }}
      >
        {content}
      </RenderMarkdown>
    </Surface>
    <TableOfContent content={content} />
  </>
);

export default SwiperOverview;
