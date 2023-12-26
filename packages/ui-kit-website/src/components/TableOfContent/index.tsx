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
  const navRef = React.useRef<HTMLElement | null>(null);
  const [activeAnchor, setActiveAnchor] = React.useState<string | null>(null);

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

  const scrollEventTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    const scrollEvent = () => {
      if (scrollEventTimeoutRef.current) {
        clearTimeout(scrollEventTimeoutRef.current);
      }

      scrollEventTimeoutRef.current = setTimeout(() => {
        const anchors = document.querySelectorAll(
          'h1 a[id], h2 a[id], h3 a[id], h4 a[id], h5 a[id], h6 a[id]',
        );
        anchors.forEach(anchor => {
          const observer = new window.IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                const anchorID = anchor.getAttribute('id');
                setActiveAnchor(anchorID);

                return;
              }
            },
            {
              root: null,
              threshold: 0.1, // set offset 0.1 means trigger if atleast 10% of element in viewport
            },
          );

          observer.observe(anchor);
        });
      }, 100);
    };

    window.addEventListener('scroll', scrollEvent);

    scrollEvent();

    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, []);

  return (
    <StyledContainer>
      <Inner>
        <Heading>
          <FormattedMessage defaultMessage="Содержание" />
        </Heading>
        <nav ref={navRef}>
          {listItems.map(({ label, link }) => (
            <StyledLink
              onClick={event => {
                event.preventDefault();
                const element = document.querySelector(`a[id="${link}"]`);

                if (element) {
                  const yOffset = -80; // app header height
                  const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

                  window.scrollTo({ top: y, behavior: 'smooth' });
                  window.history.pushState(true, '', `${pathname}#${link}`);
                }
              }}
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
