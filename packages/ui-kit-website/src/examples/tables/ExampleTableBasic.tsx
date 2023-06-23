import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHeaderCell,
  TableCell,
  TableRow,
  TableFooter,
} from '@via-profit/ui-kit/src/Table';

type Person = {
  readonly firstName: string;
  readonly age: number;
  readonly sex: 'Male' | 'Female' | 'Pidoras';
};

const ExampleTableBasic: React.FC = () => {
  const persons: Person[] = [
    { firstName: 'Ivan', age: 38, sex: 'Male' },
    { firstName: 'Oleg', age: 11, sex: 'Male' },
    { firstName: 'Andrey', age: 56, sex: 'Male' },
    { firstName: 'Olga', age: 26, sex: 'Female' },
    { firstName: 'Anna', age: 24, sex: 'Female' },
    { firstName: 'Kira', age: 25, sex: 'Female' },
    { firstName: 'Egor', age: 44, sex: 'Male' },
    { firstName: 'Slava', age: 13, sex: 'Male' },
    { firstName: 'Alexey', age: 16, sex: 'Male' },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Имя</TableHeaderCell>
          <TableHeaderCell>Возраст</TableHeaderCell>
          <TableHeaderCell>Пол</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {persons.map(({ firstName, age, sex }) => (
          <TableRow key={`${firstName}-${age}`}>
            <TableCell>{firstName}</TableCell>
            <TableCell>{age}</TableCell>
            <TableCell>{sex}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>a</TableCell>
          <TableCell>b</TableCell>
          <TableCell>c</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default ExampleTableBasic;
