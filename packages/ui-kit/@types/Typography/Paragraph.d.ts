declare module '@via-profit/ui-kit/Typography/Paragraph' {
  export type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement> & {
    /**
     * if `true` is passed, the margins will be removed
     */
    readonly noMargin?: boolean;
  };

  const Paragraph: React.FC<ParagraphProps>;

  export default Paragraph;
}
