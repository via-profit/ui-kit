import React, { ButtonHTMLAttributes } from 'react';

import Menu, { MenuRef, Value, OnRequestClose, GetOptionSelected } from '../Menu';
import SelectboxItem from '../Menu/MenuItem';
import Button, { SelectboxButtonProps } from './SelectboxButton';
import Spinner from '../LoadingIndicator/Spinner';
import Icon, { SelectboxChevronIconProps } from './SelectboxChevronIcon';
import type { AnchorPos } from '../Popper';
import type { MenuItemCommonProps } from '../Menu/MenuItem';
import { mouseEventMap } from '../ClickOutside';
import Label, { TextFieldLabelProps } from '../TextField/TextFieldLabel';
import Asterisk, { TextFieldLabelAsteriskProps } from '../TextField/TextFieldLabelAsterisk';
import ErrorText, { TextFieldErrorTextProps } from '../TextField/TextFieldErrorText';
import ButtonWrapper, { SelectboxButtonWrapperProps } from './SelectboxButtonWrapper';
import Container, { SelectboxContainerProps } from './SelectboxContainer';

export { SelectboxItem };

export interface SelectboxProps<T, Multiple extends boolean | undefined = undefined>
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onChange' | 'children'> {
  /**
   * Array of values
   */
  readonly items: readonly T[];

  readonly value: Value<T, Multiple>;

  /**
   * Array of items. If will be array of objects or array of strings
   */
  readonly multiple?: Multiple;

  /**
   * Menu open state\
   * If `true` then menu is open, otherwise - closed
   */
  readonly isOpen?: boolean;

  /**
   * Loading indicator visiblility\
   * If `true` then visible, otherwise - hidden
   */
  /**
   * Anchor position\
   * \
   * Default: `auto-start-end`
   */
  readonly anchorPos?: AnchorPos;

  /**
   * Text field loading state\
   * If `true` then text field has been contained the loading indicator, otherwise - nop
   */
  readonly isLoading?: boolean;

  /**
   * If true then Selectbox will be filled in full width on horizontal
   */
  readonly fullWidth?: boolean;

  /**
   * If true then `errorText` value will be displayed under the TextField element
   */
  readonly error?: boolean;

  /**
   * If is true then the asterisk will be displayed in label\
   * If is ReactNode then ReactNode will be displayed in label
   */
  readonly requiredAsterisk?: boolean | React.ReactNode;

  /**
   * Text or ReactNode to show in error element\
   * Will be displaed only if `error` property is tru
   */
  readonly errorText?: React.ReactNode;

  /**
   * Field label text or element
   */
  readonly label?: React.ReactNode;

  /**
   * End icon component
   */
  readonly endIcon?: React.ReactElement;

  /**
   * Start icon component
   */
  readonly startIcon?: React.ReactElement;
  /**
   * items render function
   */
  readonly children: Children<T>;

  /**
   * The function that will be called when an item is selected from the list
   */
  readonly onChange?: OnChange<T, Multiple>;

  /**
   * A function that transforms the selected item into a string
   * Example:
   * ```tsx
   * <Selectbox
   *   selectedItemToString={item => item.name} // item is {id: 1, name: 'Oleg'}
   *   ...
   * >
   *   ...
   * </Selectbox>
   * ```
   */
  readonly selectedItemToString: ItemToString<T, Multiple>;

  /**
   * A function that determines which of the elements is currently selected\
   * Example:
   * ```tsx
   * <Selectbox
   *   getOptionSelected={({ item, value }) => item.id === value.id}
   * >
   *   ...
   * </Selectbox>
   * ```
   */
  readonly getOptionSelected?: GetOptionSelected<T>;

  /**
   * The function that will be called at the moment when you want to close the selectbox
   */
  readonly onRequestClose?: OnRequestClose;

  /**
   * The function that will be called at the moment when you want to open the selectbox
   */
  readonly onRequestOpen?: (
    event:
      | React.KeyboardEvent<HTMLElement>
      | React.MouseEvent<HTMLElement>
      | React.FocusEvent<HTMLInputElement, Element>
      | React.ChangeEvent<HTMLInputElement>,
  ) => void;

  /**
   * Еhe label that will be shown if there are no selected items
   */
  readonly notSetLabel?: string;

  /**
   * Overridable components map
   */
  readonly overrides?: SelectboxOverrides;
}

