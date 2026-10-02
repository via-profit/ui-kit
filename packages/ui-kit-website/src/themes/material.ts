/**
 * The theme in the style of Material Design 3. It exists only to check how well ui-kit can be customized:
 * it uses only the public API, as an application would — the tokens of the theme
 * and the parts of the components replaced in `components.overrides` by `styled(StandardPart)`
 */
import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';
import type { UIThemeOverrides } from '@via-profit/ui-kit/src/ThemeProvider';
import ButtonContainer from '@via-profit/ui-kit/src/Button/ButtonContainer';
import TextFieldInputWrapper from '@via-profit/ui-kit/src/TextField/TextFieldInputWrapper';
import TextFieldInput from '@via-profit/ui-kit/src/TextField/TextFieldInput';
import TextFieldLabel from '@via-profit/ui-kit/src/TextField/TextFieldLabel';
import TextAreaInput from '@via-profit/ui-kit/src/TextArea/TextAreaInput';
import SelectboxButton from '@via-profit/ui-kit/src/Selectbox/SelectboxButton';
import SelectboxButtonWrapper from '@via-profit/ui-kit/src/Selectbox/SelectboxButtonWrapper';
import SwitchTrack from '@via-profit/ui-kit/src/Switch/SwitchTrack';
import SwitchDot from '@via-profit/ui-kit/src/Switch/SwitchDot';
import CheckboxBox from '@via-profit/ui-kit/src/Checkbox/CheckboxBox';
import RadioBox from '@via-profit/ui-kit/src/Radio/RadioBox';
import SliderRail from '@via-profit/ui-kit/src/Slider/SliderRail';
import SliderThumb from '@via-profit/ui-kit/src/Slider/SliderThumb';
import TooltipContainer from '@via-profit/ui-kit/src/Tooltip/TooltipContainer';
import ToastCard from '@via-profit/ui-kit/src/Toast/ToastCard';
import ToastAction from '@via-profit/ui-kit/src/Toast/ToastAction';
import MenuList from '@via-profit/ui-kit/src/Menu/MenuList';
import SurfaceContainer from '@via-profit/ui-kit/src/Surface/SurfaceContainer';
import CalendarPaper from '@via-profit/ui-kit/src/Calendar/CalendarPaper';
import CalendarHeader from '@via-profit/ui-kit/src/Calendar/CalendarHeader';
import CalendarControlButton from '@via-profit/ui-kit/src/Calendar/CalendarControlButton';
import CalendarFooter from '@via-profit/ui-kit/src/Calendar/CalendarFooter';
import ModalInnerContainer from '@via-profit/ui-kit/src/Modal/BaseModal/ModalInnerContainer';

/**
 * The baseline color scheme of Material Design 3
 */
const LIGHT = {
  primary: '#6750a4',
  onPrimary: '#ffffff',
  primaryContainer: '#eaddff',
  secondary: '#625b71',
  secondaryContainer: '#e8def8',
  onSecondaryContainer: '#1d192b',
  surface: '#fef7ff',
  surfaceContainerLow: '#f7f2fa',
  surfaceContainer: '#f3edf7',
  surfaceContainerHigh: '#ece6f0',
  surfaceContainerHighest: '#e6e0e9',
  onSurface: '#1d1b20',
  onSurfaceVariant: '#49454f',
  outline: '#79747e',
  outlineVariant: '#cac4d0',
  inverseSurface: '#322f35',
  inverseOnSurface: '#f5eff7',
  inversePrimary: '#d0bcff',
  error: '#b3261e',
  // The state layers: the content color over the control, 8% on hover, 10% on press
  hoverLayer: 0.08,
  pressLayer: 0.1,
  elevation1: '0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15)',
  elevation2: '0 1px 2px rgba(0, 0, 0, 0.3), 0 2px 6px 2px rgba(0, 0, 0, 0.15)',
  elevation3: '0 1px 3px rgba(0, 0, 0, 0.3), 0 4px 8px 3px rgba(0, 0, 0, 0.15)',
};

