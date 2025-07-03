from bs4 import BeautifulSoup
import requests
import fungsi

def main_scraper(url, directory):
    fungsi.create_directory(directory)
    sumber_kode = requests.get(url)
    sumber_text = sumber_kode.text
    soup = BeautifulSoup(sumber_text, 'html.parser')
    articles = soup.find_all("div", {'class': 'mr140'})

    for article in articles:
        a_tag = article.find("h3").find("a")
        judul = a_tag.text.strip()

        tanggal = "Tidak ditemukan"
        span_clock = article.find("span", class_="fa fa-clock-o mr7")
        if span_clock:
            sibling = span_clock.next_sibling
            if sibling and isinstance(sibling, str):
                tanggal = sibling.strip()
            elif sibling and hasattr(sibling, 'text'):
                tanggal = sibling.text.strip()

        ringkasan_div = article.find("div", class_="grey2 pt5 f13 ln18 txt-oev-3")
        ringkasan = ringkasan_div.text.strip() if ringkasan_div else "Tidak ada ringkasan"
 
        url = a_tag.get("href")

        print(f"Judul: {judul}")
        print(f"Tanggal posting: {tanggal}")
        print(f"Ringkasan: {ringkasan}")
        print(f"URL: {url}\n")

        article_format = (
            f"Judul : {judul}\n"
            f"Tanggal posting: {tanggal}\n"
            f"Ringkasan: {ringkasan}\n"
            f"URL : {url}\n\n"
        )

        file_path = directory + '/artikel.doc'
        if not fungsi.does_file_exist(file_path):
            fungsi.create_new_file(file_path)
        fungsi.write_to_file(file_path, article_format)

main_scraper("https://www.tribunnews.com/musik", "Tugas/Hasil")
