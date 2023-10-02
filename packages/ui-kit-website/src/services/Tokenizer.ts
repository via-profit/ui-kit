export class Tokenizer {
  /**
   * Break a string up into an array of tokens by anything non-word
   */
  public static tokenize(text: string) {
    return text
      .replace(/[\s\n]+/g, ' ')
      .split(' ')
      .filter(token => token !== '' && token.length < 51);
  }
}

export default Tokenizer;
