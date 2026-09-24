import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import reducer from '~/redux/reducer';
import reduxDefaultState from '~/redux/defaultState';
import { writeUiCookies } from '~/utils/uiCookies';

export interface ReduxProviderProps {
  readonly children: React.ReactNode | readonly React.ReactNode[];
}

const ReduxProvider: React.FC<ReduxProviderProps> = props => {
  const { children } = props;
  // Lazy initializer, otherwise a new store is created (and dropped) on every render
  const [store] = React.useState(() => configureStore({ reducer }));

  // Persist UI settings, so they are restored after the page reload
  React.useEffect(() => {
    let prevUi = store.getState().ui;

    return store.subscribe(() => {
      const { ui } = store.getState();
      if (ui !== prevUi) {
        prevUi = ui;
        writeUiCookies(ui, reduxDefaultState.getDefaultState().ui);
      }
    });
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
