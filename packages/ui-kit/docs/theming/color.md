# Класс Color

## Содержание

- [Описание](#описание)
- [Интерфейс класса Color](#интерфейс-класса-color)
- [Методы класса Color](#методы-класса-color)


## Описание

Класс используется как инструмент манипуляции с цветами темы, но его возможно использовать и вне темы оформления, например:

```ts
import Color from '@via-profit/ui-kit/Color';

const lightRed = new Color('red').lighten(50).hexString();

console.log(lightRed);
```

## Интерфейс класса Color

````ts
declare class Color {
  constructor(value: string | Color);
  /**
   * Lightens the current color by the \
   * transmitted number of conventional units.\
   * \
   * Example:
   * ```tsx
   * const color = theme.colors
   *   .accentPrimary
   *   .lighten(60)
   *   .toString();
   * ```
   *
   */
  lighten(decimal: number): this;
  /**
   * Darkens the current color by\
   * the transmitted number of conventional units.
   * \
   * Example:
   * ```tsx
   * const color = theme.colors
   *   .accentPrimary
   *   .darken(60)
   *   .toString();
   * ```
   */
  darken(decimal: number): this;
  /**
   * Applies transparency (alpha channel) to the current color\
   * Takes as an argument a number from 0 to 1
   * \
   * Example:
   * ```tsx
   * const color = theme.colors
   *   .accentPrimary
   *   .alpha(0.5)
   *   .toString();
   * ```
   */
  alpha(decimal: number): this;
  /**
   * Returns color luminance value
   */
  luminance(): number;
  /**
   * Returns the contrast level between the\
   * current and transmitted colors
   * \
   * Example:
   * ```tsx
   * const { colors } = themes;
   * const contrast = colors
   *   .accentPrimary
   *   .contrast(colors.textPrimary.rgbString());
   *
   * if (contrast > 5) {
   *   return colors.textPrimary.toString();
   * } else {
   *   return colors.textSecondary.toString()
   * }
   * ```
   */
  contrast(rgb2: string | Color): number;
  /**
   * Lighten or darknest color to lum steps
   * lum - 0-25
   */
  private shade;
  /**
   * Returns the current color as separate rgb channels
   */
  rgb(): {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  /**
   * Returns the current color as an rgba string
   */
  toString(): string;
  /**
   * Returns the current color as an rgba string
   */
  rgbString(): string;
  /**
   * Returns the current color as an hex string
   */
  hexString(): string;
  /**
   * Parse the transmitted color and returns its\
   * representation as separate rgba channels
   */
  private parseColor;
  /**
   * Recodes the transmitted color value in hsl format to rgba
   */
  private hslToRgb;
  /**
   * Returns color code by web color name
   */
  private getHextByWebColor;
}
````

## Методы класса Color

Конструктор Принимает код цвета в форматах `rgb` `hex` или `hsl`, а так же экземпляр собственного класса

- **lighten** Осветляет текущий цвет на переданное количество условных единиц.
- **darken** Затемняет текущий цвет на переданное количество условных единиц.
- **alpha** Применяет к цвету альфа канал
- **luminance** Возвращает значение яркости цвета
- **contrast** Возвращает уровень контрастности между текущим и передаваемым цветами
- **rgb** Возвращает текущий цвет в виде отдельных каналов rgb
- **toString** Возвращает текущий цвет в виде строки rgba
- **rgbString** Возвращает текущий цвет в виде строки rgba
- **hexString** Возвращает текущий цвет в виде hex строки
