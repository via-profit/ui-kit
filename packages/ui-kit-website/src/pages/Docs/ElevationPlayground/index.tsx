import React from 'react';
import styled from '@emotion/styled';
import { Global, css, useTheme } from '@emotion/react';
import { useIntl } from 'react-intl';
import Button from '@via-profit/ui-kit/src/Button';
import ButtonGroup from '@via-profit/ui-kit/src/ButtonGroup';
import Switch from '@via-profit/ui-kit/src/Switch';
import TextField from '@via-profit/ui-kit/src/TextField';
import ThemeProvider from '@via-profit/ui-kit/src/ThemeProvider';

import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ElevationPreview from './ElevationPreview';
import content from './README.md';

type Elevation = {
  readonly popup: string;
  readonly surface: string;
};

type PresetName = 'own' | 'test' | 'none';

type Finding = {
  readonly label: string;
  readonly shadow: string;
};

// Bright and unusual: any other shadow on the screen is not from the theme
const PRESETS: Record<PresetName, Elevation> = {
  own: { popup: '', surface: '' },
  test: {
    popup: '0 0 0 3px rgb(255, 0, 170), 0 12px 32px rgba(255, 0, 170, 0.45)',
    surface: '0 0 0 3px rgb(0, 200, 120), 0 8px 20px rgba(0, 200, 120, 0.4)',
  },
  none: { popup: 'none', surface: 'none' },
};

const FOREIGN_ATTRIBUTE = 'data-foreign-shadow';

const Page = styled.div`
  flex: 1;
  min-width: 0;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 22rem;
  align-items: start;
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media all and (max-width: 1200px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Preview = styled.div`
  min-width: 0;
  font-size: 15px;
  line-height: 1.5;
  border: 1px solid ${({ theme }) => theme.color.border.toString()};
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.color.backgroundPrimary.toString()};
`;

const PanelColumn = styled.div`
  position: sticky;
  top: calc(var(--header-height) + 1rem);
  max-height: calc(100vh - var(--header-height) - 2rem);
  overflow-y: auto;
  border-radius: 0.75rem;

  @media all and (max-width: 1200px) {
    position: static;
    order: -1;
    max-height: none;
  }
`;

const Panel = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
  border: 1px solid ${({ theme }) => theme.color.border.toString()};
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.color.backgroundPrimary.toString()};
`;

const Findings = styled.ol`
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.8rem;
  overflow-wrap: anywhere;

  & li + li {
    margin-top: 0.5rem;
  }

  & code {
    color: ${({ theme }) => theme.color.textSecondary.toString()};
  }
`;

const Hint = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

/**
 * The computed value of the shadow: the browser writes the colors and the lengths its own way,
 * so the shadows of the elements are compared with the computed values of the theme
 */
const computeShadow = (value: string, host: HTMLElement) => {
  if (!value) {
    return '';
  }
  const probe = document.createElement('div');
  probe.style.boxShadow = value;
  host.appendChild(probe);
  const computed = getComputedStyle(probe).boxShadow;
  probe.remove();

  return computed;
};

/**
 * The label of the element: the emotion labels of the dev build (`app-1x2y3z-SwitchDot`) say the part
 */
const describe = (element: Element) => {
  const label = [...element.classList]
    .map(name => name.match(/^app-[a-z0-9]+-(.+)$/)?.[1])
    .filter(Boolean)
    .pop();

  return `<${element.tagName.toLowerCase()}>${label ? ` ${label}` : ''}`;
};

