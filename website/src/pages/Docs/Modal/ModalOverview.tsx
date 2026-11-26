import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleModalOverview from '~/examples/modal/ExampleModalOverview';
import ExampleModalForm from '~/examples/modal/ExampleModalForm';
import ExampleConfirmBox from '~/examples/modal/ExampleConfirmBox';
import ExampleMessageBox from '~/examples/modal/ExampleMessageBox';
import ExampleModalDrawerOverview from '~/examples/modal/ExampleModalDrawerOverview';
import ExampleModalDrawerSwipe from '~/examples/modal/ExampleModalDrawerSwipe';
import ExampleModalOverrides from '~/examples/modal/ExampleModalOverrides';

/**
 * The page of the component: the documentation with the live examples
 */
const ModalOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleModalOverview,
      ExampleModalForm,
      ExampleConfirmBox,
      ExampleMessageBox,
      ExampleModalDrawerOverview,
      ExampleModalDrawerSwipe,
      ExampleModalOverrides,
    }}
  />
);

export default ModalOverview;
