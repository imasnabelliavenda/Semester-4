import pandas as pd
import requests

url = 'https://banyuwangikab.bps.go.id/statictable/2021/10/25/194/luaspanen-produksi-dan-produktivitas-padi-menurut-kecamatan-dikabupaten-banyuwangi-2019-dan-2020.html'

response = requests.get(url)

tables = pd.read_html(response.text)

data_table = tables[5]

print(data_table)
