import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
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
import SyntaxHighlighter from '~/components/SyntaxHighlighter';

interface Props {
  readonly children: string;
  readonly overrides?: MarkdownToJSX.Overrides;
}

const Img = styled.img`
  max-width: 100%;
`;

const Anchor = styled.a`
  font-weight: 400;
  color: ${({ theme }) => theme.color.accentPrimary.darken(30).toString()};
`;

const AnchorLink = styled(Link)`
  font-weight: 400;
  color: ${({ theme }) => theme.color.accentPrimary.darken(30).toString()};
`;

const ExternalLink = styled.a`
  font-weight: 400;
  color: ${({ theme }) => theme.color.accentPrimary.darken(30).toString()};
`;

const ExternalLinkIcon = styled(OpenInNewIcon)`
  color: currentColor;
  font-size: 1em;
  margin-left: 0.1em;
  margin-top: -0.11em;
  vertical-align: middle;
`;

const MarkdownStrong = styled(Strong)`
  font-weight: 600;
`;

const MarkdownEm = styled(Em)`
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const CodeInline = styled.code`
  color: ${({ theme }) =>
    theme.isDark
      ? theme.color.accentPrimary.toString()
      : theme.color.accentPrimary.darken(60).toString()};
  padding: 0em 0.4em;
  border-radius: 4px;
  font-size: 1em;
  font-weight: 500;
`;

const relativeToAbsolute = (base: string, rel: string): string => {
  const resultArray = base.split('/');

  if (!base.match(/\/$/)) {
    resultArray.pop();
  }

  rel.split('/').forEach(item => {
    if (item === '..') {
      resultArray.pop();

      return;
    }
    if (item === '.') {
      return;
    }

    resultArray.push(item);
  });

  return resultArray.join('/');
};

const titleToAnchor = (headername: string | React.ReactNode): string => {
  const anchorName = String(headername)
    .toLowerCase()
    .replace(/[\s,/]/g, '-')
    .replace(/[^0-9a-zA-Z-А-Яа-яёЁйЙ]/gi, '');

  return anchorName;
};

const MarkdownRender: React.FC<Props> = props => {
  const { children, overrides } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Markdown
      options={{
        forceInline: false,
        overrides: {
          h1: p => (
            <H1>
              <Anchor aria-hidden="true" tabIndex={-1} id={titleToAnchor(p.children)} />
              {p.children}
            </H1>
          ),
          h2: p => (
            <H2>
              <Anchor aria-hidden="true" tabIndex={-1} id={titleToAnchor(p.children)} />
              {p.children}
            </H2>
          ),
          h3: p => (
            <H3>
              <Anchor aria-hidden="true" tabIndex={-1} id={titleToAnchor(p.children)} />
              {p.children}
            </H3>
          ),
          h4: p => (
            <H4>
              <Anchor aria-hidden="true" tabIndex={-1} id={titleToAnchor(p.children)} />
              {p.children}
            </H4>
          ),
          h5: p => (
            <H5>
              <Anchor aria-hidden="true" tabIndex={-1} id={titleToAnchor(p.children)} />
              {p.children}
            </H5>
          ),
          img: Img,
          blockquote: Blockquote,
          b: MarkdownStrong,
          strong: MarkdownStrong,
          em: MarkdownEm,
          p: Paragraph,
          ul: Ul,
          ol: Ol,
          table: Table,
          thead: TableHeader,
          tbody: TableBody,
          tr: TableRow,
          td: TableCell,
          th: TableHeaderCell,
          caption: TableCaption,
          pre: ({ children, ...otherProps }) => <div {...otherProps}>{children}</div>,
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
              const url = relativeToAbsolute(pathname, String(href || '').replace(/\.md/, ''));

              return (
                <AnchorLink to={url} title={title}>
                  {children}
                </AnchorLink>
              );
            }

            if (String(href || '').match(/#[a-zA-Z0-9а-яёй-]+$/i)) {
              const anchorName = String(href || '').match(/#([a-z0-9а-яёй-]+)$/)?.[1] || '';

              return (
                <AnchorLink
                  onClick={event => {
                    event.preventDefault();
                    const element = document.querySelector(`a[id="${anchorName}"]`);

                    if (element) {
                      const yOffset = -80; // app header height
                      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

                      window.scrollTo({ top: y, behavior: 'smooth' });
                      navigate(`${pathname}#${anchorName}`, { preventScrollReset: true });
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
            const { className, children } = p;

            if (typeof className === 'undefined') {
              return <CodeInline>{String(children).replace(/\n$/, '')}</CodeInline>;
            }

            const language = className.replace(/^lang-/, '');

            return (
              <SyntaxHighlighter wrapLongLines language={language as any} code={String(children)} />
            );
          },
          ...overrides,
        },
      }}
    >
      {children}
    </Markdown>
  );
};

export default MarkdownRender;
