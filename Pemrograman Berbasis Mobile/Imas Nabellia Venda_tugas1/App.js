import React, { useState, useEffect } from 'react';
import { Platform, ScrollView, View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function App() {
  const [id, setId] = useState('');
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [pengirim, setPengirim] = useState('');
  const [jumlah, setJumlah] = useState(0);
  const [tanggal, setTanggal] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [penerima, setPenerima] = useState('');
  const [savedDataList, setSavedDataList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const allData = await AsyncStorage.getItem('allData');
        if (allData !== null) {
          setSavedDataList(JSON.parse(allData));
        }
      } catch (e) {
        console.log('Gagal memuat data', e);
      }
    };
    loadData();
  }, []);

  const onChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) setTanggal(selectedDate);
  };

  const submitData = async () => {
    const data = {
      id,
      nama,
      alamat,
      pengirim,
      jumlah,
      tanggal,
      penerima,
    };

    try {
      await AsyncStorage.setItem('formData', JSON.stringify(data));

      const updatedList = [...savedDataList, data];
      await AsyncStorage.setItem('allData', JSON.stringify(updatedList));
      setSavedDataList(updatedList);

      Alert.alert('Data Tersimpan!', `ID barang: ${id}\nNama barang: ${nama}\nAlamat tujuan: ${alamat}\nPengirim: ${pengirim}\nJumlah barang: ${jumlah}\nTanggal kirim: ${tanggal.toDateString()}\nPenerima: ${penerima}`);
      setId('');
      setNama('');
      setAlamat('');
      setPengirim('');
      setJumlah(0);
      setTanggal(new Date());
      setPenerima('');

    } catch (e) {
      Alert.alert('Gagal menyimpan data!');
    }
  };

  const editData = (index) => {
    const dataToEdit = savedDataList[index];
    setId(dataToEdit.id);
    setNama(dataToEdit.nama);
    setAlamat(dataToEdit.alamat);
    setPengirim(dataToEdit.pengirim);
    setJumlah(dataToEdit.jumlah);
    setTanggal(new Date(dataToEdit.tanggal));
    setPenerima(dataToEdit.penerima);

    const updatedList = savedDataList.filter((_, i) => i !== index);
    setSavedDataList(updatedList);
    AsyncStorage.setItem('allData', JSON.stringify(updatedList));
  };

  const deleteData = async (index) => {
    const updatedList = savedDataList.filter((_, i) => i !== index);
    setSavedDataList(updatedList);
    await AsyncStorage.setItem('allData', JSON.stringify(updatedList));
    Alert.alert('Data berhasil dihapus!');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Form Input Pengiriman Barang</Text>

        <Text style={styles.label}>ID Barang:</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan ID barang"
          value={id}
          onChangeText={setId}
        />

        <Text style={styles.label}>Nama Barang:</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan nama barang"
          value={nama}
          onChangeText={setNama}
        />

        <Text style={styles.label}>Alamat Tujuan:</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          multiline={true}
          numberOfLines={4}
          placeholder="Masukkan alamat tujuan"
          value={alamat}
          onChangeText={setAlamat}
        />

        <Text style={styles.label}>Pengirim:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={pengirim}
            onValueChange={(itemValue) => setPengirim(itemValue)}
          >
            <Picker.Item label="Pilih pengirim" value="" />
            <Picker.Item label="PT. Indomarco" value="PT. Indomarco" />
            <Picker.Item label="PT. Unirama Duta Niaga" value="PT. Unirama Duta Niaga" />
            <Picker.Item label="UD. Jaya Subur" value="UD. Jaya Subur" />
          </Picker>
        </View>

        <Text style={styles.label}>Jumlah Barang: {jumlah}</Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={jumlah}
          onValueChange={(value) => setJumlah(value)}
          minimumTrackTintColor="#3399ff"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#3399ff"
        />

        <Text style={styles.label}>Tanggal Kirim:</Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.dateText}>{tanggal.toDateString()}</Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={tanggal}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}

        <Text style={styles.label}>Penerima:</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan nama penerima"
          value={penerima}
          onChangeText={setPenerima}
        />

      <View style={{ marginTop: 20 }}>
        <Button title="Simpan" onPress={submitData} />
      </View>

      <Text style={[styles.label, { marginTop: 30 }]}>Daftar Data Tersimpan:</Text>
        <View style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 5 }}>
          <View style={[styles.savedItem, { flexDirection: 'row', backgroundColor: '#f0f0f0' }]}>
            <Text style={{ flex: 1, fontWeight: 'bold' }}>ID Barang</Text>
            <Text style={{ flex: 1, fontWeight: 'bold' }}>Nama Barang</Text>
            <Text style={{ flex: 1, fontWeight: 'bold' }}>Alamat Tujuan</Text>
            <Text style={{ flex: 1, fontWeight: 'bold' }}>Pengirim</Text>
            <Text style={{ flex: 1, fontWeight: 'bold' }}>Jumlah Barang</Text>
            <Text style={{ flex: 1, fontWeight: 'bold' }}>Tanggal</Text>
            <Text style={{ flex: 2, fontWeight: 'bold' }}>Penerima</Text>
          </View>
        </View>
        {savedDataList.map((item, index) => (
          <View
            key={index}
            style={[
              styles.savedItem,
              { flexDirection: 'row', backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' },
            ]}
          >
          <Text style={{ flex: 1 }}>{item.id}</Text>
          <Text style={{ flex: 1 }}>{item.nama}</Text>
          <Text style={{ flex: 1 }}>{item.alamat}</Text>
          <Text style={{ flex: 1 }}>{item.pengirim}</Text>
          <Text style={{ flex: 1 }}>{item.jumlah}</Text>
          <Text style={{ flex: 1 }}>{new Date(item.tanggal).toLocaleDateString('id-ID')}</Text>
          <Text style={{ flex: 1 }}>{item.penerima}</Text>
          <View style={{ flex: 1, flexDirection: 'row', gap: 10 }}>
            <Button title="Edit" color="green" onPress={() => editData(index)} />
            <Button title="Hapus" color="red" onPress={() => deleteData(index)} />
          </View>
        </View>
      ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#f5f7fa',
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#2c3e50',
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
    backgroundColor: '#fff',
    elevation: 2, // for Android
    shadowColor: '#000', // for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 14,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    width: '100%',
    marginBottom: 14,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  dateText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  savedItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
});
