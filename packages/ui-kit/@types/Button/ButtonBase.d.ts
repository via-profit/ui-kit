declare module '@via-profit/ui-kit/Button/ButtonBase' {
  import '@via-profit/ui-kit';

  export interface ButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    readonly startIcon?: JSX.Element;
    readonly endIcon?: JSX.Element;
  }

  const ButtonBase: React.FC<ButtonBaseProps>;

  export default ButtonBase;
}
