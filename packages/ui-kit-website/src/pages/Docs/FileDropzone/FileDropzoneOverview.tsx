import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleFileDropzoneBasic from '~/examples/file-dropzone/ExampleFileDropzoneBasic';
import ExampleFileDropzoneReject from '~/examples/file-dropzone/ExampleFileDropzoneReject';
import content from '@via-profit/ui-kit/docs/file-dropzone/README.md';

const FileDropzoneOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown overrides={{ ExampleFileDropzoneBasic, ExampleFileDropzoneReject }}>
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default FileDropzoneOverview;
