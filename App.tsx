import { useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from './src/components/ScreenHeader';
import { SectionHeader } from './src/components/SectionHeader';
import { BookCarousel } from './src/components/BookCarousel';
import { ChapterChips } from './src/components/ChapterChips';
import { VerseList } from './src/components/VerseList';
import { ErrorBanner } from './src/components/ErrorBanner';
import { useBibleData } from './src/hooks/useBibleData';
import { useBibleTheme } from './src/hooks/useBibleTheme';

export default function App() {
  const { theme, toggleTheme } = useBibleTheme();
  const {
    books,
    chapters,
    verses,
    selectedBookId,
    selectedChapter,
    loadingBooks,
    loadingChapters,
    loadingVerses,
    error,
    setSelectedBookId,
    setSelectedChapter,
    dismissError,
  } = useBibleData();

  const verseHeaderTitle = useMemo(() => {
    const selectedBook = books.find((book) => book.id === selectedBookId);
    return selectedBook ? `${selectedBook.name} ${selectedChapter}` : 'Verses';
  }, [books, selectedBookId, selectedChapter]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
        <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
        <View style={styles.container}>
          <ScreenHeader
            title="Daily Bible"
            subtitle="Browse books, chapters, and verses from the KJV."
            theme={theme}
            onToggleTheme={toggleTheme}
          />

          <SectionHeader theme={theme} title="Books" loading={loadingBooks} />
          <BookCarousel
            books={books}
            selectedBookId={selectedBookId}
            onSelect={setSelectedBookId}
            theme={theme}
          />

          <SectionHeader theme={theme} title="Chapters" loading={loadingChapters} />
          <ChapterChips
            chapters={chapters}
            selectedChapter={selectedChapter}
            onSelect={setSelectedChapter}
            theme={theme}
          />

          <SectionHeader theme={theme} title={verseHeaderTitle} loading={loadingVerses} />

          {error && <ErrorBanner message={error} onDismiss={dismissError} theme={theme} />}

          <VerseList verses={verses} loading={loadingVerses} theme={theme} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
});
