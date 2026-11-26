import React from 'react';

import Container, { InfoNoteContainerProps } from './InfoNoteContainer';
import Icon, { InfoNoteIconProps } from './InfoNoteIcon';
import Title, { InfoNoteTitleProps } from './InfoNoteTitle';
import Content, { InfoNoteContentProps } from './InfoNoteContent';

/**
 * `info` — what is important to know, `success` — what is done, `warning` — where it is easy
 * to make a mistake, `error` — what went wrong
 */
export type InfoNoteVariant = 'info' | 'success' | 'warning' | 'error';

export type InfoNoteProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & {
  /**
   * Default: `info`
   */
  readonly variant?: InfoNoteVariant;

  /**
   * The short first line in bold
   */
  readonly title?: React.ReactNode;

  /**
   * Replaces the icon of the variant. `false` — no icon
   */
  readonly icon?: React.ReactNode;

  readonly children?: React.ReactNode;

  readonly overrides?: InfoNoteOverrides;
};

export interface InfoNoteOverrides {
  /**
   * The block: the colored border and the background
   */
  readonly Container?: React.ComponentType<
    InfoNoteContainerProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * The icon of the variant
   */
  readonly Icon?: React.ComponentType<InfoNoteIconProps & React.RefAttributes<HTMLSpanElement>>;

  /**
   * The title. Rendered only with `title`
   */
  readonly Title?: React.ComponentType<InfoNoteTitleProps & React.RefAttributes<HTMLDivElement>>;

  /**
   * The title and the text, to the right of the icon
   */
  readonly Content?: React.ComponentType<
    InfoNoteContentProps & React.RefAttributes<HTMLDivElement>
  >;
}

/**
 * The short text in the form or the card which must be seen right here, without a click:
 * «only the completed orders get into the revision». The longer explanation which is needed
 * sometimes goes into HintPopover
 */
const InfoNote: React.ForwardRefRenderFunction<HTMLDivElement, InfoNoteProps> = (props, ref) => {
  const { variant = 'info', title, icon, children, overrides, ...nativeProps } = props;

  const overridesMap = React.useMemo(
    () => ({
      Container: overrides?.Container || Container,
      Icon: overrides?.Icon || Icon,
      Title: overrides?.Title || Title,
      Content: overrides?.Content || Content,
    }),
    [overrides],
  );

  return (
    <overridesMap.Container role="note" {...nativeProps} variant={variant} ref={ref}>
      {icon !== false && <overridesMap.Icon variant={variant}>{icon}</overridesMap.Icon>}
      <overridesMap.Content>
        {title && <overridesMap.Title>{title}</overridesMap.Title>}
        {children}
      </overridesMap.Content>
    </overridesMap.Container>
  );
};

export * from './InfoNoteContainer';
export * from './InfoNoteIcon';
export * from './InfoNoteTitle';
export * from './InfoNoteContent';

export default React.forwardRef(InfoNote);
