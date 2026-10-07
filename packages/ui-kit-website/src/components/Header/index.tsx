import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link, NavLink } from 'react-router-dom';
import { useIntl } from 'react-intl';

import ViaProfitLogo from '~/components/ViaProfitLogo';
import { UI_KIT_VERSION } from '~/utils/version';
import GithubIcon from '~/components/Icons/GithubIcon';
import MenuIcon from '~/components/Icons/MenuOutline';
import ThemeSwitcher from './ThemeSwitcher';
import IconButton, { IconLink } from './IconButton';

export const GITHUB_URL = 'https://github.com/via-profit/ui-kit';

const Container = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  height: var(--header-height);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0 1.5rem;
  background-color: ${({ theme }) => theme.color.backgroundPrimary.alpha(0.85).toString()};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.color.border.toString()};
`;

const LogoLink = styled(Link)`
  display: inline-flex;
  font-size: 1.9rem;
  text-decoration: none;
`;

const VersionBadge = styled(Link)`
  margin-left: -0.75rem;
  padding: 0.1rem 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  line-height: 1.4;
  text-decoration: none;
  white-space: nowrap;
  color: ${({ theme }) => theme.color.accentPrimary.toString()};
  background-color: ${({ theme }) => theme.color.accentPrimary.alpha(0.08).toString()};
  border: 1px solid ${({ theme }) => theme.color.accentPrimary.alpha(0.3).toString()};
  border-radius: 999px;
  transition: border-color 120ms ease-out;

  &:hover {
    border-color: ${({ theme }) => theme.color.accentPrimary.toString()};
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: stretch;
  align-self: stretch;
  gap: 1.5rem;
  margin-left: 1rem;

  @media all and (max-width: 640px) {
    display: none;
  }
`;

const NavItem = styled(NavLink)`
  position: relative;
  display: inline-flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
  transition: color 120ms ease-out;

  &:hover {
    color: ${({ theme }) => theme.color.textPrimary.toString()};
  }

  &.active {
    color: ${({ theme }) => theme.color.textPrimary.toString()};
  }

  &.active::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    border-radius: 2px;
    ${({ theme }) => css`
      background: ${theme.color.accentPrimary.toString()};
      box-shadow: 0 0 8px ${theme.color.accentPrimary.alpha(0.6).toString()};
    `}
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
`;

const MenuButton = styled(IconButton)`
  display: none;

  @media all and (max-width: 900px) {
    display: inline-flex;
  }
`;

interface HeaderProps {
  /**
   * If passed, the menu button is shown on narrow screens
   */
  readonly onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = props => {
  const { onMenuClick } = props;
  const intl = useIntl();

  return (
    <Container>
      {onMenuClick && (
        <MenuButton
          type="button"
          onClick={onMenuClick}
          aria-label={intl.formatMessage({ defaultMessage: 'Открыть меню' })}
        >
          <MenuIcon />
        </MenuButton>
      )}
      <LogoLink to="/" aria-label="Via Profit UI Kit">
        <ViaProfitLogo />
      </LogoLink>
      {UI_KIT_VERSION && (
        <VersionBadge
          to="/docs/changelog"
          title={intl.formatMessage({ defaultMessage: 'Список изменений' })}
        >
          v{UI_KIT_VERSION}
        </VersionBadge>
      )}
      <Nav>
        <NavItem to="/" end>
          {intl.formatMessage({ defaultMessage: 'Главная' })}
        </NavItem>
        <NavItem to="/docs">{intl.formatMessage({ defaultMessage: 'Документация' })}</NavItem>
      </Nav>
      <Actions>
        <IconLink
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          aria-label="GitHub"
        >
          <GithubIcon />
        </IconLink>
        <ThemeSwitcher />
      </Actions>
    </Container>
  );
};

export default Header;
