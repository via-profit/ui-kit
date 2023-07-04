import React from 'react';
import { RouteObject } from 'react-router-dom';
import loadable from '@loadable/component';

const TemplateDocs = loadable(() => import('~/templates/TemplateDocs/index'));
const NotFound = loadable(() => import('~/pages/NotFound/index'));
const Introduction = loadable(() => import('~/pages/Introduction/index'));
const Buttons = loadable(() => import('~/pages/Docs/Buttons'));
const Tables = loadable(() => import('~/pages/Docs/Tables'));
const TextFields = loadable(() => import('~/pages/Docs/TextFields'));
const ThemingOverview = loadable(() => import('~/pages/Docs/Theming/ThemingOverview'));
const ThemingColor = loadable(() => import('~/pages/Docs/Theming/ThemingColor'));

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
      path: 'button',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<>Loading...</>}>
          <Buttons />
        </React.Suspense>
      ),
    },
    {
      path: 'table',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<>Loading...</>}>
          <Tables />
        </React.Suspense>
      ),
    },
    {
      path: 'text-field',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<>Loading...</>}>
          <TextFields />
        </React.Suspense>
      ),
    },
    {
      path: 'theming/overview',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<>Loading...</>}>
          <ThemingOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'theming/color',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<>Loading...</>}>
          <ThemingColor />
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
