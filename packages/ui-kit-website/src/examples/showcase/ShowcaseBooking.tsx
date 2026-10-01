import React from 'react';
import styled from '@emotion/styled';
import Surface from '@via-profit/ui-kit/src/Surface';
import Stack from '@via-profit/ui-kit/src/Stack';
import Grid from '@via-profit/ui-kit/src/Grid';
import Calendar, { CalendarValue } from '@via-profit/ui-kit/src/Calendar';
import Swiper, { SwiperRef, SwiperSlide } from '@via-profit/ui-kit/src/Swiper';
import ButtonGroup from '@via-profit/ui-kit/src/ButtonGroup';
import Button from '@via-profit/ui-kit/src/Button';
import Badge from '@via-profit/ui-kit/src/Badge';
import Modal from '@via-profit/ui-kit/src/Modal';
import { H4, Paragraph } from '@via-profit/ui-kit/src/Typography';
import { FormattedMessage, useIntl } from 'react-intl';

type Room = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly color: string;
};

const DAY = 24 * 60 * 60 * 1000;

// Two columns: the calendar and the booking. On a narrow screen they go one under another
const Layout = styled(Grid)`
  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

// The spacing scale of the theme is available in styled too
const RoomSlide = styled(SwiperSlide)`
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const RoomCover = styled.div`
  height: 9em;
  border-radius: 0.5em;
  display: flex;
  align-items: flex-end;
  padding: 0.75em;
  box-sizing: border-box;
  font-size: 1.3em;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
`;

const Summary = styled.dl`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  gap: 0.5em 2em;
  margin: 0;

  & dt {
    color: ${({ theme }) => theme.color.textSecondary.toString()};
  }

  & dd {
    margin: 0;
    text-align: right;
    font-weight: 600;
  }
`;

const Title = styled(H4)`
  margin: 0;
`;

const today = new Date();
const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