export interface SelectboxOverrides {
  /**
   * Container element
   */
  readonly Container?: React.ForwardRefExoticComponent<
    SelectboxContainerProps & React.RefAttributes<HTMLDivElement>
  >;
  /**
   * Base element
   */
  readonly Button?: React.ForwardRefExoticComponent<
    SelectboxButtonProps & React.RefAttributes<HTMLButtonElement>
  >;

  /**
   * Icon
   */
  readonly Icon?: React.ForwardRefExoticComponent<
    SelectboxChevronIconProps & React.RefAttributes<SVGElement>
  >;

  /**
   * Component for display error text
   */
  readonly ErrorText?: React.ForwardRefExoticComponent<
    TextFieldErrorTextProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * label component
   */
  readonly Label?: React.ForwardRefExoticComponent<
    TextFieldLabelProps & React.RefAttributes<HTMLLabelElement>
  >;

  /**
   * label asterisk component
   */
  readonly Asterisk?: React.ForwardRefExoticComponent<
    TextFieldLabelAsteriskProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * button wrapper component
   */
  readonly ButtonWrapper?: React.ForwardRefExoticComponent<
    SelectboxButtonWrapperProps & React.RefAttributes<HTMLDivElement>
  >;
}

export type Children<T> = (
  data: {
    item: T;
    index: number;
  },
  itemProps: MenuItemCommonProps,
) => React.ReactNode;

export type ItemToString<T, Multiple extends boolean | undefined = undefined> = (
  item: Multiple extends undefined ? T : readonly T[],
) => string;

export type OnChange<T, Multiple extends boolean | undefined = undefined> = (
  item: Value<T, Multiple>,
) => void;

