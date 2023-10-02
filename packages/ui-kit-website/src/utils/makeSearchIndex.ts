import SearchIndexer from '~/services/SearchIndexer';

const bootstrap = async () => {
  const Indexer = new SearchIndexer();

  await Indexer.addToindex('', 'Lorem ipsum', 'ru-RU');
};

bootstrap();
