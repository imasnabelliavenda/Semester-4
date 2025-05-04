import React, { useContext } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import FilmCard from '../components/Card';
import { FavoriteContext } from '../components/Favorite';

export default function FavoriteScreen({ navigation }) {
  const {
    favorites,
    removeFavorite,
    isFavorite,
  } = useContext(FavoriteContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Film Favorit</Text>
      {favorites.length === 0 ? (
        <Text style={styles.empty}>Belum ada film yang ditandai favorit.</Text>
      ) : (
        <View style={styles.filmList}>
          {favorites.map((film) => (
            <FilmCard
              key={`${film.id}-${film.media_type}`}
              film={film}
              navigation={navigation}
              isFavorite={isFavorite(film.id)}
              onToggleFavorite={() => removeFavorite(film.id)}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e91e63',
    marginBottom: 12,
  },
  empty: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
  filmList: {
    gap: 12,
  },
});
