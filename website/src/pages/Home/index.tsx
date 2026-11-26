import React from 'react';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';

import Logo from '~/components/Logo';
import Button from '~/components/Button';
import { GithubIcon } from '~/components/Icons';
import { useT } from '~/translations';
import { docsNavigationGroups } from '~/utils/docsNavigation';
import { GITHUB_URL, UI_KIT_VERSION } from '~/utils/env';

const Hero = styled.section`
  padding: 6rem 1.5rem 4rem;
  text-align: center;

  @media (max-width: 640px) {
    padding: 3rem 1rem;
  }
`;

const Pill = styled.span`
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: ${({ theme }) => theme.color.accentPrimary.toString()};
`;

const Title = styled.h1`
  max-width: 46rem;
  margin: 1.5rem auto 1rem;
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  line-height: 1.1;
  letter-spacing: -0.03em;
`;

const Accent = styled.span`
  color: ${({ theme }) => theme.color.accentPrimary.toString()};
`;

const Lead = styled.p`
  max-width: 36rem;
  margin: 0 auto 2rem;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  & a {
    color: ${({ theme }) => theme.color.accentPrimary.toString()};
    text-decoration: none;
  }
`;

const PackageName = styled(Logo)`
  margin-top: 3rem;
  font-size: 1.6rem;
`;

const Section = styled.section`
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  padding: 1rem 1.5rem 4rem;
`;

const GroupTitle = styled.h3`
  margin: 2rem 0 0.75rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 14rem), 1fr));
  gap: 0.75rem;
`;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem;
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  background: ${({ theme }) => theme.color.surface.toString()};
  border: 1px solid ${({ theme }) => theme.color.border.toString()};
  border-radius: 0.6rem;
  text-decoration: none;

  &:hover {
    border-color: ${({ theme }) => theme.color.accentPrimary.toString()};
  }
`;

const Description = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const Home: React.FC = () => {
  const t = useT();
  const navigate = useNavigate();

  return (
    <>
      <Hero>
        <Pill>
          v{UI_KIT_VERSION} · {t('home.pill')}
        </Pill>
        <Title>
          {t('home.title')} <Accent>{t('home.titleAccent')}</Accent>
        </Title>
        <Lead>{t('home.lead')}</Lead>
        <Actions>
          <Button color="primary" onClick={() => navigate('/docs')}>
            {t('home.docs')}
          </Button>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            <GithubIcon /> GitHub
          </a>
        </Actions>
        <PackageName />
      </Hero>
      <Section>
        <h2>{t('home.components')}</h2>
        {docsNavigationGroups.map(group => (
          <React.Fragment key={group.title}>
            <GroupTitle>{group.title}</GroupTitle>
            <Grid>
              {group.items.map(item => (
                <Card key={item.link} to={item.link}>
                  {item.label}
                  <Description>{item.description}</Description>
                </Card>
              ))}
            </Grid>
          </React.Fragment>
        ))}
      </Section>
    </>
  );
};

export default Home;
