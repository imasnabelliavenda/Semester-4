from flask import Flask, render_template
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route("/")
def drachin():
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0'}
    htmlDoc = requests.get('https://www.iq.com/collection/drama-pilihan-1s9l6zxtohq?lang=id_id', headers=headers)
    soup = BeautifulSoup(htmlDoc.text, "html.parser")

    items = soup.find_all(class_='collection-list-item-wrap')

    drama_data = []
    for item in items:
        link_url = item.find('a')['href']

        if link_url.startswith('//'):
            link_url = 'https:' + link_url
        
        img_urls = []
        for img_tag in item.find_all('img'):
            img_url = img_tag.get('src')
            if img_url:
                if img_url.startswith('//'):
                    img_url = 'https:' + img_url
                img_urls.append(img_url)

        title_tag = item.find('p', class_='title')
        title = title_tag.text

        drama_data.append({
            'link_url': link_url,
            'img_urls': img_urls,
            'title': title,
        })

        for item in drama_data:
            print("url:", item["link_url"])
            print("img_urls:", item["img_urls"])
            print("title:", item["title"])
            print()
        
    return render_template("drama.html", drama=drama_data)

if __name__ == "__main__":
    app.run(debug=True)
