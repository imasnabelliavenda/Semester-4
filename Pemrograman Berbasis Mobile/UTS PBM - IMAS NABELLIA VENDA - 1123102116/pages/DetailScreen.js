import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';

const API_KEY = 'b7ced6fb89271793519bc78cf2081059';

export default function DetailScreen({ route }) {
  const { film } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {
    try {
      const type = film.media_type || 'movie';
      const res = await fetch(`https://api.themoviedb.org/3/${type}/${film.id}?api_key=${API_KEY}&language=en-US`);
      const json = await res.json();
      setDetails(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !details) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e91e63" />
      </View>
    );
  }

  const releaseYear = (details.release_date || details.first_air_date || '').slice(0, 4);
  const runtime = details.runtime || details.episode_run_time?.[0] || '-';
  const genres = details.genres?.map(g => g.name).join(', ') || '-';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${details.poster_path}` }}
          style={styles.poster}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.title}>{details.title || details.name}</Text>
      <Text style={styles.infoText}>📅 Tahun Rilis: {releaseYear}</Text>
      <Text style={styles.infoText}>🎞️ Genre: {genres}</Text>
      <Text style={styles.infoText}>⭐ Rating: {film.vote_average?.toFixed(1) || '0.0'} / 10</Text>
      <Text style={styles.infoText}>⏱️ Durasi: {runtime} menit</Text>
      <Text style={styles.overview}>{details.overview}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poster: {
    width: '50%',
    aspectRatio: 2 / 3,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#e91e63' },
  infoText: { fontSize: 14, marginBottom: 6, color: '#555' },
  overview: { fontSize: 16, marginTop: 12, lineHeight: 22, color: '#333' },
});
