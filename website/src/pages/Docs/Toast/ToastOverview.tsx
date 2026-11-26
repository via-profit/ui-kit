import React from 'react';
import { ToastContainer } from '@via-profit/ui-kit/Toast';
import { useIntl } from 'react-intl';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';
import ExampleToastBasic from '~/examples/toast/ExampleToastBasic';
import ExampleToastLoading from '~/examples/toast/ExampleToastLoading';
import ExampleToastActions from '~/examples/toast/ExampleToastActions';
import ExampleToastRender from '~/examples/toast/ExampleToastRender';
import ExampleToastOverrides from '~/examples/toast/ExampleToastOverrides';

/**
 * The page of the component: the documentation with the live examples
 */
const ToastOverview: React.FC<DocPageProps> = props => {
  const intl = useIntl();

  return (
    <>
      <DocPage
        {...props}
        overrides={{
          ExampleToastBasic,
          ExampleToastLoading,
          ExampleToastActions,
          ExampleToastRender,
          ExampleToastOverrides,
        }}
      />
      {/* One container for the examples of the page */}
      <ToastContainer
        closeButtonLabel={intl.formatMessage({ defaultMessage: 'Закрыть' })}
        label={intl.formatMessage({ defaultMessage: 'Уведомления' })}
      />
    </>
  );
};

export default ToastOverview;
