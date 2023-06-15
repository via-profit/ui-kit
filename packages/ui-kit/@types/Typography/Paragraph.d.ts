declare module '@via-profit/ui-kit/Typography/Paragraph' {
  export type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement> & {
    readonly ref?: React.ForwardedRef<HTMLParagraphElement>;
    /**
     * if `true` is passed, the margins will be removed
     */
    readonly noMargin?: boolean;
  };

  const Paragraph: React.ForwardRefRenderFunction<HTMLParagraphElement, ParagraphProps>;

  export default Paragraph;
}
