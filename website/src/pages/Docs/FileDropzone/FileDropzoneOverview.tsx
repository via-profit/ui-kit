import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleFileDropzoneBasic from '~/examples/file-dropzone/ExampleFileDropzoneBasic';
import ExampleFileDropzoneReject from '~/examples/file-dropzone/ExampleFileDropzoneReject';

/**
 * The page of the component: the documentation with the live examples
 */
const FileDropzoneOverview: React.FC<DocPageProps> = props => (
  <DocPage {...props} overrides={{ ExampleFileDropzoneBasic, ExampleFileDropzoneReject }} />
);

export default FileDropzoneOverview;
