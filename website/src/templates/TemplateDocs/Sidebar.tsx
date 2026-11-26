import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link, useLocation } from 'react-router-dom';

import { useT } from '~/translations';
import { useUi } from '~/providers/UiProvider';
import { docGroups, docs, findDocByPath } from '~/utils/docs';
import scrollToAnchor, { setLocationHash } from '~/utils/scrollToAnchor';
import { useDocsLayout } from './context';

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem 0.75rem 2rem;
  color: ${({ theme }) => theme.color.mainSidebarContrast.toString()};
  background-color: ${({ theme }) => theme.color.mainSidebar.toString()};
  overflow-y: auto;
`;

const Filter = styled.input`
  flex: 0 0 auto;
  appearance: none;
  width: 100%;
  height: 2.25rem;
  padding: 0 0.75rem;
  font: inherit;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.color.mainSidebarContrast.toString()};
  background-color: ${({ theme }) => theme.color.mainSidebarContrast.alpha(0.06).toString()};
  border: 1px solid ${({ theme }) => theme.color.mainSidebarContrast.alpha(0.14).toString()};
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 120ms ease-out;

  &::placeholder {
    color: ${({ theme }) => theme.color.mainSidebarContrast.alpha(0.55).toString()};
  }

  &:focus {
    border-color: ${({ theme }) => theme.color.accentPrimary.toString()};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.color.accentPrimary.alpha(0.15).toString()};
  }
`;

const Group = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
`;

const GroupTitle = styled.div`
  padding: 0 0.75rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.mainSidebarContrast.alpha(0.55).toString()};
`;

type ItemStyle = {
  readonly $isActive: boolean;
};

const Item = styled(Link, { shouldForwardProp: p => !p.startsWith('$') })<ItemStyle>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.75rem;
  font-size: 0.875rem;
  color: inherit;
  text-decoration: none;
  border-radius: 0.375rem;
  transition:
    color 120ms ease-out,
    background-color 120ms ease-out;

  &:hover {
    color: ${({ theme }) => theme.color.mainSidebarContrast.toString()};
    background-color: ${({ theme }) => theme.color.mainSidebarContrast.alpha(0.08).toString()};
  }

  ${({ $isActive, theme }) =>
    $isActive &&
    css`
      color: ${theme.color.accentPrimary.toString()};
      background-color: ${theme.color.accentPrimary.alpha(0.1).toString()};

      &:hover {
        color: ${theme.color.accentPrimary.toString()};
        background-color: ${theme.color.accentPrimary.alpha(0.14).toString()};
      }

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.35rem;
        bottom: 0.35rem;
        width: 2px;
        border-radius: 2px;
        background: ${theme.color.accentPrimary.toString()};
        box-shadow: 0 0 8px ${theme.color.accentPrimary.alpha(0.7).toString()};
      }
    `};
`;

const SubItems = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.15rem 0 0.35rem 1.1rem;
  padding-left: 0.5rem;
  border-left: 1px solid ${({ theme }) => theme.color.border.toString()};
`;

const Draft = styled.span`
  margin-left: auto;
  padding: 0 0.35rem;
  font-size: 0.65rem;
  color: ${({ theme }) => theme.color.warning.toString()};
  border: 1px solid ${({ theme }) => theme.color.warning.alpha(0.4).toString()};
  border-radius: 0.25rem;
`;

const SubItem = styled.a`
  padding: 0.22rem 0.5rem;
  font-size: 0.8rem;
  line-height: 1.35;
  color: ${({ theme }) => theme.color.mainSidebarContrast.alpha(0.7).toString()};
  text-decoration: none;
  border-radius: 0.3rem;

  &:hover {
    color: ${({ theme }) => theme.color.mainSidebarContrast.toString()};
    background-color: ${({ theme }) => theme.color.mainSidebarContrast.alpha(0.08).toString()};
  }
`;

const SiteGroup = styled(Group)`
  @media all and (min-width: 761px) {
    display: none;
  }
`;

const Empty = styled.div`
  padding: 0 0.75rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const Sidebar = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((props, ref) => {
  const { pathname } = useLocation();
  const { locale } = useUi();
  const t = useT();
  const { headings } = useDocsLayout();
  const [filter, setFilter] = React.useState('');
  const activeDoc = findDocByPath(pathname);

  const query = filter.trim().toLowerCase();
  const sections = headings.filter(heading => heading.level === 2);
  const matches = (text: string) => query === '' || text.toLowerCase().includes(query);

  const groups = docGroups
    .map(({ group, title }) => ({
      title: title[locale],
      items: docs.filter(
        doc =>
          doc.group === group &&
          (matches(doc.title[locale]) ||
            matches(doc.description) ||
            (doc === activeDoc && sections.some(section => matches(section.text)))),
      ),
    }))
    .filter(group => group.items.length > 0);

  return (
    <Container {...props} ref={ref}>
      <Filter
        type="search"
        value={filter}
        onChange={event => setFilter(event.currentTarget.value)}
        placeholder={t('sidebar.filter')}
        aria-label={t('sidebar.filter')}
      />

      {groups.map(group => (
        <Group key={group.title}>
          <GroupTitle>{group.title}</GroupTitle>
          {group.items.map(doc => {
            const isActive = doc === activeDoc;
            const visibleSections = isActive
              ? sections.filter(section => matches(section.text) || matches(doc.title[locale]))
              : [];

            return (
              <React.Fragment key={doc.id}>
                <Item
                  to={doc.path}
                  $isActive={isActive}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {doc.title[locale]}
                  {doc.isDraft && <Draft>draft</Draft>}
                </Item>
                {visibleSections.length > 0 && (
                  <SubItems>
                    {visibleSections.map(section => (
                      <SubItem
                        key={section.slug}
                        href={`#${section.slug}`}
                        onClick={event => {
                          event.preventDefault();
                          if (scrollToAnchor(section.slug)) {
                            setLocationHash(section.slug);
                          }
                        }}
                      >
                        {section.text}
                      </SubItem>
                    ))}
                  </SubItems>
                )}
              </React.Fragment>
            );
          })}
        </Group>
      ))}

      {groups.length === 0 && <Empty>{t('sidebar.empty')}</Empty>}

      <SiteGroup>
        <GroupTitle>{t('sidebar.group.site')}</GroupTitle>
        <Item to="/" $isActive={false}>
          {t('nav.home')}
        </Item>
      </SiteGroup>
    </Container>
  );
});
Sidebar.displayName = 'Sidebar';

export default Sidebar;
