import React from 'react';
import { ToastContainer } from '@via-profit/ui-kit/src/Toast';
import { useIntl } from 'react-intl';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleToastBasic from '~/examples/toast/ExampleToastBasic';
import ExampleToastLoading from '~/examples/toast/ExampleToastLoading';
import ExampleToastActions from '~/examples/toast/ExampleToastActions';
import ExampleToastRender from '~/examples/toast/ExampleToastRender';
import ExampleToastOverrides from '~/examples/toast/ExampleToastOverrides';
import content from '@via-profit/ui-kit/docs/toast/README.md';

const ToastOverview: React.FC = () => {
  const intl = useIntl();

  return (
    <>
      <DocsArticle>
        <RenderMarkdown
          overrides={{
            ExampleToastBasic,
            ExampleToastLoading,
            ExampleToastActions,
            ExampleToastRender,
            ExampleToastOverrides,
          }}
        >
          {content}
        </RenderMarkdown>
      </DocsArticle>
      <TableOfContent content={content} />
      {/* One container for the examples of the page */}
      <ToastContainer
        closeButtonLabel={intl.formatMessage({ defaultMessage: 'Закрыть' })}
        label={intl.formatMessage({ defaultMessage: 'Уведомления' })}
      />
    </>
  );
};

export default ToastOverview;
