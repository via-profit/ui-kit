import React from 'react';

import Container, { EmptyStateContainerProps } from './EmptyStateContainer';
import Icon, { EmptyStateIconProps } from './EmptyStateIcon';
import Title, { EmptyStateTitleProps } from './EmptyStateTitle';
import Content, { EmptyStateContentProps } from './EmptyStateContent';
import Action, { EmptyStateActionProps } from './EmptyStateAction';

export type EmptyStateProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & {
  /**
   * The short line: what is empty («Заявок нет»)
   */
  readonly title?: React.ReactNode;

  /**
   * The explanation: why it is empty and what to do
   */
  readonly children?: React.ReactNode;

  /**
   * The next step: one or two buttons
   */
  readonly action?: React.ReactNode;

  /**
   * Replaces the empty box. `false` — no illustration
   */
  readonly icon?: React.ReactNode;

  /**
   * Takes the whole height of the parent and stands in its middle
   * Default: false
   */
  readonly fullHeight?: boolean;

  readonly overrides?: EmptyStateOverrides;
};

export interface EmptyStateOverrides {
  /**
   * The column in the middle; gets `fullHeight`
   */
  readonly Container?: React.ComponentType<
    EmptyStateContainerProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * The illustration; the own one from `icon` comes in `children`
   */
  readonly Icon?: React.ComponentType<EmptyStateIconProps & React.RefAttributes<HTMLSpanElement>>;

  /**
   * The title. Rendered only with `title`
   */
  readonly Title?: React.ComponentType<EmptyStateTitleProps & React.RefAttributes<HTMLDivElement>>;

  /**
   * The explanation. Rendered only with `children`
   */
  readonly Content?: React.ComponentType<
    EmptyStateContentProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * The buttons. Rendered only with `action`
   */
  readonly Action?: React.ComponentType<
    EmptyStateActionProps & React.RefAttributes<HTMLDivElement>
  >;
}

/**
 * The empty list, the nothing found, the not chosen yet: the illustration, what is empty
 * and what to do next
 */
const EmptyState: React.ForwardRefRenderFunction<HTMLDivElement, EmptyStateProps> = (
  props,
  ref,
) => {
  const { title, children, action, icon, fullHeight = false, overrides, ...nativeProps } = props;

  const overridesMap = React.useMemo(
    () => ({
      Container: overrides?.Container || Container,
      Icon: overrides?.Icon || Icon,
      Title: overrides?.Title || Title,
      Content: overrides?.Content || Content,
      Action: overrides?.Action || Action,
    }),
    [overrides],
  );

  return (
    <overridesMap.Container {...nativeProps} fullHeight={fullHeight} ref={ref}>
      {icon !== false && <overridesMap.Icon>{icon}</overridesMap.Icon>}
      {title && <overridesMap.Title>{title}</overridesMap.Title>}
      {children && <overridesMap.Content>{children}</overridesMap.Content>}
      {action && <overridesMap.Action>{action}</overridesMap.Action>}
    </overridesMap.Container>
  );
};

export * from './EmptyStateContainer';
export * from './EmptyStateIcon';
export * from './EmptyStateTitle';
export * from './EmptyStateContent';
export * from './EmptyStateAction';

export default React.forwardRef(EmptyState);
