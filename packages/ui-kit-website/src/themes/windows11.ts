/**
 * The theme in the style of Windows 11. It exists only to check how well ui-kit can be customized:
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
 * The colors of the Fluent design of Windows 11 (WinUI 3): the fills and the strokes of the controls
 */
const DARK = {
  background: '#202020',
  layer: '#2b2b2b',
  flyout: 'rgba(44, 44, 44, 0.96)',
  text: '#ffffff',
  textSecondary: '#c5c5c5',
  textDisabled: 'rgba(255, 255, 255, 0.36)',
  accent: '#60cdff',
  accentHover: 'rgba(96, 205, 255, 0.9)',
  accentPressed: 'rgba(96, 205, 255, 0.8)',
  onAccent: '#000000',
  error: '#ff99a4',
  controlFill: 'rgba(255, 255, 255, 0.061)',
  controlFillHover: 'rgba(255, 255, 255, 0.084)',
  controlFillPressed: 'rgba(255, 255, 255, 0.033)',
  controlFillInput: 'rgba(30, 30, 30, 0.7)',
  controlFillSecondary: 'rgba(0, 0, 0, 0.1)',
  subtleHover: 'rgba(255, 255, 255, 0.061)',
  subtlePressed: 'rgba(255, 255, 255, 0.042)',
  stroke: 'rgba(255, 255, 255, 0.07)',
  strokeTop: 'rgba(255, 255, 255, 0.093)',
  strokeBottom: 'rgba(255, 255, 255, 0.07)',
  strokeStrong: 'rgba(255, 255, 255, 0.544)',
  knob: '#cecece',
  thumb: '#454545',
  shadowPopup: '0 8px 16px rgba(0, 0, 0, 0.26)',
  shadowDialog: '0 32px 64px rgba(0, 0, 0, 0.37), 0 2px 21px rgba(0, 0, 0, 0.37)',
};

const LIGHT: typeof DARK = {
  background: '#f3f3f3',
  layer: '#ffffff',
  flyout: 'rgba(249, 249, 249, 0.96)',
  text: '#1b1b1b',
  textSecondary: '#5d5d5d',
  textDisabled: 'rgba(0, 0, 0, 0.36)',
  accent: '#005fb8',
  accentHover: 'rgba(0, 95, 184, 0.9)',
  accentPressed: 'rgba(0, 95, 184, 0.8)',
  onAccent: '#ffffff',
  error: '#c42b1c',
  controlFill: 'rgba(255, 255, 255, 0.7)',
  controlFillHover: 'rgba(249, 249, 249, 0.5)',
  controlFillPressed: 'rgba(249, 249, 249, 0.3)',
  controlFillInput: '#ffffff',
  controlFillSecondary: 'rgba(0, 0, 0, 0.024)',
  subtleHover: 'rgba(0, 0, 0, 0.037)',
  subtlePressed: 'rgba(0, 0, 0, 0.024)',
  stroke: 'rgba(0, 0, 0, 0.058)',
  strokeTop: 'rgba(0, 0, 0, 0.058)',
  strokeBottom: 'rgba(0, 0, 0, 0.162)',
  strokeStrong: 'rgba(0, 0, 0, 0.606)',
  knob: '#5d5d5d',
  thumb: '#ffffff',
  shadowPopup: '0 8px 16px rgba(0, 0, 0, 0.14)',
  shadowDialog: '0 32px 64px rgba(0, 0, 0, 0.19), 0 2px 21px rgba(0, 0, 0, 0.15)',
};

// The parts are created once, at the module level, and read the colors from the theme:
// the light and the dark themes share the same components, so switching the mode does not remount them
const palette = (theme: Theme) => (theme.isDark ? DARK : LIGHT);

// The standard button of Windows: the light fill and the darker bottom edge
const neutralControl = (p: typeof DARK) => css`
  background-color: ${p.controlFill};
  border: 1px solid ${p.strokeTop};
  border-bottom-color: ${p.strokeBottom};
  color: ${p.text};
`;

