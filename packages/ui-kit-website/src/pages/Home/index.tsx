import React from 'react';
import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';

import docsNavigation from '~/utils/docsNavigation';
import { GITHUB_URL } from '~/components/Header';
import GithubIcon from '~/components/Icons/GithubIcon';
import ViaProfitLogo from '~/components/ViaProfitLogo';

const COMPANY_URL = 'https://github.com/via-profit';

const gradient = (theme: Theme) =>
  `linear-gradient(90deg, ${theme.color.accentSecondary.toString()}, ${theme.color.accentPrimary.toString()})`;

const Hero = styled.section`
  position: relative;
  padding: 6rem 1.5rem 4rem;
  text-align: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -12rem;
    left: 50%;
    width: 48rem;
    height: 28rem;
    transform: translateX(-50%);
    background: radial-gradient(
      closest-side,
      ${({ theme }) => theme.color.accentPrimary.alpha(theme.isDark ? 0.18 : 0.14).toString()},
      transparent
    );
    pointer-events: none;
  }
`;

const Pill = styled.span`
  position: relative;
  display: inline-block;
  padding: 0.3rem 0.8rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: ${({ theme }) => theme.color.accentPrimary.toString()};
  border: 1px solid ${({ theme }) => theme.color.accentPrimary.alpha(0.35).toString()};
  border-radius: 999px;
  background-color: ${({ theme }) => theme.color.accentPrimary.alpha(0.08).toString()};
`;

const Title = styled.h1`
  position: relative;
  max-width: 46rem;
  margin: 1.5rem auto 1rem;
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
`;

const TitleAccent = styled.span`
  background: ${({ theme }) => gradient(theme)};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Lead = styled.p`
  position: relative;
  max-width: 36rem;
  margin: 0 auto 2.25rem;
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const Actions = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
`;

const buttonStyles = css`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  height: 2.75rem;
  padding: 0 1.4rem;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.6rem;
  transition:
    transform 120ms ease-out,
    box-shadow 120ms ease-out,
    border-color 120ms ease-out;

  &:hover {
    transform: translateY(-1px);
  }
`;

const PrimaryButton = styled(Link)`
  ${buttonStyles};
  color: #ffffff;
  background: ${({ theme }) => gradient(theme)};
  box-shadow: 0 0.5rem 1.5rem -0.5rem
    ${({ theme }) => theme.color.accentPrimary.alpha(0.6).toString()};

  &:hover {
    box-shadow: 0 0.75rem 2rem -0.5rem
      ${({ theme }) => theme.color.accentPrimary.alpha(0.8).toString()};
  }
`;

const SecondaryButton = styled.a`
  ${buttonStyles};
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  border: 1px solid ${({ theme }) => theme.color.border.toString()};
  background-color: ${({ theme }) => theme.color.surface.toString()};

  &:hover {
    border-color: ${({ theme }) => theme.color.accentPrimary.alpha(0.5).toString()};
  }
`;

const CompanyLogo = styled.a`
  position: relative;
  display: inline-flex;
  margin-top: 3.5rem;
  font-size: 2.75rem;
  opacity: 0.9;
  transition: opacity 120ms ease-out;

  &:hover {
    opacity: 1;
  }
`;

const Section = styled.section`
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  padding: 1rem 1.5rem 5rem;
`;

const SectionTitle = styled.h2`
  margin: 0 0 1.5rem;
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: -0.01em;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  gap: 0.75rem;
`;

const Card = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 1rem 1.1rem;
  font-size: 0.925rem;
  font-weight: 500;
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  text-decoration: none;
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border: 1px solid ${({ theme }) => theme.color.border.toString()};
  border-radius: 0.6rem;
  transition:
    border-color 120ms ease-out,
    box-shadow 120ms ease-out;

  &::after {
    content: '→';
    color: ${({ theme }) => theme.color.textSecondary.toString()};
    transition:
      color 120ms ease-out,
      transform 120ms ease-out;
  }

  &:hover {
    border-color: ${({ theme }) => theme.color.accentPrimary.alpha(0.6).toString()};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.color.accentPrimary.alpha(0.2).toString()},
      0 0.5rem 1.5rem -0.75rem ${({ theme }) => theme.color.accentPrimary.alpha(0.5).toString()};
  }

  &:hover::after {
    color: ${({ theme }) => theme.color.accentPrimary.toString()};
    transform: translateX(2px);
  }
`;

const Home: React.FC = () => {
  const intl = useIntl();

  return (
    <>
      <Hero>
        <Pill>React · TypeScript · Emotion</Pill>
        <Title>
          {intl.formatMessage({ defaultMessage: 'Набор компонентов для' })}{' '}
          <TitleAccent>{intl.formatMessage({ defaultMessage: 'ваших интерфейсов' })}</TitleAccent>
        </Title>
        <Lead>
          {intl.formatMessage({
            defaultMessage:
              'Кнопки, поля ввода, календари, меню и модальные окна с темами оформления и переопределяемыми частями.',
          })}
        </Lead>
        <Actions>
          <PrimaryButton to="/docs">
            {intl.formatMessage({ defaultMessage: 'Документация' })}
          </PrimaryButton>
          <SecondaryButton href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            <GithubIcon />
            GitHub
          </SecondaryButton>
        </Actions>
        <div>
          <CompanyLogo href={COMPANY_URL} target="_blank" rel="noopener noreferrer">
            <ViaProfitLogo />
          </CompanyLogo>
        </div>
      </Hero>

      <Section>
        <SectionTitle>{intl.formatMessage({ defaultMessage: 'Компоненты' })}</SectionTitle>
        <Grid>
          {docsNavigation.map(({ link, label }) => (
            <Card key={link} to={link}>
              {label}
            </Card>
          ))}
        </Grid>
      </Section>
    </>
  );
};

export default Home;
