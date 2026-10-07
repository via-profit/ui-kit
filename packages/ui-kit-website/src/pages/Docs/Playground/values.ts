import { createTheme, ThemePadding } from '@via-profit/ui-kit/src/ThemeProvider';

export type PaddingValue = {
  readonly y: number;
  readonly x: number;
};

export type PlaygroundPadding = Record<ThemePadding, PaddingValue>;

export type PlaygroundValues = {
  readonly padding: PlaygroundPadding;

  /**
   * The font size of the preview, px
   */
  readonly fontSize: number;
};

export type PresetName = 'compact' | 'default' | 'comfortable';

export const PADDING_KINDS: readonly ThemePadding[] = ['control', 'item', 'container'];

const parseEm = (value: string) => parseFloat(value) || 0;

// The defaults of the kit: the playground shows the same values as createTheme without `padding`
const defaultPadding = PADDING_KINDS.reduce<Partial<PlaygroundPadding>>((result, kind) => {
  const { y, x } = createTheme().padding[kind];

  return { ...result, [kind]: { y: parseEm(y), x: parseEm(x) } };
}, {}) as PlaygroundPadding;

export const PRESETS: Record<PresetName, PlaygroundPadding> = {
  compact: {
    control: { y: 0.45, x: 0.75 },
    item: { y: 0.35, x: 0.6 },
    container: { y: 0.65, x: 0.75 },
  },
  default: defaultPadding,
  comfortable: {
    control: { y: 1, x: 1.3 },
    item: { y: 0.85, x: 1.1 },
    container: { y: 1.5, x: 1.5 },
  },
};

export const DEFAULT_FONT_SIZE = 15;

export const DEFAULT_VALUES: PlaygroundValues = {
  padding: defaultPadding,
  fontSize: DEFAULT_FONT_SIZE,
};

/**
 * The length of the theme: `0.75em`
 */
export const toEm = (value: number) => `${Number(value.toFixed(2))}em`;

/**
 * The preset with exactly these values, or null for the values set by hand
 */
export const findPreset = (padding: PlaygroundPadding): PresetName | null => {
  const found = (Object.keys(PRESETS) as PresetName[]).find(name =>
    PADDING_KINDS.every(
      kind =>
        PRESETS[name][kind].y === padding[kind].y && PRESETS[name][kind].x === padding[kind].x,
    ),
  );

  return found || null;
};

/**
 * The code of the theme with these paddings
 */
export const toThemeCode = (padding: PlaygroundPadding) => {
  // One value per line: the code fits the narrow panel
  const lines = PADDING_KINDS.flatMap(kind => [
    `    ${kind}: {`,
    `      y: '${toEm(padding[kind].y)}',`,
    `      x: '${toEm(padding[kind].x)}',`,
    '    },',
  ]);

  return ['const theme = createTheme({', '  padding: {', ...lines, '  },', '});'].join('\n');
};
