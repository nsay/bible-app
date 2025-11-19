import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { Verse } from '../api/bible';
import { Theme } from '../theme/theme';

type VerseListProps = {
  verses: Verse[];
  loading: boolean;
  theme: Theme;
};

export function VerseList({ verses, loading, theme }: VerseListProps) {
  const renderVerse = ({ item }: { item: Verse }) => (
    <View
      style={[
        styles.verseCard,
        {
          backgroundColor: theme.colors.verseCardBg,
          borderColor: theme.colors.verseCardBorder,
        },
      ]}
    >
      <Text style={[styles.verseNumber, { color: theme.colors.verseNumber }]}>{item.verseId}</Text>
      <Text style={[styles.verseText, { color: theme.colors.verseText }]}>{item.verse}</Text>
    </View>
  );

  if (loading && verses.length === 0) {
    return (
      <View style={styles.loadingState}>
        <ActivityIndicator size="large" color={theme.colors.accent} />
        <Text style={[styles.loadingText, { color: theme.colors.loadingText }]}>
          Loading verses...
        </Text>
      </View>
    );
  }

  if (!loading && verses.length === 0) {
    return (
      <View style={styles.loadingState}>
        <Text style={[styles.loadingText, { color: theme.colors.loadingText }]}>
          Select a book and chapter to start reading.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.verseFlatList}
      data={verses}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderVerse}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.verseList}
    />
  );
}

const styles = StyleSheet.create({
  verseList: {
    paddingBottom: 24,
  },
  verseFlatList: {
    flex: 1,
  },
  verseCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  verseNumber: {
    fontWeight: '700',
    marginBottom: 6,
  },
  verseText: {
    lineHeight: 20,
  },
  loadingState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    textAlign: 'center',
  },
});
