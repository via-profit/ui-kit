import React from 'react';
import Autocomplete, { AutocompleteItem, FilterItems } from '@via-profit/ui-kit/src/Autocomplete';
import type { AutocompleteTextFieldProps } from '@via-profit/ui-kit/src/Autocomplete/AutocompleteTextField';
import PhoneField, {
  PhoneFieldProps,
  templates,
  usePhoneUtils,
} from '@via-profit/ui-kit/src/PhoneField';
import Highlighted from '@via-profit/ui-kit/src/Highlighted';
import * as flags from '@via-profit/ui-kit/src/CountryFlags';
import styled from '@emotion/styled';

const phones = [
  { country: 'RU', number: '9122191984', callingCode: '7', value: '+7 (912) 219-19-84' },
  { country: 'RU', number: '9196599997', callingCode: '7', value: '+7 (919) 659-99-97' },
  { country: 'KZ', number: '717274616', callingCode: '7', value: '+7 (717) 274-61-60' },
  { country: 'BY', number: '241235526', callingCode: '375', value: '+375 (24) 123-55-26' },
  { country: 'BY', number: '251104594', callingCode: '375', value: '+375 (25) 110-45-94' },
  { country: 'BY', number: '299854588', callingCode: '375', value: '+375 (29) 985-45-88' },
  { country: 'JP', number: '156878255', callingCode: '81', value: '+81 (15) 687-8255' },
];

const StyledPhoneField = styled(PhoneField)<PhoneFieldProps>`
  &[data-popper-placement='top-fill'] > div {
    outline: none;
    border-top: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-color: ${({ theme }) =>
      theme.isDark
        ? theme.color.textPrimary.darken(100).toString()
        : theme.color.textPrimary.lighten(150).toString()};
  }

  &[data-popper-placement='bottom-fill'] > div {
    outline: none;
    border-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-color: ${({ theme }) =>
      theme.isDark
        ? theme.color.textPrimary.darken(100).toString()
        : theme.color.textPrimary.lighten(150).toString()};
  }
`;
const StyledTextFieldWithRef: React.ForwardRefRenderFunction<
  HTMLDivElement,
  AutocompleteTextFieldProps
> = (p, r) => {
  const { value, onChange, ...restProps } = p;

  return (
    <StyledPhoneField
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

const ExampleAutocompleteOverrides: React.FC = () => {
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
    <Autocomplete
      value={value}
      items={phones}
      isOpen={isOpen}
      filterItems={filteritems}
      clearOnBlur={false}
      onRequestClose={() => setIsOpen(false)}
      onRequestOpen={() => setIsOpen(true)}
      onChange={item => setValue(item)}
      selectedItemToString={item => item.value}
      overrides={{
        TextField: StyledTextField,
      }}
    >
      {({ item, inputValue }, itemProps) => (
        <AutocompleteItem {...itemProps} key={item.number}>
          {React.createElement(flags[item.country as keyof typeof flags])}{' '}
          <Highlighted text={item.value} highlight={inputValue} />
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default ExampleAutocompleteOverrides;
