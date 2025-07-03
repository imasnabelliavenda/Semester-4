from bs4 import BeautifulSoup

html = """
        <div>Ini adalah div</div>
        <p>Ini adalah paragraf</p>
        <div class="bold">Ini adalah div ke 2</div>
        """

soup = BeautifulSoup(html, "html.parser")

print(soup.div.text)
print(soup.p.text)

print(soup)

print(soup.div)
print(soup.find_all("div"))
print(soup.find_all("div")[1])

print(soup.find_all("div",{'class':'bold'}))

print(soup.find_all("p",{'id':'para'}))