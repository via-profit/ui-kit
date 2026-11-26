import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import ThemeProvider from '@via-profit/ui-kit/ThemeProvider';

import Breadcrumbs from '~/components/Breadcrumbs';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import { useUi } from '~/providers/UiProvider';
import { useT } from '~/translations';
import type { DocPageProps } from '~/pages/DocPage';
import PlaygroundPanel from './PlaygroundPanel';
import PlaygroundPreview from './PlaygroundPreview';
import { PlaygroundValues, DEFAULT_VALUES, PADDING_KINDS, toEm } from './values';

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
  border: 1px solid ${({ theme }) => theme.color.border.toString()};
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.color.backgroundPrimary.toString()};
  /* The font size of the preview is set by the panel: the page font does not change it */
  line-height: 1.5;
`;

const PanelColumn = styled.div`
  position: sticky;
  top: calc(var(--header-height) + 1rem);
  max-height: calc(100vh - var(--header-height) - 2rem);
  overflow-y: auto;
  border-radius: 0.75rem;

  /* Above the preview on the narrow screens: the sliders and the result are next to each other */
  @media all and (max-width: 1200px) {
    position: static;
    order: -1;
    max-height: none;
  }
`;

/**
 * The playground of the paddings: the description with the interactive preview.
 * The table of contents is not shown: the text is short
 */
const Playground: React.FC<DocPageProps> = ({ doc, content }) => {
  const { locale } = useUi();
  const t = useT();
  const theme = useTheme();
  const [values, setValues] = React.useState<PlaygroundValues>(DEFAULT_VALUES);

  // The theme of the site with the paddings of the panel: the colors follow the light and the dark theme
  const previewTheme = React.useMemo(
    () => ({
      ...theme,
      padding: PADDING_KINDS.reduce(
        (padding, kind) => ({
          ...padding,
          [kind]: { y: toEm(values.padding[kind].y), x: toEm(values.padding[kind].x) },
        }),
        theme.padding,
      ),
    }),
    [theme, values.padding],
  );

  return (
    <Page>
      <Breadcrumbs
        items={[{ label: t('breadcrumbs.docs'), to: '/docs' }, { label: doc.title[locale] }]}
      />
      <DocsArticle>
        <RenderMarkdown>{content}</RenderMarkdown>
      </DocsArticle>
      <Layout>
        <Preview style={{ fontSize: values.fontSize }}>
          <ThemeProvider theme={previewTheme}>
            <PlaygroundPreview />
          </ThemeProvider>
        </Preview>
        <PanelColumn>
          <PlaygroundPanel values={values} onChange={setValues} />
        </PanelColumn>
      </Layout>
    </Page>
  );
};

export default Playground;
