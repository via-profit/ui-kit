import React from 'react';
import styled from '@emotion/styled';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from '@via-profit/ui-kit/src/Table';
import { FormattedMessage, useIntl } from 'react-intl';

// Striped rows and the row highlight on hover
const StripedBody = styled(TableBody)`
  & > tr:nth-of-type(even) > td {
    background-color: ${({ theme }) => theme.color.textPrimary.alpha(0.05).toString()};
  }

  & > tr:hover > td {
    background-color: ${({ theme }) => theme.color.accentPrimary.alpha(0.12).toString()};
  }
`;

const ExampleTableStyled: React.FC = () => {
  const intl = useIntl();
  const employees = [
    {
      name: intl.formatMessage({ defaultMessage: 'Иван Петров' }),
      role: intl.formatMessage({ defaultMessage: 'Разработчик' }),
    },
    {
      name: intl.formatMessage({ defaultMessage: 'Анна Смирнова' }),
      role: intl.formatMessage({ defaultMessage: 'Дизайнер' }),
    },
    {
      name: intl.formatMessage({ defaultMessage: 'Олег Кузнецов' }),
      role: intl.formatMessage({ defaultMessage: 'Тестировщик' }),
    },
    {
      name: intl.formatMessage({ defaultMessage: 'Мария Иванова' }),
      role: intl.formatMessage({ defaultMessage: 'Менеджер' }),
    },
  ];

  return (
    <Table fullWidth>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>
            <FormattedMessage defaultMessage="Сотрудник" />
          </TableHeaderCell>
          <TableHeaderCell>
            <FormattedMessage defaultMessage="Должность" />
          </TableHeaderCell>
        </TableRow>
      </TableHeader>
      <StripedBody>
        {employees.map(employee => (
          <TableRow key={employee.name}>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.role}</TableCell>
          </TableRow>
        ))}
      </StripedBody>
    </Table>
  );
};

export default ExampleTableStyled;
