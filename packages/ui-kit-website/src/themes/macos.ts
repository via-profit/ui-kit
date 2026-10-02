/**
 * The theme in the style of macOS (AppKit, Sonoma). It exists only to check how well ui-kit can be customized:
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
 * The system colors of macOS: the window, the controls and the materials (vibrancy)
 */
const DARK = {
  window: '#1e1e1e',
  windowSecondary: '#282828',
  control: '#5a5a5c',
  controlPressed: '#6d6d70',
  field: 'rgba(255, 255, 255, 0.05)',
  material: 'rgba(40, 40, 40, 0.78)',
  text: 'rgba(255, 255, 255, 0.85)',
  textSecondary: 'rgba(255, 255, 255, 0.55)',
  textDisabled: 'rgba(255, 255, 255, 0.25)',
  accent: '#0a84ff',
  accentPressed: '#0071e6',
  onAccent: '#ffffff',
  focus: 'rgba(10, 132, 255, 0.55)',
  error: '#ff453a',
  separator: 'rgba(255, 255, 255, 0.1)',
  border: 'rgba(255, 255, 255, 0.12)',
  trackOff: 'rgba(255, 255, 255, 0.15)',
  controlShadow: '0 0.5px 1px rgba(0, 0, 0, 0.3), inset 0 0.5px 0 rgba(255, 255, 255, 0.15)',
  shadowPopup: '0 10px 30px rgba(0, 0, 0, 0.45), 0 0 0 0.5px rgba(0, 0, 0, 0.6)',
  shadowWindow: '0 22px 70px rgba(0, 0, 0, 0.56), 0 0 0 0.5px rgba(0, 0, 0, 0.8)',
};

const LIGHT: typeof DARK = {
  window: '#f5f5f7',
  windowSecondary: '#f6f6f6',
  control: '#ffffff',
  controlPressed: '#f0f0f0',
  field: '#ffffff',
  material: 'rgba(246, 246, 246, 0.8)',
  text: 'rgba(0, 0, 0, 0.85)',
  textSecondary: 'rgba(0, 0, 0, 0.5)',
  textDisabled: 'rgba(0, 0, 0, 0.25)',
  accent: '#007aff',
  accentPressed: '#0062cc',
  onAccent: '#ffffff',
  focus: 'rgba(0, 122, 255, 0.5)',
  error: '#ff3b30',
  separator: 'rgba(0, 0, 0, 0.1)',
  border: 'rgba(0, 0, 0, 0.12)',
  trackOff: 'rgba(0, 0, 0, 0.09)',
  controlShadow: '0 0.5px 1px rgba(0, 0, 0, 0.25), 0 0 0 0.5px rgba(0, 0, 0, 0.12)',
  shadowPopup: '0 10px 30px rgba(0, 0, 0, 0.2), 0 0 0 0.5px rgba(0, 0, 0, 0.15)',
  shadowWindow: '0 22px 70px rgba(0, 0, 0, 0.3), 0 0 0 0.5px rgba(0, 0, 0, 0.2)',
};

// The parts are created once, at the module level, and read the colors from the theme:
// the light and the dark themes share the same components, so switching the mode does not remount them
const palette = (theme: Theme) => (theme.isDark ? DARK : LIGHT);

// The push button of macOS: the raised white control with the thin shadow
const pushButton = (p: typeof DARK) => css`
  background-color: ${p.control};
  color: ${p.text};
  border: 0;
  box-shadow: ${p.controlShadow};
`;

const Button = styled(ButtonContainer)(({ theme, variant, color, disabled, iconOnly }) => {
  const p = palette(theme);

  if (!variant) {
    return undefined;
  }

  const isDefaultColor = typeof color === 'undefined' || color === 'default';

  return css`
    border-radius: 6px;
    padding: 0.2em 0.85em 0.25em;
    min-height: 1.75em;
    line-height: 1.4;
    font-size: 0.87em;
    font-weight: 400;
    transition: none;
    ${iconOnly &&
    css`
      width: 1.9em;
      height: 1.9em;
      padding: 0;
    `}
    ${variant === 'standard' &&
    color === 'primary' &&
    css`
      background-color: ${p.accent};
      background-image: linear-gradient(rgba(255, 255, 255, 0.17), rgba(255, 255, 255, 0));
      color: ${p.onAccent};
      border: 0;
      box-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.25);
      &:hover {
        background-color: ${p.accent};
      }
      &:active {
        background-color: ${p.accentPressed};
      }
    `}
    ${variant === 'standard' &&
    isDefaultColor &&
    css`
      ${pushButton(p)};
      &:hover {
        background-color: ${p.control};
      }
      &:active {
        background-color: ${p.controlPressed};
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
        background-color: ${p.separator};
      }
    `}
    ${disabled &&
    css`
      color: ${p.textDisabled};
      background-image: none;
      ${variant === 'standard' &&
      css`
        background-color: ${p.control};
        box-shadow: ${p.controlShadow};
      `}
    `}
  `;
});

