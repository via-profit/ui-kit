import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FormattedMessage } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';

import scrollToAnchorElement, { setLocationHash } from '~/utils/scrollToAnchor';

export interface TableOfContentProps {
  readonly content: string;
}

const StyledContainer = styled.aside`
  position: sticky;
  top: calc(var(--header-height) + 1.75rem);
  flex: 0 0 14rem;
  width: 14rem;
  max-height: calc(100vh - var(--header-height) - 3.5rem);
  overflow-y: auto;

  @media all and (max-width: 1200px) {
    display: none;
  }
`;

const Heading = styled.div`
  margin-bottom: 0.75rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${({ theme }) => theme.color.border.toString()};
`;

type StyledLinkProps = {
  readonly $isActive: boolean;
};

const StyledLink = styled(Link, { shouldForwardProp: p => p[0] !== '$' })<StyledLinkProps>`
  position: relative;
  display: block;
  margin-left: -1px;
  padding: 0.3rem 0 0.3rem 0.9rem;
  font-size: 0.82rem;
  line-height: 1.4;
  text-decoration: none;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
  border-left: 2px solid transparent;
  transition:
    color 120ms ease-out,
    border-color 120ms ease-out;

  &:hover {
    color: ${({ theme }) => theme.color.textPrimary.toString()};
  }

  ${({ $isActive, theme }) =>
    $isActive &&
    css`
      color: ${theme.color.accentPrimary.toString()};
      border-left-color: ${theme.color.accentPrimary.toString()};

      &:hover {
        color: ${theme.color.accentPrimary.toString()};
      }
    `}
`;

type Elem = {
  readonly label: string;
  readonly link: string;
};

const TableOfContent: React.FC<TableOfContentProps> = props => {
  const { content } = props;
  const { pathname } = useLocation();
  const [activeAnchor, setActiveAnchor] = React.useState<string | null>(null);
  const observersRef = React.useRef<IntersectionObserver[]>([]);
  const headingsRef = React.useRef<Map<string, HTMLElement>>(new Map());

  const listItems: readonly Elem[] = React.useMemo(() => {
    const rawContent = content
      .split('## ')
      .find(str => str.match(/^(содержание|table of contents)/i));
    if (!rawContent) {
      return [];
    }

    const list = rawContent.match(/-\s\[.*\]\(.*\)/gi);
    if (!list) {
      return [];
    }

    return list
      .map(str => {
        const matches = str.match(/^-\s\[(.*)\]\((.*)\)/i);
        if (matches && matches.length > 2) {
          return {
            label: matches[1],
            link: matches[2].replace(/^#/, ''),
          };
        }

        return null;
      })
      .filter((el): el is Elem => el !== null);
  }, [content]);

  // Очистка наблюдателей при размонтировании
  React.useEffect(() => {
    const observers = observersRef.current;

    return () => {
      observers.forEach(observer => observer.disconnect());
      observersRef.current = [];
    };
  }, []);

  // Настройка наблюдателей
  React.useEffect(() => {
    // Очищаем предыдущие наблюдатели
    observersRef.current.forEach(observer => observer.disconnect());
    observersRef.current = [];
    headingsRef.current.clear();

    if (listItems.length === 0) return;

    // Находим все целевые элементы
    listItems.forEach(({ link }) => {
      const anchor = document.querySelector(`a[id="${link}"]`);
      if (anchor instanceof HTMLElement) {
        headingsRef.current.set(link, anchor);
      }
    });

    // Создаем наблюдатель
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Находим соответствующий link по элементу
            const activeLink = Array.from(headingsRef.current.entries()).find(
              ([, element]) => element === entry.target,
            )?.[0];

            if (activeLink) {
              setActiveAnchor(activeLink);
            }
          }
        });
      },
      {
        root: null,
        threshold: 0.3, // Увеличил threshold для более стабильного определения
        rootMargin: '-80px 0px -50% 0px', // Учитываем высоту header
      },
    );

    // Наблюдаем за всеми элементами
    headingsRef.current.forEach(element => {
      observer.observe(element);
    });

    observersRef.current = [observer];

    // Устанавливаем начальный активный элемент
    const findInitialActive = () => {
      const scrollPosition = window.scrollY;
      let currentActive: string | null = null;
      let minDistance = Infinity;

      headingsRef.current.forEach((element, link) => {
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top + window.scrollY - scrollPosition);

        if (distance < minDistance) {
          minDistance = distance;
          currentActive = link;
        }
      });

      if (currentActive) {
        setActiveAnchor(currentActive);
      }
    };

    // Небольшая задержка для корректного определения после монтирования
    const timeout = setTimeout(findInitialActive, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [listItems]);

  const scrollToAnchor = React.useCallback(
    (link: string, event: React.MouseEvent) => {
      event.preventDefault();

      if (scrollToAnchorElement(link)) {
        setLocationHash(pathname, link);
      }
    },
    [pathname],
  );

  if (listItems.length === 0) {
    return null;
  }

  return (
    <StyledContainer>
      <Heading>
        <FormattedMessage defaultMessage="На этой странице" />
      </Heading>
      <Nav>
        {listItems.map(({ label, link }) => (
          <StyledLink
            onClick={event => scrollToAnchor(link, event)}
            to={`#${link}`}
            key={link}
            $isActive={activeAnchor === link}
          >
            {label}
          </StyledLink>
        ))}
      </Nav>
    </StyledContainer>
  );
};

export default TableOfContent;