const Button = styled(ButtonContainer)(({ theme, variant, color, disabled, iconOnly }) => {
  const p = palette(theme);

  // Only the variants of <Button>: the bare ButtonBase (e.g. inside the Badge) keeps its look
  if (!variant) {
    return undefined;
  }

  const isDefaultColor = typeof color === 'undefined' || color === 'default';

  return css`
    border-radius: 4px;
    padding: 0.3em 0.75em 0.35em;
    min-height: 2.15em;
    line-height: 1.4;
    font-size: 0.93em;
    font-weight: 400;
    transition: background-color 83ms linear;
    ${iconOnly &&
    css`
      width: 2.15em;
      height: 2.15em;
      padding: 0;
    `}
    ${variant === 'standard' &&
    color === 'primary' &&
    css`
      background-color: ${p.accent};
      color: ${p.onAccent};
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-bottom-color: rgba(0, 0, 0, 0.4);
      &:hover {
        background-color: ${p.accentHover};
      }
      &:active {
        background-color: ${p.accentPressed};
      }
    `}
    ${variant === 'standard' &&
    isDefaultColor &&
    css`
      ${neutralControl(p)};
      &:hover {
        background-color: ${p.controlFillHover};
      }
      &:active {
        background-color: ${p.controlFillPressed};
        color: ${p.textSecondary};
      }
    `}
    ${variant === 'outlined' &&
    css`
      border-width: 1px;
    `}
    ${variant === 'plain' &&
    isDefaultColor &&
    css`
      color: ${p.text};
      &:hover {
        color: ${p.text};
        background-color: ${p.subtleHover};
      }
      &:active {
        color: ${p.textSecondary};
        background-color: ${p.subtlePressed};
      }
    `}
    ${disabled &&
    css`
      color: ${p.textDisabled};
      background-color: ${variant === 'plain' ? 'transparent' : p.controlFillSecondary};
      border-color: ${variant === 'plain' ? 'transparent' : p.stroke};
    `}
  `;
});

const InputWrapper = styled(TextFieldInputWrapper)(({ theme, focused, error, disabled }) => {
  const p = palette(theme);

  return css`
    border-radius: 4px;
    border: 1px solid ${p.strokeTop};
    border-bottom-color: ${p.strokeStrong};
    background-color: ${focused ? p.controlFillInput : p.controlFill};
    outline: none;
    transition: background-color 83ms linear;
    ${!focused &&
    !disabled &&
    css`
      &:hover {
        background-color: ${p.controlFillHover};
      }
    `}
    ${(focused || error) &&
    css`
      border-bottom-color: transparent;
      box-shadow: inset 0 -2px 0 0 ${error ? p.error : p.accent};
    `}
  `;
});

const Input = styled(TextFieldInput)`
  padding: 0.45em 0.7em 0.5em;
`;

const TextAreaField = styled(TextAreaInput)`
  padding: 0.45em 0.7em 0.5em;
`;

const Label = styled(TextFieldLabel)(
  ({ theme }) => css`
    color: ${palette(theme).text};
    font-size: 0.87em;
  `,
);

// The ComboBox of Windows: the same control as the standard button
const SelectButtonWrapper = styled(SelectboxButtonWrapper)`
  border-radius: 4px;
  background-color: transparent;
`;

const SelectButton = styled(SelectboxButton)(({ theme, error, isOpen }) => {
  const p = palette(theme);

  return css`
    ${neutralControl(p)};
    border-radius: 4px;
    /* The metrics of the text field: the selectbox has the same height */
    padding: 0.45em 0.6em 0.5em 0.7em;
    min-height: 0;
    font-size: 1em;
    line-height: normal;
    &:hover {
      background-color: ${p.controlFillHover};
    }
    ${(error || isOpen) &&
    css`
      border-bottom-color: transparent;
      box-shadow: inset 0 -2px 0 0 ${error ? p.error : p.accent};
    `}
  `;
});

const Track = styled(SwitchTrack)(({ theme, checked }) => {
  const p = palette(theme);

  return css`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2.5rem;
    height: 1.25rem;
    box-sizing: border-box;
    transform: translate(-50%, -50%);
    border-radius: 0.625rem;
    opacity: 1;
    border: 1px solid ${checked ? p.accent : p.strokeStrong};
    background-color: ${checked ? p.accent : p.controlFillSecondary};
    transition: background-color 83ms linear;
  `;
});