const ShowcaseBooking: React.FC = () => {
  const intl = useIntl();
  const money = (value: number) =>
    intl.formatNumber(value, { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });
  const formatDay = (date: Date) => intl.formatDate(date, { day: 'numeric', month: 'long' });

  const rooms: Room[] = [
    {
      id: 'standard',
      name: intl.formatMessage({ defaultMessage: 'Стандарт' }),
      description: intl.formatMessage({ defaultMessage: 'Двуспальная кровать, вид во двор' }),
      price: 4500,
      color: '#5b8def',
    },
    {
      id: 'comfort',
      name: intl.formatMessage({ defaultMessage: 'Комфорт' }),
      description: intl.formatMessage({ defaultMessage: 'Балкон и вид на море' }),
      price: 6900,
      color: '#2e9e9b',
    },
    {
      id: 'suite',
      name: intl.formatMessage({ defaultMessage: 'Люкс' }),
      description: intl.formatMessage({ defaultMessage: 'Две комнаты, ванна и терраса' }),
      price: 12500,
      color: '#c0703f',
    },
  ];

  const swiperRef = React.useRef<SwiperRef | null>(null);
  const [slide, setSlide] = React.useState(0);
  const [dates, setDates] = React.useState<CalendarValue<true>>(null);
  const [roomId, setRoomId] = React.useState<string | null>(null);
  const [guests, setGuests] = React.useState<string | null>('2');
  const [isBooked, setIsBooked] = React.useState(false);

  const [from, to] = dates || [null, null];
  const nights = from && to ? Math.round((to.getTime() - from.getTime()) / DAY) : 0;
  const room = rooms.find(item => item.id === roomId) ?? null;
  const total = room ? room.price * nights : 0;
  const canBook = Boolean(room && nights > 0);

  return (
    <Layout columns="auto minmax(0, 1fr)" gap="lg" align="start">
      <Calendar
        range
        value={dates}
        onChange={setDates}
        minDate={minDate}
        locale={intl.locale}
        heading={intl.formatMessage({ defaultMessage: 'Даты поездки' })}
        subheading={
          from
            ? `${formatDay(from)} — ${to ? formatDay(to) : '…'}`
            : intl.formatMessage({ defaultMessage: 'Выберите заезд и выезд' })
        }
        resetButtonLabel={intl.formatMessage({ defaultMessage: 'Сбросить' })}
        prevButtonLabel={intl.formatMessage({ defaultMessage: 'Назад' })}
        nextButtonLabel={intl.formatMessage({ defaultMessage: 'Вперёд' })}
      />

      <Stack gap="lg">
        <Surface header={intl.formatMessage({ defaultMessage: 'Номер' })}>
          <Stack gap="sm">
            <Swiper
              ref={swiperRef}
              onSlideChange={setSlide}
              aria-label={intl.formatMessage({ defaultMessage: 'Номера' })}
              slideLabel={(index, count) =>
                intl.formatMessage(
                  { defaultMessage: 'Номер {index} из {count}' },
                  { index: index + 1, count },
                )
              }
            >
              {rooms.map(item => (
                <RoomSlide key={item.id}>
                  <RoomCover style={{ background: item.color }}>{item.name}</RoomCover>
                  <Stack direction="row" justify="space-between" gap="md">
                    <Stack gap="xs">
                      <span>{item.description}</span>
                      <strong>
                        <FormattedMessage
                          defaultMessage="{price} за ночь"
                          values={{ price: money(item.price) }}
                        />
                      </strong>
                    </Stack>
                    {item.id === roomId ? (
                      <Badge color="primary">
                        <FormattedMessage defaultMessage="Выбран" />
                      </Badge>
                    ) : (
                      <Button variant="outlined" color="primary" onClick={() => setRoomId(item.id)}>
                        <FormattedMessage defaultMessage="Выбрать" />
                      </Button>
                    )}
                  </Stack>
                </RoomSlide>
              ))}
            </Swiper>
            <Stack direction="row" justify="space-between">
              <Button disabled={slide === 0} onClick={() => swiperRef.current?.prev()}>
                <FormattedMessage defaultMessage="Предыдущий" />
              </Button>
              <Button
                disabled={slide === rooms.length - 1}
                onClick={() => swiperRef.current?.next()}
              >
                <FormattedMessage defaultMessage="Следующий" />
              </Button>
            </Stack>
          </Stack>
        </Surface>

        <Surface
          header={intl.formatMessage({ defaultMessage: 'Бронирование' })}
          footer={
            <Button color="primary" disabled={!canBook} onClick={() => setIsBooked(true)}>
              <FormattedMessage defaultMessage="Забронировать" />
            </Button>
          }
        >
          <Stack gap="lg">
            <Stack gap="sm" align="flex-start">
              <Title>
                <FormattedMessage defaultMessage="Гостей" />
              </Title>
              <ButtonGroup
                aria-label={intl.formatMessage({ defaultMessage: 'Количество гостей' })}
                value={guests}
                onChange={setGuests}
              >
                {['1', '2', '3', '4'].map(count => (
                  <Button key={count} value={count}>
                    {count}
                  </Button>
                ))}
              </ButtonGroup>
            </Stack>
            <Summary>
              <dt>
                <FormattedMessage defaultMessage="Номер" />
              </dt>
              <dd>{room ? room.name : '—'}</dd>
              <dt>
                <FormattedMessage defaultMessage="Ночей" />
              </dt>
              <dd>{nights || '—'}</dd>
              <dt>
                <FormattedMessage defaultMessage="Итого" />
              </dt>
              <dd>{total ? money(total) : '—'}</dd>
            </Summary>
            {!canBook && (
              <Paragraph noMargin>
                <FormattedMessage defaultMessage="Выберите даты и номер, чтобы рассчитать стоимость." />
              </Paragraph>
            )}
          </Stack>
        </Surface>
      </Stack>

      <Modal
        variant="message-box"
        isOpen={isBooked}
        header={intl.formatMessage({ defaultMessage: 'Номер забронирован' })}
        okButtonLabel={<FormattedMessage defaultMessage="Хорошо" />}
        onRequestClose={() => setIsBooked(false)}
      >
        {room && from && to && (
          <FormattedMessage
            defaultMessage="{room}, {from} — {to}, гостей: {guests}. Сумма {total}."
            values={{
              room: room.name,
              from: formatDay(from),
              to: formatDay(to),
              guests,
              total: money(total),
            }}
          />
        )}
      </Modal>
    </Layout>
  );
};

export default ShowcaseBooking;
