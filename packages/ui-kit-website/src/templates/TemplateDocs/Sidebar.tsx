import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { docsNavigationGroups } from '~/utils/docsNavigation';

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
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border: 1px solid ${({ theme }) => theme.color.border.toString()};
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 120ms ease-out;

  &::placeholder {
    color: ${({ theme }) => theme.color.textSecondary.toString()};
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

const ComponentGroups = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const GroupTitle = styled.div`
  padding: 0 0.75rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

type ItemStyle = {
  readonly $isActive: boolean;
};

const Item = styled(Link, { shouldForwardProp: p => p.match(/^\$/) === null })<ItemStyle>`
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
    color: ${({ theme }) => theme.color.textPrimary.toString()};
    background-color: ${({ theme }) => theme.color.backgroundSecondary.alpha(0.6).toString()};
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

const Draft = styled.span`
  margin-left: auto;
  padding: 0 0.35rem;
  font-size: 0.65rem;
  line-height: 1.1rem;
  color: ${({ theme }) => theme.color.warning.toString()};
  border: 1px solid ${({ theme }) => theme.color.warning.alpha(0.4).toString()};
  border-radius: 0.25rem;
`;

const Empty = styled.div`
  padding: 0 0.75rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const Sidebar: React.ForwardRefRenderFunction<HTMLElement, React.HTMLAttributes<HTMLElement>> = (
  props,
  ref,
) => {
  const { pathname } = useLocation();
  const intl = useIntl();
  const [filter, setFilter] = React.useState('');
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const scrollAlreadyAffectedRef = React.useRef(false);

  const isActive = React.useCallback(
    (link: string) => pathname === link || pathname.startsWith(`${link}/`),
    [pathname],
  );

  // Search by the name and by the description: «дат» finds the calendar, the date picker and the masked field.
  // The groups without the found items are hidden
  const groups = React.useMemo(() => {
    const query = filter.trim().toLowerCase();

    if (query === '') {
      return docsNavigationGroups;
    }

    return docsNavigationGroups
      .map(group => ({
        ...group,
        items: group.items.filter(
          item =>
            item.label.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query),
        ),
      }))
      .filter(group => group.items.length > 0);
  }, [filter]);

  // Scroll the active item into view once (e.g. after opening a page by the direct link)
  React.useEffect(() => {
    if (scrollAlreadyAffectedRef.current) {
      return undefined;
    }

    const timeout = setTimeout(() => {
      const elem = listRef.current?.querySelector('[aria-current="page"]');
      if (elem) {
        scrollAlreadyAffectedRef.current = true;
        elem.scrollIntoView({ block: 'nearest' });
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <Container {...props} ref={ref}>
      <Filter
        type="search"
        value={filter}
        onChange={event => setFilter(event.currentTarget.value)}
        placeholder={intl.formatMessage({ defaultMessage: 'Найти компонент…' })}
        aria-label={intl.formatMessage({ defaultMessage: 'Найти компонент' })}
      />

      <Group>
        <GroupTitle>{intl.formatMessage({ defaultMessage: 'Начало' })}</GroupTitle>
        <Item
          to="/docs"
          $isActive={pathname === '/docs'}
          aria-current={pathname === '/docs' ? 'page' : undefined}
        >
          {intl.formatMessage({ defaultMessage: 'Введение' })}
        </Item>
        <Item
          to="/docs/showcase"
          $isActive={isActive('/docs/showcase')}
          aria-current={isActive('/docs/showcase') ? 'page' : undefined}
        >
          {intl.formatMessage({ defaultMessage: 'Примеры использования' })}
        </Item>
        <Item
          to="/docs/playground"
          $isActive={isActive('/docs/playground')}
          aria-current={isActive('/docs/playground') ? 'page' : undefined}
        >
          {intl.formatMessage({ defaultMessage: 'Песочница отступов' })}
        </Item>
        <Item
          to="/docs/changelog"
          $isActive={isActive('/docs/changelog')}
          aria-current={isActive('/docs/changelog') ? 'page' : undefined}
        >
          {intl.formatMessage({ defaultMessage: 'Список изменений' })}
        </Item>
      </Group>

      <ComponentGroups ref={listRef}>
        {groups.map(group => (
          <Group key={group.title} role="group" aria-label={group.title || undefined}>
            {group.title && <GroupTitle aria-hidden>{group.title}</GroupTitle>}
            {group.items.map(({ link, label, description, isDraft }) => (
              <Item
                key={link}
                to={link}
                title={description || undefined}
                $isActive={isActive(link)}
                aria-current={isActive(link) ? 'page' : undefined}
              >
                {label}
                {isDraft && <Draft>draft</Draft>}
              </Item>
            ))}
          </Group>
        ))}
        {groups.length === 0 && (
          <Empty>{intl.formatMessage({ defaultMessage: 'Ничего не найдено' })}</Empty>
        )}
      </ComponentGroups>
    </Container>
  );
};

export default React.forwardRef(Sidebar);
