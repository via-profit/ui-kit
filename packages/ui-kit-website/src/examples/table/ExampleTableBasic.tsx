import React from 'react';
import {
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHeaderCell,
  TableCell,
} from '@via-profit/ui-kit/src/Table';
import { FormattedMessage, useIntl } from 'react-intl';

type Order = {
  readonly id: number;
  readonly date: Date;
  readonly customer: string;
  readonly amount: number;
};

// Numbers are aligned to the right, so the digits are under each other
const numeric: React.CSSProperties = { textAlign: 'right', fontVariantNumeric: 'tabular-nums' };

const ExampleTableBasic: React.FC = () => {
  const intl = useIntl();
  const orders: readonly Order[] = [
    {
      id: 1042,
      date: new Date(2026, 8, 28),
      customer: intl.formatMessage({ defaultMessage: 'Иван Петров' }),
      amount: 4590,
    },
    {
      id: 1043,
      date: new Date(2026, 8, 29),
      customer: intl.formatMessage({ defaultMessage: 'Анна Смирнова' }),
      amount: 12300,
    },
    {
      id: 1044,
      date: new Date(2026, 8, 29),
      customer: intl.formatMessage({ defaultMessage: 'Олег Кузнецов' }),
      amount: 870,
    },
    {
      id: 1045,
      date: new Date(2026, 8, 30),
      customer: intl.formatMessage({ defaultMessage: 'Мария Иванова' }),
      amount: 2150,
    },
  ];
  const money = (value: number) =>
    intl.formatNumber(value, { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });
  const total = orders.reduce((sum, order) => sum + order.amount, 0);

  return (
    <Table fullWidth>
      <TableCaption>
        <FormattedMessage defaultMessage="Заказы за неделю" />
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>
            <FormattedMessage defaultMessage="Номер" />
          </TableHeaderCell>
          <TableHeaderCell>
            <FormattedMessage defaultMessage="Дата" />
          </TableHeaderCell>
          <TableHeaderCell>
            <FormattedMessage defaultMessage="Покупатель" />
          </TableHeaderCell>
          <TableHeaderCell style={numeric}>
            <FormattedMessage defaultMessage="Сумма" />
          </TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map(order => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{intl.formatDate(order.date)}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell style={numeric}>{money(order.amount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>
            <FormattedMessage defaultMessage="Итого" />
          </TableCell>
          <TableCell style={numeric}>{money(total)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default ExampleTableBasic;