const Selectbox = React.forwardRef(
  <T, Multiple extends boolean | undefined = undefined>(
    props: SelectboxProps<T, Multiple>,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const {
      items,
      value,
      multiple,
      isOpen = false,
      isLoading = false,
      anchorPos = 'auto-start-end',
      fullWidth = false,
      children,
      onChange,
      selectedItemToString,
      getOptionSelected,
      onRequestOpen = () => undefined,
      onRequestClose = () => undefined,
      overrides,
      id,
      label,
      onFocus,
      requiredAsterisk,
      error,
      errorText,
      notSetLabel = 'Not set',
      ...nativeButtonProps
    } = props;
    const menuRef = React.useRef<MenuRef | null>(null);
    const overridesMap = React.useMemo(
      () => ({
        Button: overrides?.Button || Button,
        Icon: overrides?.Icon || Icon,
        Label: overrides?.Label || Label,
        Asterisk: overrides?.Asterisk || Asterisk,
        ErrorText: overrides?.ErrorText || ErrorText,
        ButtonWrapper: overrides?.ButtonWrapper || ButtonWrapper,
        Container: overrides?.Container || Container,
      }),
      [overrides],
    );
    const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>(null);

    React.useEffect(() => {
      if (isOpen && menuRef.current) {
        menuRef.current.scrollToFirstSelected();
      }
    }, [isOpen]);

    React.useEffect(() => {
      const mouseDownEvent = (event: MouseEvent) => {
        let parentElem = event.target as Node;
        let needToClose = true;

        while (parentElem && 'parentNode' in parentElem) {
          if (parentElem === anchorElement || parentElem === menuRef.current?.getListElement()) {
            needToClose = false;
            break;
          }
          parentElem = parentElem.parentNode as Node;
        }

        if (needToClose) {
          onRequestClose(event);
        }
      };

      window.document.addEventListener(mouseEventMap.onMouseDown, mouseDownEvent);

      return () => {
        window.document.removeEventListener(mouseEventMap.onMouseDown, mouseDownEvent);
      };
    }, [onRequestClose, anchorElement]);

    const renderValueAsString = React.useCallback(() => {
      if ((!multiple && !value) || (multiple && (value as readonly T[]).length === 0)) {
        return notSetLabel;
      }

      return selectedItemToString(value as Multiple extends undefined ? T : readonly T[]);
    }, [multiple, selectedItemToString, value, notSetLabel]);

    const inputID = React.useMemo(() => {
      if (typeof id === 'string') {
        return id;
      }

      const u = Date.now().toString(16) + Math.random().toString(16) + '0'.repeat(16);
      const guid = [
        u.substring(0, 8),
        u.substring(8, 12),
        '4000-8' + u.substring(13, 16),
        u.substring(16, 28),
      ].join('-');

      return guid;
    }, [id]);

    return (
      <overridesMap.Container>
        {typeof label !== 'undefined' && label !== null && (
          <overridesMap.Label htmlFor={inputID} error={error}>
            {label}
            {typeof requiredAsterisk !== 'undefined' && requiredAsterisk !== null && (
              <overridesMap.Asterisk>
                {typeof requiredAsterisk === 'boolean' ? '*' : requiredAsterisk}
              </overridesMap.Asterisk>
            )}
          </overridesMap.Label>
        )}
        <overridesMap.ButtonWrapper fullWidth={fullWidth} error={error}>
          <overridesMap.Button
            fullWidth={fullWidth}
            error={error}
            endIcon={isLoading ? <Spinner /> : <overridesMap.Icon isOpen={isOpen} />}
            onClick={event => {
              if (isOpen) {
                onRequestClose(event);
              } else {
                onRequestOpen(event);
              }

              if (typeof nativeButtonProps.onClick === 'function') {
                nativeButtonProps.onClick(event);
              }
            }}
            {...nativeButtonProps}
            ref={el => {
              if (anchorElement !== el) {
                setAnchorElement(el);
              }
              if (typeof ref === 'function') {
                ref(el);
              }
              if (ref && typeof ref === 'object') {
                ref.current = el;
              }
            }}
          >
            {renderValueAsString()}
          </overridesMap.Button>
        </overridesMap.ButtonWrapper>
        <overridesMap.ErrorText error={error}>{errorText}</overridesMap.ErrorText>
        {React.useMemo(
          () => (
            <Menu
              ref={menuRef}
              anchorPos={anchorPos}
              multiple={multiple}
              items={items as T[]}
              value={value as Value<T, Multiple>}
              isOpen={isOpen && items.length > 0}
              autofocus
              anchorElement={anchorElement}
              closeOutsideClick={false}
              getOptionSelected={getOptionSelected}
              onSelectItem={item => {
                if (typeof onChange === 'function') {
                  onChange(item);
                }
              }}
              closeOnSelect={multiple ? false : true}
              onRequestClose={evt => {
                if (evt?.target !== anchorElement) {
                  onRequestClose(evt);
                  anchorElement?.focus();
                }
              }}
            >
              {({ index, item }, itemProps) => children({ index, item: item as T }, itemProps)}
            </Menu>
          ),
          [
            items,
            anchorPos,
            multiple,
            value,
            isOpen,
            getOptionSelected,
            onChange,
            onRequestClose,
            children,
            anchorElement,
          ],
        )}
      </overridesMap.Container>
    );
  },
);

Selectbox.displayName = 'Selectbox';

export default Selectbox as <T, Multiple extends boolean | undefined = undefined>(
  props: SelectboxProps<T, Multiple> & { ref?: React.ForwardedRef<HTMLButtonElement> },
) => JSX.Element;