// The text field of macOS: the flat field and the blue glow around it in focus
const InputWrapper = styled(TextFieldInputWrapper)(({ theme, focused, error }) => {
  const p = palette(theme);

  return css`
    border-radius: 6px;
    border: 1px solid ${p.border};
    background-color: ${p.field};
    outline: none;
    transition: box-shadow 150ms ease-out;
    ${(focused || error) &&
    css`
      border-color: ${error ? p.error : p.accent};
      box-shadow: 0 0 0 3px ${error ? 'rgba(255, 59, 48, 0.4)' : p.focus};
    `}
  `;
});

const Input = styled(TextFieldInput)`
  padding: 0.35em 0.6em 0.4em;
`;

const TextAreaField = styled(TextAreaInput)`
  padding: 0.35em 0.6em 0.4em;
`;

const Label = styled(TextFieldLabel)(
  ({ theme }) => css`
    color: ${palette(theme).text};
    font-size: 0.85em;
    font-weight: 500;
  `,
);

// The pop-up button of macOS: the push button with the chevron
const SelectButtonWrapper = styled(SelectboxButtonWrapper)`
  border-radius: 6px;
  background-color: transparent;
`;

const SelectButton = styled(SelectboxButton)(({ theme, error, isOpen }) => {
  const p = palette(theme);

  return css`
    ${pushButton(p)};
    border-radius: 6px;
    /* The metrics of the text field: the selectbox has the same height.
       The transparent border is the border of the field: the button is drawn by the shadow */
    border: 1px solid transparent;
    padding: 0.35em 0.5em 0.4em 0.6em;
    min-height: 0;
    font-size: 1em;
    line-height: normal;
    &:hover {
      background-color: ${p.control};
    }
    ${(error || isOpen) &&
    css`
      box-shadow:
        ${p.controlShadow},
        0 0 0 3px ${error ? 'rgba(255, 59, 48, 0.4)' : p.focus};
    `}
  `;
});

// The switch of macOS: the pill with the big white knob
const Track = styled(SwitchTrack)(({ theme, checked }) => {
  const p = palette(theme);

  return css`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2.4rem;
    height: 1.4rem;
    box-sizing: border-box;
    transform: translate(-50%, -50%);
    border-radius: 0.7rem;
    opacity: 1;
    background-color: ${checked ? p.accent : p.trackOff};
    box-shadow: inset 0 0 0 0.5px rgba(0, 0, 0, 0.1);
    transition: background-color 150ms ease-out;
  `;
});

const Dot = styled(SwitchDot)(
  ({ checked }) => css`
    padding: 0;
    width: 0;
    height: 0;
    top: 1.5rem;
    left: 1.75rem;
    transform: translateX(${checked ? '1rem' : '0'});
    transition: transform 200ms cubic-bezier(0.3, 0.7, 0.4, 1.1);

    & [data-switch-dot] {
      flex-shrink: 0;
      width: 1.2rem;
      height: 1.2rem;
      background-color: #ffffff;
      box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.3),
        0 0 0 0.5px rgba(0, 0, 0, 0.08);
    }
    & [data-switch-dot]::before,
    & [data-switch-dot]::after {
      display: none;
    }
  `,
);

const Checkbox = styled(CheckboxBox)(({ theme, checked, indeterminate }) => {
  const p = palette(theme);
  const isOn = Boolean(checked || indeterminate);

  return css`
    width: 1em;
    height: 1em;
    & [data-checkbox-square] {
      border-radius: 4px;
      border: 0;
      background-color: ${isOn ? p.accent : p.control};
      color: ${p.onAccent};
      box-shadow: ${isOn ? '0 0.5px 1px rgba(0, 0, 0, 0.25)' : p.controlShadow};
    }
  `;
});

const Radio = styled(RadioBox)(({ theme }) => {
  const p = palette(theme);

  return css`
    width: 1em;
    height: 1em;
    & [data-radio-circle] {
      border: 0;
      background-color: ${p.control};
      box-shadow: ${p.controlShadow};
    }
    & input:checked + [data-radio-circle] {
      background-color: ${p.accent};
    }
    & input:checked + [data-radio-circle] [data-radio-dot] {
      width: 40%;
      height: 40%;
      background-color: ${p.onAccent};
    }
  `;
});

const Rail = styled(SliderRail)(
  ({ theme }) => css`
    opacity: 1;
    background-color: ${palette(theme).trackOff};
    box-shadow: inset 0 0 0 0.5px rgba(0, 0, 0, 0.1);
  `,
);

// The knob of the slider of macOS: the white circle with the shadow, no halo
const Thumb = styled(SliderThumb)`
  width: 1.3em;
  height: 1.3em;
  background-color: #ffffff;
  box-shadow:
    0 0.5px 2px rgba(0, 0, 0, 0.35),
    0 0 0 0.5px rgba(0, 0, 0, 0.1);

  &:hover,
  &:focus-visible {
    box-shadow:
      0 0.5px 2px rgba(0, 0, 0, 0.35),
      0 0 0 0.5px rgba(0, 0, 0, 0.1);
  }
`;

