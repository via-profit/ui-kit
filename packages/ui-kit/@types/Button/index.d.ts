declare module '@via-profit/ui-kit/Button' {
  import { ButtonAccentProps } from '@via-profit/ui-kit/Button/ButtonAccent';
  import { ButtonStandardProps } from '@via-profit/ui-kit/Button/ButtonStandard';
  import { ButtonOutlinedProps } from '@via-profit/ui-kit/Button/ButtonOutlined';

  export interface BaseProps {
    /**
     * Button style variant\
     * Allowed variants: `standard`, `accent` or `outlined`\
     * \
     * **Default**: `standard`
     */
    readonly variant?: 'standard' | 'accent' | 'outlined';
  }

  export type ButtonProps = (ButtonStandardProps | ButtonAccentProps | ButtonOutlinedProps) &
    BaseProps;

  const Button: React.FC<ButtonProps>;

  export default Button;
}
