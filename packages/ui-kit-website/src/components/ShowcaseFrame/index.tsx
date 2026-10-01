import React from 'react';
import styled from '@emotion/styled';
import { useIntl } from 'react-intl';
import Button from '@via-profit/ui-kit/src/Button';

import SyntaxHighlighter from '~/components/SyntaxHighlighter';

export type ShowcaseFrameProps = {
  /**
   * The source code of the showcase (`import code from './Showcase?raw'`)
   */
  readonly code: string;
  readonly children: React.ReactNode;
};

const Container = styled.div`
  margin: 1.25em 0 2em;
  border: 1px solid ${({ theme }) => theme.color.border.toString()};
  border-radius: 0.75rem;
  overflow: hidden;
`;

const Preview = styled.div`
  padding: 2rem 1.5rem;
  overflow-x: auto;
  background-color: ${({ theme }) => theme.color.backgroundPrimary.toString()};
  background-image: radial-gradient(
    ${({ theme }) => theme.color.border.alpha(0.6).toString()} 1px,
    transparent 1px
  );
  background-size: 16px 16px;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem 0.75rem;
  border-top: 1px solid ${({ theme }) => theme.color.border.toString()};
`;

const Code = styled.div`
  padding: 0 1rem;
  border-top: 1px solid ${({ theme }) => theme.color.border.toString()};
`;

/**
 * The live showcase with its source code. The code is the same file as the showcase,
 * so it is never outdated. The imports are shown the way they are written in an application
 */
const ShowcaseFrame: React.FC<ShowcaseFrameProps> = props => {
  const { code, children } = props;
  const intl = useIntl();
  const [isCodeVisible, setIsCodeVisible] = React.useState(false);
  const codeID = React.useId();

  // `?raw` imports work only with the webpack rule for them. A dev server started before the rule
  // was added gives the compiled module instead of the text: show the showcase without the code
  const hasCode = typeof code === 'string';

  React.useEffect(() => {
    if (!hasCode) {
      console.error(
        '[ShowcaseFrame] The source code is not a string. Restart the dev server: the `?raw` rule of the webpack config is applied on start only',
      );
    }
  }, [hasCode]);

  const publicCode = React.useMemo(
    () =>
      hasCode ? code.replace(/@via-profit\/ui-kit\/src\//g, '@via-profit/ui-kit/').trim() : '',
    [code, hasCode],
  );

  return (
    <Container>
      <Preview>{children}</Preview>
      {hasCode && (
        <Toolbar>
          <Button
            variant="plain"
            aria-expanded={isCodeVisible}
            aria-controls={codeID}
            onClick={() => setIsCodeVisible(value => !value)}
          >
            {isCodeVisible
              ? intl.formatMessage({ defaultMessage: 'Скрыть код' })
              : intl.formatMessage({ defaultMessage: 'Показать код' })}
          </Button>
        </Toolbar>
      )}
      {hasCode && isCodeVisible && (
        <Code id={codeID}>
          <SyntaxHighlighter language="tsx" code={publicCode} />
        </Code>
      )}
    </Container>
  );
};

export default ShowcaseFrame;
