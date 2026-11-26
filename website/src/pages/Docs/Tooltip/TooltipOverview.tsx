import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleTooltipBasic from '~/examples/tooltip/ExampleTooltipBasic';
import ExampleTooltipPlacement from '~/examples/tooltip/ExampleTooltipPlacement';
import ExampleTooltipDescribe from '~/examples/tooltip/ExampleTooltipDescribe';
import ExampleTooltipOverrides from '~/examples/tooltip/ExampleTooltipOverrides';

/**
 * The page of the component: the documentation with the live examples
 */
const TooltipOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleTooltipBasic,
      ExampleTooltipPlacement,
      ExampleTooltipDescribe,
      ExampleTooltipOverrides,
    }}
  />
);

export default TooltipOverview;
