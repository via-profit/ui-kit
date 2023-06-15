declare module '@via-profit/ui-kit/Surface' {
  export type SurfaceProps = React.HTMLAttributes<HTMLDivElement> & {
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

  const Surface: React.FC<SurfaceProps>;

  export default Surface;
}
