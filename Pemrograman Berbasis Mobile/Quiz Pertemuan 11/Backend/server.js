const express = require('express'); 
const cors = require('cors'); 
const mongoose = require('mongoose'); 
require('dotenv').config();

const app = express();

app.use(cors()); 
app.use(express.json()); 


// Schema dan Model
const BarangSchema = new mongoose.Schema({ 
  nama_barang: { type: String, required: true },
  harga: { type: Number, required: true },
  stok: { type: Number, required: true },
  kategori: { type: String, required: true },
});

// Membuat Model dari Schema
const Barang = mongoose.model('Barang', BarangSchema);


// Koneksi ke MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));


// GET (Lihat daftar barang)
app.get('/items', async (req, res) => {
  try {
    const barangs = await Barang.find({});
    res.json(barangs);
  } catch (err) {
    res.status(500).json({ message: err.toString() });
  }
});

// CREATE (Tambah barang)
app.post('/items', async (req, res) => {
  try {
    const newBarang = new Barang(req.body);
    await newBarang.save();
    res.json(newBarang);
  } catch (err) {
    res.status(500).json({ message: err.toString() });
  }
});

// UPDATE (Edit barang)
app.put('/items/:id', async (req, res) => {
  try {
    const updated = await Barang.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.toString() });
  }
});

// REMOVE (Hapus barang)
app.delete('/items/:id', async (req, res) => {
  try {
    await Barang.findByIdAndDelete(req.params.id);
    res.json({ message: "Barang dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.toString() });
  }
});

// Listening server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server berjalan di http://localhost:${port}`));

