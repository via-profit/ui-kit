import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleTextAreaOverview from '~/examples/text-area/ExampleTextAreaOverview';
import ExampleTextAreaValidation from '~/examples/text-area/ExampleTextAreaValidation';
import ExampleTextAreaStates from '~/examples/text-area/ExampleTextAreaStates';
import ExampleTextAreaOverrides from '~/examples/text-area/ExampleTextAreaOverrides';

/**
 * The page of the component: the documentation with the live examples
 */
const TextArea: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleTextAreaOverview,
      ExampleTextAreaValidation,
      ExampleTextAreaStates,
      ExampleTextAreaOverrides,
    }}
  />
);

export default TextArea;
