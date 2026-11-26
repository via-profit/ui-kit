import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExamplePopperOverview from '~/examples/popper/ExamplePopperOverview';
import ExamplePopperAnchorPos from '~/examples/popper/ExamplePopperAnchorPos';
import ExamplePopperAutoFlip from '~/examples/popper/ExamplePopperAutoFlip';
import ExamplePopperOutsideClick from '~/examples/popper/ExamplePopperOutsideClick';

/**
 * The page of the component: the documentation with the live examples
 */
const PopperOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExamplePopperOverview,
      ExamplePopperAnchorPos,
      ExamplePopperAutoFlip,
      ExamplePopperOutsideClick,
    }}
  />
);

export default PopperOverview;
