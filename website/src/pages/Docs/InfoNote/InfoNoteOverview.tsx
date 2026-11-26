import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleInfoNoteBasic from '~/examples/info-note/ExampleInfoNoteBasic';
import ExampleInfoNoteVariants from '~/examples/info-note/ExampleInfoNoteVariants';
import ExampleInfoNoteTitle from '~/examples/info-note/ExampleInfoNoteTitle';
import ExampleInfoNoteOverrides from '~/examples/info-note/ExampleInfoNoteOverrides';

/**
 * The page of the component: the documentation with the live examples
 */
const InfoNoteOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleInfoNoteBasic,
      ExampleInfoNoteVariants,
      ExampleInfoNoteTitle,
      ExampleInfoNoteOverrides,
    }}
  />
);

export default InfoNoteOverview;