// The knob: 12px, grows on hover, white on the accent track
const Dot = styled(SwitchDot)(({ theme, checked }) => {
  const p = palette(theme);

  return css`
    padding: 0;
    width: 0;
    height: 0;
    top: 1.5rem;
    left: 1.625rem;
    transform: translateX(${checked ? '1.25rem' : '0'});
    transition: transform 167ms cubic-bezier(0.55, 0.55, 0, 1);

    & [data-switch-dot] {
      flex-shrink: 0;
      width: 0.75rem;
      height: 0.75rem;
      box-shadow: none;
      background-color: ${checked ? p.onAccent : p.knob};
      transition:
        width 83ms linear,
        height 83ms linear;
    }
    & [data-switch-dot]::before,
    & [data-switch-dot]::after {
      display: none;
    }
    label:hover & [data-switch-dot] {
      width: 0.875rem;
      height: 0.875rem;
    }
  `;
});

const Checkbox = styled(CheckboxBox)(({ theme, checked, indeterminate }) => {
  const p = palette(theme);
  const isOn = Boolean(checked || indeterminate);

  return css`
    width: 1.25em;
    height: 1.25em;
    & [data-checkbox-square] {
      border-radius: 4px;
      border-width: 1px;
      border-color: ${isOn ? p.accent : p.strokeStrong};
      background-color: ${isOn ? p.accent : p.controlFillSecondary};
      color: ${p.onAccent};
    }
  `;
});

const Radio = styled(RadioBox)(({ theme }) => {
  const p = palette(theme);

  return css`
    width: 1.25em;
    height: 1.25em;
    & [data-radio-circle] {
      border-width: 1px;
      border-color: ${p.strokeStrong};
      background-color: ${p.controlFillSecondary};
    }
    & input:checked + [data-radio-circle] {
      border-color: ${p.accent};
      background-color: ${p.accent};
    }
    & input:checked + [data-radio-circle] [data-radio-dot] {
      width: 0.6em;
      height: 0.6em;
      background-color: ${p.onAccent};
      transition: transform 83ms linear;
    }
    label:hover & input:checked + [data-radio-circle] [data-radio-dot] {
      transform: scale(1.17);
    }
  `;
});

const Rail = styled(SliderRail)(
  ({ theme }) => css`
    opacity: 1;
    background-color: ${palette(theme).strokeStrong};
  `,
);

const Thumb = styled(SliderThumb)(({ theme, active }) => {
  const p = palette(theme);
  const shadow = `0 0 0 1px ${p.stroke}, 0 1px 2px rgba(0, 0, 0, 0.2)`;

  return css`
    width: 1.25em;
    height: 1.25em;
    background-color: ${p.thumb};
    box-shadow: ${shadow};

    &::after {
      content: '';
      width: 0.75em;
      height: 0.75em;
      border-radius: 50%;
      background-color: ${p.accent};
      transform: scale(${active ? 0.86 : 1});
      transition: transform 83ms linear;
    }
    &:hover,
    &:focus-visible {
      box-shadow: ${shadow};
    }
    &:hover::after {
      transform: scale(${active ? 0.86 : 1.17});
    }
  `;
});

const Tooltip = styled(TooltipContainer)(({ theme }) => {
  const p = palette(theme);

  return css`
    border-radius: 4px;
    padding: 0.3em 0.65em 0.4em;
    background-color: ${p.flyout};
    color: ${p.text};
    border: 1px solid ${p.stroke};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.14);
    backdrop-filter: blur(30px);
  `;
});

const Toast = styled(ToastCard)(({ theme }) => {
  const p = palette(theme);

  return css`
    border-radius: 8px;
    border: 1px solid ${p.stroke};
    background-color: ${p.flyout};
    backdrop-filter: blur(30px);
    box-shadow: ${p.shadowPopup};
  `;
});

