import { useMemo, useState } from 'react';
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
import { POPULAR_TRANSLATIONS } from './src/constants/translations';

export default function App() {
  const { theme, toggleTheme } = useBibleTheme();
  const [translation, setTranslation] = useState(POPULAR_TRANSLATIONS[0].value);

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
  } = useBibleData(translation);

  const verseHeaderTitle = useMemo(() => {
    const selectedBook = books.find((book) => book.id === selectedBookId);
    return selectedBook ? `${selectedBook.name} ${selectedChapter}` : 'Verses';
  }, [books, selectedBookId, selectedChapter]);

  const selectedTranslationOption = useMemo(
    () => POPULAR_TRANSLATIONS.find((option) => option.value === translation),
    [translation],
  );
  const headerSubtitle = selectedTranslationOption
    ? `Reading ${selectedTranslationOption.label}`
    : 'Browse books, chapters, and verses.';

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
        <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
        <View style={styles.container}>
          <ScreenHeader
            title="Daily Bible"
            subtitle={headerSubtitle}
            theme={theme}
            onToggleTheme={toggleTheme}
            translationOptions={POPULAR_TRANSLATIONS}
            selectedTranslation={translation}
            onSelectTranslation={setTranslation}
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
