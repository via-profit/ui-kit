import * as React from 'react';
import type { SurfaceProps } from '@via-profit/ui-kit/Surface';

import SurfaceContainer from './SurfaceContainer';
import SurfaceHeader from './SurfaceHeader';
import SurfaceSubheader from './SurfaceSubheader';
import SurfaceContent from './SurfaceContent';

const Surface: React.ForwardRefRenderFunction<HTMLDivElement, SurfaceProps> = (props, ref) => {
  const { children, header, subheader, ...restProps } = props;

  const hasHeader = typeof header !== 'undefined' && header !== null;
  const hasSubheader = typeof subheader !== 'undefined' && subheader !== null;

  if (!hasHeader && hasSubheader) {
    console.warn(
      `[@via-profit/ui-kit] Surface component. If you use a subheader, then you should add a header`,
    );
  }

  return (
    <SurfaceContainer {...restProps} ref={ref}>
      {hasHeader && <SurfaceHeader>{header}</SurfaceHeader>}
      {hasSubheader && <SurfaceSubheader>{subheader}</SurfaceSubheader>}
      <SurfaceContent>{children}</SurfaceContent>
    </SurfaceContainer>
  );
};

export default React.forwardRef(Surface);
