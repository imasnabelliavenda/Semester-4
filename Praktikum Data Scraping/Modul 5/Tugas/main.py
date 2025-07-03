from bs4 import BeautifulSoup
import requests
import fungsi

def get_details(url, directory):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    div_entry = soup.find('div', {'class': 'col-12 section__text section__text--content'})

    paragraphs = div_entry.find_all('p')
    print("Isi Artikel:")

    fungsi.write_to_file(f"{directory}/artikel.txt", "Isi Artikel:")
    for p in paragraphs:
        text = p.get_text(strip=True)
        if text:
            print(text)
            fungsi.write_to_file(f"{directory}/artikel.txt", text)
    print("________________________________")

def main_scraper(url, directory):
    fungsi.create_directory(directory)
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')

    articles = soup.find_all("div", {'class': 'section__feed__item'})
    file_path = f"{directory}/artikel.txt"
    if not fungsi.does_file_exist(file_path):
        fungsi.create_new_file(file_path)

    for article in articles:
        a_tag = article.find('a')
        if not a_tag or not a_tag.get('href'):
            continue
        link = a_tag['href']
        judul_tag = article.find('h3', class_='mb-2')
        judul = judul_tag.text.strip() if judul_tag else 'Judul tidak ditemukan'

        print(f'URL: {link}')
        print(f'Judul: {judul}\n')

        article_format = f"\n================================================================================================\n\nURL : {link}\ntitle : {judul}"
        fungsi.write_to_file(file_path, article_format)

        get_details(link, directory)

def multiple_tags(tag_list, base_directory):
    for url in tag_list:
        tag_name = url.strip("/").split("/")[-1]
        print(f"\n>>> Scraping tag: {tag_name} dari {url}")
        directory = f"{base_directory}/{tag_name}"
        main_scraper(url, directory)

if __name__ == "__main__":
    tag_list = [
        "https://indonesiakaya.com/tag/cerita-rakyat/",
        "https://indonesiakaya.com/rangkai-pustaka/mini-biografi/",
        "https://indonesiakaya.com/pustaka-indonesia-category/tradisi/"
    ]

    multiple_tags(tag_list, "Tugas/CobaHasil")