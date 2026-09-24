import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';
import Markdown, { MarkdownToJSX } from 'markdown-to-jsx';
import H1 from '@via-profit/ui-kit/src/Typography/H1';
import H2 from '@via-profit/ui-kit/src/Typography/H2';
import H3 from '@via-profit/ui-kit/src/Typography/H3';
import H4 from '@via-profit/ui-kit/src/Typography/H4';
import H5 from '@via-profit/ui-kit/src/Typography/H5';
import Strong from '@via-profit/ui-kit/src/Typography/Strong';
import Em from '@via-profit/ui-kit/src/Typography/Em';
import Paragraph from '@via-profit/ui-kit/src/Typography/Paragraph';
import { Ul, Ol } from '@via-profit/ui-kit/src/Typography/List';
import Blockquote from '@via-profit/ui-kit/src/Typography/Blockquote';
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableHeaderCell,
  TableCaption,
  TableBody,
} from '@via-profit/ui-kit/src/Table';

import OpenInNewIcon from '~/components/Icons/OpenOutline';
import scrollToAnchor, { setLocationHash } from '~/utils/scrollToAnchor';
import SyntaxHighlighter from '~/components/SyntaxHighlighter';

interface Props {
  readonly children: string;
  readonly overrides?: MarkdownToJSX.Overrides;
}

const Img = styled.img`
  max-width: 100%;
  border-radius: 0.5rem;
`;

const Anchor = styled.a`
  position: relative;
  top: calc(-1 * var(--header-height));
`;

const linkStyles = (theme: Theme) => css`
  font-weight: 500;
  color: ${theme.color.accentPrimary.toString()};
  text-decoration: none;
  border-bottom: 1px solid ${theme.color.accentPrimary.alpha(0.3).toString()};
  transition: border-color 120ms ease-out;

  &:hover {
    border-bottom-color: ${theme.color.accentPrimary.toString()};
  }
`;

const AnchorLink = styled(Link)`
  ${({ theme }) => linkStyles(theme)};
`;

const ExternalLink = styled.a`
  ${({ theme }) => linkStyles(theme)};
`;

const ExternalLinkIcon = styled(OpenInNewIcon)`
  color: currentColor;
  font-size: 0.85em;
  margin-left: 0.15em;
  margin-top: -0.11em;
  vertical-align: middle;
`;

const MarkdownStrong = styled(Strong)`
  font-weight: 600;
  color: ${({ theme }) => theme.color.textPrimary.toString()};
`;

const MarkdownEm = styled(Em)`
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const MarkdownParagraph = styled(Paragraph)`
  margin: 0 0 1em;
  font-weight: 400;
  line-height: 1.75;
  color: ${({ theme }) => theme.color.textPrimary.alpha(0.88).toString()};
`;

const listStyles = (theme: Theme) => css`
  margin: 0 0 1em;
  padding-left: 1.4em;
  font-weight: 400;
  line-height: 1.75;
  color: ${theme.color.textPrimary.alpha(0.88).toString()};

  & li::marker {
    color: ${theme.color.accentPrimary.toString()};
  }
`;

const MarkdownUl = styled(Ul)`
  ${({ theme }) => listStyles(theme)};
`;

const MarkdownOl = styled(Ol)`
  ${({ theme }) => listStyles(theme)};
`;

const CodeInline = styled.code`
  font-family: var(--font-mono);
  font-size: 0.85em;
  color: ${({ theme }) => theme.color.accentPrimary.toString()};
  background-color: ${({ theme }) => theme.color.accentPrimary.alpha(0.08).toString()};
  border: 1px solid ${({ theme }) => theme.color.accentPrimary.alpha(0.15).toString()};
  padding: 0.1em 0.4em;
  border-radius: 0.3rem;
`;

const Heading = styled(H1)`
  margin: 0 0 0.75em;
  font-size: 2.1rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
`;

const MarkdownH2 = styled(H2)`
  margin: 2.2em 0 0.8em;
  padding-top: 1.2em;
  font-size: 1.45rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  border-top: 1px solid ${({ theme }) => theme.color.border.toString()};
`;

const MarkdownH3 = styled(H3)`
  margin: 1.8em 0 0.6em;
  font-size: 1.15rem;
  font-weight: 600;
`;

const MarkdownH4 = styled(H4)`
  margin: 1.5em 0 0.5em;
  font-size: 1rem;
  font-weight: 600;
`;

const MarkdownH5 = styled(H5)`
  margin: 1.2em 0 0.5em;
  font-size: 0.95rem;
  font-weight: 600;
