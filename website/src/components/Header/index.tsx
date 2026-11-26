import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import ViaProfitLogo from '~/components/ViaProfitLogo';
import { GithubIcon, MenuIcon } from '~/components/Icons';
import { GITHUB_URL, UI_KIT_VERSION } from '~/utils/env';
import { useT } from '~/translations';
import ThemeSwitcher from './ThemeSwitcher';
import LocaleSwitcher from './LocaleSwitcher';
import Search from './Search';
import IconButton, { IconLink } from './IconButton';

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

  @media all and (max-width: 640px) {
    gap: 0.75rem;
    padding: 0 0.75rem;
  }
`;

/**
 * The logo of the company. The wordmark is wide, so it becomes smaller on the narrow screens
 */
const LogoLink = styled(Link)`
  display: inline-flex;
  font-size: 1.9rem;
  text-decoration: none;

  @media all and (max-width: 640px) {
    font-size: 1.4rem;
  }
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

  @media all and (max-width: 760px) {
    display: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: stretch;
  align-self: stretch;
  gap: 1.5rem;
  margin-left: 1rem;

  @media all and (max-width: 760px) {
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

/**
 * GitHub link of the header. On narrow screens it is available in the footer only
 */
const GithubLink = styled(IconLink)`
  @media all and (max-width: 480px) {
    display: none;
  }
`;

const MenuButton = styled(IconButton)<{ $breakpoint: number }>`
  display: none;

  @media all and (max-width: ${({ $breakpoint }) => $breakpoint}px) {
    display: inline-flex;
  }
`;

const MobileNav = styled.nav`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0.75rem;
  display: flex;
  flex-direction: column;
  min-width: 12rem;
  padding: 0.35rem;
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border: 1px solid ${({ theme }) => theme.color.border.toString()};
  border-radius: 0.6rem;
  box-shadow: 0 1rem 2.5rem -1rem rgba(0, 0, 0, 0.5);

  @media all and (min-width: 761px) {
    display: none;
  }
`;

const MobileNavItem = styled(NavLink)`
  padding: 0.55rem 0.75rem;
  font-size: 0.9rem;
  text-decoration: none;
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  border-radius: 0.4rem;

  &:hover,
  &.active {
    color: ${({ theme }) => theme.color.accentPrimary.toString()};
    background-color: ${({ theme }) => theme.color.accentPrimary.alpha(0.1).toString()};
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
  const t = useT();
  const { pathname } = useLocation();
  const [isNavOpen, setNavOpen] = React.useState(false);

  // Close the navigation menu after navigation
  React.useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  return (
    <Container>
      {onMenuClick ? (
        <MenuButton $breakpoint={900} type="button" onClick={onMenuClick} aria-label={t('header.menu')}>
          <MenuIcon />
        </MenuButton>
      ) : (
        <MenuButton
          $breakpoint={760}
          type="button"
          onClick={() => setNavOpen(open => !open)}
          aria-label={t('header.menu')}
          aria-expanded={isNavOpen}
        >
          <MenuIcon />
        </MenuButton>
      )}
      {isNavOpen && (
        <MobileNav>
          <MobileNavItem to="/" end>
            {t('nav.home')}
          </MobileNavItem>
          <MobileNavItem to="/docs">{t('nav.docs')}</MobileNavItem>
          <MobileNavItem to="/docs/changelog">{t('doc.changelog')}</MobileNavItem>
        </MobileNav>
      )}
      <LogoLink to="/" aria-label="Via Profit UI Kit">
        <ViaProfitLogo />
      </LogoLink>
      {UI_KIT_VERSION && (
        <VersionBadge to="/docs/changelog" title={t('doc.changelog')}>
          v{UI_KIT_VERSION}
        </VersionBadge>
      )}
      <Nav>
        <NavItem to="/" end>
          {t('nav.home')}
        </NavItem>
        <NavItem to="/docs">{t('nav.docs')}</NavItem>
      </Nav>
      <Actions>
        <Search />
        <GithubLink href={GITHUB_URL} target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub">
          <GithubIcon />
        </GithubLink>
        <LocaleSwitcher />
        <ThemeSwitcher />
      </Actions>
    </Container>
  );
};

export default Header;
