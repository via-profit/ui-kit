import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import styled from '@emotion/styled';

import Header from '~/components/Header';
import PageWrapper from '~/components/PageWrapper';
import Footer from '~/components/Footer';
import Sidebar from './Sidebar';

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
`;

const Content = styled.div`
  flex: 1;
  padding: 0 1em 1em;
  width: 70%;
  box-sizing: border-box;
`;

const StyledSidebar = styled(Sidebar)`
  flex-basis: 16rem;
`;

const TemplateDocs: React.FC = () => (
  <PageWrapper>
    <Header />
    <Wrapper>
      <StyledSidebar />
      <Content>
        <Outlet />
        <ScrollRestoration />
      </Content>
    </Wrapper>
    <Footer />
  </PageWrapper>
);

export default TemplateDocs;
