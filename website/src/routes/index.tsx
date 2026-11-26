import React from 'react';
import type { RouteObject } from 'react-router-dom';

import DocLoadError from '~/pages/DocPage/DocLoadError';
import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';
import TemplateBase from '~/templates/TemplateBase';
import { translations } from '~/translations';
import { docs, loadDoc } from '~/utils/docs';
import type { Locale } from '~/utils/locale';

type DocPageModule = {
  readonly default: React.ComponentType<DocPageProps>;
};

/**
 * The pages of the documentation with the live examples or with their own layout, by the ID of the page.
 * The page without a module is rendered by the generic `DocPage`,
 * so a new page of the documentation works before its examples are written
 */
const docPages: Readonly<Record<string, () => Promise<DocPageModule>>> = {
  Showcase: () => import(/* webpackChunkName: "doc-page-showcase" */ '~/pages/Docs/Showcase'),
  Playground: () => import(/* webpackChunkName: "doc-page-playground" */ '~/pages/Docs/Playground'),
  ElevationPlayground: () =>
    import(/* webpackChunkName: "doc-page-elevation-playground" */ '~/pages/Docs/ElevationPlayground'),
  theming: () =>
    import(/* webpackChunkName: "doc-page-theming" */ '~/pages/Docs/Theming/ThemingOverview'),
  typography: () =>
    import(/* webpackChunkName: "doc-page-typography" */ '~/pages/Docs/Typography/TypographyOverview'),
  color: () => import(/* webpackChunkName: "doc-page-color" */ '~/pages/Docs/Theming/ThemingColor'),
  'button-group': () =>
    import(/* webpackChunkName: "doc-page-button-group" */ '~/pages/Docs/ButtonGroup/ButtonGroupOverview'),
  button: () =>
    import(/* webpackChunkName: "doc-page-button" */ '~/pages/Docs/Button/ButtonOverview'),
  'date-picker': () =>
    import(/* webpackChunkName: "doc-page-date-picker" */ '~/pages/Docs/DatePicker/DatePickerOverview'),
  'file-dropzone': () =>
    import(/* webpackChunkName: "doc-page-file-dropzone" */ '~/pages/Docs/FileDropzone/FileDropzoneOverview'),
  'masked-field': () =>
    import(/* webpackChunkName: "doc-page-masked-field" */ '~/pages/Docs/MaskedField/MaskedFieldOverview'),
  'text-area': () => import(/* webpackChunkName: "doc-page-text-area" */ '~/pages/Docs/TextArea'),
  'phone-field': () =>
    import(/* webpackChunkName: "doc-page-phone-field" */ '~/pages/Docs/PhoneField/PhoneFieldOverview'),
  'text-field': () =>
    import(/* webpackChunkName: "doc-page-text-field" */ '~/pages/Docs/TextField'),
  autocomplete: () =>
    import(/* webpackChunkName: "doc-page-autocomplete" */ '~/pages/Docs/Autocomplete/AutocompleteOverview'),
  calendar: () =>
    import(/* webpackChunkName: "doc-page-calendar" */ '~/pages/Docs/Calendar/CalendarOverview'),
  switch: () =>
    import(/* webpackChunkName: "doc-page-switch" */ '~/pages/Docs/Switch/SwitchOverview'),
  radio: () => import(/* webpackChunkName: "doc-page-radio" */ '~/pages/Docs/Radio/RadioOverview'),
  selectbox: () =>
    import(/* webpackChunkName: "doc-page-selectbox" */ '~/pages/Docs/Selectbox/SelectboxOverview'),
  slider: () =>
    import(/* webpackChunkName: "doc-page-slider" */ '~/pages/Docs/Slider/SliderOverview'),
  checkbox: () =>
    import(/* webpackChunkName: "doc-page-checkbox" */ '~/pages/Docs/Checkbox/CheckboxOverview'),
  avatar: () =>
    import(/* webpackChunkName: "doc-page-avatar" */ '~/pages/Docs/Avatar/AvatarOverview'),
  badge: () => import(/* webpackChunkName: "doc-page-badge" */ '~/pages/Docs/Badge/BadgeOverview'),
  skeleton: () =>
    import(/* webpackChunkName: "doc-page-skeleton" */ '~/pages/Docs/Skeleton/SkeletonOverview'),
  'loading-indicator': () =>
    import(/* webpackChunkName: "doc-page-loading-indicator" */ '~/pages/Docs/LoadingIndicator/LoadingIndicatorOverview'),
  'info-note': () =>
    import(/* webpackChunkName: "doc-page-info-note" */ '~/pages/Docs/InfoNote/InfoNoteOverview'),
  pagination: () =>
    import(/* webpackChunkName: "doc-page-pagination" */ '~/pages/Docs/Pagination/PaginationOverview'),
  'empty-state': () =>
    import(/* webpackChunkName: "doc-page-empty-state" */ '~/pages/Docs/EmptyState/EmptyStateOverview'),
  table: () => import(/* webpackChunkName: "doc-page-table" */ '~/pages/Docs/Table'),
  stepper: () =>
    import(/* webpackChunkName: "doc-page-stepper" */ '~/pages/Docs/Stepper/StepperOverview'),
  accordion: () =>
    import(/* webpackChunkName: "doc-page-accordion" */ '~/pages/Docs/Accordion/AccordionOverview'),
  tabs: () => import(/* webpackChunkName: "doc-page-tabs" */ '~/pages/Docs/Tabs/TabsOverview'),
  surface: () =>
    import(/* webpackChunkName: "doc-page-surface" */ '~/pages/Docs/Surface/SurfaceOverview'),
  swiper: () =>
    import(/* webpackChunkName: "doc-page-swiper" */ '~/pages/Docs/Swiper/SwiperOverview'),
  grid: () => import(/* webpackChunkName: "doc-page-grid" */ '~/pages/Docs/Grid/GridOverview'),
  stack: () => import(/* webpackChunkName: "doc-page-stack" */ '~/pages/Docs/Stack/StackOverview'),
  menu: () => import(/* webpackChunkName: "doc-page-menu" */ '~/pages/Docs/Menu/MenuOverview'),
  modal: () => import(/* webpackChunkName: "doc-page-modal" */ '~/pages/Docs/Modal/ModalOverview'),
  tooltip: () =>
    import(/* webpackChunkName: "doc-page-tooltip" */ '~/pages/Docs/Tooltip/TooltipOverview'),
  'hint-popover': () =>
    import(/* webpackChunkName: "doc-page-hint-popover" */ '~/pages/Docs/HintPopover/HintPopoverOverview'),
  toast: () => import(/* webpackChunkName: "doc-page-toast" */ '~/pages/Docs/Toast/ToastOverview'),
  popper: () =>
    import(/* webpackChunkName: "doc-page-popper" */ '~/pages/Docs/Popper/PopperOverview'),
  'click-outside': () =>
    import(/* webpackChunkName: "doc-page-click-outside" */ '~/pages/Docs/ClickOutside/ClickOutsideOverview'),
  highlighted: () =>
    import(/* webpackChunkName: "doc-page-highlighted" */ '~/pages/Docs/Highlighted/HighlightedOverview'),
};

