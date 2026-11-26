import React from 'react';
import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';
import { Link } from 'react-router-dom';

import { GITHUB_URL, NPM_URL } from '~/utils/env';
import { useT } from '~/translations';

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
  flex-wrap: wrap;
  gap: 1.25rem;
`;

const linkStyles = (theme: Theme) => css`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: ${theme.color.accentPrimary.toString()};
  }
`;

const FooterLink = styled(Link)`
  ${({ theme }) => linkStyles(theme)};
`;

const FooterAnchor = styled.a`
  ${({ theme }) => linkStyles(theme)};
`;

const Footer: React.FC = () => {
  const t = useT();

  return (
    <Container>
      <Links>
        <FooterLink to="/">{t('nav.home')}</FooterLink>
        <FooterLink to="/docs">{t('nav.docs')}</FooterLink>
        <FooterLink to="/docs/changelog">{t('doc.changelog')}</FooterLink>
        <FooterAnchor href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          GitHub
        </FooterAnchor>
        <FooterAnchor href={NPM_URL} target="_blank" rel="noopener noreferrer">
          npm
        </FooterAnchor>
      </Links>
      <span>
        © {new Date().getFullYear()} Via Profit · {t('footer.license')}
      </span>
    </Container>
  );
};

export default Footer;
