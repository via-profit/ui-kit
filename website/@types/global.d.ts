declare module '*.md' {
  const content: string;

  export default content;
}

/**
 * The source text of a file: `import code from './Example?raw'`
 */
declare module '*?raw' {
  const content: string;

  export default content;
}
