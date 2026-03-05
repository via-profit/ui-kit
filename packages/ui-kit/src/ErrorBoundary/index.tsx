// import React from 'react';
// import styled from '@emotion/styled';
//
// export interface ErrorBoundaryComponentProps {
//   readonly children: React.ReactNode | readonly React.ReactNode[];
// }
//
// interface State {
//   readonly error: Error | null;
//   readonly errorInfo: React.ErrorInfo | null;
// }
//
// interface Props {
//   readonly children: React.ReactNode | React.ReactNode[];
//   readonly styles?: React.CSSProperties;
// }
//
// const Container = styled.div`
//   flex: 1;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   box-sizing: border-box;
//   padding: theme.spacing(1);
//   border-radius: inherit;
//   border: 1px solid rgb(92, 0, 0);
//   background-color: rgb(41, 0, 0);
// `;
//
// const Inner = styled.div`
//   flex: 1;
//   width: 100%;
//   height: 100%;
//   overflow-y: auto;
// `;
//
// const Title = styled.h1`
//   margin-top: 0;
// `;
//
// const ErrorBox = styled.div`
//   color: rgb(255, 128, 128);
//   padding: 1rem;
// `;
//
// const ErrorMessage = styled.pre`
//   max-height: 300;
//   overflow: auto;
// `;
//
// const CallStack = styled.pre`
//   opacity: 0.8;
//   max-height: 300;
//   overflow: auto;
//   white-space: break-spaces;
// `;
//
// class ErrorBoundary extends React.Component<Props, State> {
//   constructor(props: Props) {
//     super(props);
//     this.state = {
//       error: null,
//       errorInfo: null,
//     };
//   }
//
//   static getDerivedStateFromError(error: Error): State {
//     return {
//       error,
//       errorInfo: null,
//     };
//   }
//
//   componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
//     this.setState({
//       error,
//       errorInfo,
//     });
//   }
//
//   render() {
//     const { error } = this.state;
//     const { children, styles } = this.props;
//
//     if (error) {
//       return (
//         <Container style={styles}>
//           <Inner>
//             {process.env.NODE_ENV === 'development' ? (
//               <ErrorBox>
//                 <Title>Something went wrong</Title>
//                 <ErrorMessage>{error.message}</ErrorMessage>
//                 <h2>Callstack:</h2>
//                 <CallStack>{error.stack}</CallStack>
//               </ErrorBox>
//             ) : (
//               <ErrorBox>
//                 <Title>It looks like our server has broken down</Title>
//                 <p>We&apos;re already fixing it. We are waiting for you later</p>
//               </ErrorBox>
//             )}
//           </Inner>
//         </Container>
//       );
//     }
//
//     return <>{children}</>;
//   }
// }
//
// export default ErrorBoundary;

import styled from '@emotion/styled';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Surface from '../Surface';
import H1 from '../Typography/H1';
// import RenderMarkdown from '~/components/';
import Paragraph from '../Typography/Paragraph';

type State = {
  readonly error: Error | null;
  readonly errorInfo: React.ErrorInfo | null;
  readonly isDev: boolean;
};

type Props = {
  readonly children: React.ReactNode;
  readonly fallback?: React.ReactNode | undefined | null;
  readonly asProduction?: boolean;
};

const StyledSurface = styled(Surface)`
  border-left: 2em solid ${({ theme }) => theme.color.error.toString()};
`;

const StyledHeading = styled(H1)`
  margin-top: 0;
`;

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isDev: process.env.NODE_ENV === 'development',
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  getErrorHeading(error: Error) {
    switch (true) {
      case error.message.match(/^relay:/im) !== null:
        return `Relay error. ${error.name}`;
      case error.name.match(/^relaynetwork$/im) !== null:
        return `Relay Network`;

      default:
        return error.name;
    }
  }

  renderUserError() {
    const { error } = this.state;
    const { fallback } = this.props;
    if (!error) {
      return null;
    }

    return (
      <StyledSurface>
        {fallback ? (
          fallback
        ) : (
          <>
            <StyledHeading>
              <FormattedMessage defaultMessage="Произошла ошибка" />
            </StyledHeading>
            <Paragraph>
              <FormattedMessage defaultMessage="Пожалуйста, сообщие разработчикам" />
            </Paragraph>
          </>
        )}
      </StyledSurface>
    );
  }

  renderDeveloperError() {
    const { error } = this.state;
    if (!error) {
      return null;
    }

    const heading = this.getErrorHeading(error);

    return (
      <StyledSurface>
        <StyledHeading>{heading}</StyledHeading>
        <Paragraph>{error.message}</Paragraph>
        {error.stack && <pre>{error.stack}</pre>}
      </StyledSurface>
    );
  }

  render() {
    const { error, isDev } = this.state;
    const { children, asProduction } = this.props;

    if (error) {
      return isDev && !asProduction ? this.renderDeveloperError() : this.renderUserError();
    }

    return children;
  }
}

export default ErrorBoundary;
