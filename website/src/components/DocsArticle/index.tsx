import styled from '@emotion/styled';

/**
 * Container of the documentation page content.
 * The content lies directly on the page background, only examples and code are framed
 */
const DocsArticle = styled.article`
  flex: 1;
  min-width: 0;
  max-width: 56rem;

  /* The first section right after the page title does not need a divider */
  & h1 + h2 {
    margin-top: 1.5em;
    padding-top: 0;
    border-top: none;
  }
`;

export default DocsArticle;
