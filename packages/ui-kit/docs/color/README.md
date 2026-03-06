# Цвета

## Содержание

- [Описание](#описание)
- [Конструктор](#конструктор)
- [Методы класса](#методы-класса)
- [Статические методы класса](#статические-методы-класса)
- [Вспомогательные классы](#вспомогательные-классы)

## Описание

Управление цветами производится по средствам класса **Color**, который используется как инструмент манипуляции с цветами темы, но его возможно использовать и вне темы оформления, например:

```ts
import React from 'react';
import Color from '@via-profit/ui-kit/Color';

const Example: React.FC = () => {
  const background = React.useMemo(() => Color.fromString('red').darken(50).hexString(), []);
  const foreground = React.useMemo(() => Color.fromString('red').lighten(200).hexString(), []);

  return (
    <span
      style={{
        backgroundColor: background,
        color: foreground,
      }}>
      Lorem ipsum
    </span>
  );
};
```

<ExampleColorBasic>

### Конструктор

Создает экземпляр цвета. Поддерживает несколько способов вызова:

```ts
// Рекомендуемые способы (через статические методы)
const color = Color.fromString('#ff0000');
const color = Color.fromRgb(255, 0, 0, 0.5);
const color = Color.fromHex('#ff0000');
const color = Color.fromHsl('hsl(0, 100%, 50%)');
```

### Методы класса

- **lighten(units: number): Color** - Возвращает **новый** цвет, осветленный на указанное количество единиц (линейное
  добавление к RGB каналам)

```ts
const lighter = color.lighten(30);
```

- **darken(units: number): Color** - Возвращает **новый** цвет, затемненный на указанное количество единиц

```ts
const darker = color.darken(30);
```

- **adjustBrightness(percent: number): Color** - Возвращает **новый** цвет с процентным изменением яркости

```ts
const brighter = color.adjustBrightness(20); // на 20% ярче
const dimmer = color.adjustBrightness(-20);  // на 20% темнее
```

- **luminance(factor: number): Color** - Возвращает **новый** цвет, изменяя яркость умножением каждого канала на
  коэффициент

```ts
const lighter = color.luminance(0.2);  // на 20% светлее
const darker = color.luminance(-0.2);  // на 20% темнее
```

- **alpha(value: number): Color** - Возвращает **новый** цвет с примененным альфа-каналом (0-1)

```ts
const semiTransparent = color.alpha(0.5);
```

- **getLuminance(): number** - Возвращает значение относительной яркости цвета (число от 0 до 1)

```ts
const brightness = color.getLuminance(); // 0.5 для среднего серого
```

- **getContrast(other: Color | string): number** - Возвращает уровень контрастности между текущим и переданным цветом

```ts
const contrast = color.getContrast('#ffffff');
```

- **isLight(): boolean** - Проверяет, является ли цвет светлым (яркость > 0.5)

```ts
if (color.isLight()) { /* используем темный текст */
}
```

- **getContrastColor(): Color** - Возвращает черный или белый цвет в зависимости от яркости текущего

```ts
const textColor = bgColor.getContrastColor();
```

- **mix(other: Color | string, weight: number = 0.5): Color** - Возвращает новый цвет, смешанный с другим цветом

```ts
const mixed = red.mix(blue, 0.3); // 30% красного, 70% синего
```

- **rgb()** - ❌ **Deprecated**. Используйте геттеры `color.r`, `color.g`, `color.b`, `color.a`

```ts
const { r, g, b, a } = color;
```

- **toString(format?: ColorFormat): string** - Возвращает цвет в указанном формате

```ts
color.toString('hex');     // #ff0000
color.toString('rgb');     // rgb(255, 0, 0)
color.toString('rgba');    // rgba(255, 0, 0, 1)
color.toString('hsl');     // hsl(0, 100%, 50%)
color.toString('hsla');    // hsla(0, 100%, 50%, 1)
```

- **toRgbString(includeAlpha?: boolean): string** - Возвращает цвет в формате rgb/rgba

```ts
color.toRgbString();       // rgba(255, 0, 0, 1)
color.toRgbString(false);  // rgb(255, 0, 0)
```

- **toHexString(includeAlpha?: boolean): string** - Возвращает цвет в hex формате

```ts
color.toHexString();        // #ff0000
color.toHexString(true);    // #ff0000ff (с альфа-каналом)
```

- **toHslString(includeAlpha?: boolean): string** - Возвращает цвет в формате hsl/hsla

```ts
color.toHslString();        // hsla(0, 100%, 50%, 1)
color.toHslString(false);   // hsl(0, 100%, 50%)
```

- **toHsl(): [number, number, number]** - Возвращает HSL компоненты цвета

```ts
const [h, s, l] = color.toHsl();
```

### Статические методы класса

#### Фабричные методы (рекомендуемые)

- **fromString(value: string): Color** - Создает цвет из строкового представления (hex, rgb, rgba, hsl, hsla,
  именованные цвета)

```ts
  Color.fromString('#ff0000');
Color.fromString('rgba(255, 0, 0, 0.5)');
Color.fromString('red');
```

- **fromRgb(r: number, g: number, b: number, a?: number): Color** - Создает цвет из RGB компонентов

```ts
  Color.fromRgb(255, 0, 0, 0.5);
```

- **fromHex(hex: string): Color** - Создает цвет из HEX строки

```ts
  Color.fromHex('#ff0000');
Color.fromHex('#f00');
Color.fromHex('#ff000080'); // с альфа-каналом
```

- **fromHsl(hsl: string): Color** - Создает цвет из HSL строки

```ts
  Color.fromHsl('hsl(0, 100%, 50%)');
```

- **fromUuid(uuid: string, palette?: PaletteName): Color** - Генерирует цвет на основе UUID

```ts
  Color.fromUuid('123e4567-e89b-12d3-a456-426614174000', 'vibrant');
```

- **fromHashString(str: string): Color** - Генерирует цвет из произвольной строки

```ts
  Color.fromHashString('username@example.com');
```

#### Утилитарные методы (вспомогательные)

- **parseColor(value: string): ParsedColor** - ❌ **Deprecated**. Используйте `ColorParser.parse()` или
  `Color.fromString()`

- **hslToRgb(value: string): ParsedColor** - ❌ **Deprecated**. Используйте `ColorParser.parse()` для парсинга HSL

- **getHextByWebColor(value: string): string** - ❌ **Deprecated**. Именованные цвета теперь поддерживаются в
  `Color.fromString()`

- **stringToHashCode(str: string): number** - ⚠️ **Deprecated** в `ColorGenerator` (приватный метод)

- **intToRGB(i: number): string** - ❌ **Deprecated**. Не используйте

- **uuidToColor(uuid: string): string** - ❌ **Deprecated**. Используйте `Color.fromUuid(uuid)`

### Вспомогательные классы

#### ColorParser

Используется внутри `Color.fromString()` для парсинга цветов. Не требует прямого использования.

#### ColorGenerator

- **fromUuid(uuid: string, palette?: PaletteName): Color** - генерация цвета по UUID
- **fromString(str: string): Color** - генерация цвета по строке
- **generatePalette(str: string, count?: number): Color[]** - генерация палитры на основе строки
- **getPalettes(): object** - возвращает доступные палитры

**Доступные палитры:**

- `pastel` - пастельные тона
- `vibrant` - яркие цвета
- `muted` - приглушенные цвета
- `autumn` - осенняя палитра
- `ocean` - морская палитра
- `forest` - лесная палитра

### Важные изменения

1. **Все методы иммутабельны** - каждый метод возвращает **новый** экземпляр `Color`
3. **Удален метод `rgb()`** - используйте геттеры
4. **Удалены утилитарные статические методы** - используйте фабричные методы или специализированные классы

### Примеры использования

```ts
// Создание цветов
const red = Color.fromString('red');
const blue = Color.fromRgb(0, 0, 255, 0.5);
const green = Color.fromHex('#00ff00');

// Иммутабельные операции
const darkerRed = red.darken(30);
const semiTransparent = blue.alpha(0.3);

// Цепочки операций (теперь предсказуемы!)
const result = red
  .darken(20)
  .alpha(0.8)
  .lighten(10)
  .toString(); // все операции применяются последовательно

// Генерация цветов
const userColor = Color.fromUuid('user-id-123', 'vibrant');
const palette = ColorGenerator.generatePalette('project', 3);

// Контраст и доступность
const bgColor = Color.fromString('#3498db');
const textColor = bgColor.getContrastColor();
const contrast = bgColor.getContrast('#ffffff');

if (contrast > 4.5) {
  // Достаточный контраст для WCAG AA
}
```
