import type { Theme } from '@emotion/react';

/**
 * Colors of the syntax tokens in the site palette
 */
export const tokenColors = (theme: Theme) =>
  theme.isDark
    ? {
        comment: '#6b7385',
        keyword: '#7aa2f7',
        string: '#9ece6a',
        number: '#ff9e64',
        function: '#22c7d6',
        className: '#e0af68',
        property: '#73daca',
        annotation: '#bb9af7',
        operator: '#89ddff',
        variable: '#c0caf5',
        punctuation: '#8b93a1',
      }
    : {
        comment: '#8a93a3',
        keyword: '#2f5fd0',
        string: '#3f8a1c',
        number: '#c2560d',
        function: '#0b8a99',
        className: '#9a6a00',
        property: '#127a6c',
        annotation: '#7c3aed',
        operator: '#0a6f9e',
        variable: '#1b2330',
        punctuation: '#5d6778',
      };

/**
 * Prism style for react-syntax-highlighter. The frame of the block draws the background
 */
export const prismStyle = (theme: Theme): Record<string, Record<string, string>> => {
  const c = tokenColors(theme);
  const base = {
    color: c.variable,
    background: 'transparent',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
    lineHeight: '1.65',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    tabSize: '2',
    hyphens: 'none',
  };

  return {
    'code[class*="language-"]': base,
    'pre[class*="language-"]': { ...base, margin: '0', padding: '1rem 1.25rem', overflow: 'auto' },
    comment: { color: c.comment, fontStyle: 'italic' },
    prolog: { color: c.comment },
    doctype: { color: c.comment },
    punctuation: { color: c.punctuation },
    keyword: { color: c.keyword },
    'control-flow': { color: c.keyword },
    module: { color: c.keyword },
    string: { color: c.string },
    'template-string': { color: c.string },
    char: { color: c.string },
    'attr-value': { color: c.string },
    number: { color: c.number },
    boolean: { color: c.number },
    null: { color: c.number },
    constant: { color: c.number },
    function: { color: c.function },
    'class-name': { color: c.className },
    builtin: { color: c.className },
    property: { color: c.property },
    'property-access': { color: c.property },
    'attr-name': { color: c.property },
    tag: { color: c.keyword },
    atrule: { color: c.annotation },
    decorator: { color: c.annotation },
    operator: { color: c.operator },
    variable: { color: c.variable },
    parameter: { color: c.variable },
  };
};
