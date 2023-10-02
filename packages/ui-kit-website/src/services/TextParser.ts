import fs from 'node:fs';

import type { ParsedTokensMap, Lang } from 'revert-index';
import Tokenizer from './Tokenizer';
import Stemmer from './Stemmer';

class TextParser {
  public static parseText(text: string, lang: Lang): ParsedTokensMap {
    const stemmer = new Stemmer(lang);
    const tokensMap: ParsedTokensMap = new Map();
    const tokens = Tokenizer.tokenize(text);

    tokens.forEach((token, index) => {
      let stemmedToken = stemmer.stem(token);
      let tokenIndex = index;

      // If token starts at one of this symbols
      // then remove this symbol and increment the index

      if ('«.,"\'/([`|'.split('').includes(stemmedToken[0])) {
        stemmedToken = stemmedToken.slice(1);
        tokenIndex += 1;
      }

      // If token ends at one of this symbols
      // The token index does not be changed
      if ('"».\'/)].,;!?`|-_!@#'.split('').includes(stemmedToken[stemmedToken.length - 1])) {
        stemmedToken = stemmedToken.slice(stemmedToken.length - 1);
      }

      if (stemmer.isStopToken(stemmedToken)) {
        return;
      }

      if (stemmedToken.replace(/[^a-zа-яё0-9]/gi, '') === '') {
        return;
      }

      const counteInDoc = tokensMap.get(stemmedToken)?.parsedTokenCountInDocument || 0;
      const positions = tokensMap.get(stemmedToken)?.parsedTokenPositions || [];

      tokensMap.set(stemmedToken, {
        parsedTokenCountInDocument: counteInDoc + 1,
        parsedTokenPositions: positions.concat([tokenIndex]),
      });
    });

    return tokensMap;
  }

  public static parseFile(filename: string, lang: Lang) {
    const text = fs.readFileSync(filename, { encoding: 'utf8' });

    return TextParser.parseText(text, lang);
  }
}

export default TextParser;
