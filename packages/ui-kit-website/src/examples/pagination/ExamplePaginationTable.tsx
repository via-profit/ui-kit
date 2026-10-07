import React from 'react';
import styled from '@emotion/styled';
import Pagination from '@via-profit/ui-kit/src/Pagination';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from '@via-profit/ui-kit/src/Table';
import { FormattedMessage, useIntl } from 'react-intl';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const PAGE_SIZE = 5;

const numeric: React.CSSProperties = { textAlign: 'right', fontVariantNumeric: 'tabular-nums' };

const ExamplePaginationTable: React.FC = () => {
  const intl = useIntl();
  const [page, setPage] = React.useState(1);

  // 47 orders: the last page is not full
  const orders = React.useMemo(
    () =>
      Array.from({ length: 47 }, (_, index) => ({
        id: 1001 + index,
        amount: ((index * 7919) % 9000) + 500,
      })),
    [],
  );
  const pagesCount = Math.ceil(orders.length / PAGE_SIZE);
  const visible = orders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const money = (value: number) =>
    intl.formatNumber(value, { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });

  return (
    <Column>
      <Table fullWidth>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>
              <FormattedMessage defaultMessage="Заказ" />
            </TableHeaderCell>
            <TableHeaderCell style={numeric}>
              <FormattedMessage defaultMessage="Сумма" />
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visible.map(order => (
            <TableRow key={order.id}>
              <TableCell>№{order.id}</TableCell>
              <TableCell style={numeric}>{money(order.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Footer>
        <FormattedMessage
          defaultMessage="{from}–{to} из {total}"
          values={{
            from: (page - 1) * PAGE_SIZE + 1,
            to: Math.min(page * PAGE_SIZE, orders.length),
            total: orders.length,
          }}
        />
        <Pagination
          count={pagesCount}
          page={page}
          onChange={setPage}
          size="small"
          aria-label={intl.formatMessage({ defaultMessage: 'Страницы заказов' })}
        />
      </Footer>
    </Column>
  );
};

export default ExamplePaginationTable;
