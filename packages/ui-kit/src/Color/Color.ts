import { ColorParser, ParsedColor } from './ColorParser';
import { ColorGenerator } from './ColorGenerator';

export type ColorFormat = 'rgb' | 'rgba' | 'hex' | 'hsl' | 'hsla';

export class Color {
  private readonly _r: number;
  private readonly _g: number;
  private readonly _b: number;
  private readonly _a: number;

  public get r(): number {
    return this._r;
  }

  public get g(): number {
    return this._g;
  }

  public get b(): number {
    return this._b;
  }

  public get a(): number {
    return this._a;
  }

  private constructor(r: number, g: number, b: number, a: number = 1) {
    this._r = this.clamp(r, 0, 255);
    this._g = this.clamp(g, 0, 255);
    this._b = this.clamp(b, 0, 255);
    this._a = this.clamp(a, 0, 1);
  }

  /**
   * Создает цвет из строкового представления
   */
  public static fromString(value: string): Color {
    const parsed = ColorParser.parse(value);

    return new Color(parsed.r, parsed.g, parsed.b, parsed.a);
  }

  /**
   * Создает цвет из RGB компонентов
   */
  public static fromRgb(r: number, g: number, b: number, a: number = 1): Color {
    return new Color(r, g, b, a);
  }

  /**
   * Создает цвет из HEX строки
   */
  public static fromHex(hex: string): Color {
    return Color.fromString(hex);
  }

  /**
   * Создает цвет из HSL строки
   */
  public static fromHsl(hsl: string): Color {
    return Color.fromString(hsl);
  }

  /**
   * Создает цвет из UUID (использует генератор)
   */
  public static fromUuid(uuid: string, palette?: keyof typeof ColorGenerator.getPalettes): Color {
    return ColorGenerator.fromUuid(uuid, palette);
  }

  /**
   * Создает цвет из строки с хешированием
   */
  public static fromHashString(str: string): Color {
    return ColorGenerator.fromString(str);
  }

  /**
   * Возвращает новый цвет, осветленный на указанное количество единиц
   */
  public lighten(units: number): Color {
    return new Color(
      this.clamp(this._r + units, 0, 255),
      this.clamp(this._g + units, 0, 255),
      this.clamp(this._b + units, 0, 255),
      this._a,
    );
  }

  /**
   * Возвращает новый цвет, затемненный на указанное количество единиц
   */
  public darken(units: number): Color {
    return this.lighten(-units);
  }

  /**
   * Изменяет яркость цвета путем умножения каждого канала на коэффициент
   * @param lum - Коэффициент изменения яркости (от -1 до 1, где отрицательные значения затемняют, положительные - осветляют)
   * @returns Новый объект Color с измененной яркостью
   *
   * @example
   * ```ts
   * const color = Color.fromString('#ff0000');
   * const lighter = color.luminance(0.2); // на 20% светлее
   * const darker = color.luminance(-0.2); // на 20% темнее
   * ```
   */
  public luminance(lum: number): Color {
    const factor = 1 + lum;

    return new Color(
      this.clamp(Math.round(this._r * factor), 0, 255),
      this.clamp(Math.round(this._g * factor), 0, 255),
      this.clamp(Math.round(this._b * factor), 0, 255),
      this._a,
    );
  }

  /**
   * Возвращает новый цвет с измененной яркостью (процентное изменение)
   */
  public adjustBrightness(percent: number): Color {
    const factor = 1 + percent / 100;

    return new Color(
      this.clamp(Math.round(this._r * factor), 0, 255),
      this.clamp(Math.round(this._g * factor), 0, 255),
      this.clamp(Math.round(this._b * factor), 0, 255),
      this._a,
    );
  }

  /**
   * Возвращает новый цвет с измененным альфа-каналом
   */
  public alpha(value: number): Color {
    return new Color(this._r, this._g, this._b, this.clamp(value, 0, 1));
  }

  /**
   * Возвращает относительную яркость цвета (luminance)
   */
  public getLuminance(): number {
    const RED = 0.2126;
    const GREEN = 0.7152;
    const BLUE = 0.0722;
    const GAMMA = 2.4;

    const [r, g, b] = [this._r, this._g, this._b].map(v => {
      v /= 255;

      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, GAMMA);
    });

