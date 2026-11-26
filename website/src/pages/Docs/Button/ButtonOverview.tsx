import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleButtonBasic from '~/examples/button/ExampleButtonBasic';
import ExampleButtonVariants from '~/examples/button/ExampleButtonVariants';
import ExampleButtonColors from '~/examples/button/ExampleButtonColors';
import ExampleButtonOverrides from '~/examples/button/ExampleButtonOverrides';
import ExampleButtonIcons from '~/examples/button/ExampleButtonIcons';
import ExampleButtonStates from '~/examples/button/ExampleButtonStates';

/**
 * The page of the component: the documentation with the live examples
 */
const ButtonOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleButtonBasic,
      ExampleButtonVariants,
      ExampleButtonColors,
      ExampleButtonOverrides,
      ExampleButtonIcons,
      ExampleButtonStates,
    }}
  />
);

export default ButtonOverview;
