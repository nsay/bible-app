import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Book } from '../api/bible';
import { Theme } from '../theme/theme';

type BookCarouselProps = {
  books: Book[];
  selectedBookId: number | null;
  onSelect: (bookId: number) => void;
  theme: Theme;
};

export function BookCarousel({ books, selectedBookId, onSelect, theme }: BookCarouselProps) {
  return (
    <FlatList
      horizontal
      data={books}
      keyExtractor={(item) => String(item.id)}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.bookList}
      renderItem={({ item }) => {
        const isActive = item.id === selectedBookId;
        return (
          <TouchableOpacity
            style={[
              styles.bookPill,
              {
                backgroundColor: isActive
                  ? theme.colors.bookPillBgActive
                  : theme.colors.bookPillBg,
              },
            ]}
            onPress={() => onSelect(item.id)}
          >
            <Text
              style={[
                styles.bookName,
                {
                  color: isActive ? theme.colors.bookNameActive : theme.colors.bookName,
                },
              ]}
            >
              {item.name}
            </Text>
            <Text
              style={[
                styles.bookMeta,
                {
                  color: isActive ? theme.colors.bookMetaActive : theme.colors.bookMeta,
                },
              ]}
            >
              {item.testament} · {item.genre.name}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  bookList: {
    paddingVertical: 6,
    paddingLeft: 4,
    paddingRight: 12,
  },
  bookPill: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 18,
    width: 200,
    marginRight: 12,
  },
  bookName: {
    fontSize: 16,
    fontWeight: '600',
  },
  bookMeta: {
    fontSize: 12,
    marginTop: 2,
  },
});
