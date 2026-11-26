import { useIntl } from 'react-intl';
import React from 'react';

import type { Locale } from '~/utils/locale';

/**
 * Texts of the site interface. Every text has all the translations,
 * so a missing translation is a type error
 */
const messages = {
  'nav.home': { ru: 'Главная', en: 'Home' },
  'nav.docs': { ru: 'Документация', en: 'Docs' },

  'header.menu': { ru: 'Открыть меню', en: 'Open menu' },
  'header.themeLight': { ru: 'Включить светлую тему', en: 'Switch to light theme' },
  'header.themeDark': { ru: 'Включить тёмную тему', en: 'Switch to dark theme' },
  'header.language': { ru: 'Переключить на английский', en: 'Switch to Russian' },
  'header.languageUnavailable': {
    ru: 'Английская версия готовится',
    en: 'The English version is in progress',
  },

  'search.placeholder': { ru: 'Поиск по документации', en: 'Search docs' },
  'search.empty': { ru: 'Ничего не найдено', en: 'Nothing found' },
  'search.loading': { ru: 'Загрузка документов…', en: 'Loading docs…' },
  'search.incomplete': {
    ru: 'Не все документы загрузились. Откройте поиск снова, чтобы повторить загрузку.',
    en: 'Some docs failed to load. Reopen search to retry.',
  },

  'footer.license': { ru: 'Лицензия MIT', en: 'MIT License' },

  'sidebar.filter': { ru: 'Найти компонент…', en: 'Find a component…' },
  'sidebar.group.start': { ru: 'Начало', en: 'Getting started' },
  'sidebar.empty': { ru: 'Ничего не найдено', en: 'Nothing found' },
  'sidebar.group.site': { ru: 'Сайт', en: 'Site' },

  'doc.introduction': { ru: 'Введение', en: 'Introduction' },
  'doc.showcase': { ru: 'Примеры использования', en: 'Usage examples' },
  'doc.playground': { ru: 'Песочница отступов', en: 'Spacing playground' },
  'doc.elevationPlayground': { ru: 'Песочница теней', en: 'Shadows playground' },
  'doc.changelog': { ru: 'Список изменений', en: 'Changelog' },
  'doc.edit': { ru: 'Редактировать на GitHub', en: 'Edit on GitHub' },
  'doc.prev': { ru: 'Назад', en: 'Previous' },
  'doc.next': { ru: 'Далее', en: 'Next' },
  'doc.loadError': {
    ru: 'Не удалось загрузить страницу. Обновите страницу и попробуйте снова.',
    en: 'Failed to load the page. Reload the page and try again.',
  },

  'breadcrumbs.docs': { ru: 'Документация', en: 'Docs' },
  'toc.title': { ru: 'На этой странице', en: 'On this page' },

  'code.copy': { ru: 'Копировать', en: 'Copy' },
  'code.copied': { ru: 'Скопировано', en: 'Copied' },

  'callout.note': { ru: 'Примечание', en: 'Note' },
  'callout.tip': { ru: 'Совет', en: 'Tip' },
  'callout.important': { ru: 'Важно', en: 'Important' },
  'callout.warning': { ru: 'Внимание', en: 'Warning' },
  'callout.caution': { ru: 'Осторожно', en: 'Caution' },

  'home.pill': { ru: 'React · TypeScript · Emotion', en: 'React · TypeScript · Emotion' },
  'home.title': { ru: 'Набор компонентов для', en: 'A component library for' },
  'home.titleAccent': { ru: 'ваших интерфейсов', en: 'your interfaces' },
  'home.lead': {
    ru: 'Кнопки, поля ввода, календари, меню и модальные окна с темами оформления и переопределяемыми частями.',
    en: 'Buttons, inputs, calendars, menus and modal windows with themes and overridable parts.',
  },
  'home.docs': { ru: 'Документация', en: 'Read the docs' },
  'home.install': { ru: 'Установка', en: 'Installation' },
  'home.components': { ru: 'Компоненты', en: 'Components' },

  'notFound.title': { ru: 'Страница не найдена', en: 'Page not found' },
  'notFound.text': {
    ru: 'Такой страницы нет. Возможно, она переехала.',
    en: 'This page does not exist. Maybe it has moved.',
  },
  'notFound.back': { ru: 'На главную', en: 'Go home' },
} as const satisfies Record<string, Record<Locale, string>>;

export type MessageId = keyof typeof messages;

/**
 * The interface text in every locale — for the data of the site,
 * which is not rendered through `useT` (the titles of the pages)
 */
export const translations = (id: MessageId): Record<Locale, string> => ({ ...messages[id] });

export const intlLocales: Record<Locale, string> = {
  ru: 'ru-RU',
  en: 'en-US',
};

export const getMessages = (locale: Locale): Record<MessageId, string> =>
  Object.fromEntries(
    Object.entries(messages).map(([id, translations]) => [id, translations[locale]]),
  ) as Record<MessageId, string>;

/**
 * Returns the function, which translates the interface text by its ID
 */
export const useT = () => {
  const intl = useIntl();

  return React.useCallback(
    (id: MessageId, values?: Record<string, string | number>) =>
      intl.formatMessage({ id }, values),
    [intl],
  );
};
