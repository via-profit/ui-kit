/* eslint-disable import/max-dependencies */

import type { AccordionProps, AccordionOverrides } from '../Accordion';
import type { AvatarProps } from '../Avatar';
import type { AvatarBaseOverrides } from '../Avatar/AvatarBase';
import type { BadgeProps } from '../Badge';
import type { BadgeBaseOverrides } from '../Badge/BadgeBase';
import type { ButtonProps } from '../Button';
import type { ButtonBaseOverrides } from '../Button/ButtonBase';
import type { CalendarProps, CalendarOverrides } from '../Calendar/CalendarComponent';
import type { CheckboxProps, CheckboxOverrides } from '../Checkbox';
import type { HighlightedProps, HighlightedOverrides } from '../Highlighted';
import type { MenuProps, MenuOverrides } from '../Menu/MenuContainer';
import type { BaseModalProps, BaseModalOverrides } from '../Modal/BaseModal';
import type { DialogProps } from '../Modal/Dialog';
import type { DrawerProps, DrawerOverrides } from '../Modal/Drawer';
import type { ConfirmBoxProps, ConfirmBoxOverrides } from '../Modal/ConfirmBox';
import type { MessageBoxProps, MessageBoxOverrides } from '../Modal/MessageBox';
import type { PopperProps, PopperOverrides } from '../Popper/Popper';
import type { RadioProps, RadioOverrides } from '../Radio';
import type { RadioGroupProps, RadioGroupOverrides } from '../RadioGroup';
import type { SelectboxProps, SelectboxOverrides } from '../Selectbox';
import type { SliderProps, SliderOverrides } from '../Slider';
import type { SurfaceProps, SurfaceOverrides } from '../Surface';
import type { SwiperProps, SwiperOverrides } from '../Swiper/Swiper';
import type { SwitchProps, SwitchOverrides } from '../Switch';
import type { TabsProps } from '../Tabs';
import type { TextAreaProps, TextAreaOverrides } from '../TextArea';
import type { TextFieldProps, TextFieldOverrides } from '../TextField';
import type { ToastContainerProps, ToastOverrides } from '../Toast/ToastContainer';
import type { TooltipProps, TooltipOverrides } from '../Tooltip';

/* eslint-disable @typescript-eslint/ban-types */
export interface ThemeComponentConfig<Props, Overrides = {}> {
  /**
   * The props the component gets when they are not passed explicitly
   */
  readonly defaultProps?: Partial<Omit<Props, 'overrides' | 'children'>>;

  /**
   * The parts that replace the standard ones, usually `styled(StandardPart)`.
   * The `overrides` of the component instance win over them
   */
  readonly overrides?: Overrides;
}
/* eslint-enable @typescript-eslint/ban-types */

/**
 * The look of the components in the theme, by the component name
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UIThemeComponents {
  readonly Accordion?: ThemeComponentConfig<AccordionProps, AccordionOverrides>;
  readonly Avatar?: ThemeComponentConfig<AvatarProps, AvatarBaseOverrides>;
  readonly Badge?: ThemeComponentConfig<BadgeProps, BadgeBaseOverrides>;
  readonly Button?: ThemeComponentConfig<ButtonProps, ButtonBaseOverrides>;
  readonly Calendar?: ThemeComponentConfig<CalendarProps<any>, CalendarOverrides>;
  readonly Checkbox?: ThemeComponentConfig<CheckboxProps, CheckboxOverrides>;
  readonly Highlighted?: ThemeComponentConfig<HighlightedProps, HighlightedOverrides>;
  readonly Menu?: ThemeComponentConfig<MenuProps<any, any>, MenuOverrides>;

  /**
   * The parts of the base modal window. Dialog, Drawer, ConfirmBox and MessageBox pass their own parts:
   * set them in the config of these components
   */
  readonly Modal?: ThemeComponentConfig<BaseModalProps, BaseModalOverrides>;
  readonly Dialog?: ThemeComponentConfig<DialogProps, BaseModalOverrides>;
  readonly Drawer?: ThemeComponentConfig<DrawerProps, DrawerOverrides>;
  readonly ConfirmBox?: ThemeComponentConfig<ConfirmBoxProps, ConfirmBoxOverrides>;
  readonly MessageBox?: ThemeComponentConfig<MessageBoxProps, MessageBoxOverrides>;
  readonly Popper?: ThemeComponentConfig<PopperProps, PopperOverrides>;
  readonly Radio?: ThemeComponentConfig<RadioProps, RadioOverrides>;
  readonly RadioGroup?: ThemeComponentConfig<RadioGroupProps, RadioGroupOverrides>;

  readonly Selectbox?: ThemeComponentConfig<SelectboxProps<any, any>, SelectboxOverrides>;
  readonly Slider?: ThemeComponentConfig<SliderProps<any>, SliderOverrides>;
  readonly Surface?: ThemeComponentConfig<SurfaceProps, SurfaceOverrides>;
  readonly Swiper?: ThemeComponentConfig<SwiperProps, SwiperOverrides>;
  readonly Switch?: ThemeComponentConfig<SwitchProps, SwitchOverrides>;

  /**
   * The parts of the tabs are rendered by the user, so the theme sets only the `defaultProps`
   */
  readonly Tabs?: ThemeComponentConfig<TabsProps>;
  readonly TextArea?: ThemeComponentConfig<TextAreaProps, TextAreaOverrides>;
  readonly TextField?: ThemeComponentConfig<TextFieldProps, TextFieldOverrides>;
  readonly Toast?: ThemeComponentConfig<ToastContainerProps, ToastOverrides>;
  readonly Tooltip?: ThemeComponentConfig<TooltipProps, TooltipOverrides>;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export type ThemeComponentName = keyof UIThemeComponents;
