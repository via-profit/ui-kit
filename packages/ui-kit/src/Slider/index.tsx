import React from 'react';

import Container, { SliderContainerProps, SliderOrientation } from './SliderContainer';
import Rail, { SliderRailProps } from './SliderRail';
import Track, { SliderTrackProps } from './SliderTrack';
import Thumb, { SliderThumbProps } from './SliderThumb';
import Mark, { SliderMarkProps } from './SliderMark';
import MarkLabel, { SliderMarkLabelProps } from './SliderMarkLabel';
import { clamp, snapToStep, valueToPercent } from './utils';

export type { SliderOrientation };

/**
 * A number for the single slider, a pair of numbers for the range
 */
export type SliderValue = number | readonly [number, number];

export interface SliderMarkItem {
  readonly value: number;

  /**
   * The text under the mark (to the right of it for the vertical slider)
   */
  readonly label?: React.ReactNode;
}

export type SliderProps<V extends SliderValue = number> = Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  'onChange' | 'defaultValue' | 'color'
> & {
  /**
   * The value of the controlled slider: a number, or a pair of numbers for the range. Pass it together with `onChange`
   * Default: undefined
   */
  readonly value?: V;

  /**
   * The initial value of the uncontrolled slider: a number, or a pair of numbers for the range
   * Default: `min`
   */
  readonly defaultValue?: V;

  /**
   * Called on every change of the value while the thumb is dragged or moved by the keyboard.
   * `activeThumb` is the index of the moved thumb: 0 for the single slider, 0 or 1 for the range
   */
  readonly onChange?: (value: V, event: React.SyntheticEvent, activeThumb: number) => void;

  /**
   * Called once the user releases the thumb, and after every key press.
   * Use it for the expensive work, e.g. for requests to the server
   */
  readonly onChangeCommitted?: (value: V, event: React.SyntheticEvent) => void;

  /**
   * The minimum value
   * Default: 0
   */
  readonly min?: number;

  /**
   * The maximum value
   * Default: 100
   */
  readonly max?: number;

  /**
   * The value changes by this amount. It must be greater than zero
   * Default: 1
   */
  readonly step?: number;

  /**
   * `true` shows a mark at every step, an array shows marks at the given values, optionally with labels
   * Default: false
   */
  readonly marks?: boolean | readonly SliderMarkItem[];

  /**
   * Default: `horizontal`
   */
  readonly orientation?: SliderOrientation;

  /**
   * Default: false
   */
  readonly disabled?: boolean;

  /**
   * You can pass the primary, default, secondary name of the colors or your specified color value
   * Default: `default`
   */
  readonly color?: 'default' | 'primary' | 'secondary' | string;

  /**
   * The name of the hidden input with the value, for the form submission.
   * The range creates two inputs with this name
   */
  readonly name?: string;

  /**
   * The label of the thumb for the screen readers.
   * For the range use `getAriaLabel`: the thumbs need different labels
   */
  readonly 'aria-label'?: string;

  /**
   * The id of the element that labels the thumbs
   */
  readonly 'aria-labelledby'?: string;

  /**
   * Returns the label of the thumb for the screen readers. Overrides `aria-label`
   */
  readonly getAriaLabel?: (index: number) => string;

  /**
   * Returns the text the screen readers announce instead of the bare number, e.g. «500 ₽»
   */
  readonly getAriaValueText?: (value: number, index: number) => string;

  readonly overrides?: SliderOverrides;
};

export interface SliderOverrides {
  /**
   * The root element. It receives the pointer events
   */
  readonly Container?: React.ComponentType<
    SliderContainerProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * The whole line of the slider
   */
  readonly Rail?: React.ComponentType<SliderRailProps & React.RefAttributes<HTMLSpanElement>>;

  /**
   * The filled part of the line
   */
  readonly Track?: React.ComponentType<SliderTrackProps & React.RefAttributes<HTMLSpanElement>>;

  /**
   * The thumb. It holds the focus and the slider role
   */
  readonly Thumb?: React.ComponentType<SliderThumbProps & React.RefAttributes<HTMLSpanElement>>;

  /**
   * The dot of the mark on the line
   */
  readonly Mark?: React.ComponentType<SliderMarkProps & React.RefAttributes<HTMLSpanElement>>;

  /**
   * The label of the mark
   */
  readonly MarkLabel?: React.ComponentType<
    SliderMarkLabelProps & React.RefAttributes<HTMLSpanElement>
  >;
}

type DragState = {
  readonly pointerId: number;

  /**
   * null while the range thumbs are in the same place and the direction of the drag is unknown yet
   */
  readonly index: number | null;
};

