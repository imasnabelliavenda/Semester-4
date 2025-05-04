import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { FavoriteContext } from '../components/Favorite';
import FilmCard from '../components/Card';

const API_KEY = 'b7ced6fb89271793519bc78cf2081059';

export default function TrendingScreen({ navigation }) {
  const [trending, setTrending] = useState([]);
  const { favorites, addFavorite, removeFavorite, isFavorite } = useContext(FavoriteContext);

  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`);
      const json = await res.json();
      const withMediaType = (json.results || []).map(item => ({
        ...item,
        media_type: item.media_type || 'movie',
      }));
      setTrending(withMediaType);
    } catch (err) {
      console.error('Failed to fetch trending:', err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🔥 Trending This Week</Text>
      <View style={styles.list}>
        {trending.map(item => (
          <FilmCard
            key={`${item.id}-${item.media_type}`}
            film={item}
            navigation={navigation}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={() =>
              isFavorite(item.id) ? removeFavorite(item.id) : addFavorite(item)
            }
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#e91e63',
  },
  list: {
    gap: 12,
  },
});
