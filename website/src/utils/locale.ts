export type Locale = 'ru' | 'en';

/**
 * Locales the documentation is translated into. The addresses of the other locales
 * are served in `defaultLocale` until the translation is ready
 */
export const enabledLocales: readonly Locale[] = ['ru'];

export const defaultLocale: Locale = 'ru';

/**
 * Locale of the address: `/ru/docs` → `ru`
 */
export const getPathLocale = (pathname: string): Locale | undefined => {
  const segment = pathname.split('/')[1];

  return segment === 'en' || segment === 'ru' ? segment : undefined;
};

/**
 * Locale of the shown content. An untranslated locale falls back to the default one
 */
export const getContentLocale = (locale: Locale): Locale =>
  enabledLocales.includes(locale) ? locale : defaultLocale;
