import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleStepperBasic from '~/examples/stepper/ExampleStepperBasic';
import ExampleStepperAlternative from '~/examples/stepper/ExampleStepperAlternative';
import ExampleStepperVertical from '~/examples/stepper/ExampleStepperVertical';

/**
 * The page of the component: the documentation with the live examples
 */
const StepperOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleStepperBasic,
      ExampleStepperAlternative,
      ExampleStepperVertical,
    }}
  />
);

export default StepperOverview;
