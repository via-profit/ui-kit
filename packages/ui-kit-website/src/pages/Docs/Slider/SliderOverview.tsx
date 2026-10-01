import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleSliderBasic from '~/examples/slider/ExampleSliderBasic';
import ExampleSliderRange from '~/examples/slider/ExampleSliderRange';
import ExampleSliderMarks from '~/examples/slider/ExampleSliderMarks';
import ExampleSliderVertical from '~/examples/slider/ExampleSliderVertical';
import ExampleSliderOverrides from '~/examples/slider/ExampleSliderOverrides';
import content from '@via-profit/ui-kit/docs/slider/README.md';

const SliderOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleSliderBasic,
          ExampleSliderRange,
          ExampleSliderMarks,
          ExampleSliderVertical,
          ExampleSliderOverrides,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default SliderOverview;
