from bs4 import BeautifulSoup
import requests
import fungsi
from flask import Flask, render_template

app = Flask(__name__)

def main_scraper(url, directory):
    fungsi.create_directory(directory)
    sumber_kode = requests.get(url)
    soup = BeautifulSoup(sumber_kode.text, "html.parser")
    articles = soup.find_all("div", {'class': 'col-12 col-lg-3 section__feed__item mb-4 mb-lg-5 pb-lg-4 article_card_taxonomy_pustaka_cat'})

    data = []
    for article in articles:
        link = article.a.get('href')
        judul_tag = article.find('h3', class_='mb-2')
        judul = judul_tag.text.strip()

        data.append({
            "url": link,
            "title": judul
        })

    for item in data:
        print("url:", item["url"])
        print("title:", item["title"])
        print()
    return data

@app.route('/')
def home():
    url = "https://indonesiakaya.com/tag/cerita-rakyat/"
    directory = "Hasil"
    data = main_scraper(url, directory)
    return render_template("index.html", articles=data)

app.run(debug=True)