import type { DocumentSnippet } from 'revert-index';
import Tokenizer from './Tokenizer';
import SearchToken from './SearchToken';

class SearchDocument {
  #name: string;
  #tokenRef: SearchToken | null = null;
  #tokenMatchCount = 0;
  #tokenPositions: readonly number[] = [];

  constructor(documentName: string) {
    this.#name = documentName;
  }

  public setTokenMatchCount(value: number) {
    this.#tokenMatchCount = value;

    return this;
  }

  public setTokenPositions(positions: readonly number[]) {
    this.#tokenPositions = positions;

    return this;
  }

  public setTokenRef(tokenRef: SearchToken) {
    this.#tokenRef = tokenRef;

    return this;
  }

  public getName() {
    return this.#name;
  }

  public getToken() {
    if (this.#tokenRef === null) {
      throw new Error('Token ref not found');
    }

    return this.#tokenRef;
  }

  public getTokenMatchCount() {
    return this.#tokenMatchCount;
  }

  public getTokenPositions() {
    return this.#tokenPositions;
  }

  public buildSnippets(content: string, slices?: [number, number]): DocumentSnippet[] {
    const originalTokens = Tokenizer.tokenize(content);

    const snippets: DocumentSnippet[] = [];
    this.getTokenPositions().forEach(pos => {
      const sliceLeft = slices?.[0] || 5;
      const sliceRight = slices?.[1] || 5;

      // Get n-tokens standing to the left/right of the current one
      const fromLeftTokens = originalTokens.slice(Math.max(0, pos - sliceLeft), pos);
      const fromRightTokens = originalTokens.slice(pos, pos + sliceRight);

      const fragment = `...${fromLeftTokens.join(' ')} ${fromRightTokens.join(' ')}...`;
      const token = this.getToken().getName();

      snippets.push({
        token,
        fragment,
      });
    });

    return snippets;
  }
}

export default SearchDocument;
