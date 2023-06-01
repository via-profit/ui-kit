import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import loadable from '@loadable/component';

import docs from './docs-router';
import home from './home-router';

const NotFound = loadable(() => import('~/pages/NotFound/index'));

export const routes: RouteObject[] = [
  {
    path: '/',
    caseSensitive: true,
    element: <Outlet />,
    children: [docs, home],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
