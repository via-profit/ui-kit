import React from 'react';
import { RouteObject } from 'react-router-dom';
import loadable from '@loadable/component';

const TemplateHome = loadable(() => import('~/templates/TemplateHome/index'));
const NotFound = loadable(() => import('~/pages/NotFound/index'));
const Home = loadable(() => import('~/pages/Home/index'));

const homeRouter: RouteObject = {
  path: '/',
  caseSensitive: true,
  element: <TemplateHome />,
  children: [
    {
      path: '/',
      element: (
        <React.Suspense fallback={<>Loading...</>}>
          <Home />
        </React.Suspense>
      ),
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
};

export default homeRouter;
