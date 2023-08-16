import React from 'react';
import { useLocation } from 'react-router-dom';

import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/theming/README.md';
import ExampleThemeProvider from '~/examples/theming/ExampleThemeProvider';
import ExampleMultiThemming from '~/examples/theming/ExampleMultiThemming';

const ThemingOverview: React.FC = () => {
  const { pathname } = useLocation();
  const modifiedContent = React.useMemo(() => {
    const currentSegment = pathname.split('/').reverse()[0];

    return content.replace(/\.\//g, `./${currentSegment}/`);
  }, [pathname]);

  return (
    <Surface>
      <RenderMarkdown overrides={{ ExampleThemeProvider, ExampleMultiThemming }}>
        {modifiedContent}
      </RenderMarkdown>
    </Surface>
  );
};

export default ThemingOverview;
