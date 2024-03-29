import React from 'react';
import TextField from '@via-profit/ui-kit/src/TextField';

const ExampleTextFieldOverrides: React.FC = () => (
  <TextField
    label="Имя:"
    placeholder="Алевтина"
    defaultValue="Алевтина"
    overrides={{
      InputWrapper: React.forwardRef(function InputWrapper(props, ref) {
        const { children } = props;

        return (
          <div
            style={{ backgroundColor: '#c5d4fd', color: '#6305ce', borderRadius: '0.3em' }}
            ref={ref}
          >
            {children}
          </div>
        );
      }),
    }}
  />
);

export default ExampleTextFieldOverrides;
