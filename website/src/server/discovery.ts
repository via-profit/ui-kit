import { docs, docRepositoryFile, loadDoc } from '~/utils/docs';
import { UI_KIT_VERSION } from '~/utils/env';
import { enabledLocales, getContentLocale, getPathLocale } from '~/utils/locale';
import type { Locale } from '~/utils/locale';

const languageNames = { ru: 'Русский', en: 'English' };
const projectName = '@via-profit/ui-kit';
const summary =
  'A set of React components for interfaces: inputs, buttons, calendar, menu, modal windows and more';

export const discoveryContentTypes = {
  '/robots.txt': 'text/plain; charset=utf-8',
  '/sitemap.xml': 'application/xml; charset=utf-8',
  '/llms.txt': 'text/plain; charset=utf-8',
  '/llms-full.txt': 'text/plain; charset=utf-8',
} as const;

type DiscoveryPath = keyof typeof discoveryContentTypes;

export const isDiscoveryPath = (pathname: string): pathname is DiscoveryPath =>
  Object.hasOwn(discoveryContentTypes, pathname);

const configuredSite = process.env.SITE_URL ? new URL(process.env.SITE_URL) : undefined;
if (
  configuredSite &&
  (!['http:', 'https:'].includes(configuredSite.protocol) ||
    configuredSite.username ||
    configuredSite.password ||
    configuredSite.pathname !== '/' ||
    configuredSite.search ||
    configuredSite.hash)
) {
  throw new Error('SITE_URL must be an absolute HTTP(S) origin without a path, query or fragment');
}

export const getSiteOrigin = (host: string | undefined, port: number) => {
  if (configuredSite) {
    return configuredSite.origin;
  }

  // Local development uses the requested host. Behind HTTPS, configure SITE_URL explicitly.
  const requestUrl = host && /^[\w.:[\]-]+$/.test(host) ? URL.parse(`http://${host}`) : null;

  return requestUrl?.origin ?? `http://localhost:${port}`;
};

// Only the translated locales are indexed: the pages of the other locales repeat the default locale
const indexedLocales = enabledLocales.filter(locale => getContentLocale(locale) === locale);

const renderSitemap = (origin: string) => {
  const paths = ['', ...docs.map(doc => doc.path)];
  const urls = indexedLocales.flatMap(locale =>
    paths.map(path => `  <url><loc>${origin}/${locale}${path}</loc></url>`),
  );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
};

const renderLlmsIndex = (origin: string) => {
  const languageSections = indexedLocales.map(locale => [
    `## ${languageNames[locale]}`,
    '',
    ...docs.map(doc => `- [${doc.title[locale]}](${origin}/${locale}${doc.path}.md)`),
  ].join('\n'));

  return (
    [
      `# ${projectName}`,
      `> ${summary}`,
      `This documentation site was built for ${projectName} ${UI_KIT_VERSION}.`,
      ...languageSections,
      ['## Optional', '', `- [Complete documentation](${origin}/llms-full.txt)`].join('\n'),
      '',
    ]
      .join('\n\n')
      .trimEnd() + '\n'
  );
};

const renderLanguage = async (locale: Locale) => {
  // The changelog goes last, after all the pages
  const pages = [
    ...docs.filter(doc => doc.source !== 'changelog'),
    ...docs.filter(doc => doc.source === 'changelog'),
  ];
  const articles = await Promise.all(pages.map(loadDoc));

  return [
    `## ${languageNames[locale]}`,
    ...pages.map((doc, index) => `### ${docRepositoryFile(doc)}\n\n${articles[index].trim()}`),
  ].join('\n\n---\n\n');
};

let fullDocumentation: Promise<string> | undefined;

const renderFullDocumentation = async () => {
  const languages = await Promise.all(indexedLocales.map(renderLanguage));

  return (
    [`# ${projectName} ${UI_KIT_VERSION}`, `> ${summary}`, ...languages].join('\n\n---\n\n') + '\n'
  );
};

export const renderDiscovery = (
  pathname: DiscoveryPath,
  origin: string,
): string | Promise<string> => {
  switch (pathname) {
    case '/robots.txt':
      // The untranslated locales are not indexed
      return `User-agent: *\nAllow: /\n${['ru', 'en']
        .filter(locale => !indexedLocales.includes(locale as Locale))
        .map(locale => `Disallow: /${locale}/\n`)
        .join('')}\nSitemap: ${origin}/sitemap.xml\n`;
    case '/sitemap.xml':
      return renderSitemap(origin);
    case '/llms.txt':
      return renderLlmsIndex(origin);
    case '/llms-full.txt':
      return (fullDocumentation ??= renderFullDocumentation());
  }
};

export const loadMarkdownPage = (pathname: string): Promise<string> | undefined => {
  const locale = getPathLocale(pathname);
  if (!locale) {
    return undefined;
  }

  const doc = docs.find(entry => pathname === `/${locale}${entry.path}.md`);

  return doc ? loadDoc(doc) : undefined;
};
