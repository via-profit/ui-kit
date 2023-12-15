import React from 'react';
import TextArea from '@via-profit/ui-kit/src/TextArea';
import { useTheme } from '@via-profit/ui-kit/src/ThemeProvider';

const ExampleTextAreaOverview: React.FC = () => {
  const validate = React.useCallback(
    (value: string): boolean => value.toLowerCase() === 'potato',
    [],
  );
  const [value, setValue] = React.useState('potato');
  const [isValid, setValidate] = React.useState(validate(value));
  const theme = useTheme();

  return (
    <>
      <TextArea
        label="Type «potato»"
        placeholder="Potato"
        rows={3}
        errorText="Is not a «potato»"
        error={!isValid}
        value={value}
        onChange={event => {
          const newValue = event.currentTarget.value;
          setValue(newValue);
          setValidate(validate(newValue));
        }}
        endIcon={
          isValid ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.4em"
              height="1.4em"
              viewBox="0 0 512 512"
            >
              <path
                d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                fill="none"
                stroke={theme.color.success.toString()}
                strokeMiterlimit="10"
                strokeWidth="32"
              />
              <path
                fill="none"
                stroke={theme.color.success.toString()}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M352 176L217.6 336 160 272"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.4em"
              height="1.4em"
              viewBox="0 0 512 512"
            >
              <path
                d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                fill="none"
                stroke={theme.color.error.toString()}
                strokeMiterlimit="10"
                strokeWidth="32"
              />
              <path
                d="M250.26 166.05L256 288l5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 6z"
                fill="none"
                stroke={theme.color.error.toString()}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              />
              <path
                d="M256 367.91a20 20 0 1120-20 20 20 0 01-20 20z"
                fill={theme.color.error.toString()}
              />
            </svg>
          )
        }
      />
    </>
  );
};

export default ExampleTextAreaOverview;
