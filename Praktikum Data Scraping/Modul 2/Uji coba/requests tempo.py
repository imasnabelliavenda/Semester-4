from bs4 import BeautifulSoup
import requests

url = "https://www.tempo.co/"
response = requests.get(url)

soup = BeautifulSoup(response.content, "html.parser")

print("Judul halaman:", soup.find_all("a", {'class':'aticle'}))

for link in soup.find_all("a"):
    print(link.get("href"))
print(soup.get_text())