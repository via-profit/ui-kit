declare module '@via-profit/ui-kit/Button/ButtonStandard' {
  import { ButtonBaseProps } from '@via-profit/ui-kit/Button/ButtonBase';

  export type ButtonStandardProps = ButtonBaseProps;

  const ButtonStandard: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonStandardProps>;

  export default ButtonStandard;
}
