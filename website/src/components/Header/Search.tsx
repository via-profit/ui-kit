import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import { SearchIcon } from '~/components/Icons';
import { useUi, Locale } from '~/providers/UiProvider';
import { useT } from '~/translations';
import { docs, loadDoc } from '~/utils/docs';
import type { DocEntry } from '~/utils/docs';
import { markdownToText, parseSections } from '~/utils/markdown';

interface SearchRecord {
  readonly doc: DocEntry;
  readonly title: string;
  readonly anchor: string | null;
  readonly text: string;
}

interface SearchResult extends SearchRecord {
  readonly snippet: string;
  readonly score: number;
}

interface SearchIndex {
  readonly records: readonly SearchRecord[];
  readonly incomplete: boolean;
}

const Container = styled.div`
  position: relative;
  flex: 0 1 16rem;
  min-width: 0;

  @media all and (max-width: 900px) {
    display: none;
  }
`;

const InputWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 2.25rem;
  padding: 0 0.75rem;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border: 1px solid ${({ theme }) => theme.color.border.toString()};
  border-radius: 0.5rem;
  transition: border-color 120ms ease-out;

  &:focus-within {
    border-color: ${({ theme }) => theme.color.accentPrimary.toString()};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.color.accentPrimary.alpha(0.15).toString()};
  }
`;

const Input = styled.input`
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0;
  font: inherit;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  background: transparent;
  border: none;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.color.textSecondary.toString()};
  }

  &::-webkit-search-cancel-button {
    display: none;
  }
`;

const Kbd = styled.kbd`
  padding: 0 0.35rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  line-height: 1.2rem;
  border: 1px solid ${({ theme }) => theme.color.border.toString()};
  border-radius: 0.3rem;
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: min(28rem, 90vw);
  max-height: 24rem;
  overflow-y: auto;
  padding: 0.35rem;
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border: 1px solid ${({ theme }) => theme.color.border.toString()};
  border-radius: 0.6rem;
  box-shadow: 0 1rem 2.5rem -1rem rgba(0, 0, 0, 0.5);
`;

const Result = styled.button<{ $isActive: boolean }>`
  display: block;
  width: 100%;
  padding: 0.55rem 0.7rem;
  font: inherit;
  text-align: left;
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  background: transparent;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;

  ${({ $isActive, theme }) =>
    $isActive &&
    css`
      background-color: ${theme.color.accentPrimary.alpha(0.1).toString()};
    `}
`;

const ResultDoc = styled.div`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.accentPrimary.toString()};
`;

const ResultTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
`;

const ResultSnippet = styled.div`
  overflow: hidden;
  font-size: 0.78rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const Empty = styled.div`
  padding: 0.75rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

/**
 * Search records of all the pages of the locale. The pages are loaded once on the first search
 */
const indexCache = new Map<Locale, Promise<SearchIndex>>();

const loadIndex = (locale: Locale, docTitle: (doc: DocEntry) => string) => {
  const cached = indexCache.get(locale);
  if (cached) {
    return cached;
  }

  const promise = Promise.allSettled(
    docs.map(async doc => {
      const markdown = await loadDoc(doc);

      return parseSections(markdown)
        .filter(section => section.heading || section.body)
        .map<SearchRecord>(section => ({
          doc,
          title: section.heading?.text ?? docTitle(doc),
          anchor: section.heading && section.heading.level > 1 ? section.heading.slug : null,
          text: markdownToText(section.body.replace(/```[\s\S]*?```/g, ' ')).replace(/\s+/g, ' '),
        }));
    }),
  ).then(pages => {
    const incomplete = pages.some(page => page.status === 'rejected');
    if (incomplete) {
      indexCache.delete(locale);
    }

    return {
      incomplete,
      records: pages.flatMap(page => (page.status === 'fulfilled' ? page.value : [])),
    };
  });

  indexCache.set(locale, promise);

  return promise;
};

const search = (records: readonly SearchRecord[], query: string): SearchResult[] => {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) {
    return [];
  }

  return records
    .map(record => {
      const title = record.title.toLowerCase();
      const text = record.text.toLowerCase();
      let score = 0;

      for (const word of words) {
        if (title.includes(word)) {
          score += 10;
        } else if (text.includes(word)) {
          score += 1;
        } else {
          return null;
        }
      }

      const position = Math.max(0, text.indexOf(words[0]) - 30);
      const snippet = `${position > 0 ? '…' : ''}${record.text.slice(position, position + 120)}`;

      return { ...record, score, snippet };
    })
    .filter((result): result is SearchResult => result !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);
};

const Search: React.FC = () => {
  const { locale } = useUi();
  const t = useT();
  const navigate = useNavigate();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [query, setQuery] = React.useState('');
  const [isOpen, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState<SearchIndex | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const docTitle = React.useCallback((doc: DocEntry) => doc.title[locale], [locale]);
  const results = React.useMemo(() => search(index?.records ?? [], query), [index, query]);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    let cancelled = false;
    setIndex(null);
    void loadIndex(locale, docTitle).then(loadedIndex => {
      if (!cancelled) {
        setIndex(loadedIndex);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [isOpen, locale, docTitle]);

  React.useEffect(() => setActiveIndex(0), [query]);

  // «/» focuses the search
  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isEditable = target?.closest('input, textarea, [contenteditable="true"]');
      if (event.key === '/' && !isEditable) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const open = (result: SearchResult) => {
    navigate(`${result.doc.path}${result.anchor ? `#${result.anchor}` : ''}`);
    setOpen(false);
    setQuery('');
    inputRef.current?.blur();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex(index => Math.min(index + 1, Math.max(results.length - 1, 0)));
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex(index => Math.max(index - 1, 0));
    }
    if (event.key === 'Enter' && results[activeIndex]) {
      open(results[activeIndex]);
    }
    if (event.key === 'Escape') {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <Container>
      <InputWrapper>
        <SearchIcon />
        <Input
          ref={inputRef}
          type="search"
          value={query}
          placeholder={t('search.placeholder')}
          aria-label={t('search.placeholder')}
          onChange={event => {
            setQuery(event.currentTarget.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={onKeyDown}
        />
        {!query && <Kbd>/</Kbd>}
      </InputWrapper>

      {isOpen && query.trim() !== '' && (
        <Dropdown role="listbox">
          {results.map((result, index) => (
            <Result
              key={`${result.doc.id}-${result.anchor}-${index}`}
              type="button"
              role="option"
              aria-selected={index === activeIndex}
              $isActive={index === activeIndex}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseDown={event => event.preventDefault()}
              onClick={() => open(result)}
            >
              <ResultDoc>{result.doc.title[locale]}</ResultDoc>
              <ResultTitle>{result.title}</ResultTitle>
              {result.snippet && <ResultSnippet>{result.snippet}</ResultSnippet>}
            </Result>
          ))}
          {!index && <Empty>{t('search.loading')}</Empty>}
          {index?.incomplete && <Empty>{t('search.incomplete')}</Empty>}
          {index && !index.incomplete && results.length === 0 && <Empty>{t('search.empty')}</Empty>}
        </Dropdown>
      )}
    </Container>
  );
};

export default Search;
