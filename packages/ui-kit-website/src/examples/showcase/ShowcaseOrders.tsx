import React from 'react';
import styled from '@emotion/styled';
import Surface from '@via-profit/ui-kit/src/Surface';
import Stack from '@via-profit/ui-kit/src/Stack';
import TextField from '@via-profit/ui-kit/src/TextField';
import Badge from '@via-profit/ui-kit/src/Badge';
import Avatar from '@via-profit/ui-kit/src/Avatar';
import Button from '@via-profit/ui-kit/src/Button';
import Menu from '@via-profit/ui-kit/src/Menu';
import MenuItem from '@via-profit/ui-kit/src/Menu/MenuItem';
import Modal from '@via-profit/ui-kit/src/Modal';
import Highlighted from '@via-profit/ui-kit/src/Highlighted';
import { LoadingOverlay } from '@via-profit/ui-kit/src/LoadingIndicator';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from '@via-profit/ui-kit/src/Table';
import { Paragraph, Strong } from '@via-profit/ui-kit/src/Typography';
import { FormattedMessage, useIntl } from 'react-intl';

import MenuIcon from '~/components/Icons/MenuOutline';

type Status = 'new' | 'delivery' | 'done' | 'canceled';

type Order = {
  readonly id: number;
  readonly customer: string;
  readonly date: Date;
  readonly amount: number;
  readonly status: Status;
};

type Action = 'open' | 'repeat' | 'cancel';

const statusColors: Record<Status, string> = {
  new: 'primary',
  delivery: 'secondary',
  done: '#2e9e5b',
  canceled: '#9a9a9a',
};

const TableContainer = styled.div`
  position: relative;
  overflow-x: auto;
`;

const Numeric = styled(TableCell)`
  text-align: right;
  white-space: nowrap;
`;

