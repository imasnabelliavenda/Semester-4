import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function GenreButton({ genre, onPress, selected }) {
  return (
    <TouchableOpacity
      style={[styles.button, selected && styles.selected]}
      onPress={() => onPress(genre)}
    >
      <Text style={styles.text}>{genre}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 8
  },
  selected: {
    backgroundColor: '#cde9cd'
  },
  text: {
    fontSize: 14,
    color: '#333'
  }
});
