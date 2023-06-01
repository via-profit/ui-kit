import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '~/components/Header';
import PageWrapper from '~/components/PageWrapper';
import ContentArea from '~/components/ContentArea';
import Footer from '~/components/Footer';

const HomeTemplate: React.FC = () => (
  <PageWrapper>
    <Header />
    <ContentArea>
      <Outlet />
    </ContentArea>
    <Footer />
  </PageWrapper>
);

export default HomeTemplate;
