import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import styled from '@emotion/styled';

import PageTitle from '~/application/PageTitle';
import Header from '~/components/Header';
import PageWrapper from '~/components/PageWrapper';
import Footer from '~/components/Footer';

const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

/**
 * Template of the pages without the documentation sidebar: home and playground
 */
const TemplateBase: React.FC = () => (
  <PageWrapper>
    <PageTitle />
    <Header />
    <Content>
      <Outlet />
      <ScrollRestoration />
    </Content>
    <Footer />
  </PageWrapper>
);

export default TemplateBase;