const Action = styled(ToastAction)(({ theme }) => {
  const p = palette(theme);

  return css`
    border-radius: 4px;
    font-weight: 400;
    ${neutralControl(p)};
    &:hover {
      background-color: ${p.controlFillHover};
    }
  `;
});

// The highlighted item shows the focus, as in the flyouts of Windows.
// The items are rendered by the user of the Menu, so the theme can not restyle them
const List = styled(MenuList)(({ theme }) => {
  const p = palette(theme);

  return css`
    padding: 0.25em;
    border-radius: 8px;
    border: 1px solid ${p.stroke};
    background-color: ${p.flyout};
    backdrop-filter: blur(30px);
    &,
    &:focus {
      outline: none;
    }
  `;
});

const Surface = styled(SurfaceContainer)(
  ({ theme }) => css`
    border-radius: 8px;
    border: 1px solid ${palette(theme).stroke};
  `,
);

const Paper = styled(CalendarPaper)(({ theme }) => {
  const p = palette(theme);

  return css`
    border-radius: 8px;
    border: 1px solid ${p.stroke};
    background-color: ${p.flyout};
  `;
});

// The header of the calendar of Windows has no fill
const CalendarHead = styled(CalendarHeader)(
  ({ theme }) => css`
    background-color: transparent;
    color: ${palette(theme).text};
  `,
);

// The footer has no fill, as the header: the control buttons have the text color on both
const CalendarFoot = styled(CalendarFooter)(
  ({ theme }) => css`
    background-color: transparent;
    border-top: 1px solid ${palette(theme).stroke};
    color: ${palette(theme).text};
  `,
);

const CalendarButton = styled(CalendarControlButton)(({ theme }) => {
  const p = palette(theme);

  return css`
    color: ${p.text};
    border-radius: 4px;
    &:hover {
      color: ${p.text};
      background-color: ${p.subtleHover};
    }
    &:active {
      color: ${p.textSecondary};
      background-color: ${p.subtlePressed};
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
      border-radius: 8px;
      border: 1px solid ${p.stroke};
      box-shadow: ${p.shadowDialog};
    }
    /* The confirmation draws its window inside the window of the modal: the inner one is flattened */
    & [role='alertdialog'] {
      background: transparent;
      box-shadow: none;
    }
  `;
});

// The same parts for the fields of TextField, TextArea and the label of Selectbox
const fieldParts = { InputWrapper, Input, Label };

const createWindows11Theme = (isDark: boolean): UIThemeOverrides => {
  const p = isDark ? DARK : LIGHT;

  return {
    isDark,
    typography: {
      fontFamily:
        '"Segoe UI Variable Text", "Segoe UI Variable", "Segoe UI", system-ui, -apple-system, sans-serif',
    },
    focusRing: { width: '2px', offset: '1px', color: p.text },
    elevation: {
      popup: p.shadowPopup,
      surface: isDark ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.04)',
    },
    shape: { radiusFactor: 0.2 },
    fontSize: { small: 14, normal: 16, medium: 18, large: 20 },
    zIndex: { header: 8, modal: 10 },
    color: {
      backgroundPrimary: p.background,
      backgroundSecondary: isDark ? '#2b2b2b' : '#ebebeb',
      surface: p.layer,
      textPrimary: p.text,
      textSecondary: p.textSecondary,
      accentPrimary: p.accent,
      accentPrimaryContrast: p.onAccent,
      accentSecondary: isDark ? '#99ebff' : '#003e92',
      accentSecondaryContrast: p.onAccent,
      error: p.error,
      errorContrast: p.onAccent,
      warning: isDark ? '#fce100' : '#9d5d00',
      warningContrast: p.onAccent,
      success: isDark ? '#6ccb5f' : '#0f7b0f',
      successContrast: p.onAccent,
      // The colors of the website itself
      mainSidebar: p.background,
      mainSidebarContrast: p.text,
      border: isDark ? '#333333' : '#e5e5e5',
      codeBackground: isDark ? '#1c1c1c' : '#f9f9f9',
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
      // The notifications of Windows appear in the bottom right corner
      Toast: { defaultProps: { position: 'bottom-right' }, overrides: { Toast, Action } },
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

export default createWindows11Theme;
