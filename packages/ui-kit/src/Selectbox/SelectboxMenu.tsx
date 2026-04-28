import * as React from 'react';

import Menu, { MenuProps, MenuRef, OnRequestClose, Value } from '../Menu';
import { OnChange } from 'Selectbox';

export interface SelectbosMenuProps<T, Multiple extends boolean | undefined = undefined>
  extends MenuProps<T, Multiple> {
  readonly onChange?: OnChange<T, Multiple>;
}

const SelectboxMenu = React.forwardRef(
  <T, Multiple extends boolean | undefined = undefined>(
    props: SelectbosMenuProps<T, Multiple>,
    ref: React.ForwardedRef<MenuRef>,
  ) => {
    const {
      multiple,
      items,
      value,
      isOpen,
      anchorPos,
      anchorElement,
      getOptionSelected,
      onChange,
      onRequestClose,
      children,
      ...restMenuProps
    } = props;
    const handleSelectItem = React.useCallback(
      (item: Value<T, Multiple>) => {
        onChange?.(item);
      },
      [onChange],
    );

    const handleRequestClose: OnRequestClose = React.useCallback(
      evt => {
        if (evt?.target !== anchorElement) {
          if (onRequestClose) {
            onRequestClose(evt);
          }
          anchorElement?.focus();
        }
      },
      [onRequestClose, anchorElement],
    );

    return (
      <Menu
        ref={ref}
        offset={0}
        anchorPos={anchorPos}
        multiple={multiple}
        items={items as T[]}
        value={value}
        isOpen={isOpen && items.length > 0}
        autofocus
        anchorElement={anchorElement}
        closeOutsideClick={false}
        getOptionSelected={getOptionSelected}
        onSelectItem={handleSelectItem}
        closeOnSelect={!multiple}
        onRequestClose={handleRequestClose}
        {...restMenuProps}
      >
        {({ index, item }, itemProps) => children({ index, item: item as T }, itemProps)}
      </Menu>
    );
  },
);
SelectboxMenu.displayName = 'SelectboxMenu';

export default React.memo(SelectboxMenu) as <T, Multiple extends boolean | undefined = undefined>(
  props: SelectbosMenuProps<T, Multiple> & { ref?: React.Ref<MenuRef> },
) => JSX.Element;
