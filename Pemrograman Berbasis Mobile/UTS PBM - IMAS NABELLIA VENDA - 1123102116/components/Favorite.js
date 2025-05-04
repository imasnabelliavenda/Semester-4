import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem('favorites');
      if (stored) setFavorites(JSON.parse(stored));
    } catch (err) {
      console.error('Failed to load favorites', err);
    }
  };

  const addFavorite = (film) => {
    if (!favorites.some(f => f.id === film.id)) {
      setFavorites(prev => [...prev, film]);
    }
  };

  const removeFavorite = (filmId) => {
    setFavorites(prev => prev.filter(f => f.id !== filmId));
  };

  const isFavorite = (filmId) => {
    return favorites.some(f => f.id === filmId);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
