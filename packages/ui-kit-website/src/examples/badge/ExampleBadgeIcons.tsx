import React from 'react';
import styled from '@emotion/styled';
import Badge from '@via-profit/ui-kit/src/Badge';
import Button from '@via-profit/ui-kit/src/Button';
import { FormattedMessage, useIntl } from 'react-intl';

const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5em;
`;

const UserIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
    <path
      fill="currentColor"
      d="M256 256c52.8 0 96-43.2 96-96s-43.2-96-96-96-96 43.2-96 96 43.2 96 96 96zm0 48c-63.6 0-192 32.4-192 96v48h384v-48c0-63.6-128.4-96-192-96z"
    />
  </svg>
);

const initialUsers = ['Анна Смирнова', 'Иван Петров', 'Мария Иванова'];

const ExampleBadgeIcons: React.FC = () => {
  const intl = useIntl();
  const [users, setUsers] = React.useState(initialUsers);

  return (
    <Group>
      {users.map(user => (
        <Badge
          key={user}
          variant="outlined"
          color="primary"
          startIcon={<UserIcon />}
          deleteButtonLabel={intl.formatMessage(
            { defaultMessage: 'Удалить «{name}»' },
            { name: user },
          )}
          onDelete={() => setUsers(current => current.filter(u => u !== user))}
        >
          {user}
        </Badge>
      ))}
      {users.length < initialUsers.length && (
        <Button variant="plain" onClick={() => setUsers(initialUsers)}>
          <FormattedMessage defaultMessage="Вернуть всех" />
        </Button>
      )}
    </Group>
  );
};

export default ExampleBadgeIcons;
