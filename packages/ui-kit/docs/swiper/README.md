# Свайпер

Компонент для создания каруселей и свайперов с поддержкой жестов, бесконечной прокрутки и кастомизации.

## Содержание

- [Описание](#описание)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

`<Swiper>` — компонент для React, который реализует свайпер/карусель с поддержкой:

- **Draggable слайды** — перетаскивание мышью или свайпы на сенсорных экранах
- **Snap-эффект** — автоматическое выравнивание слайдов после свайпа
- **Бесконечная прокрутка** — зацикленная навигация с клонированием слайдов
- **Автопрокрутка** — автоматическая смена слайдов с настраиваемым интервалом
- **Клавиатурная навигация** — управление стрелками влево/вправо
- **Кастомизация** — переопределение любой части компонента через `overrides`

### Использование

```jsx
import * as React from 'react';
import styled from '@emotion/styled';
import Swiper, { SwiperSlide } from '@via-profit/ui-kit/Swiper';
import Surface from '@via-profit/ui-kit/Surface';

const Slide = styled(SwiperSlide)`
  font-size: 3em;
  padding: 1em 0;
  font-weight: bold;
`;

const ExampleSwiperBasic: React.FC = () => (
  <Surface noPadding>
    <Swiper infinite autoplay>
      <Slide>Слайд 1</Slide>
      <Slide>Слайд 2</Slide>
      <Slide>Слайд 3</Slide>
    </Swiper>
  </Surface>
);

export default ExampleSwiperBasic;

```

<ExampleSwiperBasic>

### Работа с ref

Компонент предоставляет ref с методами для программного управления:

```jsx
import * as React from 'react';
import styled from '@emotion/styled';

import Swiper, { SwiperRef, SwiperSlide } from '@via-profit/ui-kit/Swiper';
import { ColorGenerator } from '@via-profit/ui-kit/Color';
import Button from '@via-profit/ui-kit/Button';

const colors = ColorGenerator.generatePalette('swiper-api', 3);

const Slide = styled(SwiperSlide)`
  font-size: 3em;
  padding: 1em 0;
  font-weight: bold;
`;

const ExampleSwiperApi: React.FC = () => {
  const swiperRef = React.useRef<SwiperRef | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  return (
    <div>
      <Swiper ref={swiperRef} onSlideChange={setCurrentIndex} draggable={false}>
        {colors.map((color, index) => (
          <Slide key={color.toString()} style={{ backgroundColor: color.darken(60).toString() }}>
            Слайд {index + 1}
          </Slide>
        ))}
      </Swiper>

      <Button
        disabled={currentIndex === 0}
        onClick={() => swiperRef.current?.prev()}>
        Предыдущий слайд
      </Button>
      <Button
        disabled={currentIndex === colors.length - 1}
        onClick={() => swiperRef.current?.next()}
      >
        Следующий слайд
      </Button>
    </div>
  );
};

export default ExampleSwiperApi;

```


Доступные методы:
- `next()` — перейти к следующему слайду
- `prev()` — перейти к предыдущему слайду
- `goToIndex(index)` — перейти к слайду с указанным индексом
- `getRealIndex()` — получить текущий реальный индекс (без учета клонов)
- `getTotalSlides()` — получить общее количество реальных слайдов
- `pause()` — приостановить автопрокрутку
- `resume()` — возобновить автопрокрутку

<ExampleSwiperApi>

## Переопределение

Компонент `<Swiper>` является составным и реализован при помощи следующих компонентов:

- **`<Container>`** — корневой контейнер свайпера. Отвечает за внешнее позиционирование и общие стили. Принимает все стандартные HTML-атрибуты div.
- **`<Wrapper>`** — обертка, обрабатывающая события указателя (pointer events). Содержит логику захвата и отслеживания свайпов.
- **`<Track>`** — контейнер с трансформацией, отвечающий за анимацию перемещения слайдов. Управляет позиционированием и CSS-переходами.

Используйте свойство `overrides` чтобы переопределить один или несколько компонентов:

```jsx
import { Swiper, SwiperSlide } from './Swiper';
import { CustomContainer } from './CustomContainer';
import { CustomTrack } from './CustomTrack';

function App() {
  return (
    <Swiper
      overrides={{
        Container: CustomContainer,
        Track: CustomTrack,
        // Wrapper можно оставить стандартным или тоже переопределить
      }}
    >
      <SwiperSlide>Слайд 1</SwiperSlide>
      <SwiperSlide>Слайд 2</SwiperSlide>
    </Swiper>
  );
}
```

## Свойства

### `dragThreshold: number`
Определяет минимальное расстояние в пикселях, которое нужно перетащить слайд для переключения на следующий/предыдущий. Значение динамически корректируется с учетом скорости свайпа — чем быстрее свайп, тем меньше порог.
По умолчанию: `240`.

### `snap: boolean`
Определяет, должен ли слайд автоматически выравниваться после окончания свайпа. Если `true`, слайд всегда встанет ровно по границе. Если `false`, позиция слайда останется там, где остановился свайп.
По умолчанию: `true`.

### `draggable: boolean`
Включает/отключает возможность перетаскивания слайдов мышью или пальцем.
По умолчанию: `true`.

### `initialIndex: number`
Индекс слайда, который будет отображаться при инициализации. При использовании с `infinite={true}` индекс автоматически корректируется с учетом клонов.
По умолчанию: `0`.

### `infinite: boolean`
Включает режим бесконечной прокрутки. При активации компонент создает клоны первого и последнего слайда для создания эффекта непрерывной прокрутки. Требует минимум 2 слайда.
По умолчанию: `false`.

### `onSlideChange: (realIndex: number) => void`
Коллбэк, вызываемый при смене активного слайда. Получает реальный индекс слайда (без учета клонов в infinite режиме).

### `autoplay: boolean`
Включает автоматическую прокрутку слайдов.
По умолчанию: `false`.

### `autoplayInterval: number`
Интервал между автоматическими переключениями слайдов в миллисекундах.
По умолчанию: `3000`.

### `pauseOnHover: boolean`
Приостанавливает автопрокрутку при наведении курсора на свайпер.
По умолчанию: `true`.

### `keyboardControl: boolean`
Включает управление стрелками клавиатуры (влево/вправо) для навигации по слайдам.
По умолчанию: `true`.

### `threshold: number`
Минимальное расстояние в пикселях для распознавания свайпа. Используется как базовое значение при расчете `dragThreshold`.
По умолчанию: `20`.

### `resistance: boolean`
Включает эффект сопротивления на границах свайпера (когда не используется `infinite`). При попытке свайпнуть дальше первого или последнего слайда движение становится более тугим.
По умолчанию: `true`.

### `overrides: SwiperOverrides`
Объект для переопределения внутренних компонентов свайпера. Позволяет полностью кастомизировать структуру и стили. Содержит поля:
- `Container` — компонент контейнера
- `Wrapper` — компонент обертки
- `Track` — компонент трека со слайдами

### `children: ReactElement<typeof SwiperSlide> | ReactElement<typeof SwiperSlide>[]`
Дочерние элементы должны быть компонентами `<SwiperSlide>`. Каждый слайд может получать дополнительные пропсы `isVisible`, `isActive` и `distance` от родительского компонента для оптимизации рендера и стилизации.
