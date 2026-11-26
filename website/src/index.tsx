import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, matchRoutes, RouterProvider } from 'react-router-dom';
import createCache from '@emotion/cache';

import Application from '~/application/Application';
import { createRoutes } from '~/routes';
import { getContentLocale, getPathLocale } from '~/utils/locale';

const bootstrap = async () => {
  const root = document.getElementById('app');
  const urlLocale = getPathLocale(window.location.pathname);
  if (!root || !urlLocale) {
    throw new Error('Cannot hydrate the UI Kit website without the app root and a locale');
  }

  // The locale of the content can differ from the locale of the address until it is translated
  const locale = getContentLocale(urlLocale);
  const basename = `/${urlLocale}`;
  const routes = createRoutes(locale);
  const matches = matchRoutes(routes, window.location, basename) ?? [];

  // Load the code of the server-rendered route tree before hydrating its HTML.
  await Promise.all(
    matches.map(async ({ route }) => {
      if (typeof route.lazy === 'function') {
        Object.assign(route, await route.lazy());
        delete route.lazy;
      }
    }),
  );

  const cssCache = createCache({ key: 'app' });
  const theme = root.dataset.theme === 'light' ? 'light' : 'dark';
  const router = createBrowserRouter(routes, { basename });

  hydrateRoot(
    root,
    <Application cssCache={cssCache} locale={locale} theme={theme}>
      <RouterProvider router={router} />
    </Application>,
  );
};

void bootstrap().catch(error => console.error('UI Kit hydration failed', error));