`;

const MarkdownBlockquote = styled(Blockquote)`
  margin: 1.25em 0;
  padding: 0.75em 1em;
  color: ${({ theme }) => theme.color.textPrimary.alpha(0.88).toString()};
  background-color: ${({ theme }) => theme.color.accentPrimary.alpha(0.06).toString()};
  border-left: 3px solid ${({ theme }) => theme.color.accentPrimary.toString()};
  border-radius: 0 0.5rem 0.5rem 0;

  & p:last-of-type {
    margin-bottom: 0;
  }
`;

const TableWrapper = styled.div`
  margin: 1.25em 0 1.5em;
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.color.border.toString()};
  border-radius: 0.6rem;
`;

const MarkdownTable = styled(Table)`
  width: 100%;
  font-size: 0.875rem;
  background: transparent;
  box-shadow: none;
  border-radius: 0;
`;

const MarkdownTableHeader = styled(TableHeader)`
  & th {
    background-color: ${({ theme }) => theme.color.backgroundSecondary.alpha(0.6).toString()};
  }
`;

const MarkdownTableHeaderCell = styled(TableHeaderCell)`
  padding: 0.6em 1em;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: left;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
  background-color: ${({ theme }) => theme.color.backgroundSecondary.alpha(0.6).toString()};
  border-bottom: 1px solid ${({ theme }) => theme.color.border.toString()};
`;

const MarkdownTableRow = styled(TableRow)`
  &:not(:last-of-type) td {
    border-bottom: 1px solid ${({ theme }) => theme.color.border.toString()};
  }

  &:hover td {
    background-color: ${({ theme }) => theme.color.backgroundSecondary.alpha(0.35).toString()};
  }
`;

const MarkdownTableCell = styled(TableCell)`
  padding: 0.6em 1em;
  vertical-align: top;
  border: none;
`;

const ExamplePreview = styled.div`
  margin: 1.25em 0 1.5em;
  padding: 1.5rem;
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.color.border.toString()};
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.color.backgroundPrimary.toString()};
  background-image: radial-gradient(
    ${({ theme }) => theme.color.border.alpha(0.6).toString()} 1px,
    transparent 1px
  );
  background-size: 16px 16px;
