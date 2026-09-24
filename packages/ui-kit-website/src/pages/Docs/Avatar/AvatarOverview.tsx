import React from 'react';
import RenderMarkdown from '~/components/RenderMarkdown';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import content from '@via-profit/ui-kit/docs/avatar/README.md';
import ExampleAvatarOverview from '~/examples/avatar/ExampleAvatarOverview';
import ExampleAvatarOnline from '~/examples/avatar/ExampleAvatarOnline';
import ExampleAvatarVariants from '~/examples/avatar/ExampleAvatarVariants';
import ExampleAvatarColors from '~/examples/avatar/ExampleAvatarColors';
import ExampleAvatarIcons from '~/examples/avatar/ExampleAvatarIcons';
import ExampleAvatarOverrides from '~/examples/avatar/ExampleAvatarOverrides';

const AvatarOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleAvatarOverview,
          ExampleAvatarOnline,
          ExampleAvatarVariants,
          ExampleAvatarColors,
          ExampleAvatarIcons,
          ExampleAvatarOverrides,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default AvatarOverview;
