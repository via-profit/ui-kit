import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { GITHUB_URL } from '~/components/Header';

const Container = styled.footer`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
  border-top: 1px solid ${({ theme }) => theme.color.border.toString()};
`;

const Links = styled.nav`
  display: flex;
  gap: 1.25rem;
`;

const linkStyles = `
  color: inherit;
  text-decoration: none;
`;

const FooterLink = styled(Link)`
  ${linkStyles};
  &:hover {
    color: ${({ theme }) => theme.color.accentPrimary.toString()};
  }
`;

const FooterAnchor = styled.a`
  ${linkStyles};
  &:hover {
    color: ${({ theme }) => theme.color.accentPrimary.toString()};
  }
`;

const Footer: React.FC = () => {
  const intl = useIntl();

  return (
    <Container>
      <Links>
        <FooterLink to="/">{intl.formatMessage({ defaultMessage: 'Главная' })}</FooterLink>
        <FooterLink to="/docs">{intl.formatMessage({ defaultMessage: 'Документация' })}</FooterLink>
        <FooterAnchor href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          GitHub
        </FooterAnchor>
      </Links>
      <span>© {new Date().getFullYear()} Via Profit · MIT License</span>
    </Container>
  );
};

export default Footer;
