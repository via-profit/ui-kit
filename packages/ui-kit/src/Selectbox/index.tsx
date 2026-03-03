import * as React from 'react';

import { GetOptionSelected, MenuRef, OnRequestClose, Value } from '../Menu';
import type { MenuItemCommonProps } from '../Menu/MenuItem';
import SelectboxItem from '../Menu/MenuItem';
import Button, { SelectboxButtonProps } from './SelectboxButton';
import Spinner from '../LoadingIndicator/Spinner';
import Icon, { SelectboxChevronIconProps } from './SelectboxChevronIcon';
import { AnchorPos } from '../Popper';
import { mouseEventMap } from '../ClickOutside';
import Label, { TextFieldLabelProps } from '../TextField/TextFieldLabel';
import Asterisk, { TextFieldLabelAsteriskProps } from '../TextField/TextFieldLabelAsterisk';
import ErrorText, { TextFieldErrorTextProps } from '../TextField/TextFieldErrorText';
import ButtonWrapper, { SelectboxButtonWrapperProps } from './SelectboxButtonWrapper';
import Container, { SelectboxContainerProps } from './SelectboxContainer';
import SelectboxMenu from './SelectboxMenu';

export { SelectboxItem };
export interface SelectboxProps<T, Multiple extends boolean | undefined = undefined>
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onChange' | 'children'> {
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
   * Default: `bottom`
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
  readonly Container?: React.ComponentType<
    SelectboxContainerProps & React.RefAttributes<HTMLDivElement>
  >;
  /**
   * Base element
   */
  readonly Button?: React.ComponentType<
    SelectboxButtonProps & React.RefAttributes<HTMLButtonElement>
  >;

  /**
   * Icon
   */
  readonly Icon?: React.ComponentType<SelectboxChevronIconProps & React.RefAttributes<SVGElement>>;

  /**
   * Component for display error text
   */
  readonly ErrorText?: React.ComponentType<
    TextFieldErrorTextProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * label component
   */
  readonly Label?: React.ComponentType<TextFieldLabelProps & React.RefAttributes<HTMLLabelElement>>;

  /**
   * label asterisk component
   */
  readonly Asterisk?: React.ComponentType<
    TextFieldLabelAsteriskProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * button wrapper component
   */
  readonly ButtonWrapper?: React.ComponentType<
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

const DEFAULT_OVERRIDES = {
  Button,
  Icon,
  Label,
  Asterisk,
  ErrorText,
  ButtonWrapper,
  Container,
} as const;

const generateGuid = (): string => {
  const u = Date.now().toString(16) + Math.random().toString(16) + '0'.repeat(16);

  return [
    u.substring(0, 8),
    u.substring(8, 12),
    '4000-8' + u.substring(13, 16),
    u.substring(16, 28),
  ].join('-');
};

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
      anchorPos = 'bottom-fill',
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
    const [actualPlacement, setActualPlacement] = React.useState(anchorPos);
    const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>(null);

    const overridesMap = React.useMemo(
      () => ({
        ...DEFAULT_OVERRIDES,
        ...overrides,
      }),
      [overrides],
    );

    const inputID = React.useMemo(() => {
      if (typeof id === 'string') {
        return id;
      }

      return generateGuid();
    }, [id]);

    React.useEffect(() => {
      if (isOpen && menuRef.current) {
        menuRef.current.scrollToFirstSelected();
      }
    }, [isOpen]);

    const renderValueAsString = React.useCallback(() => {
      if ((!multiple && !value) || (multiple && (value as readonly T[]).length === 0)) {
        return notSetLabel;
      }

      return selectedItemToString(value as Multiple extends undefined ? T : readonly T[]);
    }, [multiple, selectedItemToString, value, notSetLabel]);

    const handleButtonClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isOpen) {
          onRequestClose(event);
        } else {
          onRequestOpen(event);
        }
        nativeButtonProps.onClick?.(event);
      },
      [isOpen, nativeButtonProps, onRequestClose, onRequestOpen],
    );

    const setRefs = React.useCallback(
      (el: HTMLButtonElement | null) => {
        if (anchorElement !== el) {
          setAnchorElement(el);
        }
        if (typeof ref === 'function') {
          ref(el);
        } else if (ref) {
          ref.current = el;
        }
      },
      [anchorElement, ref],
    );

    const handleMouseDown = React.useCallback(
      (event: MouseEvent) => {
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
      },
      [onRequestClose, anchorElement],
    );

    React.useEffect(() => {
      window.document.addEventListener(mouseEventMap.onMouseDown, handleMouseDown);

      return () => {
        window.document.removeEventListener(mouseEventMap.onMouseDown, handleMouseDown);
      };
    }, [handleMouseDown]);

    const buttonProps = React.useMemo(
      () => ({
        fullWidth,
        error,
        isOpen,
        anchorPos: actualPlacement,
        endIcon: isLoading ? <Spinner /> : <overridesMap.Icon isOpen={isOpen} />,
        ...nativeButtonProps,
      }),
      [fullWidth, error, isOpen, actualPlacement, isLoading, overridesMap, nativeButtonProps],
    );

    const labelProps = React.useMemo(
      () => ({
        htmlFor: inputID,
        error,
      }),
      [inputID, error],
    );

    if (!items?.length && !isLoading) {
      return null;
    }

    return (
      <overridesMap.Container>
        {label != null && (
          <overridesMap.Label {...labelProps}>
            {label}
            {requiredAsterisk != null && (
              <overridesMap.Asterisk>
                {typeof requiredAsterisk === 'boolean' ? '*' : requiredAsterisk}
              </overridesMap.Asterisk>
            )}
          </overridesMap.Label>
        )}
        <overridesMap.ButtonWrapper fullWidth={fullWidth} error={error} isOpen={isOpen}>
          <overridesMap.Button {...buttonProps} onClick={handleButtonClick} ref={setRefs}>
            {renderValueAsString()}
          </overridesMap.Button>
        </overridesMap.ButtonWrapper>
        <overridesMap.ErrorText error={error}>{errorText}</overridesMap.ErrorText>

        <SelectboxMenu
          actualPlacement={actualPlacement}
          multiple={multiple}
          items={items}
          value={value}
          isOpen={isOpen}
          anchorElement={anchorElement}
          getOptionSelected={getOptionSelected}
          onChange={onChange}
          onRequestClose={onRequestClose}
          onAnchorPosChanged={setActualPlacement}
          ref={menuRef}
        >
          {children}
        </SelectboxMenu>
      </overridesMap.Container>
    );
  },
);

Selectbox.displayName = 'Selectbox';

export default Selectbox as <T, Multiple extends boolean | undefined = undefined>(
  props: SelectboxProps<T, Multiple> & { ref?: React.ForwardedRef<HTMLButtonElement> },
) => JSX.Element;
