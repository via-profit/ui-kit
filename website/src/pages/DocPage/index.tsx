import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import type { MarkdownToJSX } from 'markdown-to-jsx';

import Breadcrumbs from '~/components/Breadcrumbs';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import TableOfContent from '~/components/TableOfContent';
import { ChevronLeftIcon, ChevronRightIcon, EditIcon } from '~/components/Icons';
import { useDocsLayout } from '~/templates/TemplateDocs/context';
import { useUi } from '~/providers/UiProvider';
import { useT } from '~/translations';
import { docEditUrl, docs } from '~/utils/docs';
import type { DocEntry } from '~/utils/docs';
import { extractHeadings, removeTableOfContents } from '~/utils/markdown';

export interface DocPageProps {
  readonly doc: DocEntry;

  /**
   * The markdown of the page. The route loads it before the rendering,
   * both on the server and in the browser
   */
  readonly content: string;

  /**
   * The components substituted for the tags of the markdown: the live examples (`<ExampleButtonBasic />`)
   */
  readonly overrides?: MarkdownToJSX.Overrides;
}

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 3rem;
`;

const PageFooter = styled.div`
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.color.border.toString()};
`;

const EditLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.color.accentPrimary.toString()};
  }
`;

const Pager = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 1.25rem;
`;

const PagerLink = styled(Link, { shouldForwardProp: prop => prop !== '$next' })<{ $next?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  grid-column: ${({ $next }) => ($next ? 2 : 1)};
  padding: 0.85rem 1rem;
  text-align: ${({ $next }) => ($next ? 'right' : 'left')};
  text-decoration: none;
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border: 1px solid ${({ theme }) => theme.color.border.toString()};
  border-radius: 0.6rem;
  transition: border-color 120ms ease-out;

  &:hover {
    border-color: ${({ theme }) => theme.color.accentPrimary.alpha(0.6).toString()};
  }
`;

const PagerLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const PagerTitle = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.color.accentPrimary.toString()};
`;

/**
 * The page of the documentation: the markdown with the breadcrumbs, the table of contents,
 * the link to GitHub and the links to the neighbor pages
 */
const DocPage: React.FC<DocPageProps> = ({ doc, content, overrides }) => {
  const { locale } = useUi();
  const t = useT();
  const { setHeadings } = useDocsLayout();

  const markdown = React.useMemo(() => removeTableOfContents(content), [content]);
  const headings = React.useMemo(() => extractHeadings(markdown), [markdown]);

  React.useEffect(() => {
    setHeadings(headings);

    return () => setHeadings([]);
  }, [headings, setHeadings]);

  const index = docs.indexOf(doc);
  const prev = docs[index - 1];
  const next = docs[index + 1];

  return (
    <>
      <Breadcrumbs
        items={[
          { label: t('breadcrumbs.docs'), to: '/docs' },
          ...(doc.path === '/docs' ? [] : [{ label: doc.title[locale] }]),
        ]}
      />
      <Content>
        <DocsArticle>
          <RenderMarkdown overrides={overrides}>{markdown}</RenderMarkdown>

          <PageFooter>
            <EditLink href={docEditUrl(doc)} target="_blank" rel="noopener noreferrer">
              <EditIcon />
              {t('doc.edit')}
            </EditLink>
            <Pager>
              {prev && (
                <PagerLink to={prev.path}>
                  <PagerLabel>
                    <ChevronLeftIcon />
                    {t('doc.prev')}
                  </PagerLabel>
                  <PagerTitle>{prev.title[locale]}</PagerTitle>
                </PagerLink>
              )}
              {next && (
                <PagerLink to={next.path} $next>
                  <PagerLabel css={{ justifyContent: 'flex-end' }}>
                    {t('doc.next')}
                    <ChevronRightIcon />
                  </PagerLabel>
                  <PagerTitle>{next.title[locale]}</PagerTitle>
                </PagerLink>
              )}
            </Pager>
          </PageFooter>
        </DocsArticle>
        <TableOfContent headings={headings} />
      </Content>
    </>
  );
};

export default DocPage;
