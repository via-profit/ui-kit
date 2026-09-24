import * as React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem;
  text-align: center;
`;

const Code = styled.div`
  font-family: var(--font-mono);
  font-size: clamp(4rem, 12vw, 7rem);
  font-weight: 500;
  line-height: 1;
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.color.accentSecondary.toString()}, ${theme.color.accentPrimary.toString()})`};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Text = styled.p`
  margin: 1rem 0 2rem;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const Back = styled(Link)`
  color: ${({ theme }) => theme.color.accentPrimary.toString()};
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const NotFound: React.FC = () => {
  const intl = useIntl();

  return (
    <Container>
      <Code>404</Code>
      <Text>{intl.formatMessage({ defaultMessage: 'Такой страницы нет' })}</Text>
      <Back to="/docs">{intl.formatMessage({ defaultMessage: 'Перейти к документации' })}</Back>
    </Container>
  );
};

export default NotFound;
