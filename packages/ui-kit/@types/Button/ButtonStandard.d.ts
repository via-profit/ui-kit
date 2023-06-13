declare module '@via-profit/ui-kit/Button/ButtonStandard' {
  import '@via-profit/ui-kit';

  import { ButtonBaseProps } from '@via-profit/ui-kit/Button/ButtonBase';

  export type ButtonStandardProps = ButtonBaseProps;

  const ButtonStandard: React.FC<ButtonStandardProps>;

  export default ButtonStandard;
}
