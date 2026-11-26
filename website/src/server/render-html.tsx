import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';

import Application from '~/application/Application';
import { formatPageTitle } from '~/application/PageTitle';
import type { ThemeName } from '~/providers/UiProvider';
import { createRoutes } from '~/routes';
import { getContentLocale } from '~/utils/locale';
import type { Locale } from '~/utils/locale';
import Document from './Document';

const handlers = {
  // The routes of both locales: the untranslated locale shows the pages of the default locale
  ru: createStaticHandler(createRoutes('ru'), { basename: '/ru' }),
  en: createStaticHandler(createRoutes(getContentLocale('en')), { basename: '/en' }),
};

export const renderHtml = async (
  url: URL,
  urlLocale: Locale,
  theme: ThemeName,
  scripts: readonly string[],
) => {
  const handler = handlers[urlLocale];
  const context = await handler.query(new Request(url));
  if (context instanceof Response) {
    return context;
  }

  const locale = getContentLocale(urlLocale);
  const router = createStaticRouter(handler.dataRoutes, context);
  // `handle` of the route is the title of its page
  const title = formatPageTitle(context.matches.at(-1)?.route.handle as string | undefined);
  const cssCache = createCache({ key: 'app' });
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cssCache);
  const markup = renderToString(
    <Document locale={locale} theme={theme} title={title} scripts={scripts}>
      <Application cssCache={cssCache} locale={locale} theme={theme}>
        <StaticRouterProvider router={router} context={context} />
      </Application>
    </Document>,
  );
  const styles = constructStyleTagsFromChunks(extractCriticalToChunks(markup));

  return new Response(`<!DOCTYPE html>${markup.replace('</head>', () => `${styles}</head>`)}`, {
    status: context.statusCode,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'private, no-cache' },
  });
};
