import { Lang } from 'revert-index';

import StemmerRus from './StemmerRus';
import StemmerEn from './StemmerEn';

class Stemmer {
  #lang: Lang;
  #stemmer: StemmerRus | StemmerEn;

  public constructor(lang: Lang) {
    this.#lang = lang;
    switch (this.#lang) {
      case 'en-US':
        this.#stemmer = new StemmerEn();
        break;

      case 'ru-RU':
      default:
        this.#stemmer = new StemmerRus();
        break;
    }
  }

  public stem(token: string): string {
    return this.#stemmer.stem(token);
  }

  public isStopToken(token: string): boolean {
    return this.#stemmer.isStopToken(token);
  }
}

export default Stemmer;
