import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { addBarang } from '../api';
import { useNavigation } from '@react-navigation/native';

export default function TambahBarang() {
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [stok, setStok] = useState('');
  const [kategori, setKategori] = useState('');
  
  const navigation = useNavigation();

  // Animated value for fade in
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSave = async () => {
    await addBarang({ 
      nama_barang: nama, 
      harga: Number(harga), 
      stok: Number(stok), 
      kategori 
    });
    navigation.goBack();
  }

  return (
    <Animated.View style={{ 
      flex: 1, 
      backgroundColor: '#f5f5f5',
      padding: 20, 
     opacity: fadeAnim 
    }}>
      <Text variant='headlineMedium' style={{ color: '#4285F4', fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
        Tambah Barang
      </Text>

      <View style={{ backgroundColor: '#ffffff', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 5 }}>
        <TextInput
          label='Nama Barang'
          value={nama}
          onChangeText={setNama}
          mode='outlined'
          outlineColor='#4285F4'
          activeOutlineColor='#4285F4'
          style={{ marginBottom: 16, borderRadius: 12, backgroundColor: '#f1f1f1' }} />

        <TextInput
          label='Harga'
          keyboardType='number-pad'
          value={harga}
          onChangeText={setHarga}
          mode='outlined'
          outlineColor='#4285F4'
          activeOutlineColor='#4285F4'
          style={{ marginBottom: 16, borderRadius: 12, backgroundColor: '#f1f1f1' }} />

        <TextInput
          label='Stok'
          keyboardType='number-pad'
          value={stok}
          onChangeText={setStok}
          mode='outlined'
          outlineColor='#4285F4'
          activeOutlineColor='#4285F4'
          style={{ marginBottom: 16, borderRadius: 12, backgroundColor: '#f1f1f1' }} />

        <TextInput
          label='Kategori'
          value={kategori}
          onChangeText={setKategori}
          mode='outlined'
          outlineColor='#4285F4'
          activeOutlineColor='#4285F4'
          style={{ marginBottom: 16, borderRadius: 12, backgroundColor: '#f1f1f1' }} />

        <Button
          mode='contained'
          onPress={handleSave}
          buttonColor='#4285F4'
          textColor='#ffffff'
          style={{ paddingVertical: 12, borderRadius: 12 }}>
          Simpan
        </Button>
      </View>
    </Animated.View>
  )
}

