import requests
from bs4 import BeautifulSoup

url = 'https://www.antaranews.com/dunia'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
}
response = requests.get(url, headers=headers)

soup = BeautifulSoup(response.content, 'html.parser')
articles = soup.find_all('div', {'class' : 'card__post card__post-list card__post__transition mt-30'})

for article in articles:
    kategori = article.find('h4', {'class' : 'slug'})
    judul = article.find('h2', {'class' : 'post_title post_title_medium'})
    link = article.find('a', href=True)
    waktu = article.find('span', {'class' : 'text-secondary'})
    berita = article.find('p')

    if kategori or judul or link or waktu or berita:
        print('Kategori: ', kategori.text.strip() if kategori else 'Tidak ada kategori')
        print('Judul: ', judul.text)
        print('Link: ', link['href'])
        print('Waktu upload: ', waktu.text)
        print('Ringkasan: ', berita.text)
        print('---')
