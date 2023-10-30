import React from 'react';
import { RouteObject } from 'react-router-dom';
import loadable from '@loadable/component';

const TemplateDocs = loadable(() => import('~/templates/TemplateDocs/index'));
const NotFound = loadable(() => import('~/pages/NotFound/index'));
const Introduction = loadable(() => import('~/pages/Docs/Introduction'));
const ButtonOverview = loadable(() => import('~/pages/Docs/Button/ButtonOverview'));
const Tables = loadable(() => import('~/pages/Docs/Table'));
const TextFields = loadable(() => import('~/pages/Docs/TextField'));
const ThemingOverview = loadable(() => import('~/pages/Docs/Theming/ThemingOverview'));
const ThemingColor = loadable(() => import('~/pages/Docs/Theming/ThemingColor'));
const SurfaceOverview = loadable(() => import('~/pages/Docs/Surface/SurfaceOverview'));
const MaskedFieldOverview = loadable(() => import('~/pages/Docs/MaskedField/MaskedFieldOverview'));
const TypographyOverview = loadable(() => import('~/pages/Docs/Typography/TypographyOverview'));
const PhoneFieldOverview = loadable(() => import('~/pages/Docs/PhoneField/PhoneFieldOverview'));
const MenuOverview = loadable(() => import('~/pages/Docs/Menu/MenuOverview'));
const ModalOverview = loadable(() => import('~/pages/Docs/Modal/ModalOverview'));
const CalendarOverview = loadable(() => import('~/pages/Docs/Calendar/CalendarOverview'));
const AutocompleteOverview = loadable(
  () => import('~/pages/Docs/Autocomplete/AutocompleteOverview'),
);
const SelectBoxOverview = loadable(() => import('~/pages/Docs/SelectBox/SelectBoxOverview'));
const CountryFlagsOverview = loadable(
  () => import('~/pages/Docs/CountryFlags/CountryFlagsOverview'),
);

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
          <ButtonOverview />
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
      path: 'theming',
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
      path: 'surface',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<>Loading...</>}>
          <SurfaceOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'masked-field',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<>Loading...</>}>
          <MaskedFieldOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'typography',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<>Loading...</>}>
          <TypographyOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'phone-field',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<>Loading...</>}>
          <PhoneFieldOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'menu',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<>Loading...</>}>
          <MenuOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'autocomplete',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<>Loading...</>}>
          <AutocompleteOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'selectbox',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<>Loading...</>}>
          <SelectBoxOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'country-flags',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<>Loading...</>}>
          <CountryFlagsOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'modal',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<>Loading...</>}>
          <ModalOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'calendar',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<>Loading...</>}>
          <CalendarOverview />
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
