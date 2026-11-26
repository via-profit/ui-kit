import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import Button from '@via-profit/ui-kit/Button';

import { useT } from '~/translations';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem 1.5rem;
  text-align: center;
`;

const Code = styled.div`
  font-family: var(--font-mono);
  font-size: 4rem;
  font-weight: 500;
  line-height: 1;
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.color.accentSecondary.toString()}, ${theme.color.accentPrimary.toString()})`};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Text = styled.p`
  margin: 0 0 0.5rem;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const NotFound: React.FC = () => {
  const t = useT();
  const navigate = useNavigate();

  return (
    <Container>
      <Code>404</Code>
      <Title>{t('notFound.title')}</Title>
      <Text>{t('notFound.text')}</Text>
      <Button variant="outlined" type="button" onClick={() => navigate('/')}>
        {t('notFound.back')}
      </Button>
    </Container>
  );
};

export default NotFound;
