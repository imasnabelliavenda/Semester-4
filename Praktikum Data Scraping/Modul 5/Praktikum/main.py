from bs4 import BeautifulSoup
import requests
import fungsi

def main_scraper(url, directory):
    fungsi.create_directory(directory)
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')

    articles = soup.find_all("div", {'class': 'col-12 col-lg-3 section__feed__item mb-4 mb-lg-5 pb-lg-4 article_card_taxonomy_pustaka_cat'})

    file_path = f"{directory}/artikel.txt"
    if not fungsi.does_file_exist(file_path):
        fungsi.create_new_file(file_path)

    for article in articles:
        link = article.a.get('href')
        judul_tag = article.find('h3', class_='mb-2')
        judul = judul_tag.text.strip() if judul_tag else 'Judul tidak ditemukan'

        print(f'URL: {link}')
        print(f'Judul: {judul}\n')

        article_format = f"\n================================================================================================\n\nURL : {link}\ntitle : {judul}"
        fungsi.write_to_file(file_path, article_format)

        get_details(link, directory)
        
def get_details(url, directory):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    div_entry = soup.find('div', {'class': 'col-12 section__text section__text--content'})

    paragraphs = div_entry.find_all('p')
    print("Isi Cerita:")

    fungsi.write_to_file(f"{directory}/artikel.txt", "Isi Cerita:")
    for p in paragraphs:
        text = p.get_text(strip=True)
        if text:
            print(text)
            fungsi.write_to_file(f"{directory}/artikel.txt", text)
    print("________________________________")

if __name__ == "__main__":
    main_scraper("https://indonesiakaya.com/tag/cerita-rakyat/", "Praktikum/Hasil")