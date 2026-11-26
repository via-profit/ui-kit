import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleButtonGroupBasic from '~/examples/button-group/ExampleButtonGroupBasic';
import ExampleButtonGroupSelect from '~/examples/button-group/ExampleButtonGroupSelect';
import ExampleButtonGroupMultiple from '~/examples/button-group/ExampleButtonGroupMultiple';
import ExampleButtonGroupOrientation from '~/examples/button-group/ExampleButtonGroupOrientation';

/**
 * The page of the component: the documentation with the live examples
 */
const ButtonGroupOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleButtonGroupBasic,
      ExampleButtonGroupSelect,
      ExampleButtonGroupMultiple,
      ExampleButtonGroupOrientation,
    }}
  />
);

export default ButtonGroupOverview;
