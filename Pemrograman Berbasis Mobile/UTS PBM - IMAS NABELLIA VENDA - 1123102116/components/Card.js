import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

const FilmCard = ({ film, navigation, onToggleFavorite, isFavorite }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w200${film.poster_path}` }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{film.title || film.name}</Text>
        <Text style={styles.rating}>⭐ {film.vote_average?.toFixed(1) || '0.0'} / 10</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Detail', { film })}
          style={styles.detailButton}
        >
          <Text style={styles.detailText}>Lihat Detail</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => onToggleFavorite(film)}>
        <Icon
          name={isFavorite ? 'heart' : 'heart-o'}
          size={24}
          color="#e91e63"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    padding: 10,
    position: 'relative',
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  title: { fontWeight: 'bold', fontSize: 16 },
  rating: { fontSize: 14, color: '#444' },
  detailButton: {
    backgroundColor: '#e91e63',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  detailText: { color: '#fff', fontWeight: 'bold' },
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});

export default FilmCard;
