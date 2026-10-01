import content from '@via-profit/ui-kit/docs/README.md';

export type DocsNavItem = {
  readonly label: string;
  readonly link: string;
  readonly description: string;
  readonly group: string;
  readonly isDraft: boolean;
};

export type DocsNavGroup = {
  readonly title: string;
  readonly items: readonly DocsNavItem[];
};

const DRAFT_MARK = '🤏🏼';

/**
 * The «Компоненты» section of the docs README.
 * A top-level item without a link is a group, the nested items with links are the components:
 *
 * ```md
 * - Основы
 *   - [Темы оформления](./theming/README.md) — description
 * ```
 *
 * The items with links on the top level (without a group) are supported too
 */
const parseNavigation = (): readonly DocsNavItem[] => {
  const rawContent = content.split('## ').find(str => str.match(/^компоненты/i));

  if (!rawContent) {
    return [];
  }

  const items: DocsNavItem[] = [];
  let group = '';

  rawContent.split('\n').forEach(line => {
    const link = line.match(/^\s*-\s\[([^\]]*)\]\(([^)]*)\)(?:\s+—\s+(.*))?$/);

    if (link) {
      const [, label, href, description = ''] = link;
      items.push({
        label: label.replace(DRAFT_MARK, '').trim(),
        link: `/docs${href.replace(/\/README\.md$/, '').replace(/^\./, '')}`,
        description: description.trim(),
        group,
        isDraft: label.includes(DRAFT_MARK),
      });

      return;
    }

    const groupTitle = line.match(/^-\s+(.+)$/);
    if (groupTitle) {
      group = groupTitle[1].trim();
    }
  });

  return items;
};

export const docsNavigation = parseNavigation();

/**
 * The components grouped in the order of the README
 */
export const docsNavigationGroups: readonly DocsNavGroup[] = docsNavigation.reduce<DocsNavGroup[]>(
  (groups, item) => {
    const last = groups[groups.length - 1];

    if (last && last.title === item.group) {
      return [...groups.slice(0, -1), { ...last, items: [...last.items, item] }];
    }

    return [...groups, { title: item.group, items: [item] }];
  },
  [],
);

/**
 * Returns the navigation item of the page
 */
export const findDocsNavItem = (pathname: string): DocsNavItem | undefined =>
  docsNavigation.find(item => pathname === item.link || pathname.startsWith(`${item.link}/`));

export default docsNavigation;