const Slider: React.ForwardRefRenderFunction<HTMLSpanElement, SliderProps<SliderValue>> = (
  props,
  ref,
) => {
  const {
    value,
    defaultValue,
    onChange,
    onChangeCommitted,
    min = 0,
    max = 100,
    step = 1,
    marks = false,
    orientation = 'horizontal',
    disabled = false,
    color,
    name,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    getAriaLabel,
    getAriaValueText,
    overrides,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onLostPointerCapture,
    ...nativeProps
  } = props;

  const overridesMap = React.useMemo(
    () => ({
      Container: overrides?.Container || Container,
      Rail: overrides?.Rail || Rail,
      Track: overrides?.Track || Track,
      Thumb: overrides?.Thumb || Thumb,
      Mark: overrides?.Mark || Mark,
      MarkLabel: overrides?.MarkLabel || MarkLabel,
    }),
    [overrides],
  );

  const isControlled = typeof value !== 'undefined';
  const isRange = Array.isArray(isControlled ? value : defaultValue);

  const [internalValues, setInternalValues] = React.useState<readonly number[]>(() =>
    typeof defaultValue === 'undefined'
      ? [min]
      : typeof defaultValue === 'number'
        ? [defaultValue]
        : [...defaultValue],
  );

  const rawValues: readonly number[] = isControlled
    ? typeof value === 'number'
      ? [value]
      : [...value]
    : internalValues;

  // The value from the props may be out of the bounds or in the wrong order: the slider shows the corrected one
  const values = rawValues.map(v => clamp(v, min, max)).sort((a, b) => a - b);

  // The pointer events may come faster than the renders: the handlers read the latest values from the ref
  const valuesRef = React.useRef(values);
  valuesRef.current = values;

  const containerRef = React.useRef<HTMLSpanElement | null>(null);
  const thumbRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const dragRef = React.useRef<DragState | null>(null);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  React.useImperativeHandle(ref, () => containerRef.current as HTMLSpanElement);

  // Warn once, not on every render
  const isControlledWithoutOnChange = isControlled && typeof onChange === 'undefined';
  React.useEffect(() => {
    if (isControlledWithoutOnChange) {
      console.error(
        'The property «onChange» should be passed with prop «value» to make component controlled',
      );
    }
  }, [isControlledWithoutOnChange]);

  React.useEffect(() => {
    if (!(step > 0)) {
      console.error(`The property «step» should be greater than zero, got «${step}»`);
    }
  }, [step]);

  const toPublicValue = (next: readonly number[]): SliderValue =>
    isRange ? [next[0], next[1]] : next[0];

  /**
   * Moves the thumb to the value. A range thumb can not pass the other one
   */
  const changeValue = (index: number, nextValue: number, event: React.SyntheticEvent) => {
    const current = valuesRef.current;
    const lower = isRange && index === 1 ? current[0] : min;
    const upper = isRange && index === 0 ? current[1] : max;
    const bounded = clamp(nextValue, lower, upper);

    if (bounded === current[index]) {
      return;
    }

    const next = current.map((v, i) => (i === index ? bounded : v));
    valuesRef.current = next;

    if (!isControlled) {
      setInternalValues(next);
    }

    onChange?.(toPublicValue(next), event, index);
  };

  const getValueFromPointer = (event: React.PointerEvent): number => {
    const rect = (containerRef.current as HTMLSpanElement).getBoundingClientRect();
    const ratio =
      orientation === 'vertical'
        ? (rect.bottom - event.clientY) / rect.height
        : (event.clientX - rect.left) / rect.width;

    return clamp(snapToStep(min + clamp(ratio, 0, 1) * (max - min), min, step), min, max);
  };

  const startDragOf = (index: number) => {
    setActiveIndex(index);
    thumbRefs.current[index]?.focus({ preventScroll: true });
  };

  const handlePointerDown: React.PointerEventHandler<HTMLSpanElement> = event => {
    onPointerDown?.(event);

    // Only the main mouse button, a finger or a pen
    if (disabled || event.button !== 0 || event.defaultPrevented) {
      return;
    }

    // Prevents the text selection and the focus on the container, the thumb gets the focus below
    event.preventDefault();

    const pointerValue = getValueFromPointer(event);
    const current = valuesRef.current;
    let index: number | null = 0;

    if (isRange) {
      if (current[0] === current[1]) {
        // The thumbs are in the same place: the left one can only go left, the right one can only go right
        index = pointerValue < current[0] ? 0 : pointerValue > current[1] ? 1 : null;
      } else {
        index = Math.abs(pointerValue - current[0]) <= Math.abs(pointerValue - current[1]) ? 0 : 1;
      }
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { pointerId: event.pointerId, index };

    if (index === null) {
      startDragOf(1);

      return;
    }

    startDragOf(index);
    changeValue(index, pointerValue, event);
  };

  const handlePointerMove: React.PointerEventHandler<HTMLSpanElement> = event => {
    onPointerMove?.(event);

    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    const pointerValue = getValueFromPointer(event);
    let { index } = drag;

    if (index === null) {
      const current = valuesRef.current[0];
      if (pointerValue === current) {
        return;
      }

      index = pointerValue < current ? 0 : 1;
      dragRef.current = { pointerId: drag.pointerId, index };
      startDragOf(index);
    }

    changeValue(index, pointerValue, event);
  };

  const finishDrag = (event: React.PointerEvent<HTMLSpanElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    dragRef.current = null;
    setActiveIndex(null);
    onChangeCommitted?.(toPublicValue(valuesRef.current), event);
  };

  const handlePointerUp: React.PointerEventHandler<HTMLSpanElement> = event => {
    onPointerUp?.(event);
    finishDrag(event);
  };

  const handlePointerCancel: React.PointerEventHandler<HTMLSpanElement> = event => {
    onPointerCancel?.(event);
    finishDrag(event);
  };

  const handleLostPointerCapture: React.PointerEventHandler<HTMLSpanElement> = event => {
    onLostPointerCapture?.(event);
    finishDrag(event);
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (disabled) {
      return;
    }

    const current = valuesRef.current[index];

    // About ten big steps along the whole slider
    const bigStep = step * Math.max(1, Math.round((max - min) / 10 / step));
    let next: number;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        next = snapToStep(current + (event.shiftKey ? bigStep : step), min, step);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        next = snapToStep(current - (event.shiftKey ? bigStep : step), min, step);
        break;
      case 'PageUp':
        next = snapToStep(current + bigStep, min, step);
        break;
      case 'PageDown':
        next = snapToStep(current - bigStep, min, step);
        break;
      case 'Home':
        next = min;
        break;
      case 'End':
        next = max;
        break;
      default:
        return;
    }

    event.preventDefault();

    const before = valuesRef.current;
    changeValue(index, next, event);

    if (valuesRef.current !== before) {
      onChangeCommitted?.(toPublicValue(valuesRef.current), event);
    }
  };

  const markItems = React.useMemo<readonly SliderMarkItem[]>(() => {
    if (marks === true) {
      if (!(step > 0)) {
        return [];
      }

      const count = Math.floor((max - min) / step) + 1;

      return Array.from({ length: count }, (_, i) => ({
        value: snapToStep(min + i * step, min, step),
      }));
    }

    if (Array.isArray(marks)) {
      return marks.filter(mark => mark.value >= min && mark.value <= max);
    }

    return [];
  }, [marks, min, max, step]);

  const hasMarkLabels = markItems.some(mark => mark.label != null && mark.label !== false);
  const trackStart = isRange ? valueToPercent(values[0], min, max) : 0;
  const trackEnd = valueToPercent(values[values.length - 1], min, max);
  const isInTrack = (v: number) => (isRange ? v >= values[0] && v <= values[1] : v <= values[0]);

  return (
    <overridesMap.Container
      {...nativeProps}
      orientation={orientation}
      disabled={disabled}
      hasMarkLabels={hasMarkLabels}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onLostPointerCapture={handleLostPointerCapture}
      ref={containerRef}
    >
      <overridesMap.Rail color={color} orientation={orientation} disabled={disabled} />
      <overridesMap.Track
        color={color}
        orientation={orientation}
        disabled={disabled}
        start={trackStart}
        end={trackEnd}
      />
      {markItems.map(mark => (
        <React.Fragment key={mark.value}>
          <overridesMap.Mark
            orientation={orientation}
            position={valueToPercent(mark.value, min, max)}
            inTrack={isInTrack(mark.value)}
          />
          {mark.label != null && mark.label !== false && (
            <overridesMap.MarkLabel
              orientation={orientation}
              position={valueToPercent(mark.value, min, max)}
              inTrack={isInTrack(mark.value)}
            >
              {mark.label}
            </overridesMap.MarkLabel>
          )}
        </React.Fragment>
      ))}
      {values.map((thumbValue, index) => (
        <overridesMap.Thumb
          // The thumb is identified by its place: the first or the second
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={thumbValue}
          aria-valuetext={getAriaValueText?.(thumbValue, index)}
          aria-orientation={orientation}
          aria-disabled={disabled || undefined}
          aria-label={getAriaLabel ? getAriaLabel(index) : ariaLabel}
          aria-labelledby={ariaLabelledby}
          color={color}
          orientation={orientation}
          disabled={disabled}
          position={valueToPercent(thumbValue, min, max)}
          active={activeIndex === index}
          index={index}
          // The dragged thumb is above the other one, so the thumbs in the same place stay reachable
          style={activeIndex === index ? { zIndex: 2 } : undefined}
          onKeyDown={event => handleKeyDown(index, event)}
          ref={(node: HTMLSpanElement | null) => {
            thumbRefs.current[index] = node;
          }}
        />
      ))}
      {typeof name !== 'undefined' &&
        values.map((thumbValue, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <input key={index} type="hidden" name={name} value={thumbValue} disabled={disabled} />
        ))}
    </overridesMap.Container>
  );
};

/**
 * The slider is generic: the type of the value (a number or a pair of numbers)
 * comes from `value` or `defaultValue` and goes to `onChange`
 */
type SliderComponent = {
  (props: SliderProps<number> & React.RefAttributes<HTMLSpanElement>): React.ReactElement | null;
  (
    props: SliderProps<readonly [number, number]> & React.RefAttributes<HTMLSpanElement>,
  ): React.ReactElement | null;
  displayName?: string;
};

export default React.forwardRef(Slider) as SliderComponent;