const DARK: typeof LIGHT = {
  ...LIGHT,
  primary: '#d0bcff',
  onPrimary: '#381e72',
  primaryContainer: '#4f378b',
  secondary: '#ccc2dc',
  secondaryContainer: '#4a4458',
  onSecondaryContainer: '#e8def8',
  surface: '#141218',
  surfaceContainerLow: '#1d1b20',
  surfaceContainer: '#211f26',
  surfaceContainerHigh: '#2b2930',
  surfaceContainerHighest: '#36343b',
  onSurface: '#e6e0e9',
  onSurfaceVariant: '#cac4d0',
  outline: '#938f99',
  outlineVariant: '#49454f',
  inverseSurface: '#e6e0e9',
  inverseOnSurface: '#322f35',
  inversePrimary: '#6750a4',
  error: '#f2b8b5',
};

// The parts are created once, at the module level, and read the colors from the theme:
// the light and the dark themes share the same components, so switching the mode does not remount them
const palette = (theme: Theme) => (theme.isDark ? DARK : LIGHT);

/**
 * The state layer of Material: the content color with the opacity over the background
 */
const layer = (color: string, opacity: number) => {
  const hex = color.replace('#', '');
  const [r, g, b] = [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16));

  return `linear-gradient(rgba(${r}, ${g}, ${b}, ${opacity}), rgba(${r}, ${g}, ${b}, ${opacity}))`;
};

const stateLayers = (content: string, p: typeof LIGHT) => css`
  &:hover {
    background-image: ${layer(content, p.hoverLayer)};
  }
  &:active {
    background-image: ${layer(content, p.pressLayer)};
  }
`;

/**
 * The buttons of Material: `standard` is the filled button (primary) or the tonal button (default),
 * `outlined` is the outlined button, `plain` is the text button
 */
const Button = styled(ButtonContainer)(({ theme, variant, color, disabled, iconOnly }) => {
  const p = palette(theme);

  if (!variant) {
    return undefined;
  }

  const isDefaultColor = typeof color === 'undefined' || color === 'default';

  return css`
    border-radius: 20px;
    padding: 0 1.5em;
    min-height: 2.5em;
    font-size: 0.875em;
    font-weight: 500;
    letter-spacing: 0.01em;
    justify-content: center;
    transition: box-shadow 150ms ease-out;
    ${iconOnly &&
    css`
      width: 2.5em;
      height: 2.5em;
      padding: 0;
    `}
    ${variant === 'standard' &&
    color === 'primary' &&
    css`
      background-color: ${p.primary};
      color: ${p.onPrimary};
      ${stateLayers(p.onPrimary, p)};
      &:hover {
        background-color: ${p.primary};
        box-shadow: ${p.elevation1};
      }
      &:active {
        background-color: ${p.primary};
      }
    `}
    ${variant === 'standard' &&
    isDefaultColor &&
    css`
      background-color: ${p.secondaryContainer};
      color: ${p.onSecondaryContainer};
      ${stateLayers(p.onSecondaryContainer, p)};
      &:hover,
      &:active {
        background-color: ${p.secondaryContainer};
      }
    `}
    ${variant === 'outlined' &&
    isDefaultColor &&
    css`
      border: 1px solid ${p.outline};
      color: ${p.primary};
      ${stateLayers(p.primary, p)};
      &:hover,
      &:active {
        background-color: transparent;
      }
    `}
    ${variant === 'plain' &&
    isDefaultColor &&
    css`
      padding: 0 0.75em;
      color: ${p.primary};
      ${stateLayers(p.primary, p)};
      &:hover,
      &:active {
        color: ${p.primary};
        background-color: transparent;
      }
    `}
    ${disabled &&
    css`
      color: ${theme.isDark ? 'rgba(230, 224, 233, 0.38)' : 'rgba(29, 27, 32, 0.38)'};
      background-image: none;
      box-shadow: none;
      ${variant === 'standard' &&
      css`
        background-color: ${theme.isDark ? 'rgba(230, 224, 233, 0.12)' : 'rgba(29, 27, 32, 0.12)'};
      `}
      ${variant === 'outlined' &&
      css`
        border-color: ${theme.isDark ? 'rgba(230, 224, 233, 0.12)' : 'rgba(29, 27, 32, 0.12)'};
      `}
    `}
  `;
});

