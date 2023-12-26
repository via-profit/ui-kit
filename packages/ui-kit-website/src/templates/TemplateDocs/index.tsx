import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import styled from '@emotion/styled';

import Header from '~/components/Header';
import PageWrapper from '~/components/PageWrapper';
import Footer from '~/components/Footer';
import Sidebar from './Sidebar';
import GlobalStyles from './GlobalStyles';

const StyledSidebar = styled(Sidebar)`
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  flex: 1;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  --sidebar-width: 14rem;
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  ${StyledSidebar} {
    width: var(--sidebar-width);
  }
  ${Main} {
    margin-left: var(--sidebar-width);
  }

  @media all and (max-width: 1200px) {
    --sidebar-width: 12em;
  }
`;

const Content = styled.div`
  flex: 1;
  margin: 1em;
  display: flex;
`;

const TemplateDocs: React.FC = () => (
  <>
    <GlobalStyles />
    <PageWrapper>
      <Wrapper>
        <StyledSidebar />
        <Main>
          <Header title="UI Kit Docs" />
          <Content>
            <Outlet />
          </Content>
          <ScrollRestoration />
        </Main>
      </Wrapper>
      <Footer />
    </PageWrapper>
  </>
);

export default TemplateDocs;
