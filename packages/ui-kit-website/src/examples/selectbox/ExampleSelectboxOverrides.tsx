import React from 'react';
import Selectbox, { SelectboxItem, FilterItems } from '@via-profit/ui-kit/src/Selectbox';
import type { SelectboxTextFieldProps } from '@via-profit/ui-kit/src/Selectbox/SelectboxTextField';
import PhoneField, { templates, usePhoneUtils } from '@via-profit/ui-kit/src/PhoneField';
import Highlighted from '@via-profit/ui-kit/src/Highlighted';
import * as flags from '@via-profit/ui-kit/src/CountryFlags';

const phones = [
  { country: 'RU', number: '9122191984', callingCode: '7', value: '+7 (912) 219-19-84' },
  { country: 'RU', number: '9196599997', callingCode: '7', value: '+7 (919) 659-99-97' },
  { country: 'KZ', number: '717274616', callingCode: '7', value: '+7 (717) 274-61-60' },
  { country: 'BY', number: '241235526', callingCode: '375', value: '+375 (24) 123-55-26' },
  { country: 'BY', number: '251104594', callingCode: '375', value: '+375 (25) 110-45-94' },
  { country: 'BY', number: '299854588', callingCode: '375', value: '+375 (29) 985-45-88' },
  { country: 'JP', number: '156878255', callingCode: '81', value: '+81 (15) 687-8255' },
];

const StyledTextFieldWithRef: React.ForwardRefRenderFunction<
  HTMLDivElement,
  SelectboxTextFieldProps
> = (p, r) => {
  const { value, onChange, ...restProps } = p;

  return (
    <PhoneField
      ref={r}
      {...restProps}
      templates={templates}
      value={String(value)}
      onChange={event => {
        if (onChange) {
          onChange(event);
        }
      }}
    />
  );
};

const StyledTextField = React.forwardRef(StyledTextFieldWithRef);

type Item = (typeof phones)[0];

const ExampleSelectboxOverrides: React.FC = () => {
  const [value, setValue] = React.useState<Item | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const { parseAndFormat } = usePhoneUtils({ templates });

  const filteritems: FilterItems<Item> = React.useCallback(
    (items, { query }) => {
      const { number, callingCode } = parseAndFormat(query);

      return items.filter(
        item => item.number.indexOf(number) !== -1 && callingCode === item.callingCode,
      );
    },
    [parseAndFormat],
  );

  return (
    <Selectbox
      value={value}
      items={phones}
      isOpen={isOpen}
      filterItems={filteritems}
      clearIfNotSelected={false}
      onRequestClose={() => setIsOpen(false)}
      onRequestOpen={() => setIsOpen(true)}
      onChange={item => setValue(item)}
      selectedItemToString={item => item.value}
      overrides={{
        TextField: StyledTextField,
      }}
    >
      {({ item, inputValue }, itemProps) => (
        <SelectboxItem {...itemProps} key={item.number}>
          {React.createElement(flags[item.country as keyof typeof flags])}{' '}
          <Highlighted text={item.value} highlight={inputValue} />
        </SelectboxItem>
      )}
    </Selectbox>
  );
};

export default ExampleSelectboxOverrides;