// The filled text field of Material: the tinted field with the line under it
const InputWrapper = styled(TextFieldInputWrapper)(({ theme, focused, error }) => {
  const p = palette(theme);
  const lineColor = error ? p.error : focused ? p.primary : p.onSurfaceVariant;

  return css`
    border: 0;
    border-radius: 4px 4px 0 0;
    background-color: ${p.surfaceContainerHighest};
    outline: none;
    box-shadow: inset 0 ${focused || error ? '-2px' : '-1px'} 0 0 ${lineColor};
    transition: box-shadow 150ms ease-out;
    &:hover {
      background-image: ${layer(p.onSurface, p.hoverLayer)};
    }
  `;
});

const Input = styled(TextFieldInput)`
  padding: 0.85em 1em 0.8em;
`;

const TextAreaField = styled(TextAreaInput)`
  padding: 0.85em 1em 0.8em;
`;

const Label = styled(TextFieldLabel)(({ theme, focused, error }) => {
  const p = palette(theme);

  return css`
    color: ${error ? p.error : focused ? p.primary : p.onSurfaceVariant};
    font-size: 0.8em;
    letter-spacing: 0.03em;
  `;
});

const SelectButtonWrapper = styled(SelectboxButtonWrapper)`
  border-radius: 4px 4px 0 0;
  background-color: transparent;
`;

const SelectButton = styled(SelectboxButton)(({ theme, error, isOpen }) => {
  const p = palette(theme);
  const lineColor = error ? p.error : isOpen ? p.primary : p.onSurfaceVariant;

  return css`
    border: 0;
    border-radius: 4px 4px 0 0;
    /* The metrics of the text field: the selectbox has the same height */
    padding: 0.85em 0.75em 0.8em 1em;
    min-height: 0;
    font-size: 1em;
    line-height: normal;
    color: ${p.onSurface};
    background-color: ${p.surfaceContainerHighest};
    box-shadow: inset 0 ${isOpen || error ? '-2px' : '-1px'} 0 0 ${lineColor};
    &:hover {
      background-color: ${p.surfaceContainerHighest};
      background-image: ${layer(p.onSurface, p.hoverLayer)};
      box-shadow: inset 0 ${isOpen || error ? '-2px' : '-1px'} 0 0 ${lineColor};
    }
  `;
});

// The switch of Material 3: the outlined track and the handle that grows when the switch is on
const Track = styled(SwitchTrack)(({ theme, checked }) => {
  const p = palette(theme);

  return css`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 3.25rem;
    height: 2rem;
    box-sizing: border-box;
    transform: translate(-50%, -50%) scale(0.85);
    border-radius: 1rem;
    opacity: 1;
    border: 2px solid ${checked ? p.primary : p.outline};
    background-color: ${checked ? p.primary : p.surfaceContainerHighest};
    transition: background-color 150ms ease-out;
  `;
});

const Dot = styled(SwitchDot)(({ theme, checked }) => {
  const p = palette(theme);

  return css`
    padding: 0;
    width: 0;
    height: 0;
    top: 1.5rem;
    left: 1.6rem;
    transform: translateX(${checked ? '1.3rem' : '0'});
    transition: transform 200ms cubic-bezier(0.2, 0, 0, 1);

    & [data-switch-dot] {
      flex-shrink: 0;
      width: ${checked ? '1.25rem' : '0.85rem'};
      height: ${checked ? '1.25rem' : '0.85rem'};
      box-shadow: none;
      background-color: ${checked ? p.onPrimary : p.outline};
      transition:
        width 150ms ease-out,
        height 150ms ease-out;
    }
    & [data-switch-dot]::before,
    & [data-switch-dot]::after {
      display: none;
    }
  `;
});

