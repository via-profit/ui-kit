import React from 'react';
import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';

import ChevronRight from '~/components/Icons/ChevronRightOutline';
import { findDocsNavItem } from '~/utils/docsNavigation';

const Container = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const Crumb = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.color.accentPrimary.toString()};
  }
`;

const Current = styled.span`
  color: ${({ theme }) => theme.color.textPrimary.toString()};
`;

const Separator = styled(ChevronRight)`
  font-size: 0.9em;
  opacity: 0.6;
`;

const Breadcrumbs: React.FC = () => {
  const { pathname } = useLocation();
  const intl = useIntl();
  const docsLabel = intl.formatMessage({ defaultMessage: 'Документация' });
  const staticPages: Record<string, string> = {
    '/docs/changelog': intl.formatMessage({ defaultMessage: 'Список изменений' }),
  };
  const current = staticPages[pathname]
    ? { label: staticPages[pathname] }
    : findDocsNavItem(pathname);

  if (!current) {
    return (
      <Container aria-label="breadcrumbs">
        <Current>{docsLabel}</Current>
      </Container>
    );
  }

  return (
    <Container aria-label="breadcrumbs">
      <Crumb to="/docs">{docsLabel}</Crumb>
      <Separator />
      <Current>{current.label}</Current>
    </Container>
  );
};

export default Breadcrumbs;
