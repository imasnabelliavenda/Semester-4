import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

url = 'https://indonesiakaya.com/tag/cerita-rakyat/'
page = requests.get(url)
soup = BeautifulSoup(page.content, 'html.parser')

images = []
for img in soup.find_all('img', class_='zoom_it'):
    img_url = img.get('src')
    if not img_url:
        continue

    img_url = urljoin(url, img_url)
    if img_url.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
        images.append(img_url)

# Membuat folder untuk simpan gambar
save_path = 'Praktikum/Hasil'
if not os.path.exists(save_path):
    os.makedirs(save_path)

# Download dan simpan gambar
for img_url in images:
    response = requests.get(img_url)
    fileName = os.path.basename(img_url)
    file_path = os.path.join(save_path, fileName)
    with open(file_path, 'wb') as f:
        f.write(response.content)
    print(f'{fileName} berhasil disimpan pada direktori {save_path}')
