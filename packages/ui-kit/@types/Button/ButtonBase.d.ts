declare module '@via-profit/ui-kit/Button/ButtonBase' {
  type ButtonNativeProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

  export interface ButtonBaseProps extends Omit<ButtonNativeProps, 'color'> {
    readonly ref?: React.ForwardedRef<HTMLButtonElement>;
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

    /**
     * You can pass the primary, default, secondary name of the colors or your specified color value
     */
    readonly color?: 'default' | 'primary' | 'secondary' | string;
  }

  const ButtonBase: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonBaseProps>;

  export default ButtonBase;
}
