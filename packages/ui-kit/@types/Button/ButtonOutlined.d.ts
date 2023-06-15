declare module '@via-profit/ui-kit/Button/ButtonOutlined' {
  import { ButtonBaseProps } from '@via-profit/ui-kit/Button/ButtonBase';

  export type ButtonOutlinedProps = ButtonBaseProps;

  const ButtonOutlined: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonOutlinedProps>;

  export default ButtonOutlined;
}