    return r * RED + g * GREEN + b * BLUE;
  }

  /**
   * Возвращает контраст между текущим цветом и переданным
   */
  public getContrast(other: Color | string): number {
    const otherColor = other instanceof Color ? other : Color.fromString(other);
    const lum1 = this.getLuminance();
    const lum2 = otherColor.getLuminance();

    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);

    return (brightest + 0.05) / (darkest + 0.05);
  }

  /**
   * Проверяет, достаточно ли контрастен цвет для белого текста
   */
  public isLight(): boolean {
    return this.getLuminance() > 0.5;
  }

  /**
   * Возвращает наиболее контрастный цвет (черный или белый)
   */
  public getContrastColor(): Color {
    return this.isLight() ? Color.fromString('#000000') : Color.fromString('#FFFFFF');
  }

  /**
   * Возвращает новый цвет, смешанный с другим цветом
   */
  public mix(other: Color | string, weight: number = 0.5): Color {
    const otherColor = other instanceof Color ? other : Color.fromString(other);
    const w = this.clamp(weight, 0, 1);

    return new Color(
      Math.round(this._r * (1 - w) + otherColor.r * w),
      Math.round(this._g * (1 - w) + otherColor.g * w),
      Math.round(this._b * (1 - w) + otherColor.b * w),
      this._a * (1 - w) + otherColor.a * w,
    );
  }

  /**
   * Возвращает цвет в разных форматах
   */
  public toString(format: ColorFormat = 'rgba'): string {
    switch (format) {
      case 'hex':
        return this.toHexString();
      case 'rgb':
        return this.toRgbString(false);
      case 'rgba':
        return this.toRgbString(true);
      case 'hsl':
      case 'hsla':
        return this.toHslString(format === 'hsla');
      default:
        return this.toRgbString(true);
    }
  }


  public toRgbString(includeAlpha: boolean = true): string {
    if (includeAlpha) {
      return `rgba(${this._r}, ${this._g}, ${this._b}, ${this._a})`;
    }

    return `rgb(${this._r}, ${this._g}, ${this._b})`;
  }


  public toHexString(includeAlpha: boolean = false): string {
    const toHex = (n: number) => {
      const hex = Math.round(n).toString(16);

      return hex.length === 1 ? '0' + hex : hex;
    };

    let hex = '#' + toHex(this._r) + toHex(this._g) + toHex(this._b);

    if (includeAlpha && this._a < 1) {
      hex += toHex(this._a * 255);
    }

    return hex;
  }


  public toHslString(includeAlpha: boolean = true): string {
    const [h, s, l] = this.toHsl();

    if (includeAlpha) {
      return `hsla(${h}, ${s}%, ${l}%, ${this._a})`;
    }

    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  /**
   * Возвращает HSL представление цвета
   */
  public toHsl(): [number, number, number] {
    const r = this._r / 255;
    const g = this._g / 255;
    const b = this._b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          // do nothing
          break;
      }
      h /= 6;
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }


  // #region Deprecated methods

  /**
   * @deprecated Use {@link Color.toRgbString} instead
   */
  public rgbString(): string {
    return this.toRgbString();
  }

  /**
   * @deprecated Use {@link Color.toHslString} instead
   */
  public hslString(): string {
    return this.toHslString();
  }

  /**
   * @deprecated Use {@link Color.toHexString} instead
   */
  public hexString(): string {
    return this.toHexString();
  }

  /**
   * @deprecated Use getters `color.r`, `color.g`, `color.b`, `color.a` instead.
   * This method will be removed in future versions.
   *
   * @returns {ParsedColor} Object with r, g, b, a properties
   */
  public rgb(): ParsedColor {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        '[Color] rgb() is deprecated. Use getters color.r, color.g, color.b, color.a.',
      );
    }

    // Возвращаем копию текущих значений для обратной совместимости
    return {
      r: this._r,
      g: this._g,
      b: this._b,
      a: this._a,
    };
  }

  /**
   * @deprecated Use {@Link Color.fromString} or {@Link ColorParser.parse} instead.
   */
  public static parseColor(value: string): ParsedColor {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        '[Color] parseColor() is deprecated. ' +
        'Use Color.fromString(value) or ' +
        'ColorParser.parse(value).',
      );
    }

    try {
      return ColorParser.parse(value);
    } catch (error) {
      console.error(`Failed to parse color value «${value}»`);

      return { r: 0, g: 0, b: 0, a: 1 };
    }
  }

  /**
   * @deprecated Use {@Link Color.fromHsl} or ColorParser.parse() instead.
   */
  public static hslToRgb(value: string): ParsedColor {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        '[Color] hslToRgb() is deprecated. ' +
        'Use Color.fromHsl(value) or ColorParser.parse(value)',
      );
    }

    try {
      return ColorParser.parse(value);
    } catch (error) {
      throw new Error(`[@via-profit/ui-kit] «${value}» Is not a valid hsl color`);
    }
  }

  /**
   * @deprecated Use {@Link Color.fromString} with named colors instead.
   */
  public static getHextByWebColor(value: string): string | undefined {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        '[Color] getHextByWebColor() is deprecated. ' +
        'Use Color.fromString(value).toHslString() instead',
      );
    }

    return Color.fromString(value).toHslString();

  }

  /**
   * @deprecated Do not use.
   */
  public static intToRGB(i: number): string {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        '[Color] intToRGB() is deprecated. Do not use',
      );
    }

    // Сохраняем функциональность для обратной совместимости
    const r = (i >> 16) & 0xFF;
    const g = (i >> 8) & 0xFF;
    const b = i & 0xFF;

    return `rgb(${r},${g},${b})`;
  }

  /**
   * @deprecated Use {@Link Color.fromUuid}
   */
  public static uuidToColor(uuid: string) {
    return Color.fromUuid(uuid);
  }
}
