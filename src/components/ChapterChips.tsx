import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Theme } from '../theme/theme';

type ChapterChipsProps = {
  chapters: number[];
  selectedChapter: number;
  onSelect: (chapter: number) => void;
  theme: Theme;
};

export function ChapterChips({ chapters, selectedChapter, onSelect, theme }: ChapterChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chapterList}
    >
      {chapters.map((chapter) => {
        const isActive = chapter === selectedChapter;
        return (
          <TouchableOpacity
            key={chapter}
            style={[
              styles.chapterChip,
              {
                borderColor: theme.colors.chipBorder,
                backgroundColor: isActive ? theme.colors.chipBgActive : theme.colors.chipBg,
              },
            ]}
            onPress={() => onSelect(chapter)}
          >
            <Text
              style={[
                styles.chapterText,
                {
                  color: isActive ? theme.colors.chipTextActive : theme.colors.chipText,
                },
              ]}
            >
              {chapter}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chapterList: {
    paddingLeft: 4,
    paddingRight: 10,
  },
  chapterChip: {
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  chapterText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
