import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleTypographyHeadings from '~/examples/typography/ExampleTypographyHeadings';
import ExampleTypographyText from '~/examples/typography/ExampleTypographyText';
import ExampleTypographyLists from '~/examples/typography/ExampleTypographyLists';
import ExampleTypographySection from '~/examples/typography/ExampleTypographySection';

/**
 * The page of the component: the documentation with the live examples
 */
const TypographyOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleTypographyHeadings,
      ExampleTypographyText,
      ExampleTypographyLists,
      ExampleTypographySection,
    }}
  />
);

export default TypographyOverview;
