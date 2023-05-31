import React from 'react';
import { RouteObject, Outlet } from 'react-router-dom';
import loadable from '@loadable/component';

const NotFound = loadable(() => import('~/pages/NotFound/index'));
const Buttons = loadable(() => import('~/pages/Docs/Buttons'));

const docsRouter: RouteObject = {
  path: 'docs',
  caseSensitive: true,
  element: <Outlet />,
  children: [
    {
      path: 'buttons',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<>Loading...</>}>
          <Buttons />
        </React.Suspense>
      ),
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
};

export default docsRouter;
