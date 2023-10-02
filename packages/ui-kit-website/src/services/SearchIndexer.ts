import crypto from 'node:crypto';
// import path from 'node:path';
// import fs from 'node:fs';

import type { Lang } from 'revert-index';

import SearchDocument from './SearchDocument';
import SearchToken from './SearchToken';
import TextParser from './TextParser';
import Stemmer from './Stemmer';
import Tokenizer from './Tokenizer';

class Indexer {
  #indexDir = '../../.index';
  #index = {};
  public async readDocument(entity: string, content: string, lang: Lang): Promise<SearchToken[]> {
    const tokensMap = TextParser.parseText(content, lang);
    const tokens: SearchToken[] = [];

    tokensMap.forEach(({ parsedTokenCountInDocument, parsedTokenPositions }, token) => {
      const tokenRef = tokens.find(w => w.getName() === token);

      // If token was parsed then check document
      // and if it exist then set token counter
      if (tokenRef) {
        const docRef = tokenRef.getDocRefByName(entity);
        if (docRef) {
          docRef.setTokenMatchCount(parsedTokenCountInDocument);
        } else {
          // if document not indexed
          // then create document and linked its
          const documentRef = new SearchDocument(entity);
          documentRef.setTokenRef(tokenRef);
          documentRef.setTokenMatchCount(parsedTokenCountInDocument);
          documentRef.setTokenPositions(parsedTokenPositions);
          tokenRef.attachDocRef(documentRef);
        }
        // if token dows not indexed
        // then create token, document and linked its
      } else {
        const tokenRef = new SearchToken(token);
        const documentRef = new SearchDocument(entity);
        documentRef.setTokenRef(tokenRef);
        documentRef.setTokenMatchCount(parsedTokenCountInDocument);
        documentRef.setTokenPositions(parsedTokenPositions);
        tokenRef.attachDocRef(documentRef);
        tokens.push(tokenRef);
      }
    });

    return tokens;
  }
  /**
   * Index document and append data into index
   */
  public async addToindex(entity: string, content: string, lang: Lang) {
    const tokens = await this.readDocument(entity, content, lang);

    await this.removeFromIndex(entity);
    await this.writeTokensIntoIndex(tokens);

    return this;
  }

  /**
   * Remove document from index
   */
  public async removeFromIndex(entity: string): Promise<this> {
    // await this.#knex.transaction(async trx => {
    //   const token2documents = await trx({ t2d: 'searchIndexToken2Document' })
    //     .select<(SearchIndexToken2DocumentTableRecord & { name: string })[]>([
    //       't2d.token',
    //       't2d.matchCount',
    //       'w.name',
    //     ])
    //     .leftJoin<SearchIndexDocumentsRecord>({ d: 'searchIndexDocuments' }, 'd.id', 't2d.document')
    //     .leftJoin<SearchIndexTokensTableRecord>({ w: 'searchIndexTokens' }, 'w.id', 't2d.token')
    //     .limit(100)
    //     .where('d.entity', '=', entity);

    //   if (token2documents.length) {
    //     await trx('searchIndexTokens')
    //       .insert(
    //         token2documents.map(({ token, name, matchCount }) => ({
    //           id: token,
    //           totalCount: matchCount,
    //           name,
    //         })),
    //       )
    //       .onConflict('id')
    //       .merge({
    //         totalCount: this.#knex.raw('?? - excluded.??', [
    //           'searchIndexTokens.totalCount',
    //           'totalCount',
    //         ]),
    //       });
    //   }

    //   await trx('searchIndexTokens').del().where({ totalCount: 0 });
    //   await trx('searchIndexDocuments').del().where({ entity });
    // });

    return this;
  }

