import React from 'react';
import TextArea from '@via-profit/ui-kit/src/TextArea';

const ExampleTextAreaOverrides: React.FC = () => (
  <TextArea
    label="Имя:"
    rows={2}
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

export default ExampleTextAreaOverrides;
