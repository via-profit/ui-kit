import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import styled from '@emotion/styled';

import Header from '~/components/Header';
import PageWrapper from '~/components/PageWrapper';
import Footer from '~/components/Footer';

const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const HomeTemplate: React.FC = () => (
  <PageWrapper>
    <Header />
    <Content>
      <Outlet />
      <ScrollRestoration />
    </Content>
    <Footer />
  </PageWrapper>
);

export default HomeTemplate;
