from bs4 import BeautifulSoup
import requests
from sys import argv
from bs4 import BeautifulSoup
import json
from html_parser import *

class WebCrawler():
    def search_on_google(self, search_req: str) -> requests.models.Response:        
        return requests.get("https://www.google.com/search?q={}".format(search_req))
    def retrieve_all_links(self, html):
        remove = ["maps", "policies.google", 'search?q=']
        parser = 'html.parser'  # or 'lxml' (preferred) or 'html5lib', if installed
        soup = BeautifulSoup(html, parser)
        links = []
        [links.append(link['href']) for link in soup.findAll('a')]
        # Remove uneccessary links
        for rem in remove:
            links = [link for link in links if rem not in link]
        for i in range(len(links)):
            if links[i][0] == '/':
                links[i] = 'https://google.com' + links[i]
        return links
    def savehtml(self, url: str) -> None:
        print("*** Generating json for {}".format(url))
        global counter
        try: 
            request = requests.get(url)
        except:
            print("Got some error on connecting to url")
            return
        try:
            html = request.content.decode('unicode_escape')
        except UnicodeDecodeError:
            print("Couldn't decode")
            return
        parser = HtmlParser(request, html)
        title = parser.get_title()
        text  = parser.get_text()
        enc   = parser.get_encoding(html)
        jsonfile = assemble_json(counter, title, url, text, enc)
        save_to_json("{}/{}_{}.json".format(dest_dir, counter, enc), jsonfile, encoding=enc)
        counter += 1


counter = 0


if __name__ == "__main__":
    try:
        search_file, dest_dir = argv[1], argv[2]
    except:
        print("Expected path to the words to be searched.\nRun: python webcrawler.py [file path]")  
        exit(0)

    with open(search_file, 'r', encoding='utf-8') as f:
        search_list = f.read()
    search_list = search_list.split('\n')

    w = WebCrawler()

    def execute(search):
        print("** Start searching {}".format(search))
        try:
            search = w.search_on_google(search)    
        except:
            print("Got some error on connecting to google")
            return
        print("** Got search on google")
        try:
            links = w.retrieve_all_links(search.content.decode('unicode_escape'))
        except UnicodeDecodeError:
            print("Couldn't decode")
            return
        print("** Retrieved {} links on searched page".format(len(links)))
        [w.savehtml(link) for link in links]
        print("** Finished donwloading all search pages")

    [execute(search) for search in search_list]