const loadPage = (id: string): Promise<DocPageModule> => docPages[id]?.() ?? Promise.resolve({ default: DocPage });

const notFound = (locale: Locale): RouteObject => ({
  path: '*',
  lazy: async () => ({
    Component: (await import(/* webpackChunkName: "not-found" */ '~/pages/NotFound')).default,
  }),
  handle: translations('notFound.title')[locale],
  loader: () => new Response(null, { status: 404 }),
});

/**
 * The routes of one locale. `handle` of every route is the title of its page
 */
export const createRoutes = (locale: Locale): RouteObject[] => [
  {
    path: '/docs',
    id: 'docs',
    lazy: async () => ({
      Component: (await import(/* webpackChunkName: "docs-layout" */ '~/templates/TemplateDocs'))
        .default,
    }),
    children: [
      ...docs.map(
        (doc): RouteObject => ({
          id: doc.id,
          ...(doc.path === '/docs' ? { index: true } : { path: doc.path.slice('/docs/'.length) }),
          lazy: async () => {
            const [{ default: Page }, content] = await Promise.all([loadPage(doc.id), loadDoc(doc)]);

            return { element: <Page doc={doc} content={content} /> };
          },
          ErrorBoundary: DocLoadError,
          handle: doc.title[locale],
        }),
      ),
      { ...notFound(locale), id: 'docs-not-found' },
    ],
  },
  {
    path: '/',
    id: 'base',
    element: <TemplateBase />,
    children: [
      {
        id: 'home',
        index: true,
        lazy: async () => ({
          Component: (await import(/* webpackChunkName: "home" */ '~/pages/Home')).default,
        }),
        handle: undefined,
      },
      { ...notFound(locale), id: 'not-found' },
    ],
  },
];
