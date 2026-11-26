/**
 * Number of digits after the point, e.g. 2 for 0.05
 */
const countDecimals = (value: number): number => {
  if (Number.isInteger(value)) {
    return 0;
  }

  const [mantissa, exponent] = String(value).split('e-');
  const fraction = (mantissa.split('.')[1] || '').length;

  return exponent ? fraction + Number(exponent) : fraction;
};

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/**
 * Snaps the value to the nearest step counted from `min`.
 * The result is rounded to the precision of `step` and `min`: 0.1 + 0.2 gives 0.3, not 0.30000000000000004
 */
export const snapToStep = (value: number, min: number, step: number): number => {
  const snapped = Math.round((value - min) / step) * step + min;
  const decimals = Math.max(countDecimals(step), countDecimals(min));

  return Number(snapped.toFixed(decimals));
};

/**
 * The position of the value on the rail, from 0 to 100
 */
export const valueToPercent = (value: number, min: number, max: number): number =>
  max === min ? 0 : ((value - min) * 100) / (max - min);