  /**
   * Write
   */
  public async writeTokensIntoIndex(tokens: SearchToken[]): Promise<void> {
    const documentRecords: any[] = [];
    const tokenRecords: any[] = [];
    const token2documents: any[] = [];

    tokens.forEach(token => {
      const tokenID = crypto.randomUUID().toString();

      token.getDocuments().forEach(document => {
        tokenRecords.push({
          id: tokenID,
          name: token.getName(),
          totalCount: document.getTokenMatchCount(),
        });

        if (!documentRecords.find(record => record.entity === document.getName())) {
          documentRecords.push({
            id: crypto.randomUUID().toString(),
            entity: document.getName(),
          });
        }

        token2documents.push({
          token: token.getName(), // will be replaced to real token ID below
          document: document.getName(), // will be replaced to real document ID below
          matchCount: document.getTokenMatchCount(),
          positions: JSON.stringify(document.getTokenPositions()),
        });
      });
    });

    // await this.#knex.transaction(async trx => {
    //   const insertedTokens = await trx<SearchIndexTokensTableModel>('searchIndexTokens')
    //     .insert(tokenRecords)
    //     .onConflict('name')
    //     .merge({
    //       totalCount: this.#knex.raw('?? + excluded.??', [
    //         'searchIndexTokens.totalCount',
    //         'totalCount',
    //       ]),
    //     })
    //     .returning(['id', 'name']);

    //   await trx<SearchIndexDocumentsModel>('searchIndexDocuments').insert(documentRecords);
    //   await trx<SearchIndexToken2DocumentTableModel>('searchIndexToken2Document').insert(
    //     token2documents.map(record => ({
    //       ...record,
    //       token: insertedTokens.find(({ name }) => name === record.token)?.id,
    //       document: documentRecords.find(({ entity }) => entity === record.document)?.id,
    //     })),
    //   );
    // });
  }

  /**
   * Remove all elements from index
   */
  public async clearIndex(): Promise<this> {
    // await this.#knex.transaction(async trx => {
    //   await trx('searchIndexTokens').del();
    //   await trx('searchIndexDocuments').del();
    //   await trx('searchIndexToken2Document').del();
    // });

    return this;
  }

  /**
   * Simple search by tokens match
   */
  public async search(query: string, lang: Lang): Promise<SearchDocument[]> {
    const stemmer = new Stemmer(lang);
    const tokens = Tokenizer.tokenize(query)
      .filter(token => !stemmer.isStopToken(token))
      .map(token => stemmer.stem(token));

    // const request = this.#knex({ t: 'searchIndexTokens' })
    //   .select<
    //     ReadonlyArray<{
    //       readonly tokenID: SearchIndexTokensTableRecord['id'];
    //       readonly token: SearchIndexTokensTableRecord['name'];
    //       readonly entity: SearchIndexDocumentsRecord['entity'];
    //       readonly document: SearchIndexToken2DocumentTableRecord['document'];
    //       readonly matchCount: SearchIndexToken2DocumentTableRecord['matchCount'];
    //       readonly positions: SearchIndexToken2DocumentTableRecord['positions'];
    //     }>
    //   >([
    //     this.#knex.raw('?? as ??', ['t.id', 'tokenID']),
    //     this.#knex.raw('?? as ??', ['t.name', 'token']),
    //     'd.entity',
    //     't2d.document',
    //     't2d.matchCount',
    //     't2d.positions',
    //   ])
    //   .innerJoin({ t2d: 'searchIndexToken2Document' }, 't2d.token', 't.id')
    //   .leftJoin({ d: 'searchIndexDocuments' }, 'd.id', 't2d.document')
    //   .whereIn('t.name', tokens)
    //   .orderBy('t2d.matchCount', 'desc');
    // const records = await request;
    const records: any[] = [];
    const documents: SearchDocument[] = [];

    records.forEach(record => {
      const token = new SearchToken(record.token);
      const document = new SearchDocument(record.entity);

      // TODO: Should be a page rank result
      const bestTokenPosition = record.positions[0];
      document.setTokenMatchCount(record.matchCount);
      document.setTokenPositions([bestTokenPosition]);
      document.setTokenRef(token);
      token.attachDocRef(document);
      documents.push(document);
    });

    return documents;
  }
}

export default Indexer;
