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
import { useIntl } from 'react-intl';

// The wide table scrolls inside its own container instead of the whole page
const ScrollContainer = styled.div`
  overflow-x: auto;
`;

const Cell = styled(TableCell)`
  white-space: nowrap;
`;

const ExampleTableScroll: React.FC = () => {
  const intl = useIntl();
  const months = Array.from({ length: 12 }, (_, month) =>
    intl.formatDate(new Date(2026, month, 1), { month: 'long' }),
  );
  const rows = [
    intl.formatMessage({ defaultMessage: 'Выручка, тыс. ₽' }),
    intl.formatMessage({ defaultMessage: 'Заказы' }),
  ];

  return (
    <ScrollContainer
      tabIndex={0}
      aria-label={intl.formatMessage({ defaultMessage: 'Показатели по месяцам' })}
      role="region"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell />
            {months.map(month => (
              <TableHeaderCell key={month}>{month}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={row}>
              <TableHeaderCell scope="row" style={{ whiteSpace: 'nowrap' }}>
                {row}
              </TableHeaderCell>
              {months.map((month, monthIndex) => (
                <Cell key={month}>{(rowIndex + 1) * (120 + monthIndex * 15)}</Cell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollContainer>
  );
};

export default ExampleTableScroll;
