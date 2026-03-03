import * as React from 'react';
import Autocomplete2TextField from './Autocomplete2TextField';

type Item = {
  readonly id: string;
  readonly label: string;
};

type Autocomplete2Props = {
  readonly value: Item | null;
  readonly items: readonly Item[];
  readonly onChange: (value: Item | null) => void;
};

const Autocomplete2 = React.forwardRef(
  (props: Autocomplete2Props, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { value, items, onChange } = props;

    /**
     * Get item ID
     */
    const getItemID = React.useCallback(
      (item: Item | null) => (item ? item.id : '<no-value-id>'),
      [],
    );

    const [valueID, setValueID] = React.useState(() => getItemID(value));

    /**
     * Filter items list by input value
     */
    const filterItems = React.useCallback(
      (items: readonly Item[], data: { readonly query: string }) => {
        const { query } = data;

        return items.filter(item => item.label.toLocaleLowerCase().indexOf(query) !== -1);
      },
      [],
    );

    /**
     * Input value
     */
    const [inputValue, setInputValue] = React.useState(() => {
      if (!value) {
        return '';
      }

      return value.label;
    });

    /**
     * Filtered items
     */
    const [filteredItems, setFilteredItems] = React.useState(() =>
      filterItems(items, { query: inputValue }),
    );

    /**
     * Render filtered items list
     */
    const renderItems = React.useCallback(
      () => (
        <ol>
          {filteredItems.map(item => (
            <li key={item.id} onClick={() => onChange(item)}>
              {item.label}
            </li>
          ))}
        </ol>
      ),
      [filteredItems, onChange],
    );

    /**
     * onChange text field input
     */
    const handleInputChange = React.useCallback(
      (input: string) => {
        setInputValue(input);
        setFilteredItems(filterItems(items, { query: input }));
      },
      [filterItems, items],
    );

    /**
     * value listener
     */
    React.useEffect(() => {
      const newValueID = getItemID(value);
      if (newValueID !== valueID) {
        setValueID(newValueID);
      }
    }, [getItemID, inputValue, value, valueID]);

    return (
      <div>
        <Autocomplete2TextField ref={ref} value={inputValue} onChange={handleInputChange} />
        {renderItems()}
      </div>
    );
  },
);

Autocomplete2.displayName = 'Autocomplete2';

export default React.memo(Autocomplete2);
