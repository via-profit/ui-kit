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

export type ParsedColor = {
  r: number;
  g: number;
  b: number;
  a: number;
};

class Color implements ColorInterface {
  #color: ParsedColor;
  #cache: ParsedColor;

  constructor(value: string | Color) {
    if (value instanceof Color) {
      this.#color = {
        ...value.rgb(),
      };
    } else {
      this.#color = this.parseColor(value);
    }

    this.#cache = { ...this.#color };

    return this;
  }
  lighten(decimal: number): this {
    return this.shade(decimal);
  }
  darken(decimal: number): this {
    return this.shade(-decimal);
  }
  alpha(decimal: number): this {
    this.#color.a = decimal;

    return this;
  }

  /**
   * Get color luminance value
   */
  luminance(): number {
    const RED = 0.2126;
    const GREEN = 0.7152;
    const BLUE = 0.0722;

    const GAMMA = 2.4;

    const a = [this.#color.r, this.#color.g, this.#color.b].map(v => {
      v /= 255;

      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, GAMMA);
    });

    return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
  }
  contrast(rgb2: string | Color) {
    const color2 = rgb2 instanceof Color ? rgb2 : new Color(rgb2);
    const lum1 = this.luminance();
    const lum2 = color2.luminance();
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);

    return (brightest + 0.05) / (darkest + 0.05);
  }
  /**
   * Lighten or darknest color to lum steps
   * lum - 0-25
   */
  shade(lum: number) {
    this.#color.r = parseInt('0' + Math.min(255, Math.max(0, this.#color.r + lum)), 10);

    this.#color.g = parseInt('0' + Math.min(255, Math.max(0, this.#color.g + lum)), 10);

    this.#color.b = parseInt('0' + Math.min(255, Math.max(0, this.#color.b + lum)), 10);

    return this;
  }

  rgb() {
    const result = { ...this.#color };
    this.#color = { ...this.#cache };

    return result;
  }
  toString() {
    const result = this.rgbString();
    this.#color = { ...this.#cache };

    return result;
  }
  rgbString() {
    const result = `rgba(${this.#color.r}, ${this.#color.g}, ${this.#color.b}, ${this.#color.a})`;
    this.#color = { ...this.#cache };

    return result;
  }
  hexString(): string {
    const colorToHex = (color: number) => {
      const hexadecimal = color.toString(16);

      return hexadecimal.length === 1 ? `0${hexadecimal}` : hexadecimal;
    };

    const result =
      '#' + colorToHex(this.#color.r) + colorToHex(this.#color.g) + colorToHex(this.#color.b);
    this.#color = { ...this.#cache };

    return result;
  }

  parseColor(value: string): ParsedColor {
    const inputColor = value.trim().toLowerCase();
    const hsl = inputColor.indexOf('hsl') === 0;
    const hex3 = inputColor.replace(/[^#0-9a-f]/g, '').match(/^#([0-9a-f]{3})$/i);
    const hex6 = inputColor.replace(/[^#0-9a-f]/g, '').match(/^#([0-9a-f]{6})$/i);
    const rgb = inputColor
      .replace(/[^rgb(),.0-9]/g, '')
      .match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    const rgba =
      inputColor
        .replace(/[^rgba(),.0-9]/g, '')
        .match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+.*\d*)\s*\)$/i) ||
      inputColor
        .replace(/[^rgba(),.0-9]/g, '')
        .match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);

    if (hex3 && hex3.length > 1) {
      // in three-character format, each value is multiplied by 0x11 to give an
      // even scale from 0x00 to 0xff

      return {
        r: parseInt(hex3[1].charAt(0), 16) * 0x11,
        g: parseInt(hex3[1].charAt(1), 16) * 0x11,
        b: parseInt(hex3[1].charAt(2), 16) * 0x11,
        a: 1,
      };
    }

    if (hex6 && hex6.length >= 1) {
      return {
        r: parseInt(hex6[1].substring(0, 2), 16),
        g: parseInt(hex6[1].substring(2, 4), 16),
        b: parseInt(hex6[1].substring(4, 6), 16),
        a: 1,
      };
    }

    if (rgb && rgb.length >= 3) {
      return {
        r: parseInt(rgb[1], 10),
        g: parseInt(rgb[2], 10),
        b: parseInt(rgb[3], 10),
        a: 1,
      };
    }

    if (rgba && rgba.length >= 3) {
      return {
        r: parseInt(rgba[1], 10),
        g: parseInt(rgba[2], 10),
        b: parseInt(rgba[3], 10),
        a: rgba[4] === undefined ? 1 : Number(rgba[4]),
      };
    }

    if (hsl) {
      return this.hslToRgb(inputColor);
    }

    const webHex = this.getHextByWebColor(inputColor);

    if (webHex) {
      return this.parseColor(webHex);
    }

    throw new Error(`Failed to parse color value «${value}»`);
  }
  hslToRgb(value: string): ParsedColor {
    const hsl = value.match(/(\d+(\.\d+)?)/g);
    if (!hsl || hsl.length < 3) {
      throw new Error('is not a valid hsl color');
    }

    const h = Number(hsl[0]) / 360;
    const s = Number(hsl[1]) / 100;
    const l = Number(hsl[2]) / 100;
    const a = hsl[3] === undefined ? 1 : Number(hsl[3]);
    let t1: number;
    let t2: number;
    let t3: number;
    let rgb: number[];
    let val: number;

    if (s === 0) {
      val = Math.round(l * 255);
      rgb = [val, val, val, a];
    } else {
      if (l < 0.5) {
        t2 = l * (1 + s);
      } else {
        t2 = l + s - l * s;
      }
      t1 = 2 * l - t2;
      rgb = [0, 0, 0];

      for (let i = 0; i < 3; i++) {
        t3 = h + (1 / 3) * -(i - 1);
        t3 < 0 && t3++;
        t3 > 1 && t3--;
        if (6 * t3 < 1) {
          val = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
          val = t2;
        } else if (3 * t3 < 2) {
          val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
          val = t1;
        }
        rgb[i] = Math.round(val * 255);
      }
    }
    rgb.push(a);

    return {
      r: Number(rgb[0]),
      g: Number(rgb[1]),
      b: Number(rgb[2]),
      a: typeof rgb[3] === 'undefined' ? 1 : Number(rgb[3]),
    };
  }
  getHextByWebColor(value: string) {
    const webColors = {
      aliceblue: '#F0F8FF',
      antiquewhite: '#FAEBD7',
      aqua: '#00FFFF',
      aquamarine: '#7FFFD4',
      azure: '#F0FFFF',
      beige: '#F5F5DC',
      bisque: '#FFE4C4',
      black: '#000000',
      blanchedalmond: '#FFEBCD',
      blue: '#0000FF',
      blueviolet: '#8A2BE2',
      brown: '#A52A2A',
      burlywood: '#DEB887',
      cadetblue: '#5F9EA0',
      chartreuse: '#7FFF00',
      chocolate: '#D2691E',
      coral: '#FF7F50',
      cornflowerblue: '#6495ED',
      cornsilk: '#FFF8DC',
      crimson: '#DC143C',
      cyan: '#00FFFF',
      darkblue: '#00008B',
      darkcyan: '#008B8B',
      darkgoldenrod: '#B8860B',
      darkgray: '#A9A9A9',
      darkgrey: '#A9A9A9',
      darkgreen: '#006400',
      darkkhaki: '#BDB76B',
      darkmagenta: '#8B008B',
      darkolivegreen: '#556B2F',
      darkorange: '#FF8C00',
      darkorchid: '#9932CC',
      darkred: '#8B0000',
      darksalmon: '#E9967A',
      darkseagreen: '#8FBC8F',
      darkslateblue: '#483D8B',
      darkslategray: '#2F4F4F',
      darkslategrey: '#2F4F4F',
      darkturquoise: '#00CED1',
      darkviolet: '#9400D3',
      deeppink: '#FF1493',
      deepskyblue: '#00BFFF',
      dimgray: '#696969',
      dimgrey: '#696969',
      dodgerblue: '#1E90FF',
      firebrick: '#B22222',
      floralwhite: '#FFFAF0',
      forestgreen: '#228B22',
      fuchsia: '#FF00FF',
      gainsboro: '#DCDCDC',
      ghostwhite: '#F8F8FF',
      gold: '#FFD700',
      goldenrod: '#DAA520',
      gray: '#808080',
      grey: '#808080',
      green: '#008000',
      greenyellow: '#ADFF2F',
      honeydew: '#F0FFF0',
      hotpink: '#FF69B4',
      'indianred ': '#CD5C5C',
      'indigo ': '#4B0082',
      ivory: '#FFFFF0',
      khaki: '#F0E68C',
      lavender: '#E6E6FA',
      lavenderblush: '#FFF0F5',
      lawngreen: '#7CFC00',
      lemonchiffon: '#FFFACD',
      lightblue: '#ADD8E6',
      lightcoral: '#F08080',
      lightcyan: '#E0FFFF',
      lightgoldenrodyellow: '#FAFAD2',
      lightgray: '#D3D3D3',
      lightgrey: '#D3D3D3',
      lightgreen: '#90EE90',
      lightpink: '#FFB6C1',
      lightsalmon: '#FFA07A',
      lightseagreen: '#20B2AA',
      lightskyblue: '#87CEFA',
      lightslategray: '#778899',
      lightslategrey: '#778899',
      lightsteelblue: '#B0C4DE',
      lightyellow: '#FFFFE0',
      lime: '#00FF00',
      limegreen: '#32CD32',
      linen: '#FAF0E6',
      magenta: '#FF00FF',
      maroon: '#800000',
      mediumaquamarine: '#66CDAA',
      mediumblue: '#0000CD',
      mediumorchid: '#BA55D3',
      mediumpurple: '#9370DB',
      mediumseagreen: '#3CB371',
      mediumslateblue: '#7B68EE',
      mediumspringgreen: '#00FA9A',
      mediumturquoise: '#48D1CC',
      mediumvioletred: '#C71585',
      midnightblue: '#191970',
      mintcream: '#F5FFFA',
      mistyrose: '#FFE4E1',
      moccasin: '#FFE4B5',
      navajowhite: '#FFDEAD',
      navy: '#000080',
      oldlace: '#FDF5E6',
      olive: '#808000',
      olivedrab: '#6B8E23',
      orange: '#FFA500',
      orangered: '#FF4500',
      orchid: '#DA70D6',
      palegoldenrod: '#EEE8AA',
      palegreen: '#98FB98',
      paleturquoise: '#AFEEEE',
      palevioletred: '#DB7093',
      papayawhip: '#FFEFD5',
      peachpuff: '#FFDAB9',
      peru: '#CD853F',
      pink: '#FFC0CB',
      plum: '#DDA0DD',
      powderblue: '#B0E0E6',
      purple: '#800080',
      rebeccapurple: '#663399',
      red: '#FF0000',
      rosybrown: '#BC8F8F',
      royalblue: '#4169E1',
      saddlebrown: '#8B4513',
      salmon: '#FA8072',
      sandybrown: '#F4A460',
      seagreen: '#2E8B57',
      seashell: '#FFF5EE',
      sienna: '#A0522D',
      silver: '#C0C0C0',
      skyblue: '#87CEEB',
      slateblue: '#6A5ACD',
      slategray: '#708090',
      slategrey: '#708090',
      snow: '#FFFAFA',
      springgreen: '#00FF7F',
      steelblue: '#4682B4',
      tan: '#D2B48C',
      teal: '#008080',
      thistle: '#D8BFD8',
      tomato: '#FF6347',
      turquoise: '#40E0D0',
      violet: '#EE82EE',
      wheat: '#F5DEB3',
      white: '#FFFFFF',
      whitesmoke: '#F5F5F5',
      yellow: '#FFFF00',
      yellowgreen: '#9ACD32',
    };

    const v = value.trim().toLowerCase() as keyof typeof webColors;

    return webColors[v];
  }
}

// class Color {
//   #c: _Color;
//   #cache: _Color;
//   constructor(value: string) {
//     this.#c = new _Color(value);
//     this.#cache = new _Color(value);

//     return this;
//   }
//   lighten(decimal: number): this {
//     this.#c.lighten(decimal);

//     return this;
//   }
//   darken(decimal: number): this {
//     this.#c.darken(decimal);

//     return this;
//   }
//   alpha(decimal: number): this {
//     this.#c.alpha(decimal);

//     return this;
//   }
//   toString() {
//     const s = this.#c.toString();
//     this.#c = new _Color(this.#cache.toString());

//     return s;
//   }
// }

export default Color;
