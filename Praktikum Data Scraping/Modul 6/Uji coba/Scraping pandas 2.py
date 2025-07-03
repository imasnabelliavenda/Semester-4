import pandas as pd
url = 'https://www.w3schools.com/html/html_tables.asp'

header_row = 0
index_col = 0

table_name = 'Contact'

df_list = pd.read_html(url, header=header_row, index_col=index_col, match=table_name)
df = df_list[0]
print("Sebelum sorting dan filtering: ")
print(df)
print("\n")

df_sorted = df.sort_values("Country")
df_filtered = df[df["Country"] == "Germany"]
print("Setelah sorting dan filtering")
print(df_sorted)
print('\n')
print(df_filtered)

df.to_csv("Uji Coba/Output/data.csv", index=False)
df.to_excel("Uji Coba/Output/data.xlsx", index=False)