const ElevationPlayground: React.FC = () => {
  const intl = useIntl();
  const theme = useTheme();
  const previewRef = React.useRef<HTMLDivElement>(null);
  const [elevation, setElevation] = React.useState<Elevation>(PRESETS.test);
  const [highlight, setHighlight] = React.useState(true);
  const [findings, setFindings] = React.useState<readonly Finding[]>([]);

  const preset =
    (Object.keys(PRESETS) as PresetName[]).find(
      name =>
        PRESETS[name].popup === elevation.popup && PRESETS[name].surface === elevation.surface,
    ) || null;

  const previewTheme = React.useMemo(
    () => ({
      ...theme,
      elevation: {
        popup: elevation.popup || undefined,
        surface: elevation.surface || undefined,
      },
    }),
    [theme, elevation],
  );

  // The popups are rendered into the portals at the end of the body: they are scanned too
  const scan = React.useCallback(() => {
    const root = previewRef.current;
    if (!root) {
      return;
    }
    document
      .querySelectorAll(`[${FOREIGN_ATTRIBUTE}]`)
      .forEach(element => element.removeAttribute(FOREIGN_ATTRIBUTE));

    if (!highlight) {
      setFindings([]);

      return;
    }

    const allowed = [
      computeShadow(elevation.popup, root),
      computeShadow(elevation.surface, root),
    ].filter(value => value && value !== 'none');
    const app = document.getElementById('app');
    const portals = [...document.body.children].filter(element => element !== app);
    const elements = [root, ...portals].flatMap(container => [...container.querySelectorAll('*')]);

    const found: Finding[] = [];
    elements.forEach(element => {
      const shadow = getComputedStyle(element).boxShadow;
      if (shadow && shadow !== 'none' && !allowed.includes(shadow)) {
        element.setAttribute(FOREIGN_ATTRIBUTE, '');
        found.push({ label: describe(element), shadow });
      }
    });
    setFindings(found);
  }, [highlight, elevation]);

  // The popups open and close at any time: scan regularly
  React.useEffect(() => {
    scan();
    const timer = setInterval(scan, 1000);

    return () => clearInterval(timer);
  }, [scan]);

  return (
    <Page>
      <Global
        styles={css`
          [${FOREIGN_ATTRIBUTE}] {
            outline: 2px dashed #ff6a00 !important;
            outline-offset: 3px !important;
          }
        `}
      />
      <DocsArticle>
        <RenderMarkdown>{content}</RenderMarkdown>
      </DocsArticle>
      <Layout>
        <Preview ref={previewRef}>
          <ThemeProvider theme={previewTheme}>
            <ElevationPreview />
          </ThemeProvider>
        </Preview>
        <PanelColumn>
          <Panel aria-label={intl.formatMessage({ defaultMessage: 'Настройки теней' })}>
            <ButtonGroup
              fullWidth
              aria-label={intl.formatMessage({ defaultMessage: 'Готовые наборы теней' })}
              value={preset}
              onChange={name => name && setElevation(PRESETS[name as PresetName])}
            >
              <Button value="own">{intl.formatMessage({ defaultMessage: 'Свои' })}</Button>
              <Button value="test">{intl.formatMessage({ defaultMessage: 'Тестовые' })}</Button>
              <Button value="none">{intl.formatMessage({ defaultMessage: 'Без теней' })}</Button>
            </ButtonGroup>
            <Hint>
              {intl.formatMessage({
                defaultMessage:
                  'Пустое значение — у компонентов остаются свои тени. Любое значение CSS box-shadow.',
              })}
            </Hint>
            <TextField
              fullWidth
              label="elevation.popup"
              value={elevation.popup}
              onChange={event => setElevation({ ...elevation, popup: event.currentTarget.value })}
            />
            <TextField
              fullWidth
              label="elevation.surface"
              value={elevation.surface}
              onChange={event => setElevation({ ...elevation, surface: event.currentTarget.value })}
            />
            <Switch checked={highlight} onChange={() => setHighlight(!highlight)}>
              {intl.formatMessage({ defaultMessage: 'Подсветить инородные тени' })}
            </Switch>
            {highlight && (
              <>
                <Hint>
                  {intl.formatMessage(
                    {
                      defaultMessage:
                        'Найдено: {count}. Это тени, которые не совпадают с тенями темы: свои тени компонентов, ореолы и рамки фокуса.',
                    },
                    { count: findings.length },
                  )}
                </Hint>
                <Findings>
                  {findings.map((finding, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <li key={index}>
                      {finding.label}
                      <br />
                      <code>{finding.shadow}</code>
                    </li>
                  ))}
                </Findings>
              </>
            )}
          </Panel>
        </PanelColumn>
      </Layout>
    </Page>
  );
};

export default ElevationPlayground;
