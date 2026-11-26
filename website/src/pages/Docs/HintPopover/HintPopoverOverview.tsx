import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleHintPopoverBasic from '~/examples/hint-popover/ExampleHintPopoverBasic';
import ExampleHintPopoverPlaces from '~/examples/hint-popover/ExampleHintPopoverPlaces';
import ExampleHintPopoverOverrides from '~/examples/hint-popover/ExampleHintPopoverOverrides';

/**
 * The page of the component: the documentation with the live examples
 */
const HintPopoverOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleHintPopoverBasic,
      ExampleHintPopoverPlaces,
      ExampleHintPopoverOverrides,
    }}
  />
);

export default HintPopoverOverview;
