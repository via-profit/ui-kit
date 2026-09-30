# Цвета

## Содержание

- [Описание](#описание)
- [Создание цвета](#создание-цвета)
- [Изменение цвета](#изменение-цвета)
- [Вывод в CSS](#вывод-в-css)
- [Яркость и контраст](#яркость-и-контраст)
- [Генерация цвета по строке](#генерация-цвета-по-строке)
- [Устаревшие методы](#устаревшие-методы)

## Описание

Класс `Color` хранит цвет в виде каналов RGB и прозрачности и позволяет изменять его и выводить в нужном формате. Все цвета темы оформления (`theme.color.accentPrimary`, `theme.color.surface` и другие) — экземпляры `Color`, поэтому их можно затемнять, смешивать и делать прозрачными прямо в стилях:

```tsx
import styled from '@emotion/styled';

const Card = styled.div`
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border: 1px solid ${({ theme }) => theme.color.accentPrimary.alpha(0.4).toString()};
`;
```

Класс можно использовать и отдельно от темы:

```ts
import Color from '@via-profit/ui-kit/Color';

const background = Color.fromString('#22c7d6');
const text = background.getContrastColor();

element.style.backgroundColor = background.toString();
element.style.color = text.toString();
```

Все методы, изменяющие цвет, возвращают **новый** экземпляр и не меняют исходный, поэтому их можно вызывать цепочкой: `color.darken(20).alpha(0.8)`.

Введите цвет, чтобы увидеть результат разных методов:

<ExampleColorBasic />

## Создание цвета

Конструктор закрыт — цвет создаётся статическими методами:

| Метод | Пример |
|-------|--------|
| `Color.fromString(value)` | `'#f00'`, `'#ff000080'`, `'rgb(255, 0, 0)'`, `'rgb(255 0 0 / 50%)'`, `'hsl(0, 100%, 50%)'`, `'red'`, `'transparent'` |
| `Color.fromRgb(r, g, b, a?)` | `Color.fromRgb(255, 0, 0, 0.5)` — каналы 0–255, прозрачность 0–1 |
| `Color.fromHex(hex)` | `Color.fromHex('#ff0000')` |
| `Color.fromHsl(hsl)` | `Color.fromHsl('hsl(0, 100%, 50%)')` |

`fromString` понимает форматы HEX (3, 4, 6 и 8 символов), `rgb()`/`rgba()`, `hsl()`/`hsla()` (в том числе с каналами через пробел и прозрачностью через `/`), все именованные цвета CSS и `transparent`. Регистр не важен.

Если строку разобрать не удалось, методы выбрасывают исключение. Для значений, введённых пользователем, оберните вызов в `try/catch`:

```ts
let color: Color | null = null;

try {
  color = Color.fromString(value);
} catch {
  // not a color
}
```

Каналы цвета доступны через свойства `r`, `g`, `b` (0–255) и `a` (0–1).

## Изменение цвета

| Метод | Что делает |
|-------|------------|
| `lighten(units)` | прибавляет `units` к каждому каналу RGB (0–255) |
| `darken(units)` | вычитает `units` из каждого канала RGB |
| `alpha(value)` | задаёт прозрачность от 0 до 1 |
| `mix(other, weight = 0.5)` | смешивает с другим цветом: `weight` — доля второго цвета. `red.mix('blue', 0.3)` — 70% красного и 30% синего |
| `luminance(factor)` | умножает каждый канал на `1 + factor`: `0.2` — на 20% светлее, `-0.2` — на 20% темнее |
| `adjustBrightness(percent)` | то же, что `luminance`, но в процентах: `20` — на 20% светлее |

`lighten` и `darken` меняют каналы на одинаковое число единиц, поэтому оттенок сдвигается к белому или чёрному; `luminance` и `adjustBrightness` меняют каналы пропорционально и сильнее сохраняют оттенок. Значения каналов ограничиваются диапазоном 0–255.

```ts
const accent = Color.fromString('#22c7d6');

accent.darken(40); // hover
accent.alpha(0.1); // background
accent.mix('white', 0.5); // soft variant
```

## Вывод в CSS

| Метод | Результат для красного |
|-------|------------------------|
| `toString()` | `rgba(255, 0, 0, 1)` |
| `toString('rgb')` | `rgb(255, 0, 0)` |
| `toString('hex')` | `#ff0000` |
| `toString('hsl')` | `hsl(0, 100%, 50%)` |
| `toString('hsla')` | `hsla(0, 100%, 50%, 1)` |
| `toRgbString(includeAlpha = true)` | `rgba(255, 0, 0, 1)` или `rgb(255, 0, 0)` |
| `toHexString(includeAlpha = false)` | `#ff0000`; с `true` и прозрачностью меньше 1 — `#ff000080` |
| `toHslString(includeAlpha = true)` | `hsla(0, 100%, 50%, 1)` или `hsl(0, 100%, 50%)` |
| `toHsl()` | `[0, 100, 50]` — тон, насыщенность и светлота |

`toHexString` добавляет прозрачность, только если она меньше 1: у непрозрачного цвета результат `#ff0000` и с `includeAlpha = true`.

## Яркость и контраст

| Метод | Что возвращает |
|-------|----------------|
| `getLuminance()` | относительную яркость от 0 (чёрный) до 1 (белый) по формуле WCAG. У серого `#808080` — около 0.22 |
| `getContrast(other)` | коэффициент контраста с другим цветом от 1 до 21 по формуле WCAG |
| `getContrastColor()` | чёрный или белый — тот, что контрастнее с текущим цветом. Удобен для цвета текста на цветном фоне |
| `isLight()` | `true`, если относительная яркость больше 0.5 |

Для обычного текста WCAG рекомендует контраст не меньше 4.5:1, для крупного — 3:1.

Яркость и контраст считаются по каналам RGB без учёта прозрачности: полупрозрачный цвет оценивается так, будто он непрозрачный, без фона под ним. Для полупрозрачных фонов считайте контраст по итоговому цвету, например `accent.mix(pageBackground, 0.6)`.

```ts
const background = Color.fromString('orange');
const text = background.getContrastColor(); // black
background.getContrast(text); // 10.6
```

<ExampleColorContrast />

## Генерация цвета по строке

Чтобы у каждого пользователя, тега или проекта был свой постоянный цвет, получите его из строки:

- `Color.fromHashString(str)` — цвет с произвольным тоном и умеренными насыщенностью и светлотой; одна и та же строка всегда даёт один и тот же цвет;
- `Color.fromUuid(uuid, palette = 'pastel')` — один из десяти цветов выбранной палитры: `pastel`, `vibrant`, `muted`, `autumn`, `ocean` или `forest`.

```tsx
import Avatar from '@via-profit/ui-kit/Avatar';
import Color from '@via-profit/ui-kit/Color';

<Avatar color={Color.fromHashString(user.name).toHexString()}>{initials}</Avatar>;
```

<ExampleColorGenerator />

Класс `ColorGenerator` из того же модуля содержит эти методы, а также:

- `ColorGenerator.generatePalette(str, count = 5)` — массив из `count` цветов, полученных из строки;
- `ColorGenerator.getPalettes()` — объект с цветами всех палитр.

## Устаревшие методы

Эти методы работают, но выводят предупреждение в консоль (кроме методов вывода) и будут удалены:

| Устаревший метод | Замена |
|------------------|--------|
| `rgbString()` | `toRgbString()` |
| `hexString()` | `toHexString()` |
| `hslString()` | `toHslString()` |
| `rgb()` | свойства `r`, `g`, `b`, `a` |
| `Color.parseColor(value)` | `Color.fromString(value)` |
| `Color.hslToRgb(value)` | `Color.fromHsl(value)` |
| `Color.getHextByWebColor(value)` | `Color.fromString(value).toHexString()` |
| `Color.uuidToColor(uuid)` | `Color.fromUuid(uuid)` |
| `Color.intToRGB(value)` | — |