const Empty = styled.div`
  padding: 2em;
  text-align: center;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const initials = (name: string) =>
  name
    .split(' ')
    .map(part => part[0])
    .join('');

const ShowcaseOrders: React.FC = () => {
  const intl = useIntl();
  const money = (value: number) =>
    intl.formatNumber(value, { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });

  const statusLabels: Record<Status, string> = {
    new: intl.formatMessage({ defaultMessage: 'Новый' }),
    delivery: intl.formatMessage({ defaultMessage: 'В доставке' }),
    done: intl.formatMessage({ defaultMessage: 'Выполнен' }),
    canceled: intl.formatMessage({ defaultMessage: 'Отменён' }),
  };

  const [orders, setOrders] = React.useState<readonly Order[]>(() => [
    {
      id: 1042,
      customer: intl.formatMessage({ defaultMessage: 'Иван Петров' }),
      date: new Date(2026, 8, 28),
      amount: 4590,
      status: 'done',
    },
    {
      id: 1043,
      customer: intl.formatMessage({ defaultMessage: 'Анна Смирнова' }),
      date: new Date(2026, 8, 29),
      amount: 12300,
      status: 'delivery',
    },
    {
      id: 1044,
      customer: intl.formatMessage({ defaultMessage: 'Олег Кузнецов' }),
      date: new Date(2026, 8, 29),
      amount: 870,
      status: 'new',
    },
    {
      id: 1045,
      customer: intl.formatMessage({ defaultMessage: 'Мария Иванова' }),
      date: new Date(2026, 8, 30),
      amount: 2150,
      status: 'new',
    },
    {
      id: 1046,
      customer: intl.formatMessage({ defaultMessage: 'Пётр Соколов' }),
      date: new Date(2026, 9, 1),
      amount: 6400,
      status: 'canceled',
    },
  ]);
  const [query, setQuery] = React.useState('');
  const [statuses, setStatuses] = React.useState<readonly Status[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  // The menu of the row actions is one for the table, it is opened at the clicked button
  const [menuAnchor, setMenuAnchor] = React.useState<HTMLButtonElement | null>(null);
  const [menuOrder, setMenuOrder] = React.useState<Order | null>(null);
  const [openedOrder, setOpenedOrder] = React.useState<Order | null>(null);
  const [orderToCancel, setOrderToCancel] = React.useState<Order | null>(null);

  const actions: { id: Action; label: string }[] = [
    { id: 'open', label: intl.formatMessage({ defaultMessage: 'Открыть' }) },
    { id: 'repeat', label: intl.formatMessage({ defaultMessage: 'Повторить заказ' }) },
    { id: 'cancel', label: intl.formatMessage({ defaultMessage: 'Отменить заказ' }) },
  ];

  // The request to the server is simulated: a short loading after every filter change
  React.useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => setIsLoading(false), 400);

    return () => clearTimeout(timeout);
  }, [query, statuses]);

  const toggleStatus = (status: Status) =>
    setStatuses(current =>
      current.includes(status) ? current.filter(item => item !== status) : [...current, status],
    );

  const visibleOrders = orders.filter(
    order =>
      (statuses.length === 0 || statuses.includes(order.status)) &&
      (query.trim() === '' ||
        order.customer.toLowerCase().includes(query.trim().toLowerCase()) ||
        String(order.id).includes(query.trim())),
  );

  const handleAction = (action: { id: Action }) => {
    if (!menuOrder) return;

    if (action.id === 'open') setOpenedOrder(menuOrder);
    if (action.id === 'cancel') setOrderToCancel(menuOrder);
    if (action.id === 'repeat') {
      setOrders(current => [
        ...current,
        {
          ...menuOrder,
          id: Math.max(...current.map(order => order.id)) + 1,
          date: new Date(),
          status: 'new',
        },
      ]);
    }
    setMenuAnchor(null);
  };

  return (
    <Surface header={intl.formatMessage({ defaultMessage: 'Заказы' })}>
      <Stack>
        <Stack direction="row" wrap justify="space-between" align="flex-end">
          <TextField
            label={<FormattedMessage defaultMessage="Поиск по номеру или покупателю" />}
            value={query}
            onChange={event => setQuery(event.currentTarget.value)}
          />
          <Stack
            direction="row"
            wrap
            gap="sm"
            role="group"
            aria-label={intl.formatMessage({ defaultMessage: 'Статус' })}
          >
            {(Object.keys(statusLabels) as Status[]).map(status => {
              const isSelected = statuses.includes(status);
              const count = orders.filter(order => order.status === status).length;

              return (
                <Badge
                  key={status}
                  color={statusColors[status]}
                  variant={isSelected ? 'standard' : 'outlined'}
                  aria-pressed={isSelected}
                  onClick={() => toggleStatus(status)}
                >
                  {statusLabels[status]} · {count}
                </Badge>
              );
            })}
          </Stack>
        </Stack>

        <TableContainer>
          <Table fullWidth>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>№</TableHeaderCell>
                <TableHeaderCell>
                  <FormattedMessage defaultMessage="Покупатель" />
                </TableHeaderCell>
                <TableHeaderCell>
                  <FormattedMessage defaultMessage="Дата" />
                </TableHeaderCell>
                <TableHeaderCell>
                  <FormattedMessage defaultMessage="Статус" />
                </TableHeaderCell>
                <TableHeaderCell style={{ textAlign: 'right' }}>
                  <FormattedMessage defaultMessage="Сумма" />
                </TableHeaderCell>
                <TableHeaderCell>
                  <span hidden>
                    <FormattedMessage defaultMessage="Действия" />
                  </span>
                </TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleOrders.map(order => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Highlighted text={String(order.id)} highlight={query.trim()} />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" gap="sm" inline style={{ whiteSpace: 'nowrap' }}>
                      <Avatar style={{ fontSize: '0.75em' }}>{initials(order.customer)}</Avatar>
                      <Highlighted text={order.customer} highlight={query.trim()} />
                    </Stack>
                  </TableCell>
                  <TableCell>{intl.formatDate(order.date)}</TableCell>
                  <TableCell>
                    <Badge color={statusColors[order.status]} variant="outlined">
                      {statusLabels[order.status]}
                    </Badge>
                  </TableCell>
                  <Numeric>{money(order.amount)}</Numeric>
                  <TableCell>
                    <Button
                      iconOnly
                      variant="plain"
                      aria-label={intl.formatMessage(
                        { defaultMessage: 'Действия с заказом {id}' },
                        { id: order.id },
                      )}
                      aria-haspopup="menu"
                      onClick={event => {
                        setMenuOrder(order);
                        setMenuAnchor(event.currentTarget);
                      }}
                    >
                      <MenuIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {visibleOrders.length === 0 && (
            <Empty>
              <FormattedMessage defaultMessage="Заказы не найдены" />
            </Empty>
          )}
          {isLoading && <LoadingOverlay />}
        </TableContainer>
      </Stack>

      <Menu
        anchorElement={menuAnchor}
        isOpen={Boolean(menuAnchor)}
        anchorPos="bottom-end"
        offset={4}
        value={null}
        items={actions.filter(
          action =>
            action.id !== 'cancel' || (menuOrder && ['new', 'delivery'].includes(menuOrder.status)),
        )}
        onRequestClose={() => setMenuAnchor(null)}
        onSelectItem={handleAction}
      >
        {({ item }, itemProps) => (
          <MenuItem {...itemProps} key={item.id}>
            {item.label}
          </MenuItem>
        )}
      </Menu>

      <Modal
        variant="drawer"
        anchor="right"
        isOpen={Boolean(openedOrder)}
        showCloseButton
        closeButtonLabel={intl.formatMessage({ defaultMessage: 'Закрыть' })}
        header={intl.formatMessage(
          { defaultMessage: 'Заказ №{id}' },
          { id: openedOrder?.id ?? '' },
        )}
        onRequestClose={() => setOpenedOrder(null)}
      >
        {openedOrder && (
          <>
            <Paragraph>
              <Strong>{openedOrder.customer}</Strong>
            </Paragraph>
            <Paragraph>{intl.formatDate(openedOrder.date, { dateStyle: 'long' })}</Paragraph>
            <Paragraph>
              <Badge color={statusColors[openedOrder.status]}>
                {statusLabels[openedOrder.status]}
              </Badge>
            </Paragraph>
            <Paragraph>
              <FormattedMessage
                defaultMessage="Сумма заказа: {amount}"
                values={{ amount: money(openedOrder.amount) }}
              />
            </Paragraph>
          </>
        )}
      </Modal>

      <Modal
        variant="confirm-box"
        isOpen={Boolean(orderToCancel)}
        header={intl.formatMessage(
          { defaultMessage: 'Отменить заказ №{id}?' },
          { id: orderToCancel?.id ?? '' },
        )}
        confirmButtonLabel={<FormattedMessage defaultMessage="Отменить заказ" />}
        dismissButtonLabel={<FormattedMessage defaultMessage="Не отменять" />}
        onRequestYes={() => {
          setOrders(current =>
            current.map(order =>
              order.id === orderToCancel?.id ? { ...order, status: 'canceled' } : order,
            ),
          );
          setOrderToCancel(null);
        }}
        onRequestClose={() => setOrderToCancel(null)}
      >
        <FormattedMessage defaultMessage="Покупатель получит уведомление об отмене." />
      </Modal>
    </Surface>
  );
};

export default ShowcaseOrders;
