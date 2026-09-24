import content from '@via-profit/ui-kit/docs/README.md';

export type DocsNavItem = {
  readonly label: string;
  readonly link: string;
  readonly isDraft: boolean;
};

const DRAFT_MARK = '🤏🏼';

/**
 * Components list from the «Компоненты» section of the docs README
 */
const parseNavigation = (): readonly DocsNavItem[] => {
  const rawContent = content.split('## ').find(str => str.match(/^компоненты/i));
  const list = rawContent?.match(/-\s\[.*\]\(.*\)/gi);

  if (!list) {
    return [];
  }

  return list
    .map(str => {
      const matches = str.match(/^-\s\[(.*)\]\((.*)\)/i);
      if (!matches || matches.length < 3) {
        return null;
      }

      return {
        label: matches[1].replace(DRAFT_MARK, '').trim(),
        link: `/docs${matches[2].replace(/\/README\.md$/, '').replace(/^\./, '')}`,
        isDraft: matches[1].includes(DRAFT_MARK),
      };
    })
    .filter((el): el is DocsNavItem => el !== null);
};

export const docsNavigation = parseNavigation();

/**
 * Returns the navigation item of the page
 */
export const findDocsNavItem = (pathname: string): DocsNavItem | undefined =>
  docsNavigation.find(item => pathname === item.link || pathname.startsWith(`${item.link}/`));

export default docsNavigation;
