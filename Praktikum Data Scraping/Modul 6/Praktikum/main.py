import pandas as pd

# Ambil data dari Wikipedia
url = 'https://en.m.wikipedia.org/wiki/Ding_Yuxi'
df_list = pd.read_html(url, header=0, index_col=None, attrs={'class': 'wikitable'})
df = df_list[0]

# Tambahkan kolom 'Jumlah' berdasarkan count per tahun
jumlah_per_tahun = df["Year"].value_counts()
df["Jumlah"] = df["Year"].map(jumlah_per_tahun)

# Sorting dan Filtering
df_sorted = df.sort_values("English title")
df_filtered = df[df["Role"] == "Mu Sheng / Fu Zhou"]

# Buat tabel ringkasan jumlah per tahun
df_jumlah_ringkas = (
    df.groupby("Year")
    .size()
    .reset_index(name="Jumlah")
    .sort_values("Year")
)

# Tampilkan hasil di terminal
print("Data awal dengan kolom Jumlah:")
print(df.head(), "\n")
print("Jumlah entri per tahun:")
print(df_jumlah_ringkas, "\n")

# Simpan semua ke file Excel
with pd.ExcelWriter("Praktikum/Ding Yuxi.xlsx") as writer:
    df.to_excel(writer, sheet_name="Data", index=False)
    df_sorted.to_excel(writer, sheet_name="Sorted", index=False)
    df_filtered.to_excel(writer, sheet_name="Filtered", index=False)
    df_jumlah_ringkas.to_excel(writer, sheet_name="Jumlah per Tahun", index=False)
