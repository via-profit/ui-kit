import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { CacheProvider as CSSCacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import readPreloadedState from '~/utils/readPreloadedState';
import ReduxProvider from '~/providers/ReduxProvider';
import ThemeProvider from '~/providers/ThemeProvider';
import routes from '~/routes';
import reduxDefaultState from '~/redux/defaultState';

const bootstrap = async () => {
  const rootElement = document.getElementById('app');
  if (!rootElement) {
    throw new Error('Root element with id #app not found');
  }

  await loadableReady();
  const cssCache = createCache({ key: 'app' });
  const preloadedStates = readPreloadedState();
  const router = createBrowserRouter(routes);
  reduxDefaultState.setInitialState(state => ({
    ui: {
      ...state.ui,
      ...preloadedStates?.REDUX?.ui,
    },
  }));

  const AppData = (
    <ReduxProvider>
      <ThemeProvider>
        <CSSCacheProvider value={cssCache}>
          <RouterProvider router={router} />
        </CSSCacheProvider>
      </ThemeProvider>
    </ReduxProvider>
  );

  if (process.env.NODE_ENV !== 'development') {
    hydrateRoot(rootElement, AppData);
  }

  if (process.env.NODE_ENV === 'development') {
    const root = createRoot(rootElement);
    root.render(AppData);
  }
};

bootstrap();
