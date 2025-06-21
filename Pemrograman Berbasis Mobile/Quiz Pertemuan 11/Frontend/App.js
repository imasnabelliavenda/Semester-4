import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DaftarBarang from './screens/DaftarBarang';
import TambahBarang from './screens/TambahBarang';
import EditBarang from './screens/EditBarang';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="DaftarBarang" component={DaftarBarang} options={{ title: 'TokoKu' }}/>
        <Stack.Screen name="TambahBarang" component={TambahBarang} options={{ title: 'Tambah Barang' }}/>
        <Stack.Screen name="EditBarang" component={EditBarang} options={{ title: 'Edit Barang' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

