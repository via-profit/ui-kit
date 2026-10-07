import React from 'react';
import styled from '@emotion/styled';
import Surface from '@via-profit/ui-kit/src/Surface';
import Stack from '@via-profit/ui-kit/src/Stack';
import Grid from '@via-profit/ui-kit/src/Grid';
import Avatar from '@via-profit/ui-kit/src/Avatar';
import TextField from '@via-profit/ui-kit/src/TextField';
import Badge from '@via-profit/ui-kit/src/Badge';
import Switch from '@via-profit/ui-kit/src/Switch';
import ButtonGroup from '@via-profit/ui-kit/src/ButtonGroup';
import Button from '@via-profit/ui-kit/src/Button';
import Accordion from '@via-profit/ui-kit/src/Accordion';
import Modal from '@via-profit/ui-kit/src/Modal';
import { H4, Paragraph } from '@via-profit/ui-kit/src/Typography';
import { FormattedMessage, useIntl } from 'react-intl';

type Settings = {
  readonly name: string;
  readonly email: string;
  readonly interests: readonly string[];
  readonly notifications: Readonly<Record<'email' | 'push' | 'sms', boolean>>;
  readonly theme: string;
};

const Muted = styled.span`
  font-size: 0.85em;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const Title = styled(H4)`
  margin: 0;
