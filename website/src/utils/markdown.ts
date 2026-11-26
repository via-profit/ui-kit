import slugify from './slugify';

export interface MarkdownHeading {
  readonly level: number;
  readonly text: string;
  readonly slug: string;
}

export interface MarkdownSection {
  readonly heading: MarkdownHeading | null;
  readonly body: string;
}

/**
 * Plain text of the inline markdown: `code`, [link](url), **bold**
 */
export const markdownToText = (markdown: string): string =>
  markdown
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/(\*\*|__|\*|_|~~)(.*?)\1/g, '$2')
    .replace(/<[^>]+>/g, '')
    .trim();

/**
 * Splits the markdown into sections by headings. Headings inside code blocks are ignored.
 * Anchors are generated the same way as the markdown renderer does (with `-1`, `-2` suffixes for duplicates)
 */
export const parseSections = (markdown: string): MarkdownSection[] => {
  const sections: MarkdownSection[] = [];
  const usedSlugs = new Map<string, number>();
  let current: { heading: MarkdownHeading | null; lines: string[] } = { heading: null, lines: [] };
  let fence: string | null = null;

  const flush = () => {
    sections.push({ heading: current.heading, body: current.lines.join('\n').trim() });
  };

  markdown.split(/\r?\n/).forEach(line => {
    const fenceMatch = line.match(/^\s*(```|~~~)/);
    if (fenceMatch) {
      fence = fence === null ? fenceMatch[1] : fence === fenceMatch[1] ? null : fence;
      current.lines.push(line);

      return;
    }

    const headingMatch = fence === null ? line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/) : null;
    if (!headingMatch) {
      current.lines.push(line);

      return;
    }

    flush();

    const text = markdownToText(headingMatch[2]);
    const base = slugify(text);
    const count = usedSlugs.get(base) ?? 0;
    usedSlugs.set(base, count + 1);

    current = {
      heading: {
        level: headingMatch[1].length,
        text,
        slug: count === 0 ? base : `${base}-${count}`,
      },
      lines: [],
    };
  });

  flush();

  return sections;
};

/**
 * Headings of the document, which are shown in the table of contents
 */
export const extractHeadings = (markdown: string, levels: readonly number[] = [2, 3]) =>
  parseSections(markdown)
    .map(section => section.heading)
    .filter((heading): heading is MarkdownHeading => !!heading && levels.includes(heading.level));

/**
 * The documentation pages have the own «Table of contents» section for GitHub.
 * On the site the table of contents is shown aside, so this section is removed
 */
export const removeTableOfContents = (markdown: string): string =>
  markdown
    .replace(/^##\s+(Содержание|Contents|Table of contents)\s*\n[\s\S]*?(?=^##\s|^---\s*$)/im, '')
    // a manual table of contents: a list of anchor links without a heading
    .replace(/(?:^[ \t]*[-*]\s+\[[^\]]+\]\(#[^)]+\)[ \t]*\n){3,}/m, '');
