import React from 'react';
import styled from '@emotion/styled';
import Color from '@via-profit/ui-kit/src/Color';
import Avatar from '@via-profit/ui-kit/src/Avatar';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;

const users = [
  'Анна Смирнова',
  'Иван Петров',
  'Мария Иванова',
  'Олег Сидоров',
  'Елена Козлова',
  'Дмитрий Волков',
];

const initials = (name: string) =>
  name
    .split(' ')
    .map(part => part[0])
    .join('');

const ExampleColorGenerator: React.FC = () => (
  <Row>
    {users.map(name => (
      <Avatar key={name} color={Color.fromHashString(name).toHexString()} title={name}>
        {initials(name)}
      </Avatar>
    ))}
  </Row>
);

export default ExampleColorGenerator;
