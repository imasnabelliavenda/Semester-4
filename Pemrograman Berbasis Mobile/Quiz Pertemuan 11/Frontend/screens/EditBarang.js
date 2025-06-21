import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { updateBarang } from '../api';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditBarang() {
  const route = useRoute();
  const { item } = route.params;

  const [nama, setNama] = useState(item.nama_barang);
  const [harga, setHarga] = useState(String(item.harga));
  const [stok, setStok] = useState(String(item.stok));
  const [kategori, setKategori] = useState(item.kategori);

  const navigation = useNavigation();

  const handleSave = async () => {
    await updateBarang(item._id, {
      nama_barang: nama,
      harga: Number(harga),
      stok: Number(stok),
      kategori,
    });
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5', padding: 20 }}>
      <Text variant='headlineMedium' style={{ color: '#4285F4', fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
        Edit Barang
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
          Simpan Perubahan
        </Button>
      </View>

    </View>
  )
}
