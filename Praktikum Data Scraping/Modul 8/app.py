from flask import Flask, render_template, request
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/cnn-wisata")
def cnn_wisata():
    html_doc = requests.get("https://www.cnnindonesia.com/tag/wisata")
    soup = BeautifulSoup(html_doc.text, "html.parser")
    populer_area = soup.find(attrs={'class': 'flex flex-col gap-5'})

    articles = []
    if populer_area:
        items = populer_area.findAll("article")
        for item in items:
            image = item.find("img")
            link = item.find("a")
            title = item.find("h2")
            category = item.find("span", {"class": "text-cnn_red"})
            time = item.find("span", {"class": "text-cnn_black_light3"})

            if image and link and title and category and time:
                articles.append({
                    "img_src": image["src"],
                    "img_alt": image["alt"],
                    "link": f"/detail/cnn/{link['href']}",
                    "title": title.text.strip(),
                    "category": category.text.strip(),
                    "time": time.text.strip()
                })

    return render_template("cnn.html", articles=articles)

@app.route("/detik-jatim")
def detik_jatim():
    htmlDoc = requests.get('https://www.detik.com/jatim/berita/indeks')
    soup = BeautifulSoup(htmlDoc.text, "html.parser")
    populer_area = soup.find(attrs={'class': 'grid-row list-content'})
    texts = populer_area.findAll(attrs={'class': 'media__text'})
    images = populer_area.findAll(attrs={'class': 'media media--left media--image-radius block-link'})
    return render_template("detik-jatim.html", images=images, texts=texts)

@app.route("/detik-jateng")
def detik_jateng():
    htmlDoc = requests.get('https://www.detik.com/jateng/berita/indeks')
    soup = BeautifulSoup(htmlDoc.text, "html.parser")
    populer_area = soup.find(attrs={'class': 'grid-row list-content'})
    texts = populer_area.findAll(attrs={'class': 'media__text'})
    images = populer_area.findAll(attrs={'class': 'media media--left media--image-radius block-link'})
    return render_template("detik-jateng.html", images=images, texts=texts)

@app.route("/detik-jabar")
def detik_jabar():
    htmlDoc = requests.get('https://www.detik.com/jabar/berita/indeks')
    soup = BeautifulSoup(htmlDoc.text, "html.parser")
    populer_area = soup.find(attrs={'class': 'grid-row list-content'})
    texts = populer_area.findAll(attrs={'class': 'media__text'})
    images = populer_area.findAll(attrs={'class': 'media media--left media--image-radius block-link'})
    return render_template("detik-jabar.html", images=images, texts=texts)

# === Route Detail Artikel ===
@app.route("/detail/<source>/<path:url>")
def article_detail(source, url):
    try:
        html_doc = requests.get(url)
        html_doc.raise_for_status()
    except requests.exceptions.RequestException:
        return render_template("detail.html", detail={
            "title": "Gagal mengambil artikel",
            "content": "Terjadi kesalahan saat mengambil data.",
            "image_src": None
        })

    soup = BeautifulSoup(html_doc.text, "html.parser")

    if source == "detik":
        title = soup.find("h1").text.strip() if soup.find("h1") else "Judul tidak ditemukan"
        content_div = soup.find("div", {"class": "detail__body-text"}) or soup.find("div", {"class": "itp_bodycontent"})
        if content_div:
            for unwanted in content_div.find_all(class_=["noncontent", "aevp", "detail__body-tag mgt-16", "ads-scrollpage-container", "para_caption"]):
                unwanted.decompose()

            for tag in content_div.find_all("strong"):
             tag.decompose()

            content = content_div.get_text(strip=True, separator="\n")
    
            paragraphs = content_div.find_all(['p', 'h2', 'h3'])
            content = "\n\n".join([
                p.get_text(strip=True)
                for p in paragraphs
                if p.get_text(strip=True)
            ])
            
        image_section = soup.find("div", {"class": "detail__media"})
        img_tag = image_section.find("img") if image_section else None
        image_src = img_tag["src"] if img_tag and "src" in img_tag.attrs else None

    elif source == "cnn":
        title_tag = (
            soup.find("h1", class_="text-[32px]") or
            soup.find("h1", class_="mb-2 text-[22px] text-cnn_black") or
            soup.find("h1")
        )
        title = title_tag.get_text(strip=True) if title_tag else "Judul tidak ditemukan"

        content_div = soup.find("div", class_="detail-text")

        if content_div:
            for unwanted in content_div.find_all(class_=["para_caption"]):
                unwanted.decompose()

            for tag in content_div.find_all("strong"):
                tag.decompose()

            paragraphs = content_div.find_all(['p', 'h2', 'h3'])
            content = "\n\n".join([
                p.get_text(strip=True)
                for p in paragraphs
                if p.get_text(strip=True)
            ])

        image = soup.find("img", class_="w-full")
        image_src = image["src"] if image else None

    else:
        title = "Sumber tidak dikenali"
        content = "Sumber artikel tidak didukung."
        image_src = None

    detail = {
        "title": title,
        "content": content,
        "image_src": image_src
    }

    return render_template("detail.html", detail=detail)

if __name__ == "__main__":
    app.run(debug=True)