const Checkbox = styled(CheckboxBox)(({ theme, checked, indeterminate }) => {
  const p = palette(theme);
  const isOn = Boolean(checked || indeterminate);

  return css`
    width: 1.125em;
    height: 1.125em;
    & [data-checkbox-square] {
      border-radius: 2px;
      border-width: 2px;
      border-color: ${isOn ? p.primary : p.onSurfaceVariant};
      background-color: ${isOn ? p.primary : 'transparent'};
      color: ${p.onPrimary};
    }
  `;
});

// The radio of Material: the ring and the dot of the primary color, no fill
const Radio = styled(RadioBox)(({ theme }) => {
  const p = palette(theme);

  return css`
    width: 1.25em;
    height: 1.25em;
    & [data-radio-circle] {
      border-width: 2px;
      border-color: ${p.onSurfaceVariant};
      background-color: transparent;
    }
    & input:checked + [data-radio-circle] {
      border-color: ${p.primary};
    }
    & input:checked + [data-radio-circle] [data-radio-dot] {
      background-color: ${p.primary};
    }
  `;
});

const Rail = styled(SliderRail)(
  ({ theme }) => css`
    opacity: 1;
    background-color: ${palette(theme).secondaryContainer};
  `,
);

const Thumb = styled(SliderThumb)(({ theme, disabled }) => {
  const p = palette(theme);

  return css`
    background-color: ${disabled ? p.outline : p.primary};
    &:hover {
      box-shadow: 0 0 0 0.5em
        ${theme.isDark ? 'rgba(208, 188, 255, 0.12)' : 'rgba(103, 80, 164, 0.08)'};
    }
  `;
});

// The plain tooltip of Material: the inverse surface
const Tooltip = styled(TooltipContainer)(({ theme }) => {
  const p = palette(theme);

  return css`
    border-radius: 4px;
    padding: 0.35em 0.65em;
    font-size: 0.75em;
    background-color: ${p.inverseSurface};
    color: ${p.inverseOnSurface};
  `;
});

// The snackbar of Material: the inverse surface, the action in the inverse primary color
const Toast = styled(ToastCard)(({ theme }) => {
  const p = palette(theme);

  return css`
    border: 0;
    border-radius: 4px;
    background-color: ${p.inverseSurface};
    color: ${p.inverseOnSurface};
    box-shadow: ${p.elevation3};
    & [aria-label] {
      color: ${p.inverseOnSurface};
    }
    /* The description is not a part of the toast, the theme can reach it only by the structure:
       the second line inside the body. A fragile selector — see the findings of the check */
    & > div > div:first-of-type {
      color: ${p.inverseOnSurface};
      opacity: 0.8;
    }
  `;
});

const Action = styled(ToastAction)(({ theme }) => {
  const p = palette(theme);

  return css`
    border-radius: 20px;
    background-color: transparent;
    color: ${p.inversePrimary};
    font-weight: 500;
    &:hover {
      background-color: transparent;
      background-image: ${layer(p.inversePrimary, p.hoverLayer)};
    }
  `;
});

// The menu of Material. The items are rendered by the user of the Menu, so the theme can not restyle them
const List = styled(MenuList)(({ theme }) => {
  const p = palette(theme);

  return css`
    padding: 0.5em 0;
    border-radius: 4px;
    background-color: ${p.surfaceContainer};
    box-shadow: ${p.elevation2};
    &,
    &:focus {
      outline: none;
    }
  `;
});

// The elevated card of Material
const Surface = styled(SurfaceContainer)(({ theme }) => {
  const p = palette(theme);

  return css`
    border-radius: 12px;
    background-color: ${p.surfaceContainerLow};
    box-shadow: ${p.elevation1};
  `;
});

const Paper = styled(CalendarPaper)(({ theme }) => {
  const p = palette(theme);

  return css`
    border-radius: 16px;
    background-color: ${p.surfaceContainerHigh};
    box-shadow: ${p.elevation3};
  `;
});

const CalendarHead = styled(CalendarHeader)(
  ({ theme }) => css`
    background-color: transparent;
    color: ${palette(theme).onSurfaceVariant};
  `,
);

// The footer has no fill, as the header: the control buttons have the text color on both
const CalendarFoot = styled(CalendarFooter)(
  ({ theme }) => css`
    background-color: transparent;
    border-top: 1px solid ${palette(theme).outlineVariant};
    color: ${palette(theme).onSurfaceVariant};
  `,
);

