import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import styled from '@emotion/styled';

import Header from '~/components/Header';
import PageWrapper from '~/components/PageWrapper';
import Footer from '~/components/Footer';
import Sidebar from './Sidebar';
import GlobalStyles from './GlobalStyles';

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  position: relative;
`;

const Content = styled.div`
  flex: 1;
  margin: 1em;
`;

const StyledSidebar = styled(Sidebar)`
  top: 0;
  width: 14rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  flex: 1;
  margin-left: 14rem;
  box-sizing: border-box;
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
