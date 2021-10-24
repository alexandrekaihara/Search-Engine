from bs4 import BeautifulSoup
from bs4.dammit import EncodingDetector
from glob import glob
from sys import argv
import re
from other import *


class HtmlParser():
    def __init__(self, pagedata: dict, html: str) -> None:
        self.page = pagedata
        self.soup = BeautifulSoup(html, features="html.parser")
    def get_text(self) -> str:
        # Remove all script and style elements
        [script.extract() for script in self.soup(["script", "style"])]
        return self.soup.get_text(separator=' ')
    def get_title(self) -> str:
        try:
            return self.soup.title.string
        except:
            return ""
    def get_encoding(self, html) -> str:
        return EncodingDetector.find_declared_encoding(html, is_html=True) or 'utf-8'

def assemble_json(index, title, url,  text, encoding) -> str:
    jsonfile = {}
    jsonfile['indice'  ] = index
    jsonfile['titulo'   ] = title
    jsonfile['url'     ] = url
    jsonfile['texto'    ] = text
    jsonfile['encoding'] = encoding
    return jsonfile


if __name__ == '__main__':
    counter = 0

    try:
        html_dir, dest_dir = argv[1], argv[2]
    except:
        print("Expected dir for all html and a destination directory to save all json files.\nUse: python html_parser.py [all html path] [destination path]")
        exit(0)

    pagespaths = glob(html_dir + "*.txt")

    def process(path: str):
        global counter
        # Get encoding
        pagedata = read_from_json(path, "latin-1")
        try:
            enc = re.search("charset=(.*)", pagedata['headers']['content-type']).group(1).lower()
        except:
            enc = 'utf-8'
        # Read data
        if enc:
            pagedata = read_from_json(path, enc)
            h = HtmlParser(pagedata)
            title = h.get_title()
            text  = h.get_text()
            url   = h.get_url()

            jsonfile = assemble_json(counter, title, url, text, enc)
            save_to_json("{}/{}_{}.json".format(dest_dir, counter, enc), jsonfile, encoding=enc)
            counter += 1
        else:
            print("Não foi possivel encontrar o encoding de", path)
        
    [process(path) for path in pagespaths]