import requests
from bs4 import BeautifulSoup

url = 'https://www.liputan6.com/'
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

for news in soup.find_all('span', class_='articles--iridescent-list--text-item__title-link-text'):
    print(news.text.strip())