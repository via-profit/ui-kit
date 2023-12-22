import React from 'react';
import Selectbox, { SelectboxItem } from '@via-profit/ui-kit/src/Selectbox';
import SelectboxButton from '@via-profit/ui-kit/src/Selectbox/SelectboxButton';
import TextField from '@via-profit/ui-kit/src/TextField';

import IconBell from '../../components/Icons/IconBell';
import countries from './countries.json';

type Item = {
  readonly code: string;
  readonly name: string;
};

const ExampleSelectboxOverview: React.FC = () => {
  const [value, setValue] = React.useState<Item | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <TextField
        value="Lorem ipsum"
        label="Field label"
        error
        errorText="Some error"
        endIcon={<IconBell />}
      />
      <Selectbox
        value={value}
        startIcon={<IconBell />}
        items={countries}
        isOpen={isOpen}
        error
        label="Field label"
        errorText="Some error"
        requiredAsterisk
        onRequestClose={() => setIsOpen(false)}
        onRequestOpen={() => setIsOpen(true)}
        onChange={item => setValue(item)}
        selectedItemToString={item => item.name}
        overrides={{
          Button: React.forwardRef(function OverridedButton(props, ref) {
            return <SelectboxButton ref={ref} {...props} />;
          }),
        }}
      >
        {({ item }, itemProps) => (
          <SelectboxItem {...itemProps} key={item.code}>
            {item.name}
          </SelectboxItem>
        )}
      </Selectbox>
    </>
  );
};

export default ExampleSelectboxOverview;
