import React from 'react';
import styled from '@emotion/styled';
import TextField from '@via-profit/ui-kit/src/TextField';
import Button from '@via-profit/ui-kit/src/Button';
import { FormattedMessage, useIntl } from 'react-intl';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16em, 1fr));
  gap: 1em;
`;

const SearchIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 512 512">
    <path
      d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
      fill="none"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeWidth="32"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="32"
      d="M338.29 338.29L448 448"
    />
  </svg>
);

const EyeIcon: React.FC<{ readonly crossed: boolean }> = ({ crossed }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 512 512">
    <path
      d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
    <circle
      cx="256"
      cy="256"
      r="80"
      fill="none"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeWidth="32"
    />
    {crossed && (
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="32"
        d="M432 448L80 64"
      />
    )}
  </svg>
);

const ExampleTextFieldIcons: React.FC = () => {
  const intl = useIntl();
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  return (
    <Grid>
      <TextField
        type="search"
        label={<FormattedMessage defaultMessage="Поиск" />}
        placeholder={intl.formatMessage({ defaultMessage: 'Найти…' })}
        startIcon={<SearchIcon />}
      />
      <TextField
        type={isPasswordVisible ? 'text' : 'password'}
        label={<FormattedMessage defaultMessage="Пароль" />}
        defaultValue="secret-password"
        endIcon={
          <Button
            iconOnly
            variant="plain"
            type="button"
            aria-label={
              isPasswordVisible
                ? intl.formatMessage({ defaultMessage: 'Скрыть пароль' })
                : intl.formatMessage({ defaultMessage: 'Показать пароль' })
            }
            onClick={() => setIsPasswordVisible(visible => !visible)}
          >
            <EyeIcon crossed={isPasswordVisible} />
          </Button>
        }
      />
    </Grid>
  );
};

export default ExampleTextFieldIcons;
