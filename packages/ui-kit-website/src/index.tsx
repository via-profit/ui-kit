import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import routes from '~/routes';

const bootstrap = async () => {
  const rootElement = document.getElementById('app');
  if (!rootElement) {
    throw new Error('Root element with id #app not found');
  }

  await loadableReady();

  const router = createBrowserRouter(routes);
  const AppData = <RouterProvider router={router} />;

  if (process.env.NODE_ENV !== 'development') {
    hydrateRoot(rootElement, AppData);
  }

  if (process.env.NODE_ENV === 'development') {
    const root = createRoot(rootElement);
    root.render(AppData);
  }
};

bootstrap();
