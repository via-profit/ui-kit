declare module 'revert-index' {
  export type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
  };

  export type Lang = 'ru-RU' | 'en-US';

  export interface ParsedToken {
    /**
     * How often the token occurs in this document
     */
    readonly parsedTokenCountInDocument: number;

    /**
     * Indexes of the positions of the token found in the document.\
     * For example, if a token occurs three times in a document,\
     * the value will be [<index-of-first-match>, <index-of-second-match>, <index-of-third-match>]
     */
    readonly parsedTokenPositions: readonly number[];
  }

  export interface DocumentSnippet {
    readonly token: string;
    readonly fragment: string;
  }

  /**
   * Collection of all tokens from parsed document
   */
  export type ParsedTokensMap = Map<string, ParsedToken>;

  export class SearchDocument {
    public constructor(documentName: string);
    public setTokenMatchCount(value: number): this;
    public setTokenPositions(positions: readonly number[]): this;
    public setTokenRef(tokenRef: SearchToken): this;
    public getName(): string;
    public getToken(): SearchToken | never;
    public getTokenMatchCount(): number;
    public getTokenPositions(): readonly number[];
    public buildSnippets(content: string, slices?: [number, number]): DocumentSnippet[];
  }

  export class SearchToken {
    public constructor(token: string);
    public attachDocRef(doc: SearchDocument): this;
    public getDocRefByName(docName: string): SearchDocument | null;
    public getDocuments(): readonly SearchDocument[];
    public getName(): string;
    public getTotalCount(): number;
  }

  export class Indexer {
    public addToindex(entity: string, content: string, lang: Lang): Promise<this>;
    public removeFromIndex(entity: string): Promise<this>;
    public readDocument(entity: string, content: string, lang: Lang): Promise<SearchToken[]>;
    public writeTokensIntoIndex(tokens: SearchToken[]): Promise<void>;
    public clearIndex(): Promise<this>;
    public search(query: string, lang: Lang): Promise<SearchDocument[]>;
  }

  export class Stemmer {
    public stem(token: string): string;
    public isStopToken(token: string): boolean;
  }

  export class Tokenizer {
    public static tokenize(text: string): readonly string[];
  }

  export class TextParser {
    public static parseText(text: string, lang: Lang): ParsedTokensMap;
    public static parseFile(filename: string, lang: Lang): ParsedTokensMap;
  }
}
