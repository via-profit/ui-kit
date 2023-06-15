declare module '@via-profit/ui-kit/Surface' {
  export type SurfaceProps = React.HTMLAttributes<HTMLDivElement> & {
    readonly ref?: React.ForwardedRef<HTMLDivElement>;
    readonly children: React.ReactNode | React.ReactNode[];

    /**
     * Header content
     */
    readonly header?: React.ReactNode;

    /**
     * Subheader content
     */
    readonly subheader?: React.ReactNode;
  };

  const Surface: React.ForwardRefRenderFunction<HTMLButtonElement, SurfaceProps>;

  export default Surface;
}
