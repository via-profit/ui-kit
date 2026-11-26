import React from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import PageTitle from '~/application/PageTitle';
import Header from '~/components/Header';
import PageWrapper from '~/components/PageWrapper';
import Footer from '~/components/Footer';
import type { MarkdownHeading } from '~/utils/markdown';
import Sidebar from './Sidebar';
import { DocsLayoutContext } from './context';

const Body = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
`;

type SidebarStyle = {
  readonly $isOpen: boolean;
};

const StyledSidebar = styled(Sidebar, { shouldForwardProp: p => !p.startsWith('$') })<SidebarStyle>`
  position: sticky;
  top: var(--header-height);
  flex: 0 0 16rem;
  width: 16rem;
  height: calc(100vh - var(--header-height));
  border-right: 1px solid ${({ theme }) => theme.color.border.toString()};

  @media all and (max-width: 900px) {
    position: fixed;
    left: 0;
    z-index: ${({ theme }) => theme.zIndex.header};
    width: min(18rem, 85vw);
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.35);
    transition: transform 180ms ease-out;
    ${({ $isOpen }) =>
      !$isOpen &&
      css`
        transform: translateX(-105%);
      `}
  }
`;

const Backdrop = styled.div`
  display: none;

  @media all and (max-width: 900px) {
    display: block;
    position: fixed;
    inset: var(--header-height) 0 0 0;
    z-index: ${({ theme }) => theme.zIndex.header - 1};
    background: rgba(0, 0, 0, 0.45);
  }
`;

const Main = styled.main`
  flex: 1;
  min-width: 0;
  padding: 1.75rem 2.5rem 4rem;

  @media all and (max-width: 640px) {
    padding: 1.25rem 1rem 3rem;
  }
`;

const TemplateDocs: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [headings, setHeadings] = React.useState<readonly MarkdownHeading[]>([]);
  const { pathname } = useLocation();

  // Close the mobile menu after navigation
  React.useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const layout = React.useMemo(() => ({ headings, setHeadings }), [headings]);

  return (
    <DocsLayoutContext.Provider value={layout}>
      <PageWrapper>
        <PageTitle />
        <Header onMenuClick={() => setMenuOpen(open => !open)} />
        <Body>
          <StyledSidebar $isOpen={isMenuOpen} />
          {isMenuOpen && <Backdrop onClick={() => setMenuOpen(false)} />}
          <Main>
            <Outlet />
            <ScrollRestoration />
          </Main>
        </Body>
        <Footer />
      </PageWrapper>
    </DocsLayoutContext.Provider>
  );
};

export default TemplateDocs;
