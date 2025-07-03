from bs4 import BeautifulSoup
import requests
import fungsi

def main_scraper(url, directory):
    fungsi.create_directory(directory)
    sumber_kode = requests.get(url)
    sumber_text = sumber_kode.text
    soup = BeautifulSoup(sumber_text, 'html.parser')
    articles = soup.find_all(True, {"class":"articles--iridescent-list--item articles--iridescent-list--text-item"})

    for article in articles:
        print('Judul: ' + article.a.get('title'))
        print('Tanggal posting: ' + article.time.text)
        print('Ringkasan: ' + article.div.text)
        print('URL: ' + article.a.get('href'))
        print()
        article_format = (
            'Judul : ' + article.a.get('title') + '\n' +
            'Tanggal posting: ' + article.time.text + '\n' +
            'Ringkasan: ' + article.div.text + '\n' +
            'URL : ' + article.a.get('href') + '\n' )

        if fungsi.does_file_exist(directory + '/artikel.txt') is False:
            fungsi.create_new_file(directory + '/artikel.txt')

        fungsi.write_to_file(directory + '/artikel.txt', article_format)
        print(article_format)

main_scraper("https://www.liputan6.com/tekno/berita", "Praktikum/Hasil")