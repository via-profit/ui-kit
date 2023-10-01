import * as React from 'react';

import Container, { SurfaceContainerProps } from './SurfaceContainer';
import Header, { SurfaceHeaderProps } from './SurfaceHeader';
import Subheader, { SurfaceSubheaderProps } from './SurfaceSubheader';
import Content, { SurfaceContentProps } from './SurfaceContent';

export type SurfaceProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly children: React.ReactNode | React.ReactNode[];

  /**
   * Header content
   */
  readonly header?: JSX.Element | string;

  /**
   * Subheader content
   */
  readonly subheader?: JSX.Element | string;

  /**
   * If true then surface will be inline-flex element, and the flex otherwise
   */
  readonly inline?: boolean;

  /**
   * Overridable components map
   */
  readonly overrides?: SurfaceOverrides;
};

export interface SurfaceOverrides {
  /**
   * Surface container component
   */
  readonly Container?: React.ForwardRefExoticComponent<
    SurfaceContainerProps & React.RefAttributes<HTMLDivElement>
  >;
  /**
   * Surface header component
   */
  readonly Header?: React.ForwardRefExoticComponent<
    SurfaceHeaderProps & React.RefAttributes<HTMLDivElement>
  >;
  /**
   * Surface subheader component
   */
  readonly Subheader?: React.ForwardRefExoticComponent<
    SurfaceSubheaderProps & React.RefAttributes<HTMLDivElement>
  >;
  /**
   * Surface content component
   */
  readonly Content?: React.ForwardRefExoticComponent<
    SurfaceContentProps & React.RefAttributes<HTMLDivElement>
  >;
}

const Surface: React.ForwardRefRenderFunction<HTMLDivElement, SurfaceProps> = (props, ref) => {
  const { children, header, subheader, inline, overrides, ...nativeProps } = props;

  const hasHeader = typeof header !== 'undefined' && header !== null;
  const hasSubheader = typeof subheader !== 'undefined' && subheader !== null;

  const overridesMap = React.useMemo(
    () => ({
      Container,
      Header,
      Subheader,
      Content,
      ...overrides,
    }),
    [overrides],
  );

  if (!hasHeader && hasSubheader) {
    console.warn(
      `[@via-profit/ui-kit] Surface component. If you use a subheader, then you should add a header`,
    );
  }

  return (
    <overridesMap.Container {...nativeProps} inline={inline} ref={ref}>
      {hasHeader && <overridesMap.Header>{header}</overridesMap.Header>}
      {hasSubheader && <overridesMap.Subheader>{subheader}</overridesMap.Subheader>}
      <overridesMap.Content>{children}</overridesMap.Content>
    </overridesMap.Container>
  );
};

export default React.forwardRef(Surface);
