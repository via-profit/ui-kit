import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleAccordionBasic from '~/examples/accordion/ExampleAccordionBasic';
import ExampleAccordionMultiple from '~/examples/accordion/ExampleAccordionMultiple';
import ExampleAccordionOverrides from '~/examples/accordion/ExampleAccordionOverrides';
import ExampleAccordionControlled from '~/examples/accordion/ExampleAccordionControlled';

/**
 * The page of the component: the documentation with the live examples
 */
const AccordionOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleAccordionBasic,
      ExampleAccordionMultiple,
      ExampleAccordionControlled,
      ExampleAccordionOverrides,
    }}
  />
);

export default AccordionOverview;
