import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleSliderBasic from '~/examples/slider/ExampleSliderBasic';
import ExampleSliderRange from '~/examples/slider/ExampleSliderRange';
import ExampleSliderMarks from '~/examples/slider/ExampleSliderMarks';
import ExampleSliderVertical from '~/examples/slider/ExampleSliderVertical';
import ExampleSliderOverrides from '~/examples/slider/ExampleSliderOverrides';

/**
 * The page of the component: the documentation with the live examples
 */
const SliderOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleSliderBasic,
      ExampleSliderRange,
      ExampleSliderMarks,
      ExampleSliderVertical,
      ExampleSliderOverrides,
    }}
  />
);

export default SliderOverview;
