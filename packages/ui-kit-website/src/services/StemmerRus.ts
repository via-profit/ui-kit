/*
Copyright (c) 2012, Polyakov Vladimir, Chris Umbel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
*/

class StemmerRus {
  #stopTokens = [
    'а б в г д е ё ж з и й к л м н о п р с т у ф х ц ч ш щ ъ ь э ю я 0 1 2 3 4 5 6 7 8 9 _',
    // 'он её оно они те мы этот тот их',
    // 'но от во до за бы ты из на об обо',
    // 'после все также там другие все как потому был являюсь',
    // 'между все иди могу подойди мог делал делаю каждый для',
    // 'откуда иметь имел имеет здесь его как если делать много',
    // 'может быть более самый должен мой никогда сейчас только',
    // 'или другой другая другое наше вне конец сказал сказала',
    // 'также видел немного все еще так затемчерез тоже под над',
    // 'очень был путь хорошо что где который пока кто кем хотел твои',
  ];

  public stem(token: string): string {
    const inputToken = token.toLowerCase().replace(/ё/g, 'е').trim();
    const volwesRegexp = /^(.*?[аеиоюяуыиэ])(.*)$/g;
    const regexpResult = volwesRegexp.exec(inputToken);

    if (!regexpResult || regexpResult.length < 3) {
      return inputToken;
    }

    const head = regexpResult[1];
    const matchesEnds = regexpResult[2];

    volwesRegexp.lastIndex = 0;
    const regexpResult2 = volwesRegexp.exec(matchesEnds);
    let result = this.perfectiveGerund(matchesEnds);

    if (result === null) {
      const resultReflexive = this.reflexive(matchesEnds) || matchesEnds;
      result = this.adjectival(resultReflexive);
      if (result === null) {
        result = this.verb(resultReflexive);
        if (result === null) {
          result = this.noun(resultReflexive);
          if (result === null) {
            result = resultReflexive;
          }
        }
      }
    }
    result = result.replace(/и$/g, '');
    let derivationalResult: string | null = result;

    if (regexpResult2 && regexpResult2[2]) {
      derivationalResult = this.derivational(regexpResult2[2]);
      if (derivationalResult != null) {
        derivationalResult = this.derivational(result);
      } else {
        derivationalResult = result;
      }
    }

    let superlativeResult = this.superlative(derivationalResult || '') || derivationalResult;

    if (superlativeResult !== null) {
      superlativeResult = superlativeResult.replace(/(н)н/g, '$1');
      superlativeResult = superlativeResult.replace(/ь$/g, '');
    }

    return `${head}${superlativeResult}`;
  }

  public isStopToken(token: string): boolean {
    return this.#stopTokens.findIndex(row => row.split(' ').includes(token)) > -1;
  }

  private attemptReplacePatterns(token: string, patterns: [RegExp, string][]) {
    let replacement = null;
    let isReplaced = false;
    let i = 0;

    while (i < patterns.length && !isReplaced) {
      if (patterns[i][0].test(token)) {
        replacement = token.replace(patterns[i][0], patterns[i][1]);
        isReplaced = true;
      }
      i++;
    }

    return replacement;
  }

  private perfectiveGerund(token: string) {
    const result = this.attemptReplacePatterns(token, [
      [/[ая]в(ши|шись)$/g, ''],
      [/(ив|ивши|ившись|ывши|ывшись|ыв)$/g, ''],
    ]);

    return result;
  }

  private adjective(token: string) {
    const result = this.attemptReplacePatterns(token, [
      [
        /(ее|ие|ные|ые|ое|ими|ыми|ей|ий|ый|ой|ем|им|ым|ом|его|ого|ему|ому|их|ых|ую|юю|ая|яя|ою|ею)$/g,
        '',
      ],
    ]);

    return result;
  }

  private participle(token: string) {
    const result = this.attemptReplacePatterns(token, [
      [/([ая])(ем|нн|вш|ющ|щ)$/g, '$1'],
      [/(ивш|ывш|ующ)$/g, ''],
    ]);

    return result;
  }

  private adjectival(token: string) {
    let result = this.adjective(token);
    if (result != null) {
      const pariticipleResult = this.participle(result);
      result = pariticipleResult || result;
    }

    return result;
  }

  private reflexive(token: string) {
    const result = this.attemptReplacePatterns(token, [[/(ся|сь)$/g, '']]);

    return result;
  }

  private verb(token: string) {
    const result = this.attemptReplacePatterns(token, [
      [/([ая])(ла|на|ете|йте|ли|й|л|ем|н|ло|но|ет|ют|ны|ть|ешь|нно)$/g, '$1'],
      [
        /(ила|ыла|ена|ейте|уйте|ите|или|ыли|ей|уй|ил|ыл|им|ым|ен|ило|ыло|ено|ят|ует|ит|ыт|ены|ить|ыть|ишь|ую|ю)$/g,
        '',
      ],
    ]);

    return result;
  }

  private noun(token: string) {
    const result = this.attemptReplacePatterns(token, [
      [
        /(а|ев|ов|ие|ье|е|иями|ями|ами|еи|ии|и|ией|ей|ой|ий|й|иям|ям|ием|ем|ам|ом|о|у|ах|иях|ях|ы|ь|ию|ью|ю|ия|ья|я)$/g,
        '',
      ],
    ]);

    return result;
  }

  private superlative(token: string) {
    const result = this.attemptReplacePatterns(token, [[/(ейш|ейше)$/g, '']]);

    return result;
  }

  private derivational(token: string) {
    const result = this.attemptReplacePatterns(token, [[/(ост|ость)$/g, '']]);

    return result;
  }
}

export default StemmerRus;
