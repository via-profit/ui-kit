import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useT } from '~/translations';
import type { MarkdownHeading } from '~/utils/markdown';
import scrollToAnchor, { setLocationHash } from '~/utils/scrollToAnchor';

const Container = styled.aside`
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

const Item = styled.a<{ $isActive: boolean; $level: number }>`
  position: relative;
  display: block;
  margin-left: -1px;
  padding: 0.3rem 0 0.3rem ${({ $level }) => ($level > 2 ? '1.6rem' : '0.9rem')};
  font-size: ${({ $level }) => ($level > 2 ? '0.78rem' : '0.82rem')};
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

/**
 * Table of contents of the page. The active item follows the scroll position
 */
const TableOfContent: React.FC<{ readonly headings: readonly MarkdownHeading[] }> = ({
  headings,
}) => {
  const t = useT();
  const [active, setActive] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!headings.length) {
      return undefined;
    }

    // The last heading above the upper third of the screen is the active one
    const update = () => {
      const limit = window.innerHeight / 3;
      let current: string | null = headings[0].slug;

      for (const heading of headings) {
        const element = document.getElementById(heading.slug);
        if (element && element.getBoundingClientRect().top <= limit) {
          current = heading.slug;
        }
      }

      setActive(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });

    return () => window.removeEventListener('scroll', update);
  }, [headings]);

  if (!headings.length) {
    return null;
  }

  return (
    <Container>
      <Heading>{t('toc.title')}</Heading>
      <Nav>
        {headings.map(heading => (
          <Item
            key={heading.slug}
            href={`#${heading.slug}`}
            $level={heading.level}
            $isActive={active === heading.slug}
            onClick={event => {
              event.preventDefault();
              if (scrollToAnchor(heading.slug)) {
                setLocationHash(heading.slug);
              }
            }}
          >
            {heading.text}
          </Item>
        ))}
      </Nav>
    </Container>
  );
};

export default TableOfContent;
