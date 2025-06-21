import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, FlatList, Animated, Text } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { getBarang, deleteBarang } from '../api';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function DaftarBarang() {
  const [barang, setBarang] = useState([]);
  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadBarang();
    }, [])
  );

  const loadBarang = async () => {
    try {
      const res = await getBarang();
      setBarang(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Animated.View style={{ 
      flex: 1, 
      backgroundColor: '#f5f5f5', 
      padding: 20,
      opacity: fadeAnim
    }}>
      <Text variant='headlineMedium' style={{ color: '#4285F4', fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
        Daftar Barang
      </Text>

      <Button
        icon='plus'
        mode='contained'
        onPress={() => navigation.navigate('TambahBarang')}
        buttonColor='#4285F4'
        textColor='#ffffff'
        style={{ marginBottom: 20, paddingVertical: 12, borderRadius: 12 }}>
        Tambah Barang
      </Button>

      <FlatList
        data={barang}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const itemAnim = new Animated.Value(0);
          Animated.timing(itemAnim, {
            toValue: 1,
            duration: 500,
            delay: index * 100,
            useNativeDriver: true,
          }).start();

          return (
            <Animated.View
              style={{ 
                transform: [{ translateY: itemAnim.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }],
                opacity: itemAnim,
                marginBottom: 16
              }}>
              <Card style={{ padding: 20, backgroundColor: '#ffffff', borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 5 }}>
                <Card.Title
                  title={item.nama_barang}
                  subtitle={`Kategori: ${item.kategori}`}
                  titleStyle={{ color: '#4285F4', fontWeight: 'bold' }}
                />
                <Card.Content>
                  <Text>Harga: Rp {item.harga.toLocaleString('id-ID')}</Text>
                  <Text>Stok: {item.stok}</Text>
                </Card.Content>
                <Card.Actions>
                  <Button icon='pencil' textColor='#4285F4' onPress={() => navigation.navigate('EditBarang', { item })}>
                    Edit
                  </Button>
                  <Button icon='delete' textColor='red' onPress={async () => {
                    await deleteBarang(item._id);
                    loadBarang();
                  }}>
                    Hapus
                  </Button>
                </Card.Actions>
              </Card>
            </Animated.View>
          );
        }}
      />
    </Animated.View>
  );
}
