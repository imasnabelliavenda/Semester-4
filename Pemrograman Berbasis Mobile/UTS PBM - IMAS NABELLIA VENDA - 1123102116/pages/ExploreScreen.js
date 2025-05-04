import React, { useEffect, useState, useContext } from 'react';
import { View, TextInput, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FilmCard from '../components/Card';
import { FavoriteContext } from '../components/Favorite';

const API_KEY = 'b7ced6fb89271793519bc78cf2081059';
const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

export default function ExploreScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [films, setFilms] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  } = useContext(FavoriteContext);

  useEffect(() => {
    fetchGenres();
    fetchPopularMovies();
  }, []);

  const fetchGenres = async () => {
    try {
      const res = await fetch(GENRE_URL);
      const json = await res.json();
      setGenres(json.genres);
    } catch (err) {
      console.error('Failed to fetch genres:', err);
    }
  };

  const fetchPopularMovies = async () => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`);
      const json = await res.json();
      setFilms(json.results.map(item => ({ ...item, media_type: 'movie' })));
    } catch (err) {
      console.error('Failed to fetch popular movies:', err);
    }
  };

  const fetchSearchResults = async () => {
    if (!search) return;

    try {
      const [movieRes, tvRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(search)}&language=en-US`),
        fetch(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(search)}&language=en-US`)
      ]);

      const movieJson = await movieRes.json();
      const tvJson = await tvRes.json();

      const movieResults = (movieJson.results || []).map(item => ({ ...item, media_type: 'movie' }));
      const tvResults = (tvJson.results || []).map(item => ({ ...item, media_type: 'tv' }));

      setFilms([...movieResults, ...tvResults]);
      setSelectedGenre(null);
    } catch (err) {
      console.error('Failed to search:', err);
    }
  };

  const fetchMoviesByGenre = async (genreId) => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en-US`);
      const json = await res.json();
      setFilms((json.results || []).map(item => ({ ...item, media_type: 'movie' })));
      setSelectedGenre(genreId);
    } catch (err) {
      console.error('Failed to fetch by genre:', err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchRow}>
        <Text style={styles.logo}>🎬 MyMovieList</Text>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Cari film atau serial..."
          style={styles.searchInput}
          onSubmitEditing={fetchSearchResults}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreRow}>
        {genres.map(genre => (
          <TouchableOpacity
            key={genre.id}
            style={[
              styles.genreButton,
              selectedGenre === genre.id && styles.genreButtonSelected,
            ]}
            onPress={() => fetchMoviesByGenre(genre.id)}
          >
            <Text style={[
              styles.genreText,
              selectedGenre === genre.id && styles.genreTextSelected
            ]}>
              {genre.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.filmList}>
        {films.map(film => (
          <FilmCard
            key={`${film.id}-${film.media_type}`}
            film={film}
            navigation={navigation}
            isFavorite={isFavorite(film.id)}
            onToggleFavorite={() =>
              isFavorite(film.id) ? removeFavorite(film.id) : addFavorite(film)
            }
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  logo: { fontSize: 18, fontWeight: 'bold', color: '#e91e63' },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  genreRow: { marginBottom: 12 },
  genreButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
  },
  genreButtonSelected: {
    backgroundColor: '#e91e63',
    borderColor: '#e91e63',
  },
  genreText: {
    color: '#333',
    fontSize: 14,
  },
  genreTextSelected: {
    color: '#fff',
  },
  filmList: { gap: 12 },
});
