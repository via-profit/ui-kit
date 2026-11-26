import React from 'react';

import type { MarkdownHeading } from '~/utils/markdown';

interface DocsLayoutContextValue {
  /**
   * Headings of the opened page, they are shown in the sidebar under the page item
   */
  readonly headings: readonly MarkdownHeading[];
  readonly setHeadings: (headings: readonly MarkdownHeading[]) => void;
}

export const DocsLayoutContext = React.createContext<DocsLayoutContextValue>({
  headings: [],
  setHeadings: () => undefined,
});

export const useDocsLayout = () => React.useContext(DocsLayoutContext);
