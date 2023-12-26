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
};

const Sidebar: React.ForwardRefRenderFunction<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
> = (props, ref) => {
  const { pathname } = useLocation();

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
          return {
            label: matches[1].replace('🤏🏼', '').trim(),
            link: matches[2].replace(/\/README\.md$/, ''),
            isDraft: matches[1].match('🤏🏼') !== null,
          };
        }

        return null;
      })
      .filter((el): el is Elem => el !== null);
  }, []);

  return (
    <Container {...props} ref={ref}>
      <LogoBlock to="/docs">
        <StyledLogo />
      </LogoBlock>
      <ItemsList>
        {listItems.map(({ link, label, isDraft }) => (
          <Item
            key={link}
            $isActive={matchPath(`/docs${link.replace(/^\./, '')}/*`, pathname) !== null}
            to={link}
          >
            {label} {isDraft && <Draft />}
          </Item>
        ))}
      </ItemsList>
    </Container>
  );
};

export default React.forwardRef(Sidebar);
