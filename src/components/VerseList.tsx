import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Verse } from '../api/bible';
import { Theme } from '../theme/theme';

export type VerseEdit = {
  id: string;
  original: string;
  replacement: string;
};

type VerseListProps = {
  verses: Verse[];
  loading: boolean;
  theme: Theme;
  edits: Record<number, VerseEdit[]>;
  notes: Record<number, string>;
  onEditVerse: (verse: Verse) => void;
  onNoteVerse: (verse: Verse) => void;
  onRemoveNote: (verseId: number) => void;
};

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const renderVerseText = (text: string, verseEdits: VerseEdit[], theme: Theme) => {
  if (!verseEdits.length) {
    return <Text style={[styles.verseText, { color: theme.colors.verseText }]}>{text}</Text>;
  }

  type Node = string | { original: string; replacement: string };
  let nodes: Node[] = [text];

  verseEdits.forEach((edit) => {
    const original = edit.original.trim();
    if (!original) {
      return;
    }
    const regex = new RegExp(escapeRegExp(original), 'gi');
    const nextNodes: Node[] = [];

    nodes.forEach((node) => {
      if (typeof node !== 'string') {
        nextNodes.push(node);
        return;
      }

      let lastIndex = 0;
      let match;
      while ((match = regex.exec(node)) !== null) {
        if (match.index > lastIndex) {
          nextNodes.push(node.slice(lastIndex, match.index));
        }

        nextNodes.push({
          original: match[0],
          replacement: edit.replacement,
        });
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < node.length) {
        nextNodes.push(node.slice(lastIndex));
      }
    });

    nodes = nextNodes;
  });

  return (
    <Text style={[styles.verseText, { color: theme.colors.verseText }]}>
      {nodes.map((node, index) =>
        typeof node === 'string' ? (
          <Text key={`text-${index}`} style={{ color: theme.colors.verseText }}>
            {node}
          </Text>
        ) : (
          <Text key={`edit-${index}`}>
            <Text style={styles.strikeText}>{node.original}</Text>
            <Text style={styles.replacementText}> {node.replacement}</Text>
          </Text>
        ),
      )}
    </Text>
  );
};

export function VerseList({
  verses,
  loading,
  theme,
  edits,
  notes,
  onEditVerse,
  onNoteVerse,
  onRemoveNote,
}: VerseListProps) {
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
      <View style={styles.verseHeader}>
        <Text style={[styles.verseNumber, { color: theme.colors.verseNumber }]}>
          {item.verseId}
        </Text>
        <View style={styles.verseActions}>
          {notes[item.id] && <Text style={styles.noteBadge}>Note</Text>}
          {(edits[item.id]?.length ?? 0) > 0 && <Text style={styles.editedBadge}>Edited</Text>}
          <TouchableOpacity onPress={() => onNoteVerse(item)}>
            <Text style={styles.noteLink}>{notes[item.id] ? 'Edit note' : 'Add note'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onEditVerse(item)}>
            <Text style={styles.editLink}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
      {renderVerseText(item.verse, edits[item.id] ?? [], theme)}
          {notes[item.id] && (
            <View
              style={[
                styles.noteCard,
                {
                  backgroundColor: theme.colors.surfaceAlt,
                  borderColor: theme.colors.chipBorder,
                },
              ]}
            >
              <View style={styles.noteHeader}>
                <Text style={[styles.noteLabel, { color: theme.colors.sectionTitle }]}>
                  Your note
                </Text>
                <TouchableOpacity onPress={() => onRemoveNote(item.id)}>
                  <Text style={styles.removeNote}>Remove</Text>
                </TouchableOpacity>
              </View>
              <Text style={[styles.noteText, { color: theme.colors.text }]}>{notes[item.id]}</Text>
            </View>
          )}
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
    paddingBottom: 0,
    paddingTop: 12,
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
  verseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  verseNumber: {
    fontWeight: '700',
    marginBottom: 6,
  },
  verseActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  noteLink: {
    color: '#fbbf24',
    fontSize: 13,
    fontWeight: '600',
  },
  editLink: {
    color: '#60a5fa',
    fontSize: 13,
    fontWeight: '600',
  },
  editedBadge: {
    color: '#22d3ee',
    fontSize: 12,
    fontWeight: '600',
  },
  noteBadge: {
    color: '#fbbf24',
    fontSize: 12,
    fontWeight: '600',
  },
  verseText: {
    lineHeight: 20,
  },
  strikeText: {
    textDecorationLine: 'line-through',
    color: '#f87171',
  },
  replacementText: {
    color: '#34d399',
    fontWeight: '600',
  },
  noteCard: {
    marginTop: 8,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  noteLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  removeNote: {
    fontSize: 12,
    color: '#f87171',
    fontWeight: '600',
  },
  noteText: {
    lineHeight: 18,
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