const Tooltip = styled(TooltipContainer)(({ theme }) => {
  const p = palette(theme);

  return css`
    border-radius: 5px;
    padding: 0.25em 0.55em;
    font-size: 0.75em;
    background-color: ${p.windowSecondary};
    color: ${p.text};
    box-shadow: ${p.shadowPopup};
  `;
});

// The notification banner of macOS: the translucent material with the big radius
const Toast = styled(ToastCard)(({ theme }) => {
  const p = palette(theme);

  return css`
    border-radius: 14px;
    border: 0;
    background-color: ${p.material};
    backdrop-filter: blur(24px) saturate(1.8);
    box-shadow: ${p.shadowPopup};
  `;
});

const Action = styled(ToastAction)(({ theme }) => {
  const p = palette(theme);

  return css`
    border-radius: 6px;
    font-weight: 400;
    ${pushButton(p)};
    &:hover {
      background-color: ${p.control};
    }
  `;
});

// The menu of macOS: the translucent material. The items are rendered by the user of the Menu,
// so the theme can not give them the accent highlight of macOS
const List = styled(MenuList)(({ theme }) => {
  const p = palette(theme);

  return css`
    padding: 5px;
    border-radius: 10px;
    background-color: ${p.material};
    backdrop-filter: blur(24px) saturate(1.8);
    &,
    &:focus {
      outline: none;
    }
  `;
});

const Surface = styled(SurfaceContainer)(({ theme }) => {
  const p = palette(theme);

  return css`
    border-radius: 10px;
    box-shadow: 0 0 0 0.5px ${p.border};
  `;
});

const Paper = styled(CalendarPaper)(({ theme }) => {
  const p = palette(theme);

  return css`
    border-radius: 10px;
    background-color: ${p.material};
    backdrop-filter: blur(24px) saturate(1.8);
  `;
});

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
    border-top: 1px solid ${palette(theme).separator};
    color: ${palette(theme).text};
  `,
);

const CalendarButton = styled(CalendarControlButton)(({ theme }) => {
  const p = palette(theme);
  // The system blue on white is 4:1, below the 4.5:1 for the text: the text is a bit darker
  const textColor = theme.isDark ? p.accent : p.accentPressed;

  return css`
    color: ${textColor};
    border-radius: 5px;
    &:hover,
    &:active {
      color: ${textColor};
      background-color: ${p.separator};
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
      border-radius: 12px;
      box-shadow: ${p.shadowWindow};
    }
    /* The confirmation draws its window inside the window of the modal: the inner one is flattened */
    & [role='alertdialog'] {
      background: transparent;
      box-shadow: none;
    }
  `;
});

const fieldParts = { InputWrapper, Input, Label };

const createMacosTheme = (isDark: boolean): UIThemeOverrides => {
  const p = isDark ? DARK : LIGHT;

  return {
    isDark,
    typography: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", system-ui, sans-serif',
    },
    // The blue glow around the focused control
    focusRing: { width: '3px', offset: '0px', color: p.focus },
    elevation: {
      popup: p.shadowPopup,
      surface: isDark ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.08)',
    },
    shape: { radiusFactor: 0.3 },
    fontSize: { small: 14, normal: 16, medium: 18, large: 20 },
    zIndex: { header: 8, modal: 10 },
    color: {
      backgroundPrimary: p.window,
      backgroundSecondary: p.windowSecondary,
      surface: isDark ? '#2a2a2a' : '#ffffff',
      textPrimary: isDark ? '#dfdfdf' : '#262626',
      textSecondary: isDark ? '#8e8e93' : '#808080',
      accentPrimary: p.accent,
      accentPrimaryContrast: p.onAccent,
      accentSecondary: isDark ? '#5e5ce6' : '#5856d6',
      accentSecondaryContrast: '#ffffff',
      error: p.error,
      errorContrast: '#ffffff',
      warning: isDark ? '#ff9f0a' : '#ff9500',
      warningContrast: '#ffffff',
      success: isDark ? '#30d158' : '#34c759',
      successContrast: '#ffffff',
      // The colors of the website itself
      mainSidebar: isDark ? '#262626' : '#e3e3e3',
      mainSidebarContrast: isDark ? '#dfdfdf' : '#262626',
      border: isDark ? '#3a3a3a' : '#d6d6d6',
      codeBackground: isDark ? '#1a1a1a' : '#f6f6f6',
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
      // The tooltips of macOS have no arrow and appear after a long hover
      Tooltip: { defaultProps: { enterDelay: 800 }, overrides: { Container: Tooltip } },
      Toast: { overrides: { Toast, Action } },
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

export default createMacosTheme;
