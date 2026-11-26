import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { ChevronRightIcon } from '~/components/Icons';

export interface Crumb {
  readonly label: string;
  readonly to?: string;
}

const Container = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const CrumbLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.color.accentPrimary.toString()};
  }
`;

const Current = styled.span`
  color: ${({ theme }) => theme.color.textPrimary.toString()};
`;

const Separator = styled(ChevronRightIcon)`
  font-size: 0.9em;
  opacity: 0.6;
`;

const Breadcrumbs: React.FC<{ readonly items: readonly Crumb[] }> = ({ items }) => (
  <Container aria-label="breadcrumbs">
    {items.map((item, index) => (
      <React.Fragment key={`${item.label}-${index}`}>
        {index > 0 && <Separator />}
        {item.to && index < items.length - 1 ? (
          <CrumbLink to={item.to}>{item.label}</CrumbLink>
        ) : (
          <Current>{item.label}</Current>
        )}
      </React.Fragment>
    ))}
  </Container>
);

export default Breadcrumbs;
