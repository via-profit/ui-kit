declare module '@via-profit/ui-kit/Button/ButtonBase' {
  export interface ButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Icon or another JSX element placed before button label\
     * Example:
     * ```tsx
     * <Button startIcon={<MyIconElement />}>
     *   Label
     * </Button>
     * ```
     */
    readonly startIcon?: JSX.Element;

    /**
     * Icon or another JSX element placed after button label
     * Example:
     * ```tsx
     * <Button endIcon={<MyIconElement />}>
     *   Label
     * </Button>
     * ```
     */
    readonly endIcon?: JSX.Element;
  }

  const ButtonBase: React.FC<ButtonBaseProps>;

  export default ButtonBase;
}
