import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import fungsi

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

save_path = 'Tugas/Hasil'
fungsi.create_directory(save_path)

for img_url in images:
    fungsi.save_image(img_url, save_path)
