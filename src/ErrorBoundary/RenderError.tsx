import * as React from 'react';
import styled from '@emotion/styled';

import createTheme from '../ThemeProvider/createTheme';
import Heading1 from '../Typography/H1';
import ThemeProvider from '../ThemeProvider';
import Paragraph from '../Typography/Paragraph';
import Surface from '../Surface';
import Strong from '../Typography/Strong';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledSurface = styled(Surface)`
  border-left: 2em solid ${({ theme }) => theme.color.error.toString()};
`;

const StyledHeading = styled(Heading1)`
  margin-top: 0;
`;

type RenderErrorProps = {
  readonly error?: Error | unknown;
  readonly title?: React.ReactNode;
  readonly description?: React.ReactNode;
};

const RenderError: React.FC<RenderErrorProps> = props => {
  const {
    error,
    title = 'Something went wrong',
    description = 'Please let the developers know',
  } = props;
  const isDev = process.env.NODE_ENV === 'development';

  const { name, message, stack } = React.useMemo(() => {
    let name: string = '';
    let message: string = '';
    let stack: string = '';

    if (error && typeof error === 'object') {
      if ('name' in error) {
        name = `${error.name}`;
      }
      if ('message' in error) {
        message = `${error.message}`;
      }
      if ('stack' in error) {
        stack = `${error.stack}`;
      }
    }

    return { name, message, stack };
  }, [error]);

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StyledSurface>
          {isDev ? (
            <>
              <StyledHeading>{name}</StyledHeading>
              <Strong>{message}</Strong>
              {stack !== '' && <Paragraph>{stack}</Paragraph>}
            </>
          ) : (
            <>
              <StyledHeading>{title}</StyledHeading>
              <Paragraph>{description}</Paragraph>
            </>
          )}
        </StyledSurface>
      </Container>
    </ThemeProvider>
  );
};

export default RenderError;
