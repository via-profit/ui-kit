import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleSwitchBasic from '~/examples/switch/ExampleSwitchBasic';
import ExampleSwitchValidation from '~/examples/switch/ExampleSwitchValidation';
import ExampleSwitchColors from '~/examples/switch/ExampleSwitchColors';
import ExampleSwitchOverrides from '~/examples/switch/ExampleSwitchOverrides';
import ExampleSwitchLabelPlacement from '~/examples/switch/ExampleSwitchLabelPlacement';
import ExampleSwitchControlled from '~/examples/switch/ExampleSwitchControlled';

/**
 * The page of the component: the documentation with the live examples
 */
const SwitchOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleSwitchBasic,
      ExampleSwitchValidation,
      ExampleSwitchColors,
      ExampleSwitchOverrides,
      ExampleSwitchControlled,
      ExampleSwitchLabelPlacement,
    }}
  />
);

export default SwitchOverview;