`;

type AnyComponent = React.ComponentType<Record<string, unknown>>;

/**
 * Stable wrappers of the examples: the same component must be returned for the same example,
 * otherwise the example is remounted (and loses its state) on every render
 */
const examplesCache = new WeakMap<AnyComponent, AnyComponent>();

const wrapExample = (Example: AnyComponent): AnyComponent => {
  const cached = examplesCache.get(Example);
  if (cached) {
    return cached;
  }

  const Wrapped: React.FC<Record<string, unknown>> = exampleProps => (
    <ExamplePreview>
      <Example {...exampleProps} />
    </ExamplePreview>
  );
  Wrapped.displayName = `ExamplePreview(${Example.displayName || Example.name || 'Example'})`;
  examplesCache.set(Example, Wrapped);

  return Wrapped;
};

/**
 * Resolves the markdown link relative to the current page.
 * Every docs page renders a `README.md` of the directory, so the page path is the directory
 * of the document: `./button` from `/docs` -> `/docs/button`, `../calendar` from `/docs/menu` -> `/docs/calendar`
 */
const relativeToAbsolute = (baseDir: string, rel: string): string => {
  const resultArray = baseDir.split('/').filter(Boolean);

  rel.split('/').forEach(item => {
    if (item === '..') {
      resultArray.pop();

      return;
    }
    if (item === '.' || item === '') {
      return;
    }

    resultArray.push(item);
  });

  return `/${resultArray.join('/')}`;
};

const titleToAnchor = (headername: string | React.ReactNode): string => {
  const anchorName = String(headername)
    .toLowerCase()
    .replace(/[\s,/]/g, '-')
    // The hyphen is the last in the class, otherwise `Z-А` is a range of ~1000 chars
    .replace(/[^0-9a-zA-ZА-Яа-яёЁйЙ-]/gi, '');

  return anchorName;
};

const MarkdownRender: React.FC<Props> = props => {
  const { children, overrides } = props;
  const { pathname, hash } = useLocation();

  // Examples (<ExampleXxx> tags) are rendered inside the preview frame
  const examplesOverrides = React.useMemo(
    () =>
      Object.fromEntries(
        Object.entries(overrides || {}).map(([name, value]) => [
          name,
          name.startsWith('Example') && typeof value === 'function'
            ? wrapExample(value as AnyComponent)
            : value,
        ]),
      ) as MarkdownToJSX.Overrides,
    [overrides],
  );

  // Pages are loaded asynchronously, so ScrollRestoration can not find the anchor
  // from the URL and scrolls to top. Scroll to it when the markdown is rendered
  React.useEffect(() => {
    if (hash) {
      scrollToAnchor(decodeURIComponent(hash.slice(1)), 'auto');
    }
  }, [hash, children]);

  return (
    <Markdown
      options={{
        forceInline: false,
        overrides: {
          h1: p => (
            <Heading>
              <Anchor aria-hidden="true" tabIndex={-1} id={titleToAnchor(p.children)} />
              {p.children}
            </Heading>
          ),
          h2: p => (
            <MarkdownH2>
              <Anchor aria-hidden="true" tabIndex={-1} id={titleToAnchor(p.children)} />
              {p.children}
            </MarkdownH2>
          ),
          h3: p => (
            <MarkdownH3>
              <Anchor aria-hidden="true" tabIndex={-1} id={titleToAnchor(p.children)} />
              {p.children}
            </MarkdownH3>
          ),
          h4: p => (
            <MarkdownH4>
              <Anchor aria-hidden="true" tabIndex={-1} id={titleToAnchor(p.children)} />
              {p.children}
            </MarkdownH4>
          ),
          h5: p => (
            <MarkdownH5>
              <Anchor aria-hidden="true" tabIndex={-1} id={titleToAnchor(p.children)} />
              {p.children}
            </MarkdownH5>
          ),
          img: Img,
          blockquote: MarkdownBlockquote,
          b: MarkdownStrong,
          strong: MarkdownStrong,
          em: MarkdownEm,
          p: MarkdownParagraph,
          ul: MarkdownUl,
          ol: MarkdownOl,
          table: ({ children, ...restProps }) => (
            <TableWrapper>
              <MarkdownTable {...restProps}>{children}</MarkdownTable>
            </TableWrapper>
          ),
          thead: MarkdownTableHeader,
          tbody: TableBody,
          tr: MarkdownTableRow,
          td: ({ children, ...restProps }) => (
            <MarkdownTableCell {...restProps}>
              {Array.isArray(children) && children.length === 0 ? `\u00A0` : children}
            </MarkdownTableCell>
          ),
          th: MarkdownTableHeaderCell,
          caption: TableCaption,
          pre: ({ children }) => <>{children}</>,
          a: ({ href, title, children }) => {
            if (String(href || '').match(/^(http|https):\/\//)) {
              return (
                <ExternalLink
                  target="_blank"
                  rel="noopener noreferrer"
                  title={typeof title === 'string' ? title : undefined}
                  href={href}
                >
                  {children}
                  {!String(href || '').match(/^https:\/\/codesandbox\.io\/s\//) && (
                    <ExternalLinkIcon />
                  )}
                </ExternalLink>
              );
            }

            if (String(href || '').match(/\.md(#[a-zA-Z0-9а-яёй-]+){0,1}$/i)) {
              const url = relativeToAbsolute(
                pathname,
                String(href || '').replace(/(\/README){0,1}\.md/, ''),
              );

              return (
                <AnchorLink to={url} title={title}>
                  {children}
                </AnchorLink>
              );
            }

            if (String(href || '').match(/#[a-zA-Z0-9а-яёй-]+$/i)) {
              const anchorName = String(href || '').match(/#([a-z0-9а-яёй-]+)$/i)?.[1] || '';

              return (
                <AnchorLink
                  onClick={event => {
                    event.preventDefault();

                    if (scrollToAnchor(anchorName)) {
                      setLocationHash(pathname, anchorName);
                    }
                  }}
                  title={typeof title === 'string' ? title : undefined}
                  to={href}
                >
                  {children}
                </AnchorLink>
              );
            }

            return (
              <AnchorLink title={typeof title === 'string' ? title : undefined} to={href || ''}>
                {children}
              </AnchorLink>
            );
          },
          code: p => {
            const { className, children, lang } = p;

            const language =
              typeof lang === 'string'
                ? lang
                : typeof className === 'string'
                  ? className.replace(/^lang-/, '')
                  : null;

            if (!language) {
              return <CodeInline>{String(children).replace(/\n$/, '')}</CodeInline>;
            }

            return (
              <SyntaxHighlighter wrapLongLines language={language as any} code={String(children)} />
            );
          },
          ...examplesOverrides,
        },
      }}
    >
      {children}
    </Markdown>
  );
};

export default MarkdownRender;
