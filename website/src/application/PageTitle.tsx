import React from 'react';
import { useMatches } from 'react-router-dom';

export const formatPageTitle = (sectionTitle?: string) =>
  sectionTitle ? `${sectionTitle} · @via-profit/ui-kit` : '@via-profit/ui-kit';

const PageTitle = () => {
  // `handle` of the route is the title of its page
  const title = formatPageTitle(useMatches().at(-1)?.handle as string | undefined);

  React.useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
};

export default PageTitle;
