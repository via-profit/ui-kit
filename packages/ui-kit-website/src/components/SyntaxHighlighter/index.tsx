import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import ReactSyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-async-light';
import tsxLng from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import { SyntaxHighlighterProps as OriginalSyntaxHighlighterProps } from 'react-syntax-highlighter';
import light from './light';
import dark from './dark';

ReactSyntaxHighlighter.registerLanguage('tsx', tsxLng);

interface SyntaxHighlighterProps extends Omit<OriginalSyntaxHighlighterProps, 'children'> {
  readonly language: 'js' | 'jsx' | 'ts' | 'tsx';
  readonly code: string;
}

const CodeSSR = styled.code<{ $styles: Record<string, any> }>`
  ${props => props.$styles};
`;

const PreSSR = styled.pre<{ $styles: Record<string, any> }>`
  ${props => props.$styles};
`;

const Highlighter = styled(ReactSyntaxHighlighter)`
  ::-webkit-scrollbar {
    height: 0.5em;
    width: 0.5em;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) =>
      theme.isDark
        ? theme.colors.surface.lighten(30).toString()
        : theme.colors.surface.darken(30).toString()};
    border-radius: 1em;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.isDark
        ? theme.colors.surface.lighten(90).toString()
        : theme.colors.surface.darken(90).toString()};
    border-radius: 1em;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) =>
      theme.isDark
        ? theme.colors.surface.lighten(120).toString()
        : theme.colors.surface.darken(120).toString()};
  }
`;

const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = props => {
  const { code, language } = props;
  const theme = useTheme();
  const styles = React.useMemo(() => (theme.isDark ? dark : light), [theme.isDark]);

  const codeStr = String(code)
    .replace(/^\n/, '') // remove first empty line
    .replace(/\n$/g, ''); // remove last empty line

  if (typeof window === 'undefined') {
    return (
      <PreSSR $styles={styles['pre[class*="language-"]']}>
        <CodeSSR $styles={styles['code[class*="language-"]']}>{codeStr}</CodeSSR>
      </PreSSR>
    );
  }

  return (
    <Highlighter language={language} style={styles as any}>
      {codeStr}
    </Highlighter>
  );
};

export default SyntaxHighlighter;
