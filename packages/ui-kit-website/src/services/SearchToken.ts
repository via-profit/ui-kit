import type { SearchDocument } from 'revert-index';

class SearchToken {
  #name: string;
  #documentRefs: SearchDocument[] = [];

  constructor(token: string) {
    this.#name = token;
  }

  public attachDocRef(doc: SearchDocument) {
    const exist = this.getDocRefByName(doc.getName());
    if (!exist) {
      this.#documentRefs.push(doc);
    }

    return this;
  }

  public getDocRefByName(docName: string) {
    return this.#documentRefs.find(doc => doc.getName() === docName) || null;
  }

  public getDocuments() {
    return this.#documentRefs;
  }

  public getName() {
    return this.#name;
  }

  public getTotalCount() {
    return this.#documentRefs.reduce((total, current) => total + current.getTokenMatchCount(), 0);
  }
}

export default SearchToken;
