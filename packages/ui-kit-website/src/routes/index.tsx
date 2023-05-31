import React from 'react';
import { RouteObject } from 'react-router-dom';
import loadable from '@loadable/component';

import docs from './docs-router';

const MainTemplate = loadable(() => import('~/templates/MainTemplate/index'));
const Intruduction = loadable(() => import('~/pages/Intruduction/index'));
const NotFound = loadable(() => import('~/pages/NotFound/index'));

export const routes: RouteObject[] = [
  {
    path: '/',
    caseSensitive: true,
    element: <MainTemplate />,
    children: [
      docs,
      {
        path: '/',
        element: <Intruduction />,
      },
    ],
  },

  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
