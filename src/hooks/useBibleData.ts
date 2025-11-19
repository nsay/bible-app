import { useEffect, useMemo, useState } from 'react';
import { bibleApi, Book, ChapterNumber, Verse } from '../api/bible';

type UseBibleDataState = {
  books: Book[];
  chapters: number[];
  verses: Verse[];
  selectedBookId: number | null;
  selectedChapter: number;
  loadingBooks: boolean;
  loadingChapters: boolean;
  loadingVerses: boolean;
  error: string | null;
};

type UseBibleDataActions = {
  setSelectedBookId: (bookId: number) => void;
  setSelectedChapter: (chapter: number) => void;
  dismissError: () => void;
};

const initialState: UseBibleDataState = {
  books: [],
  chapters: [],
  verses: [],
  selectedBookId: null,
  selectedChapter: 1,
  loadingBooks: true,
  loadingChapters: false,
  loadingVerses: false,
  error: null,
};

export function useBibleData(translation: string): UseBibleDataState & UseBibleDataActions {
  const [state, setState] = useState<UseBibleDataState>(initialState);

  useEffect(() => {
    let canceled = false;

    const loadBooks = async () => {
      try {
        setState((prev) => ({ ...prev, loadingBooks: true, error: null }));
        const data = await bibleApi.fetchBooks();
        if (canceled) {
          return;
        }

        setState((prev) => ({
          ...prev,
          books: data,
          selectedBookId: prev.selectedBookId ?? data[0]?.id ?? null,
          loadingBooks: false,
        }));
      } catch (error) {
        console.error(error);
        if (!canceled) {
          setState((prev) => ({
            ...prev,
            loadingBooks: false,
            error: 'Unable to load books. Please try again.',
          }));
        }
      }
    };

    loadBooks();
    return () => {
      canceled = true;
    };
  }, []);

  useEffect(() => {
    if (!state.selectedBookId) {
      return;
    }

    let canceled = false;

    const loadChapters = async () => {
      try {
        setState((prev) => ({ ...prev, loadingChapters: true, error: null }));
        const data = await bibleApi.fetchChapters(state.selectedBookId as number);
        if (canceled) {
          return;
        }

        const chapterNumbers = data.map((chapter: ChapterNumber) => chapter.id);
        setState((prev) => ({
          ...prev,
          chapters: chapterNumbers,
          selectedChapter: chapterNumbers.includes(prev.selectedChapter)
            ? prev.selectedChapter
            : chapterNumbers[0] ?? 1,
          loadingChapters: false,
        }));
      } catch (error) {
        console.error(error);
        if (!canceled) {
          setState((prev) => ({
            ...prev,
            loadingChapters: false,
            error: 'Unable to load chapters. Please try again.',
          }));
        }
      }
    };

    loadChapters();
    return () => {
      canceled = true;
    };
  }, [state.selectedBookId]);

  useEffect(() => {
    if (!state.selectedBookId || !state.selectedChapter) {
      return;
    }

    let canceled = false;

    const loadVerses = async () => {
      try {
        setState((prev) => ({ ...prev, loadingVerses: true, error: null }));
        const data = await bibleApi.fetchVerses(
          state.selectedBookId!,
          state.selectedChapter,
          translation,
        );
        if (canceled) {
          return;
        }

        setState((prev) => ({
          ...prev,
          verses: data,
          loadingVerses: false,
        }));
      } catch (error) {
        console.error(error);
        if (!canceled) {
          setState((prev) => ({
            ...prev,
            loadingVerses: false,
            error: 'Unable to load verses. Please try again.',
          }));
        }
      }
    };

    loadVerses();
    return () => {
      canceled = true;
    };
  }, [state.selectedBookId, state.selectedChapter, translation]);

  const actions = useMemo<UseBibleDataActions>(
    () => ({
      setSelectedBookId: (bookId) =>
        setState((prev) => ({
          ...prev,
          selectedBookId: bookId,
        })),
      setSelectedChapter: (chapter) =>
        setState((prev) => ({
          ...prev,
          selectedChapter: chapter,
        })),
      dismissError: () =>
        setState((prev) => ({
          ...prev,
          error: null,
        })),
    }),
    [],
  );

  return { ...state, ...actions };
}
