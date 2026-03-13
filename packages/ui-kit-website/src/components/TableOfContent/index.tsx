import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FormattedMessage } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';
import Surface from '@via-profit/ui-kit/src/Surface';
import Paragraph from '@via-profit/ui-kit/src/Typography/Paragraph';

export interface TableOfContentProps {
  readonly content: string;
}

const StyledContainer = styled.div`
  padding-left: 1em;
  @media all and (max-width: 1100px) {
    display: none;
  }
`;

const Inner = styled(Surface)`
  position: sticky;
  right: 0;
  top: 6rem;
  bottom: 1rem;
  z-index: ${({ theme }) => theme.zIndex.header};
  width: 20em;
  max-height: calc(100vh - 7rem);
  overflow-y: auto;
  @media all and (max-width: 1280px) {
    width: 16em;
  }
  @media all and (max-width: 1200px) {
    font-size: 0.9em;
  }
`;

type StyledLinkProps = {
  readonly $isActive: boolean;
};

const StyledLink = styled(Link, { shouldForwardProp: p => p[0] !== '$' })<StyledLinkProps>`
  display: block;
  font-size: 0.9em;
  text-decoration: none;
  padding: 0.4em 0.6em;
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  transition: all 120ms ease-out;
  border-radius: ${({ theme }) => theme.shape.radiusFactor}em;
  :hover {
    color: ${({ theme }) => theme.color.accentPrimary.toString()};
    background-color: ${({ theme }) => theme.color.accentPrimary.alpha(0.1).toString()};
  }

  ${({ $isActive, theme }) =>
    $isActive &&
    css`
      color: ${theme.color.accentPrimary.toString()};
      background-color: ${theme.color.accentPrimary.alpha(0.1).toString()};
    `}
`;

const Heading = styled(Paragraph)`
  font-weight: 600;
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
    setTimeout(findInitialActive, 100);
  }, [listItems]);

  const scrollToAnchor = React.useCallback(
    (link: string, event: React.MouseEvent) => {
      event.preventDefault();
      const element = document.querySelector(`a[id="${link}"]`);

      if (element) {
        const yOffset = -80; // app header height
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
        window.history.pushState(true, '', `${pathname}#${link}`);
      }
    },
    [pathname],
  );

  if (listItems.length === 0) {
    return null;
  }

  return (
    <StyledContainer>
      <Inner>
        <Heading>
          <FormattedMessage defaultMessage="Содержание" />
        </Heading>
        <nav>
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
        </nav>
      </Inner>
    </StyledContainer>
  );
};

export default TableOfContent;
