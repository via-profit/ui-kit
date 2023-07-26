import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import styled from '@emotion/styled';

import Header from '~/components/Header';
import PageWrapper from '~/components/PageWrapper';
import Footer from '~/components/Footer';

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  color: ${({ theme }) => theme.color.accentPrimary.toString()};
`;

const Content = styled.div`
  flex: 1;
  padding: 0 1em 1em;
`;

const HomeTemplate: React.FC = () => (
  <PageWrapper>
    <Header />
    <Wrapper>
      <Content>
        <Outlet />
        <ScrollRestoration />
      </Content>
    </Wrapper>
    <Footer />
  </PageWrapper>
);

export default HomeTemplate;
