import { useMemo, useState } from 'react';
import {
  Modal,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Book } from '../api/bible';
import { Theme } from '../theme/theme';

type BookPickerProps = {
  books: Book[];
  selectedBookId: number | null;
  onSelect: (bookId: number) => void;
  theme: Theme;
};

export function BookPicker({ books, selectedBookId, onSelect, theme }: BookPickerProps) {
  const [open, setOpen] = useState(false);
  const selectedBook = books.find((book) => book.id === selectedBookId);
  const sections = useMemo(() => {
    const grouped: Record<string, Book[]> = {};
    books.forEach((book) => {
      const title =
        book.testament === 'OT'
          ? 'Old Testament'
          : book.testament === 'NT'
          ? 'New Testament'
          : book.testament;
      grouped[title] = grouped[title] ? [...grouped[title], book] : [book];
    });

    const orderedTitles = ['Old Testament', 'New Testament', ...Object.keys(grouped)];
    return orderedTitles
      .filter((title, index, arr) => arr.indexOf(title) === index && grouped[title])
      .map((title) => ({
        title,
        data: grouped[title].sort((a, b) => a.id - b.id),
      }));
  }, [books]);

  const close = () => setOpen(false);
  const handleSelect = (bookId: number) => {
    onSelect(bookId);
    close();
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.trigger,
          {
            borderColor: theme.colors.chipBorder,
            backgroundColor: theme.colors.surfaceAlt,
          },
        ]}
        onPress={() => setOpen(true)}
        activeOpacity={0.85}
      >
        <Text style={[styles.triggerLabel, { color: theme.colors.textMuted }]}>Current Book</Text>
        <Text style={[styles.triggerValue, { color: theme.colors.sectionTitle }]}>
          {selectedBook ? selectedBook.name : 'Select a book'}
        </Text>
      </TouchableOpacity>

      <Modal transparent visible={open} animationType="fade" onRequestClose={close}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={close} />
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.chipBorder,
              },
            ]}
          >
            <Text style={[styles.modalTitle, { color: theme.colors.sectionTitle }]}>
              Choose a Book
            </Text>
            <SectionList
              sections={sections}
              keyExtractor={(item) => String(item.id)}
              renderSectionHeader={({ section }) => (
                <Text style={[styles.sectionHeader, { color: theme.colors.textMuted }]}>
                  {section.title}
                </Text>
              )}
              renderItem={({ item }) => {
                const isActive = item.id === selectedBookId;
                return (
                  <TouchableOpacity
                    style={[
                      styles.bookRow,
                      {
                        borderColor: theme.colors.chipBorder,
                        backgroundColor: isActive ? theme.colors.chipBgActive : 'transparent',
                      },
                    ]}
                    onPress={() => handleSelect(item.id)}
                  >
                    <Text
                      style={[
                        styles.bookName,
                        {
                          color: isActive ? theme.colors.chipTextActive : theme.colors.chipText,
                        },
                      ]}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={[
                        styles.bookMeta,
                        {
                          color: isActive ? theme.colors.chipTextActive : theme.colors.textMuted,
                        },
                      ]}
                    >
                      {item.genre.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  triggerLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  triggerValue: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 4,
  },
  triggerMeta: {
    fontSize: 12,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    maxHeight: '80%',
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
  },
  bookRow: {
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  bookName: {
    fontSize: 15,
    fontWeight: '600',
  },
  bookMeta: {
    fontSize: 12,
    marginTop: 4,
  },
});
