import React from 'react';
import RenderMarkdown from '~/components/RenderMarkdown';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import content from '@via-profit/ui-kit/docs/avatar/README.md';
import ExampleAvatarOverview from '~/examples/avatar/ExampleAvatarOverview';
import ExampleAvatarOnline from '~/examples/avatar/ExampleAvatarOnline';
import ExampleAvatarVariants from '~/examples/avatar/ExampleAvatarVariants';
import ExampleAvatarColors from '~/examples/avatar/ExampleAvatarColors';
import ExampleAvatarSize from '~/examples/avatar/ExampleAvatarSize';
import ExampleAvatarClickable from '~/examples/avatar/ExampleAvatarClickable';
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
          ExampleAvatarSize,
          ExampleAvatarClickable,
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