const CalendarButton = styled(CalendarControlButton)(({ theme }) => {
  const p = palette(theme);

  return css`
    color: ${p.onSurfaceVariant};
    border-radius: 20px;
    &:hover,
    &:active {
      color: ${p.onSurfaceVariant};
      background-color: transparent;
      background-image: ${layer(p.onSurfaceVariant, p.hoverLayer)};
    }
  `;
});

// Dialog passes its own window part (with the role and the ids) to the modal, so the theme can not
// replace it: the window is styled through the container around it
const WindowContainer = styled(ModalInnerContainer)(({ theme }) => {
  const p = palette(theme);

  return css`
    /* Only the dialogs: the drawer is a dialog too, it differs only by the format of the id */
    & > [role='dialog'][id^='dialog-'],
    & > :has(> [role='alertdialog']) {
      border-radius: 28px;
      padding: 1.5em;
      background-color: ${p.surfaceContainerHigh};
      box-shadow: ${p.elevation3};
    }
    /* The confirmation draws its window inside the window of the modal: the inner one is flattened */
    & [role='alertdialog'] {
      background: transparent;
      box-shadow: none;
    }
  `;
});

const fieldParts = { InputWrapper, Input, Label };

const createMaterialTheme = (isDark: boolean): UIThemeOverrides => {
  const p = isDark ? DARK : LIGHT;

  return {
    isDark,
    typography: { fontFamily: 'Roboto, "Roboto Flex", system-ui, -apple-system, sans-serif' },
    // The focus indicator of Material 3: the thick ring of the secondary color with the gap
    focusRing: { width: '3px', offset: '2px', color: p.secondary },
    elevation: { popup: p.elevation2, surface: p.elevation1 },
    shape: { radiusFactor: 0.4 },
    fontSize: { small: 14, normal: 16, medium: 18, large: 20 },
    zIndex: { header: 8, modal: 10 },
    color: {
      backgroundPrimary: p.surface,
      backgroundSecondary: p.surfaceContainer,
      surface: p.surfaceContainerLow,
      textPrimary: p.onSurface,
      textSecondary: p.onSurfaceVariant,
      accentPrimary: p.primary,
      accentPrimaryContrast: p.onPrimary,
      accentSecondary: p.secondary,
      accentSecondaryContrast: isDark ? '#332d41' : '#ffffff',
      error: p.error,
      errorContrast: isDark ? '#601410' : '#ffffff',
      warning: isDark ? '#ffb95c' : '#8b5000',
      warningContrast: isDark ? '#4a2800' : '#ffffff',
      success: isDark ? '#7fd88f' : '#1b6d35',
      successContrast: isDark ? '#00391b' : '#ffffff',
      // The colors of the website itself
      mainSidebar: p.surfaceContainer,
      mainSidebarContrast: p.onSurface,
      border: p.outlineVariant,
      codeBackground: p.surfaceContainerLow,
    },
    components: {
      Button: { overrides: { Container: Button } },
      TextField: { overrides: fieldParts },
      TextArea: { overrides: { ...fieldParts, Input: TextAreaField } },
      Selectbox: {
        overrides: { Label, ButtonWrapper: SelectButtonWrapper, Button: SelectButton },
      },
      Switch: { overrides: { Track, Dot } },
      Checkbox: { overrides: { Box: Checkbox } },
      Radio: { overrides: { Box: Radio } },
      Slider: { overrides: { Rail, Thumb } },
      Tooltip: { overrides: { Container: Tooltip } },
      // The snackbars of Material appear at the bottom center
      Toast: { defaultProps: { position: 'bottom-center' }, overrides: { Toast, Action } },
      Menu: { overrides: { List } },
      Surface: { overrides: { Container: Surface } },
      Calendar: {
        overrides: {
          Paper,
          Header: CalendarHead,
          Footer: CalendarFoot,
          ControlButton: CalendarButton,
        },
      },
      Modal: { overrides: { InnerContainer: WindowContainer } },
    },
  };
};

export default createMaterialTheme;
