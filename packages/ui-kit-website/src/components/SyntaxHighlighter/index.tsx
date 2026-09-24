import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import ReactSyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-async-light';
import tsxLng from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import jsonLng from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import { SyntaxHighlighterProps as OriginalSyntaxHighlighterProps } from 'react-syntax-highlighter';
import { useIntl } from 'react-intl';

import CopyIcon from '~/components/Icons/CopyOutline';
import CheckIcon from '~/components/Icons/CheckOutline';
import light from './light';
import dark from './dark';

ReactSyntaxHighlighter.registerLanguage('tsx', tsxLng);
ReactSyntaxHighlighter.registerLanguage('json', jsonLng);

interface SyntaxHighlighterProps extends Omit<OriginalSyntaxHighlighterProps, 'children'> {
  readonly language: 'js' | 'jsx' | 'ts' | 'tsx' | 'json';
  readonly code: string;
}

const CodeSSR = styled.code<{ $styles: Record<string, any> }>`
  ${props => props.$styles};
`;

const PreSSR = styled.pre<{ $styles: Record<string, any> }>`
  ${props => props.$styles};
`;

const Frame = styled.div`
  margin: 1em 0 1.5em;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.color.border.toString()};
  border-radius: 0.6rem;
  background-color: ${({ theme }) => theme.color.codeBackground.toString()};
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2.25rem;
  padding: 0 0.5rem 0 1rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
  border-bottom: 1px solid ${({ theme }) => theme.color.border.toString()};
  background-color: ${({ theme }) => theme.color.backgroundSecondary.alpha(0.35).toString()};
`;

const CopyButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  height: 1.6rem;
  padding: 0 0.5rem;
  font: inherit;
  color: inherit;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 0.35rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.accentPrimary.toString()};
    border-color: ${({ theme }) => theme.color.border.toString()};
  }
`;

const Wrapper = styled.div`
  display: grid;
  overflow-x: auto;
`;

const Highlighter = styled(ReactSyntaxHighlighter)`
  white-space: pre-wrap !important;
  word-break: break-word !important;
`;

/**
 * Prism styles without own background and margins: the frame draws them
 */
const withFrame = (styles: Record<string, Record<string, unknown>>) => {
  const reset = {
    background: 'transparent',
    textShadow: 'none',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
    lineHeight: '1.65',
  };

  return {
    ...styles,
    'code[class*="language-"]': { ...styles['code[class*="language-"]'], ...reset },
    'pre[class*="language-"]': {
      ...styles['pre[class*="language-"]'],
      ...reset,
      margin: 0,
      padding: '1rem 1.25rem',
      borderRadius: 0,
    },
  };
};

const darkStyles = withFrame(dark as Record<string, Record<string, unknown>>);
const lightStyles = withFrame(light as Record<string, Record<string, unknown>>);

const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = props => {
  const { code, language } = props;
  const theme = useTheme();
  const intl = useIntl();
  const [copied, setCopied] = React.useState(false);
  const styles = theme.isDark ? darkStyles : lightStyles;

  const codeStr = String(code)
    .replace(/^\n/, '') // remove first empty line
    .replace(/\n$/g, ''); // remove last empty line

  React.useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timeout = setTimeout(() => setCopied(false), 1500);

    return () => clearTimeout(timeout);
  }, [copied]);

  const handleCopy = React.useCallback(() => {
    navigator.clipboard
      ?.writeText(codeStr)
      .then(() => setCopied(true))
      .catch(() => undefined);
  }, [codeStr]);

  if (typeof window === 'undefined') {
    return (
      <PreSSR $styles={styles['pre[class*="language-"]']}>
        <CodeSSR $styles={styles['code[class*="language-"]']}>{codeStr}</CodeSSR>
      </PreSSR>
    );
  }

  return (
    <Frame>
      <Toolbar>
        <span>{language}</span>
        <CopyButton type="button" onClick={handleCopy}>
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied
            ? intl.formatMessage({ defaultMessage: 'Скопировано' })
            : intl.formatMessage({ defaultMessage: 'Копировать' })}
        </CopyButton>
      </Toolbar>
      <Wrapper>
        <Highlighter language={language} style={styles as any}>
          {codeStr}
        </Highlighter>
      </Wrapper>
    </Frame>
  );
};

export default SyntaxHighlighter;
