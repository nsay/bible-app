import { useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from './src/components/ScreenHeader';
import { VerseList } from './src/components/VerseList';
import { ErrorBanner } from './src/components/ErrorBanner';
import { BookPicker } from './src/components/BookPicker';
import { ChapterPicker } from './src/components/ChapterPicker';
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

          <View style={styles.pickerRow}>
            <View style={styles.pickerColumn}>
              <BookPicker
                books={books}
                selectedBookId={selectedBookId}
                onSelect={setSelectedBookId}
                theme={theme}
              />
            </View>
            <View style={styles.pickerColumn}>
              <ChapterPicker
                chapters={chapters}
                selectedChapter={selectedChapter}
                onSelect={setSelectedChapter}
                theme={theme}
              />
            </View>
          </View>

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
  pickerRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  pickerColumn: {
    flex: 1,
  },
});
