import * as React from 'react';

import Container, { AccordionContainerProps } from './AccordionContainer';
import Header, { AccordionHeaderProps } from './AccordionHeader';
import Content, { AccordionContentProps } from './AccordionContent';
import Actions, { AccordionActionsProps } from './AccordionActions';
import useThemeProps from '../ThemeProvider/useThemeProps';

export type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly children: React.ReactNode | React.ReactNode[];

  /**
   * Header content
   */
  readonly header?: JSX.Element | string;

  /**
   * Actions content
   */
  readonly actions?: JSX.Element | string;

  /**
   * Overridable components map
   */
  readonly overrides?: AccordionOverrides;

  /**
   * The state of the controlled accordion. Pass it together with `onOpen`
   */
  readonly isOpen?: boolean;

  /**
   * The initial state of the uncontrolled accordion
   * Default: false
   */
  readonly defaultOpened?: boolean;

  /**
   * Called when the user clicks the header, both to open and to close the accordion.\
   * Receives the next state: `true` - should be opened, `false` - should be closed
   */
  readonly onOpen?: (isOpen: boolean) => void;

  /**
   * If `true` initial padding of accorion content would be disabled
   */
  readonly noPadding?: boolean;
};

export interface AccordionOverrides {
  /**
   * Accordion container component
   */
  readonly Container?: React.ComponentType<
    AccordionContainerProps & React.RefAttributes<HTMLDivElement>
  >;
  /**
   * Accordion header component
   */
  readonly Header?: React.ComponentType<AccordionHeaderProps & React.RefAttributes<HTMLDivElement>>;
  /**
   * Accordion content component
   */
  readonly Content?: React.ComponentType<
    AccordionContentProps & React.RefAttributes<HTMLDivElement>
  >;
  /**
   * Accordion footer component
   */
  readonly Actions?: React.ComponentType<
    AccordionActionsProps & React.RefAttributes<HTMLDivElement>
  >;
}

const Accordion: React.ForwardRefRenderFunction<HTMLDivElement, AccordionProps> = (props, ref) => {
  const {
    children,
    header,
    actions,
    isOpen,
    onOpen,
    overrides,
    noPadding,
    defaultOpened,
    ...nativeProps
  } = useThemeProps('Accordion', props);

  const hasActions = typeof actions !== 'undefined' && actions !== null;
  const hasHeader = typeof header !== 'undefined' && header !== null;
  const [internalOpened, setInternalOpened] = React.useState(Boolean(defaultOpened));
  const isControlled = typeof isOpen !== 'undefined';
  const opened = isControlled ? Boolean(isOpen) : internalOpened;
  const id = React.useId().replace(/:/g, '');
  const headerID = `accordion-${id}-header`;
  const contentID = `accordion-${id}-content`;

  const overridesMap = React.useMemo(
    () => ({
      Container: overrides?.Container || Container,
      Header: overrides?.Header || Header,
      Content: overrides?.Content || Content,
      Actions: overrides?.Actions || Actions,
    }),
    [overrides],
  );

  // Warn once, not on every render
  React.useEffect(() => {
    if (!hasHeader) {
      console.warn(
        '[@via-profit/ui-kit] Accordion component. The accordion without the «header» can not be opened by the user',
      );
    }
  }, [hasHeader]);

  // In the uncontrolled mode the own state is updated even when onOpen is passed
  const handleToggle = () => {
    if (!isControlled) {
      setInternalOpened(!opened);
    }

    onOpen?.(!opened);
  };

  return (
    <overridesMap.Container {...nativeProps} ref={ref}>
      {hasHeader && (
        <overridesMap.Header
          isOpen={opened}
          onOpen={handleToggle}
          headerID={headerID}
          contentID={contentID}
        >
          {header}
        </overridesMap.Header>
      )}
      <overridesMap.Content
        id={contentID}
        aria-labelledby={hasHeader ? headerID : undefined}
        noPadding={noPadding}
        isOpen={opened}
      >
        {children}
        {hasActions && <overridesMap.Actions noPadding={noPadding}>{actions}</overridesMap.Actions>}
      </overridesMap.Content>
    </overridesMap.Container>
  );
};

export default React.forwardRef(Accordion);
