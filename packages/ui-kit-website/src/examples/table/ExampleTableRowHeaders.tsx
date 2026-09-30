import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from '@via-profit/ui-kit/src/Table';
import { FormattedMessage, useIntl } from 'react-intl';

const ExampleTableRowHeaders: React.FC = () => {
  const intl = useIntl();
  const yes = intl.formatMessage({ defaultMessage: 'Да' });
  const no = intl.formatMessage({ defaultMessage: 'Нет' });
  const features = [
    { name: intl.formatMessage({ defaultMessage: 'Пользователи' }), values: ['1', '10', '∞'] },
    {
      name: intl.formatMessage({ defaultMessage: 'Хранилище' }),
      values: ['5 ГБ', '100 ГБ', '1 ТБ'],
    },
    { name: intl.formatMessage({ defaultMessage: 'Поддержка 24/7' }), values: [no, yes, yes] },
  ];

  return (
    <Table fullWidth>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>
            <FormattedMessage defaultMessage="Возможность" />
          </TableHeaderCell>
          <TableHeaderCell>
            <FormattedMessage defaultMessage="Старт" />
          </TableHeaderCell>
          <TableHeaderCell>
            <FormattedMessage defaultMessage="Команда" />
          </TableHeaderCell>
          <TableHeaderCell>
            <FormattedMessage defaultMessage="Компания" />
          </TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {features.map(feature => (
          <TableRow key={feature.name}>
            {/* The row header: screen readers read it before every cell of the row */}
            <TableHeaderCell scope="row">{feature.name}</TableHeaderCell>
            {feature.values.map((value, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <TableCell key={index}>{value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExampleTableRowHeaders;
