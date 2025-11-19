const API_BASE = 'https://bible-go-api.rkeplin.com/v1';

export type Book = {
  id: number;
  name: string;
  testament: string;
  genre: {
    id: number;
    name: string;
  };
};

export type Verse = {
  id: number;
  book: {
    id: number;
    name: string;
    testament: string;
  };
  chapterId: number;
  verseId: number;
  verse: string;
};

export type ChapterNumber = {
  id: number;
};

async function fetchJSON<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export const bibleApi = {
  fetchBooks: () => fetchJSON<Book[]>('/books'),
  fetchChapters: (bookId: number) => fetchJSON<ChapterNumber[]>(`/books/${bookId}/chapters`),
  fetchVerses: (bookId: number, chapterId: number) =>
    fetchJSON<Verse[]>(`/books/${bookId}/chapters/${chapterId}`),
};
