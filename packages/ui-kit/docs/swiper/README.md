# Свайпер

## Содержание

- [Описание](#описание)
- [Бесконечная прокрутка и автопрокрутка](#бесконечная-прокрутка-и-автопрокрутка)
- [Несколько слайдов](#несколько-слайдов)
- [Свободная прокрутка](#свободная-прокрутка)
- [Вертикальная прокрутка](#вертикальная-прокрутка)
- [Смена с затуханием](#смена-с-затуханием)
- [Бегущая лента](#бегущая-лента)
- [Управление через ref](#управление-через-ref)
- [Доступность](#доступность)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<Swiper>` — карусель слайдов. Слайды перелистываются перетаскиванием мышью, свайпом на сенсорном экране и стрелками ←/→, когда свайпер в фокусе. Вертикальная прокрутка страницы на сенсорных экранах при этом не блокируется.

Каждый слайд — компонент `<SwiperSlide>`. Слайд занимает всю ширину свайпера и центрирует содержимое. Размеры и оформление задайте через `styled(SwiperSlide)` или `style`.

Если слайд перетащили, клик по ссылке или кнопке внутри него не срабатывает. Поэтому ссылки в слайдах не открываются случайно. Ленту можно подхватить и во время анимации: она остановится под пальцем, а не перескочит к концу движения.

_Пример использования:_

```tsx
import React from 'react';
import styled from '@emotion/styled';
import Swiper, { SwiperSlide } from '@via-profit/ui-kit/Swiper';

const Slide = styled(SwiperSlide)`
  flex-direction: column;
  height: 12em;
`;

const Example: React.FC = () => (
  <Swiper aria-label="Как сделать заказ">
    <Slide>
      <h3>Шаг 1. Выберите товар</h3>
      Добавьте его в корзину
    </Slide>
    <Slide>
      <h3>Шаг 2. Оформите заказ</h3>
      Укажите адрес и способ оплаты
    </Slide>
    <Slide>
      <h3>Шаг 3. Получите посылку</h3>
      Курьер привезёт её за 1–2 дня
    </Slide>
  </Swiper>
);

export default Example;
```

<ExampleSwiperBasic />

## Бесконечная прокрутка и автопрокрутка

- `infinite` — после последнего слайда идёт первый, и наоборот. Для этого по краям добавляются копии слайдов. Нужно минимум `Math.ceil(slidesPerView)` слайдов и не меньше двух (с `centered` — больше, см. [Несколько слайдов](#несколько-слайдов)), иначе в консоль выводится ошибка и бесконечная прокрутка не включается;
- `autoplay` — слайды сменяются сами каждые `autoplayInterval` миллисекунд. Без `infinite` после последнего слайда свайпер возвращается к первому.

Автопрокрутка останавливается, пока указатель над свайпером (`pauseOnHover`), пока фокус внутри свайпера и пока слайд перетаскивают.

```tsx
<Swiper infinite autoplay autoplayInterval={4000} aria-label="Акции">
  <SwiperSlide>Скидки до 50%</SwiperSlide>
  <SwiperSlide>Бесплатная доставка</SwiperSlide>
  <SwiperSlide>Новая коллекция</SwiperSlide>
  <SwiperSlide>Подарок к заказу</SwiperSlide>
</Swiper>
```

<ExampleSwiperInfinite />

## Несколько слайдов

`slidesPerView` задаёт, сколько слайдов видно одновременно. Листается по одному слайду.

Дробное значение показывает часть следующего слайда, например `slidesPerView={1.2}` — слайд и пятая часть соседнего. Так видно, что ленту можно листать. Со свойством `centered` текущий слайд стоит посередине, а соседи выглядывают с обеих сторон. Без `infinite` у первого и последнего слайда на краю остаётся пустое место. Для бесконечной прокрутки нужно не меньше `Math.ceil(slidesPerView)` слайдов, с `centered` — ещё на `Math.ceil((slidesPerView - 1) / 2)` больше.

```tsx
<Swiper infinite centered slidesPerView={1.2} aria-label="Тарифы">
  {plans.map(plan => (
    <SwiperSlide key={plan.id}>
      <PlanCard plan={plan} />
    </SwiperSlide>
  ))}
</Swiper>
```

<ExampleSwiperCentered />

```tsx
<Swiper infinite slidesPerView={3} aria-label="Похожие товары">
  {products.map(product => (
    <SwiperSlide key={product.id}>
      <ProductCard product={product} />
    </SwiperSlide>
  ))}
</Swiper>
```

<ExampleSwiperSlidesPerView />

Содержимое слайдов далеко за пределами видимой области не рендерится: отображаются только видимые слайды и их ближайшие соседи. Если в слайде есть состояние (видео, форма), оно сбрасывается, когда слайд уходит далеко из вида.

## Свободная прокрутка

По умолчанию после перетаскивания лента выравнивается по границе слайда (`snap`). Со свойством `snap={false}` она продолжает движение по инерции и останавливается там, где остановилась, как обычная прокрутка. Так удобно листать длинные ленты: категории, теги, миниатюры. Следующее перетаскивание начинается с того же места, а с `infinite` ленту можно тянуть без конца.

Кнопки, стрелки и автопрокрутка по-прежнему перелистывают ровно на слайд.

```tsx
<Swiper snap={false} slidesPerView={4} aria-label="Категории">
  {categories.map(category => (
    <SwiperSlide key={category}>{category}</SwiperSlide>
  ))}
</Swiper>
```

<ExampleSwiperFree />

## Вертикальная прокрутка

`direction="vertical"` листает слайды сверху вниз: перетаскиванием по вертикали и стрелками ↑/↓. Горизонтальная прокрутка страницы на сенсорных экранах при этом не блокируется. Вертикальному свайперу нужна высота — задайте её через `style` или `styled(Swiper)`, слайд займёт `1 / slidesPerView` этой высоты.

```tsx
<Swiper direction="vertical" infinite autoplay style={{ height: '18em' }} aria-label="Скриншоты">
  {screens.map(screen => (
    <SwiperSlide key={screen.id}>
      <img src={screen.src} alt={screen.title} />
    </SwiperSlide>
  ))}
</Swiper>
```

<ExampleSwiperVertical />

## Смена с затуханием

`effect="fade"` не двигает ленту: слайды лежат друг на друге, и текущий плавно проявляется поверх предыдущего. Свайп в любую сторону переключает слайд после того, как палец отпущен. С `effect="fade"` всегда виден один слайд, `slidesPerView` и `centered` не действуют. Длительность смены задаёт `speed` — для затухания обычно нужно больше, чем для прокрутки.

```tsx
<Swiper effect="fade" speed={1000} infinite autoplay aria-label="Работы">
  <SwiperSlide>…</SwiperSlide>
  <SwiperSlide>…</SwiperSlide>
</Swiper>
```

<ExampleSwiperFade />

## Бегущая лента

`autoScroll` — непрерывное движение ленты со скоростью в пикселях в секунду, например логотипы клиентов. Лента бесконечная даже без `infinite`, перетаскивание и стрелки выключены. Она останавливается, пока указатель над ней (`pauseOnHover`), по `ref.pause()` и совсем не движется, если в системе включено уменьшение движения.

```tsx
<Swiper autoScroll={40} slidesPerView={5} aria-label="Наши клиенты">
  {logos.map(logo => (
    <SwiperSlide key={logo.id}>
      <img src={logo.src} alt={logo.name} />
    </SwiperSlide>
  ))}
</Swiper>
```

<ExampleSwiperTicker />

## Управление через ref

`ref` свайпера — это объект с методами:

- `next()` — следующий слайд;
- `prev()` — предыдущий слайд;
- `goToIndex(index)` — слайд с указанным индексом;
- `getRealIndex()` — индекс текущего слайда (без учёта копий бесконечной прокрутки);
- `getTotalSlides()` — количество слайдов;
- `pause()` — остановить автопрокрутку. Наведение и уход указателя её не возобновляют;
- `resume()` — возобновить автопрокрутку.

`onSlideChange` сообщает индекс нового текущего слайда. Вместе с `ref` из них собираются свои кнопки и точки навигации:

_Пример использования:_

```tsx
import React from 'react';
import Swiper, { SwiperRef, SwiperSlide } from '@via-profit/ui-kit/Swiper';
import Button from '@via-profit/ui-kit/Button';

const photos = ['1', '2', '3', '4', '5'];

const Example: React.FC = () => {
  const swiperRef = React.useRef<SwiperRef | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  return (
    <>
      <Swiper ref={swiperRef} onSlideChange={setCurrentIndex} aria-label="Фотографии">
        {photos.map(photo => (
          <SwiperSlide key={photo}>{photo}</SwiperSlide>
        ))}
      </Swiper>

      <Button disabled={currentIndex === 0} onClick={() => swiperRef.current?.prev()}>
        Назад
      </Button>
      {photos.map((photo, index) => (
        <button
          key={photo}
          type="button"
          aria-label={`Слайд ${index + 1}`}
          aria-current={index === currentIndex}
          onClick={() => swiperRef.current?.goToIndex(index)}
        />
      ))}
      <Button
        disabled={currentIndex === photos.length - 1}
        onClick={() => swiperRef.current?.next()}
      >
        Вперёд
      </Button>
    </>
  );
};

export default Example;
```

<ExampleSwiperApi />

## Доступность

- свайпер — область с `aria-roledescription="carousel"`. Передайте ему `aria-label`;
- каждый слайд — группа с `aria-roledescription="slide"` и подписью «1 / 5». Текст подписи меняет свойство `slideLabel`, например `(index, total) => \`Слайд ${index + 1} из ${total}\``;
- слайды вне видимой области недоступны для Tab и программ чтения с экрана (`inert`);
- свайпер получает фокус по Tab (`keyboardControl`), слайды листаются стрелками. Стрелки внутри полей ввода в слайдах работают как обычно;
- без автопрокрутки смена слайда озвучивается программами чтения с экрана.

## Переопределение

Компонент `<Swiper>` является составным и реализован при помощи следующих компонентов:

- `<Container>` — корневой элемент; получает все атрибуты `<div>`, переданные в `<Swiper>`
- `<Wrapper>` — область, которая принимает фокус и обрабатывает перетаскивание
- `<Track>` — лента слайдов, которая сдвигается при перелистывании

Используйте свойство `overrides`, чтобы переопределить один или несколько компонентов. Проще всего расширить стандартный компонент с помощью `styled`. Создавайте переопределения один раз — вне компонента, а не при рендере.

```tsx
import styled from '@emotion/styled';
import Swiper, { SwiperTrack } from '@via-profit/ui-kit/Swiper';

// The duration is set by the speed prop, the timing function is changed here
const Track = styled(SwiperTrack)`
  transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
`;

// Created once, outside of the component
const overrides = { Track };

<Swiper overrides={overrides}>…</Swiper>;
```

## Свойства

Помимо перечисленных ниже, `<Swiper>` принимает [стандартные атрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/div#атрибуты) элемента `<div>` и передаёт их в `<Container>`. `ref` — объект с методами, описанный в разделе [Управление через ref](#управление-через-ref).

### `children`
Слайды `<SwiperSlide>`. `null`, `false` и другие значения, не являющиеся элементами, пропускаются.
- Тип: `React.ReactNode`
- Обязательное: **да**

### `slidesPerView`
Сколько слайдов видно одновременно. Может быть дробным, например `1.2`.
- Тип: `number`
- По умолчанию: `1`
- Обязательное: нет

### `centered`
Если `true`, текущий слайд стоит посередине, а соседние видны по краям. Имеет смысл с дробным `slidesPerView`.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `direction`
Направление прокрутки. Вертикальному свайперу нужна высота.
- Тип: `'horizontal' | 'vertical'`
- По умолчанию: `'horizontal'`
- Обязательное: нет

### `effect`
`slide` двигает ленту, `fade` сменяет слайды затуханием. Подробнее в разделе [Смена с затуханием](#смена-с-затуханием).
- Тип: `'slide' | 'fade'`
- По умолчанию: `'slide'`
- Обязательное: нет

### `speed`
Длительность смены слайда в миллисекундах.
- Тип: `number`
- По умолчанию: `300`
- Обязательное: нет

### `autoScroll`
Скорость бегущей ленты в пикселях в секунду. Подробнее в разделе [Бегущая лента](#бегущая-лента).
- Тип: `number`
- По умолчанию: `undefined`
- Обязательное: нет

### `initialIndex`
Индекс слайда, который показывается первым.
- Тип: `number`
- По умолчанию: `0`
- Обязательное: нет

### `onSlideChange`
Вызывается при смене текущего слайда и получает его индекс.
- Тип: `(realIndex: number) => void`
- По умолчанию: `undefined`
- Обязательное: нет

### `infinite`
Если `true`, после последнего слайда идёт первый.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `autoplay`
Если `true`, слайды сменяются автоматически.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `autoplayInterval`
Интервал автопрокрутки в миллисекундах.
- Тип: `number`
- По умолчанию: `3000`
- Обязательное: нет

### `pauseOnHover`
Если `true`, автопрокрутка останавливается, пока указатель над свайпером.
- Тип: `boolean`
- По умолчанию: `true`
- Обязательное: нет

### `keyboardControl`
Если `true`, свайпер получает фокус по Tab, а слайды листаются стрелками ←/→.
- Тип: `boolean`
- По умолчанию: `true`
- Обязательное: нет

### `slideLabel`
Подпись слайда для программ чтения с экрана.
- Тип: `(index: number, total: number) => string`
- По умолчанию: `` (index, total) => `${index + 1} / ${total}` ``
- Обязательное: нет

### `draggable`
Если `false`, слайды нельзя перетаскивать — только стрелками и через `ref`.
- Тип: `boolean`
- По умолчанию: `true`
- Обязательное: нет

### `dragThreshold`
На сколько пикселей нужно медленно перетащить слайд, чтобы перелистнуть его. Чем быстрее свайп, тем меньше нужное расстояние, но не меньше `threshold`.
- Тип: `number`
- По умолчанию: `240`
- Обязательное: нет

### `threshold`
Минимальное расстояние в пикселях, после которого движение считается свайпом, а не кликом.
- Тип: `number`
- По умолчанию: `20`
- Обязательное: нет

### `resistance`
Если `true`, у первого и последнего слайда перетаскивание за край идёт туго. Без `infinite`.
- Тип: `boolean`
- По умолчанию: `true`
- Обязательное: нет

### `snap`
Если `true`, после перетаскивания лента выравнивается по границе слайда. Если `false` — движется по инерции и останавливается где угодно. Подробнее в разделе [Свободная прокрутка](#свободная-прокрутка).
- Тип: `boolean`
- По умолчанию: `true`
- Обязательное: нет

### `overrides`
Объект для переопределения составных компонентов. Подробнее в разделе [Переопределение](#переопределение).
- Тип: `SwiperOverrides`
- По умолчанию: `undefined`
- Обязательное: нет
