declare module 'react-syntax-highlighter/dist/esm/prism-light' {
  import { PrismLight } from 'react-syntax-highlighter';

  export default PrismLight;
}

declare module 'react-syntax-highlighter/dist/esm/languages/prism/*' {
  const language: unknown;

  export default language;
}
