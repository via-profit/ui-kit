class StemmerEn {
  #stopTokens = [
    'a b c d e f g h i j k l m n o p q r s t u v w x y z $ 1 2 3 4 5 6 7 8 9 0 _',
    'about above after again all also am an and another any are as at be because',
    'been before being below between both but by came can cannot come could did do',
    'does doing during each few for from further get got',
    'has had he have her here him himself his how if in into is it its itself like make',
    'many me might more most much must my myself never now of on only or other our ours',
    'ourselves out over own said same see should since so some still such take',
    'than that the their theirs them themselves then there these they this those through',
    'to too under until up very was way we well were what where when which while who whom with would why',
    'you your yours yourself',
  ];

  public stem(token: string): string {
    if (token.length < 3) {
      return token;
    }

    return this.step5b(
      this.step5a(
        this.step4(
          this.step3(this.step2(this.step1c(this.step1b(this.step1a(token.toLowerCase()))))),
        ),
      ),
    ).toString();
  }

  public isStopToken(token: string): boolean {
    return this.#stopTokens.findIndex(row => row.split(' ').includes(token)) > -1;
  }

  private categorizeGroups(token: string) {
    return token
      .replace(/[^aeiouy]+y/g, 'CV')
      .replace(/[aeiou]+/g, 'V')
      .replace(/[^V]+/g, 'C');
  }

  // denote single consonants with a C and single vowels with a V
  private categorizeChars(token: string) {
    return token
      .replace(/[^aeiouy]y/g, 'CV')
      .replace(/[aeiou]/g, 'V')
      .replace(/[^V]/g, 'C');
  }

  // calculate the "measure" M of a token. M is the count of VC sequences dropping
  // an initial C if it exists and a trailing V if it exists.
  private measure(token: string) {
    if (!token) return -1;

    return this.categorizeGroups(token).replace(/^C/, '').replace(/V$/, '').length / 2;
  }

  // determine if a token end with a double consonant i.e. happ
  private endsWithDoublCons(token: string) {
    return token.match(/([^aeiou])\1$/);
  }

  // replace a pattern in a token. if a replacement occurs an optional callback
  // can be called to post-process the result. if no match is made NULL is
  // returned.
  private attemptReplace(
    token: string,
    pattern: string | RegExp,
    replacement: string,
    callback?: (token: string) => void,
  ) {
    let result = null;

    if (typeof pattern === 'string' && token.substring(token.length - pattern.length) === pattern) {
      result = token.replace(new RegExp(pattern + '$'), replacement);
    }

    if (pattern instanceof RegExp && token.match(pattern)) {
      result = token.replace(pattern, replacement);
    }

    if (result && callback) {
      return callback(result);
    }

    return result;
  }

  // attempt to replace a list of patterns/replacements on a token for a minimum
  // measure M.
  private attemptReplacePatterns(
    token: string,
    replacements: [RegExp | string, string, string][],
    measureThreshold?: number | null,
  ) {
    let replacement = token;

    for (let i = 0; i < replacements.length; i++) {
      const attemptReplace = this.attemptReplace(token, replacements[i][0], replacements[i][1]);

      if (
        measureThreshold == null ||
        (attemptReplace && this.measure(attemptReplace) > measureThreshold)
      ) {
        replacement =
          this.attemptReplace(replacement, replacements[i][0], replacements[i][2]) || replacement;
      }
    }

    return replacement;
  }

  // replace a list of patterns/replacements on a token. if no match is made return
  // the original token.
  private replacePatterns(
    token: string,
    replacements: [string, string, string][],
    measureThreshold?: number | null,
  ) {
    return this.attemptReplacePatterns(token, replacements, measureThreshold) || token;
  }

  // TODO: this should replace all of the messy replacement stuff above
  private replaceRegex(
    token: string,
    regex: RegExp,
    includeParts: number[],
    minimumMeasure: number,
  ) {
    let parts: RegExpExecArray | null;
    let result = '';

    if (regex.test(token)) {
      parts = regex.exec(token);

      includeParts.forEach(function (i) {
        if (parts) {
          result += parts[i];
        }
      });
    }

    if (this.measure(result) > minimumMeasure) {
      return result;
    }

    return null;
  }

  // step 1a as defined for the porter stemmer algorithm.
  private step1a(token: string) {
    if (token.match(/(ss|i)es$/)) {
      return token.replace(/(ss|i)es$/, '$1');
    }

    if (
      token.substring(token.length, token.length - 1) === 's' &&
      token.substring(token.length - 2, token.length - 1) !== 's' &&
      token.length > 2
    ) {
      return token.replace(/s?$/, '');
    }

    return token;
  }

  // step 1b as defined for the porter stemmer algorithm.
  private step1b(token: string) {
    if (token.substring(token.length - 3) === 'eed') {
      if (this.measure(token.substring(0, token.length - 3)) > 0) {
        return token.replace(/eed$/, 'ee');
      }

      return token;
    }

    let result = this.attemptReplace(token, /(ed|ing)$/, '', token => {
      if (this.categorizeGroups(token).indexOf('V') >= 0) {
        result = this.attemptReplacePatterns(token, [
          ['at', '', 'ate'],
          ['bl', '', 'ble'],
          ['iz', '', 'ize'],
        ]);

        if (result !== token) {
          return result;
        }

        if (this.endsWithDoublCons(token) && token.match(/[^lsz]$/)) {
          return token.replace(/([^aeiou])\1$/, '$1');
        }

        const categorizeChars = this.categorizeChars(token);

        if (
          this.measure(token) === 1 &&
          categorizeChars.substring(categorizeChars.length, categorizeChars.length - 3) === 'CVC' &&
          token.match(/[^wxy]$/)
        ) {
          return token + 'e';
        }

        return token;
      }

      return null;
    });

    if (result) {
      return result;
    }

    return token;
  }

  // step 1c as defined for the porter stemmer algorithm.
  private step1c(token: string) {
    const categorizedGroups = this.categorizeGroups(token);

    if (
      token.substring(token.length - 1) === 'y' &&
      categorizedGroups.substring(0, categorizedGroups.length - 1).indexOf('V') > -1
    ) {
      return token.replace(/y$/, 'i');
    }

    return token;
  }

  // step 2 as defined for the porter stemmer algorithm.
  private step2(token: string) {
    token = this.replacePatterns(
      token,
      [
        ['ational', '', 'ate'],
        ['tional', '', 'tion'],
        ['enci', '', 'ence'],
        ['anci', '', 'ance'],
        ['izer', '', 'ize'],
        ['abli', '', 'able'],
        ['bli', '', 'ble'],
        ['alli', '', 'al'],
        ['entli', '', 'ent'],
        ['eli', '', 'e'],
        ['ousli', '', 'ous'],
        ['ization', '', 'ize'],
        ['ation', '', 'ate'],
        ['ator', '', 'ate'],
        ['alism', '', 'al'],
        ['iveness', '', 'ive'],
        ['fulness', '', 'ful'],
        ['ousness', '', 'ous'],
        ['aliti', '', 'al'],
        ['iviti', '', 'ive'],
        ['biliti', '', 'ble'],
        ['logi', '', 'log'],
      ],
      0,
    );

    return token;
  }

  // step 3 as defined for the porter stemmer algorithm.
  private step3(token: string) {
    return this.replacePatterns(
      token,
      [
        ['icate', '', 'ic'],
        ['ative', '', ''],
        ['alize', '', 'al'],
        ['iciti', '', 'ic'],
        ['ical', '', 'ic'],
        ['ful', '', ''],
        ['ness', '', ''],
      ],
      0,
    );
  }

  // step 4 as defined for the porter stemmer algorithm.
  private step4(token: string) {
    return (
      this.replaceRegex(
        token,
        /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/,
        [1],
        1,
      ) ||
      this.replaceRegex(token, /^(.+?)(s|t)(ion)$/, [1, 2], 1) ||
      token
    );
  }

  // step 5a as defined for the porter stemmer algorithm.
  private step5a(token: string) {
    const m = this.measure(token.replace(/e$/, ''));
    const categorizeChars = this.categorizeChars(token);

    if (
      m > 1 ||
      (m === 1 &&
        !(
          categorizeChars.substring(categorizeChars.length - 4, categorizeChars.length - 1) ===
            'CVC' && token.match(/[^wxy].$/)
        ))
    ) {
      token = token.replace(/e$/, '');
    }

    return token;
  }

  // step 5b as defined for the porter stemmer algorithm.
  private step5b(token: string) {
    if (this.measure(token) > 1) {
      return token.replace(/ll$/, 'l');
    }

    return token;
  }
}

export default StemmerEn;
