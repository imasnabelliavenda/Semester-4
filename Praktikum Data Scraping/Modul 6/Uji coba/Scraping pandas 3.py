import pandas as pd

url = 'https://en.wikipedia.org/wiki/Template:COVID-19_pandemic_data#covid-19-pandemic-data'

header_row = 0
index_col = 0
skiprows = 0
attrs = {'class':'wikitable'}

df_list = pd.read_html(url, header=header_row, index_col=index_col, skiprows=skiprows, attrs=attrs)
df = df_list[0]

print("Sebelum sorting dan filtering: ")
print(df)
print("\n")

df_sorted = df.sort_values("Location")
df_filtered = df[df["Location"] == "Indonesia"]
print("Setelah sorting dan filtering")
print(df_sorted)
print('\n')
print(df_filtered)

# df.to_csv("Output/data.csv", index=False)
# df.to_excel("Output/data.xlsx", index=False)
# df_sorted.to_excel("Output/data_sorted.xlsx", index=False)
# df_filtered.to_excel("Output/data_indonesia.xlsx", index=False)

# tambah kolom jumlah
df['Cases'] = pd.to_numeric(df['Cases'].astype(str).str.replace(r'[^0-9]', '', regex=True), errors='coerce')
df['Deaths'] = pd.to_numeric(df['Deaths'].astype(str).str.replace(r'[^0-9]', '', regex=True), errors='coerce')
df['Jumlah'] = df['Cases'] + df['Deaths']
print(df[['Location', 'Cases', 'Deaths', 'Jumlah']])

# tambahkan di excel dengan sheet 
with pd.ExcelWriter("Uji coba/Output/data_combined.xlsx") as writer:
    df_sorted.to_excel(writer, sheet_name="Sorted", index=False)
    df_filtered.to_excel(writer, sheet_name="Filtered_Indonesia", index=False)
    df.to_excel(writer, sheet_name="Tambah kolom", index=False)