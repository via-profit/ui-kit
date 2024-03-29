/* eslint-disable import/max-dependencies */
import React from 'react';
import { RouteObject } from 'react-router-dom';
import loadable from '@loadable/component';

import LoadingIndicator from '@via-profit/ui-kit/src/LoadingIndicator';

const TemplateDocs = loadable(() => import('~/templates/TemplateDocs/index'));
const NotFound = loadable(() => import('~/pages/NotFound/index'));
const Introduction = loadable(() => import('~/pages/Docs/Introduction'));
const ButtonOverview = loadable(() => import('~/pages/Docs/Button/ButtonOverview'));
const SwitchOverview = loadable(() => import('~/pages/Docs/Switch/SwitchOverview'));
const Tables = loadable(() => import('~/pages/Docs/Table'));
const TextField = loadable(() => import('~/pages/Docs/TextField'));
const TextArea = loadable(() => import('~/pages/Docs/TextArea'));
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
const SelectboxOverview = loadable(() => import('~/pages/Docs/Selectbox/SelectboxOverview'));
const CountryFlagsOverview = loadable(
  () => import('~/pages/Docs/CountryFlags/CountryFlagsOverview'),
);
const HighlightedOverview = loadable(() => import('~/pages/Docs/Highlighted/HighlightedOverview'));
const LoadingIndicatorOverview = loadable(
  () => import('~/pages/Docs/LoadingIndicator/LoadingIndicatorOverview'),
);
const BadgeOverview = loadable(() => import('~/pages/Docs/Badge/BadgeOverview'));
const AvatarOverview = loadable(() => import('~/pages/Docs/Avatar/AvatarOverview'));
const AccordionOverview = loadable(() => import('~/pages/Docs/Accordion/AccordionOverview'));
const PopperOverview = loadable(() => import('~/pages/Docs/Popper/PopperOverview'));
const ClickOutsideOverview = loadable(
  () => import('~/pages/Docs/ClickOutside/ClickOutsideOverview'),
);
const DatePickerOverview = loadable(() => import('~/pages/Docs/DatePicker/DatePickerOverview'));

const docsRouter: RouteObject = {
  path: 'docs',
  caseSensitive: true,
  element: <TemplateDocs />,
  children: [
    {
      path: '',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <Introduction />
        </React.Suspense>
      ),
    },
    {
      path: 'button',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <ButtonOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'switch',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <SwitchOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'table',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <Tables />
        </React.Suspense>
      ),
    },
    {
      path: 'text-field',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <TextField />
        </React.Suspense>
      ),
    },
    {
      path: 'text-area',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <TextArea />
        </React.Suspense>
      ),
    },
    {
      path: 'theming',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <ThemingOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'color',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <ThemingColor />
        </React.Suspense>
      ),
    },
    {
      path: 'surface',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <SurfaceOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'accordion',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <AccordionOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'masked-field',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <MaskedFieldOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'typography',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <TypographyOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'phone-field',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <PhoneFieldOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'menu',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <MenuOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'autocomplete',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <AutocompleteOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'selectbox',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <SelectboxOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'country-flags',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <CountryFlagsOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'modal',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <ModalOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'calendar',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <CalendarOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'highlighted',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <HighlightedOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'loading-indicator',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <LoadingIndicatorOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'badge',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <BadgeOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'avatar',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <AvatarOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'popper',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <PopperOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'click-outside',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <ClickOutsideOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'date-picker',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingIndicator />}>
          <DatePickerOverview />
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
