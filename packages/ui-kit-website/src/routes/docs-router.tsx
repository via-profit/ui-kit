import React from 'react';
import { RouteObject } from 'react-router-dom';
import loadable from '@loadable/component';

const TemplateDocs = loadable(() => import('~/templates/TemplateDocs/index'));
const NotFound = loadable(() => import('~/pages/NotFound/index'));
const Introduction = loadable(() => import('~/pages/Introduction/index'));
const Buttons = loadable(() => import('~/pages/Docs/Buttons'));
const TextFields = loadable(() => import('~/pages/Docs/TextFields'));

const docsRouter: RouteObject = {
  path: 'docs',
  caseSensitive: true,
  element: <TemplateDocs />,
  children: [
    {
      path: '',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<>Loading...</>}>
          <Introduction />
        </React.Suspense>
      ),
    },
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
      path: 'text-fields',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<>Loading...</>}>
          <TextFields />
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
