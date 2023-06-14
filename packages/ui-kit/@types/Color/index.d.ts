declare module '@via-profit/ui-kit/Color' {
  export type ParsedColor = {
    r: number;
    g: number;
    b: number;
    a: number;
  };

  export interface ColorInterface {
    parseColor(value: string | Color): ParsedColor;
    shade(decimal: number): this;
    alpha(decimal: number): this;
    lighten(decimal: number): this;
    darken(decimal: number): this;
    getHextByWebColor(value: string): string;
    rgb(): ParsedColor;
    rgbString(): string;
    hexString(): string;
    toString(): string;
    luminance(): number;
    contrast(rgb2: string | Color): number;
  }

  interface Color extends ColorInterface {}

  class Color implements Color {}
}
