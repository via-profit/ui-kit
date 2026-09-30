import React from 'react';
import { usePhoneUtils } from '@via-profit/ui-kit/src/PhoneField';
import templates from '@via-profit/ui-kit/src/PhoneField/templates';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
} from '@via-profit/ui-kit/src/Table';
import { FormattedMessage } from 'react-intl';

const phones = [
  '79122129984',
  '8 912 212 99 84',
  '+7 701 234 56 78',
  '+375291234567',
  '+380 98 765 4321',
  '+1 212 555 0123',
  '+81 90 1234 5678',
  '+44 20 7946 0958',
];

const ExamplePhoneFieldFormat: React.FC = () => {
  const { parseAndFormat } = usePhoneUtils({ templates });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>
            <FormattedMessage defaultMessage="Исходная строка" />
          </TableHeaderCell>
          <TableHeaderCell>
            <FormattedMessage defaultMessage="Результат" />
          </TableHeaderCell>
          <TableHeaderCell>countryCode</TableHeaderCell>
          <TableHeaderCell>isValid</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {phones.map(phone => {
          const { text, countryCode, isValid } = parseAndFormat(phone);

          return (
            <TableRow key={phone}>
              <TableCell>
                <code>{phone}</code>
              </TableCell>
              <TableCell>{text}</TableCell>
              <TableCell>{String(countryCode)}</TableCell>
              <TableCell>{String(isValid)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ExamplePhoneFieldFormat;
