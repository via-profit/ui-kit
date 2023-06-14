declare module '@via-profit/ui-kit/Button' {
  import { ButtonAccentProps } from '@via-profit/ui-kit/Button/ButtonAccent';
  import { ButtonStandardProps } from '@via-profit/ui-kit/Button/ButtonStandard';

  export interface BaseProps {
    readonly variant?: 'standard' | 'accent';
  }

  export type ButtonProps = (ButtonStandardProps | ButtonAccentProps) & BaseProps;

  const Button: React.FC<ButtonProps>;

  export default Button;
}
