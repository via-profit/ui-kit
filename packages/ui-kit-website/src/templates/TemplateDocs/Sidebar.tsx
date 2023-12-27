import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link, matchPath, useLocation } from 'react-router-dom';

import content from '@via-profit/ui-kit/docs/README.md';
import Logo from '~/components/Logo';

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.mainSidebar.toString()};
  color: ${({ theme }) => theme.color.mainSidebarContrast.toString()};
  z-index: ${({ theme }) => theme.zIndex.header};
  position: fixed;
`;

const ItemsList = styled.nav`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  position: sticky;
  top: 0;
  max-height: 100vh;
`;

type ItemStyle = {
  readonly $isActive: boolean;
};

const Item = styled(Link, { shouldForwardProp: p => p.match(/^\$/) === null })<ItemStyle>`
  color: currentColor;
  text-decoration: none;
  padding: 1em 1.2em;
  background-color: ${({ theme }) => theme.color.mainSidebar.toString()};
  &:hover {
    background-color: ${({ theme }) => theme.color.mainSidebar.lighten(15).toString()};
  }
  ${({ $isActive, theme }) =>
    $isActive &&
    css`
      color: ${theme.color.accentPrimary.toString()};
      background-color: ${theme.color.accentPrimary.alpha(0.1).toString()};
    `};

  @media all and (max-width: 1200px) {
    font-size: 0.8em;
  }
`;

const LogoBlock = styled(Link)`
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.mainSidebarContrast.toString()};
`;

const StyledLogo = styled(Logo)`
  font-size: 1.8em;
`;

const StyledDraft = styled.span`
  background-color: ${({ theme }) => theme.color.accentPrimary.toString()};
  color: ${({ theme }) => theme.color.accentPrimaryContrast.toString()};
  padding: 0.2em 0.24em;
  font-size: 0.7em;
  border-radius: ${({ theme }) => theme.shape.radiusFactor}em;
  margin-left: 0.4em;
`;

const Draft: React.FC = () => <StyledDraft>Draft</StyledDraft>;

type Elem = {
  readonly label: string;
  readonly link: string;
  readonly isDraft: boolean;
  readonly isActive: boolean;
};

const Sidebar: React.ForwardRefRenderFunction<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
> = (props, ref) => {
  const { pathname } = useLocation();
  const listRef = React.useRef<HTMLElement | null>(null);
  const scrollAlreadyAffectedRef = React.useRef(false);

  const listItems: readonly Elem[] = React.useMemo(() => {
    const rawContent = content.split('## ').find(str => str.match(/^компоненты/i));
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
          const link = `/docs${matches[2].replace(/\/README\.md$/, '').replace(/^\./, '')}`;
          const label = matches[1].replace('🤏🏼', '').trim();
          const isDraft = matches[1].match('🤏🏼') !== null;
          const isActive = matchPath(`${link}/*`, pathname) !== null;

          return {
            label,
            link,
            isDraft,
            isActive,
          };
        }

        return null;
      })
      .filter((el): el is Elem => el !== null);
  }, [pathname]);

  React.useEffect(() => {
    if (scrollAlreadyAffectedRef.current) {
      return;
    }
    const activeItem = listItems.find(item => item.isActive);
    if (activeItem) {
      setTimeout(() => {
        const elem = listRef.current?.querySelector(`[href="${activeItem.link}"]`);
        if (elem) {
          scrollAlreadyAffectedRef.current = true;
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [listItems]);

  return (
    <Container {...props} ref={ref}>
      <LogoBlock to="/docs">
        <StyledLogo />
      </LogoBlock>
      <ItemsList ref={listRef}>
        {listItems.map(({ link, label, isDraft, isActive }) => (
          <Item key={link} $isActive={isActive} to={link}>
            {label} {isDraft && <Draft />}
          </Item>
        ))}
      </ItemsList>
    </Container>
  );
};

export default React.forwardRef(Sidebar);