`;

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0].toUpperCase())
    .join('');

const ShowcaseProfile: React.FC = () => {
  const intl = useIntl();

  const initialSettings: Settings = React.useMemo(
    () => ({
      name: intl.formatMessage({ defaultMessage: 'Анна Смирнова' }),
      email: 'anna@example.com',
      interests: [
        intl.formatMessage({ defaultMessage: 'Дизайн' }),
        intl.formatMessage({ defaultMessage: 'Путешествия' }),
      ],
      notifications: { email: true, push: false, sms: false },
      theme: 'system',
    }),
    [intl],
  );

  const [saved, setSaved] = React.useState(initialSettings);
  const [settings, setSettings] = React.useState(initialSettings);
  const [newInterest, setNewInterest] = React.useState('');
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [isDeleted, setIsDeleted] = React.useState(false);

  const isDirty = JSON.stringify(settings) !== JSON.stringify(saved);
  const update = (patch: Partial<Settings>) => setSettings(current => ({ ...current, ...patch }));
  const toggleNotification = (key: keyof Settings['notifications'], value: boolean) =>
    update({ notifications: { ...settings.notifications, [key]: value } });

  if (isDeleted) {
    return (
      <Surface header={intl.formatMessage({ defaultMessage: 'Аккаунт удалён' })}>
        <Button onClick={() => setIsDeleted(false)}>
          <FormattedMessage defaultMessage="Восстановить" />
        </Button>
      </Surface>
    );
  }

  return (
    <Stack gap="lg" style={{ maxWidth: '40em' }}>
      <Surface
        header={intl.formatMessage({ defaultMessage: 'Профиль' })}
        footer={
          <Stack direction="row" gap="sm">
            <Button disabled={!isDirty} onClick={() => setSettings(saved)}>
              <FormattedMessage defaultMessage="Отменить" />
            </Button>
            <Button color="primary" disabled={!isDirty} onClick={() => setSaved(settings)}>
              <FormattedMessage defaultMessage="Сохранить" />
            </Button>
          </Stack>
        }
      >
        <Stack gap="lg">
          <Stack direction="row">
            <Avatar color="primary" style={{ fontSize: '1.2em' }}>
              {initials(settings.name)}
            </Avatar>
            <Stack gap="xs">
              {settings.name || '—'}
              <Muted>{settings.email}</Muted>
            </Stack>
          </Stack>
          <Grid minColumnWidth="14em" gap="lg" rowGap="sm">
            <TextField
              fullWidth
              label={<FormattedMessage defaultMessage="Имя" />}
              value={settings.name}
              onChange={event => update({ name: event.currentTarget.value })}
            />
            <TextField
              fullWidth
              type="email"
              label={<FormattedMessage defaultMessage="Email" />}
              value={settings.email}
              onChange={event => update({ email: event.currentTarget.value })}
            />
          </Grid>

          <Stack gap="sm" align="flex-start">
            <Title>
              <FormattedMessage defaultMessage="Интересы" />
            </Title>
            <Stack direction="row" gap="sm" wrap>
              {settings.interests.map(interest => (
                <Badge
                  key={interest}
                  color="primary"
                  variant="outlined"
                  deleteButtonLabel={intl.formatMessage(
                    { defaultMessage: 'Удалить «{interest}»' },
                    { interest },
                  )}
                  onDelete={() =>
                    update({ interests: settings.interests.filter(item => item !== interest) })
                  }
                >
                  {interest}
                </Badge>
              ))}
            </Stack>
            <form
              onSubmit={event => {
                event.preventDefault();
                const value = newInterest.trim();
                if (value && !settings.interests.includes(value)) {
                  update({ interests: [...settings.interests, value] });
                }
                setNewInterest('');
              }}
            >
              <Stack direction="row" gap="sm" align="flex-end">
                <TextField
                  label={<FormattedMessage defaultMessage="Новый интерес" />}
                  value={newInterest}
                  onChange={event => setNewInterest(event.currentTarget.value)}
                />
                <Button type="submit" disabled={newInterest.trim() === ''}>
                  <FormattedMessage defaultMessage="Добавить" />
                </Button>
              </Stack>
            </form>
          </Stack>

          <Stack gap="sm" align="flex-start">
            <Title>
              <FormattedMessage defaultMessage="Уведомления" />
            </Title>
            <Switch
              checked={settings.notifications.email}
              onChange={event => toggleNotification('email', event.currentTarget.checked)}
            >
              <FormattedMessage defaultMessage="Письма о заказах" />
            </Switch>
            <Switch
              checked={settings.notifications.push}
              onChange={event => toggleNotification('push', event.currentTarget.checked)}
            >
              <FormattedMessage defaultMessage="Уведомления в браузере" />
            </Switch>
            <Switch
              disabled
              checked={settings.notifications.sms}
              onChange={event => toggleNotification('sms', event.currentTarget.checked)}
            >
              <FormattedMessage defaultMessage="SMS — доступно после подтверждения телефона" />
            </Switch>
          </Stack>

          <Stack gap="sm" align="flex-start">
            <Title>
              <FormattedMessage defaultMessage="Тема оформления" />
            </Title>
            <ButtonGroup
              aria-label={intl.formatMessage({ defaultMessage: 'Тема оформления' })}
              value={settings.theme}
              onChange={theme => theme && update({ theme })}
            >
              <Button value="light">
                <FormattedMessage defaultMessage="Светлая" />
              </Button>
              <Button value="dark">
                <FormattedMessage defaultMessage="Тёмная" />
              </Button>
              <Button value="system">
                <FormattedMessage defaultMessage="Как в системе" />
              </Button>
            </ButtonGroup>
          </Stack>
        </Stack>
      </Surface>

      <Accordion header={intl.formatMessage({ defaultMessage: 'Удаление аккаунта' })}>
        <Paragraph>
          <FormattedMessage defaultMessage="Все заказы, адреса и настройки будут удалены без возможности восстановления." />
        </Paragraph>
        <Button color="#e0435f" variant="outlined" onClick={() => setIsDeleteOpen(true)}>
          <FormattedMessage defaultMessage="Удалить аккаунт" />
        </Button>
      </Accordion>

      <Modal
        variant="confirm-box"
        isOpen={isDeleteOpen}
        header={intl.formatMessage({ defaultMessage: 'Удалить аккаунт?' })}
        confirmButtonLabel={<FormattedMessage defaultMessage="Удалить" />}
        dismissButtonLabel={<FormattedMessage defaultMessage="Отмена" />}
        onRequestYes={() => {
          setIsDeleteOpen(false);
          setIsDeleted(true);
        }}
        onRequestClose={() => setIsDeleteOpen(false)}
      >
        <FormattedMessage defaultMessage="Это действие нельзя отменить." />
      </Modal>
    </Stack>
  );
};

export default ShowcaseProfile;
