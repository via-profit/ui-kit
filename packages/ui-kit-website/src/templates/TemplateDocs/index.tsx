import React from 'react';
import { Outlet } from 'react-router-dom';
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
  padding: 0 1em 2em;
`;

const TemplateDocs: React.FC = () => (
  <PageWrapper>
    <Header />
    <Wrapper>
      <Sidebar />
      <Content>
        <Outlet />
      </Content>
    </Wrapper>
    <Footer />
  </PageWrapper>
);

export default TemplateDocs;
