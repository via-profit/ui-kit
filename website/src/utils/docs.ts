import { translations } from '~/translations';
import type { Locale } from '~/utils/locale';
import { docsNavigationGroups } from './docsNavigation';
import { GITHUB_URL } from './env';

/**
 * Where the markdown of the page is taken from:
 * `docs` — the documentation of the kit, `website` — a page of the site itself
 * (it exists only on the site), `changelog` — the root `CHANGELOG.md`
 */
export type DocSource = 'docs' | 'website' | 'changelog';

export interface DocEntry {
  /**
   * The key of the page: the directory of the documentation (`button`)
   * or the name of the directory of the site page (`Showcase`)
   */
  readonly id: string;
  readonly path: string;
  readonly group: string;

  /**
   * The title of the page in every locale. The titles from the documentation are not translated
   */
  readonly title: Record<Locale, string>;

  /**
   * A short description of the component
   */
  readonly description: string;
  readonly isDraft: boolean;
  readonly source: DocSource;
}

export interface DocGroup {
  readonly group: string;
  readonly title: Record<Locale, string>;
}

const startGroup = 'start';

/**
 * The pages of the site itself, in the order of the sidebar
 */
const sitePages: readonly DocEntry[] = [
  {
    id: 'introduction',
    path: '/docs',
    group: startGroup,
    title: translations('doc.introduction'),
    description: '',
    isDraft: false,
    source: 'docs',
  },
  {
    id: 'Showcase',
    path: '/docs/showcase',
    group: startGroup,
    title: translations('doc.showcase'),
    description: '',
    isDraft: false,
    source: 'website',
  },
  {
    id: 'Playground',
    path: '/docs/playground',
    group: startGroup,
    title: translations('doc.playground'),
    description: '',
    isDraft: false,
    source: 'website',
  },
  {
    id: 'ElevationPlayground',
    path: '/docs/elevation-playground',
    group: startGroup,
    title: translations('doc.elevationPlayground'),
    description: '',
    isDraft: false,
    source: 'website',
  },
  {
    id: 'changelog',
    path: '/docs/changelog',
    group: startGroup,
    title: translations('doc.changelog'),
    description: '',
    isDraft: false,
    source: 'changelog',
  },
];

const componentPages: readonly DocEntry[] = docsNavigationGroups.flatMap(({ title, items }) =>
  items.map(({ link, label, description, isDraft }): DocEntry => ({
    id: link.slice('/docs/'.length),
    path: link,
    group: title,
    title: { ru: label, en: label },
    description,
    isDraft,
    source: 'docs',
  })),
);

/**
 * All the pages of the documentation in the order of reading. The components are taken
 * from the «Компоненты» section of `docs/README.md`, so the site and GitHub show the same list
 */
export const docs: readonly DocEntry[] = [...sitePages, ...componentPages];

export const docGroups: readonly DocGroup[] = [
  { group: startGroup, title: translations('sidebar.group.start') },
  ...docsNavigationGroups.map(({ title }) => ({ group: title, title: { ru: title, en: title } })),
];

export const findDocByPath = (pathname: string): DocEntry | null =>
  docs.find(doc => pathname.replace(/\/+$/, '') === doc.path) ?? null;

export const findDocById = (id: string): DocEntry | null => docs.find(doc => doc.id === id) ?? null;

/**
 * Path of the markdown file in the repository
 */
export const docRepositoryFile = (doc: DocEntry): string => {
  switch (doc.source) {
    case 'changelog':
      return 'CHANGELOG.md';
    case 'website':
      return `website/src/pages/Docs/${doc.id}/README.md`;
    default:
      return `docs/${doc.id === 'introduction' ? '' : `${doc.id}/`}README.md`;
  }
};

export const docEditUrl = (doc: DocEntry): string =>
  `${GITHUB_URL}/edit/master/${docRepositoryFile(doc)}`;

/**
 * Loads the markdown of the page. Every page is a separate chunk
 */
export const loadDoc = async (doc: DocEntry): Promise<string> => {
  switch (doc.source) {
    case 'changelog':
      return (await import(/* webpackChunkName: "doc-changelog" */ '@repository/CHANGELOG.md'))
        .default;
    case 'website':
      return (
        await import(
          /* webpackChunkName: "doc-[request]" */
          /* webpackInclude: /README\.md$/ */
          `~/pages/Docs/${doc.id}/README.md`
        )
      ).default;
    default:
      return (
        await import(
          /* webpackChunkName: "doc-[request]" */
          /* webpackInclude: /README\.md$/ */
          `@repository/docs/${doc.id === 'introduction' ? '' : `${doc.id}/`}README.md`
        )
      ).default;
  }
};

export interface MarkdownLink {
  readonly internal: boolean;
  readonly url: string;
}

/**
 * Resolves a relative link of the documentation against the directory of the page.
 * Every page renders the `README.md` of its directory, so the page path is the directory
 * of the document: `./button` from `/docs` → `/docs/button`,
 * `../calendar` from `/docs/menu` → `/docs/calendar`
 */
const resolveRelative = (pagePath: string, rel: string): string => {
  const segments = pagePath.split('/').filter(Boolean);

  rel.split('/').forEach(part => {
    if (part === '..') {
      segments.pop();

      return;
    }

    if (part !== '.' && part !== '') {
      segments.push(part);
    }
  });

  return `/${segments.join('/')}`;
};

/**
 * Converts the link of the markdown document to the site route:
 * `./calendar/README.md#свойства` → `/docs/calendar#свойства`.
 * Links to the pages that are not on the site and to the other repository files lead to GitHub
 */
export const resolveMarkdownLink = (href: string, pagePath: string): MarkdownLink => {
  if (href.startsWith('//')) {
    return { internal: false, url: href };
  }
  // An anchor of the current page or a route of the site (`/docs/showcase`)
  if (href.startsWith('#') || href.startsWith('/')) {
    return { internal: true, url: href };
  }

  // An external resource: `https://…`, `mailto:…`
  if (/^[a-z][a-z\d+.-]*:/i.test(href) || href.startsWith('//')) {
    return { internal: false, url: href };
  }

  const [document, hash = ''] = href.split('#');
  const link = document.replace(/(?:\/README)?\.md$/i, '');

  if (link === document) {
    // Not a link to a markdown document: an anchor or a file next to the page
    return { internal: false, url: href };
  }

  const path = resolveRelative(pagePath, link);
  const doc = findDocByPath(path);

  return doc
    ? { internal: true, url: `${doc.path}${hash ? `#${hash}` : ''}` }
    : {
        internal: false,
        url: `${GITHUB_URL}/blob/master/docs${path.slice('/docs'.length)}/README.md${hash ? `#${hash}` : ''}`,
      };
};
