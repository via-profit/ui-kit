/* eslint-disable import/max-dependencies */
import React from 'react';
import { RouteObject } from 'react-router-dom';
import loadable from '@loadable/component';

import { LoadingOverlay } from '@via-profit/ui-kit/src/LoadingIndicator';

const TemplateDocs = loadable(() => import('~/templates/TemplateDocs/index'));
const NotFound = loadable(() => import('~/pages/NotFound/index'));
const Introduction = loadable(() => import('~/pages/Docs/Introduction'));
const Showcase = loadable(() => import('~/pages/Docs/Showcase'));
const ButtonOverview = loadable(() => import('~/pages/Docs/Button/ButtonOverview'));
const ButtonGroupOverview = loadable(() => import('~/pages/Docs/ButtonGroup/ButtonGroupOverview'));
const SwitchOverview = loadable(() => import('~/pages/Docs/Switch/SwitchOverview'));
const CheckboxOverview = loadable(() => import('~/pages/Docs/Checkbox/CheckboxOverview'));
const RadioOverview = loadable(() => import('~/pages/Docs/Radio/RadioOverview'));
const SliderOverview = loadable(() => import('~/pages/Docs/Slider/SliderOverview'));
const ToastOverview = loadable(() => import('~/pages/Docs/Toast/ToastOverview'));
const TabsOverview = loadable(() => import('~/pages/Docs/Tabs/TabsOverview'));
const TooltipOverview = loadable(() => import('~/pages/Docs/Tooltip/TooltipOverview'));
const Tables = loadable(() => import('~/pages/Docs/Table'));
const TextField = loadable(() => import('~/pages/Docs/TextField'));
const TextArea = loadable(() => import('~/pages/Docs/TextArea'));
const ThemingOverview = loadable(() => import('~/pages/Docs/Theming/ThemingOverview'));
const ThemingColor = loadable(() => import('~/pages/Docs/Theming/ThemingColor'));
const SurfaceOverview = loadable(() => import('~/pages/Docs/Surface/SurfaceOverview'));
const StackOverview = loadable(() => import('~/pages/Docs/Stack/StackOverview'));
const GridOverview = loadable(() => import('~/pages/Docs/Grid/GridOverview'));
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
const SwiperOverview = loadable(() => import('~/pages/Docs/Swiper/SwiperOverview'));
const Changelog = loadable(() => import('~/pages/Docs/Changelog'));

const docsRouter: RouteObject = {
  path: 'docs',
  caseSensitive: true,
  element: <TemplateDocs />,
  children: [
    {
      path: '',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <Introduction />
        </React.Suspense>
      ),
    },
    {
      path: 'showcase',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <Showcase />
        </React.Suspense>
      ),
    },
    {
      path: 'button',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <ButtonOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'button-group',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <ButtonGroupOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'switch',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <SwitchOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'radio',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <RadioOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'slider',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <SliderOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'tabs',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <TabsOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'tooltip',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <TooltipOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'toast',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <ToastOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'checkbox',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <CheckboxOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'table',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <Tables />
        </React.Suspense>
      ),
    },
    {
      path: 'text-field',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <TextField />
        </React.Suspense>
      ),
    },
    {
      path: 'text-area',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <TextArea />
        </React.Suspense>
      ),
    },
    {
      path: 'theming',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <ThemingOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'color',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <ThemingColor />
        </React.Suspense>
      ),
    },
    {
      path: 'stack',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <StackOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'grid',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <GridOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'surface',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <SurfaceOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'accordion',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <AccordionOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'masked-field',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <MaskedFieldOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'typography',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <TypographyOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'phone-field',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <PhoneFieldOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'menu',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <MenuOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'autocomplete',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <AutocompleteOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'selectbox',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <SelectboxOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'modal',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <ModalOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'calendar',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <CalendarOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'highlighted',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <HighlightedOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'loading-indicator',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <LoadingIndicatorOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'badge',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <BadgeOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'avatar',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <AvatarOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'popper',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <PopperOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'click-outside',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <ClickOutsideOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'date-picker',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <DatePickerOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'swiper',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <SwiperOverview />
        </React.Suspense>
      ),
    },
    {
      path: 'changelog',
      caseSensitive: true,
      element: (
        <React.Suspense fallback={<LoadingOverlay />}>
          <Changelog />
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
