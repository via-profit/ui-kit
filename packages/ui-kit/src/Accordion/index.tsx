import * as React from 'react';

import Container, { AccordionContainerProps } from './AccordionContainer';
import Header, { AccordionHeaderProps } from './AccordionHeader';
import Content, { AccordionContentProps } from './AccordionContent';
import Actions, { AccordionActionsProps } from './AccordionActions';

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
   * This props ovveride default component open state
   */
  readonly isOpen?: boolean;

  /**
   * If `true` accordion will be opened by default
   */
  readonly defaultOpened?: boolean;

  /**
   * Callback function witch should open the accordion. You can forward your own function to make accordion controlled
   */
  readonly onOpen?: () => void;

  /**
   * If `true` initial padding of accorion content would be disabled
   */
  readonly noPadding?: boolean;
};

export interface AccordionOverrides {
  /**
   * Accordion container component
   */
  readonly Container?: React.ForwardRefExoticComponent<
    AccordionContainerProps & React.RefAttributes<HTMLDivElement>
  >;
  /**
   * Accordion header component
   */
  readonly Header?: React.ForwardRefExoticComponent<
    AccordionHeaderProps & React.RefAttributes<HTMLDivElement>
  >;
  /**
   * Accordion content component
   */
  readonly Content?: React.ForwardRefExoticComponent<
    AccordionContentProps & React.RefAttributes<HTMLDivElement>
  >;
  /**
   * Accordion footer component
   */
  readonly Actions?: React.ForwardRefExoticComponent<
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
  } = props;

  const hasActions = typeof actions !== 'undefined' && actions !== null;
  const hasHeader = typeof header !== 'undefined' && header !== null;
  const [opened, setOpened] = React.useState(
    typeof defaultOpened !== 'undefined' ? defaultOpened : false,
  );

  const overridesMap = React.useMemo(
    () => ({
      Container: overrides?.Container || Container,
      Header: overrides?.Header || Header,
      Content: overrides?.Content || Content,
      Actions: overrides?.Actions || Actions,
    }),
    [overrides],
  );

  if (!hasHeader) {
    console.warn(
      `[@via-profit/ui-kit] Accordion component. If you use a subheader, then you should add a header`,
    );
  }

  return (
    <overridesMap.Container {...nativeProps} ref={ref}>
      {hasHeader && (
        <overridesMap.Header
          isOpen={typeof isOpen !== 'undefined' ? isOpen : opened}
          onOpen={
            onOpen ? onOpen : () => setOpened(typeof isOpen !== 'undefined' ? !isOpen : !opened)
          }
        >
          {header}
        </overridesMap.Header>
      )}
      <overridesMap.Content
        noPadding={noPadding}
        isOpen={typeof isOpen !== 'undefined' ? isOpen : opened}
      >
        {children}
        {hasActions && <overridesMap.Actions noPadding={noPadding}>{actions}</overridesMap.Actions>}
      </overridesMap.Content>
    </overridesMap.Container>
  );
};

export default React.forwardRef(Accordion);
