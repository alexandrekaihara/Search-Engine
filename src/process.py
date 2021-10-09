import glob
from wordsmanager import *
from sys import argv
from etc import *


class ReverseIndex():
    # Brief:
    # Param:
    # Return:
    def __init__(self) -> None:
        self.wm = WordsManager()
        self.counting = {}
        self.stopwords = {}
        self.punctuation = {}
        self.words = {}

    def count(self, title: str, text: str) -> None:
        text = title + " " + text
        word_list = self.wm.split(text)
        dt = self.wm.word_frequency(word_list)
        self.add_to_count(dt)

    def add_to_count(self, new_count: dict) -> None:
        def add_registry(key: str, data: int, dt: dict) -> None:
            try:
                dt[key] += data
            except:
                dt[key] = data
        [add_registry(key, new_count[key], self.counting) for key in new_count.keys()]
    
    def sort_by_freq(self, dt: dict) -> dict:
        return dict(sorted(dt.items(), key=lambda item: item[1], reverse=True))
    
    def find_stopwords(self) -> None:
        def add_to_stopwords(key):
            if self.wm.is_stopword(key):
                self.stopwords[key] = 0
        [add_to_stopwords(key) for key in self.counting.keys()]

    def find_puctuations(self) -> None:
        def add_to_punctuation(key):
            if self.wm.is_punctuation(key):
                self.puctuation[key] = 0
        [add_to_punctuation(key) for key in self.counting.keys()]

    def find_words(self) -> None:
        def add_to_words(key):
            if not(self.wm.is_punctuation(key)) and not(self.wm.is_stopword(key)):
                self.words[key] = 0
        [add_to_words(key) for key in self.counting.keys()]

    def set_indexes(self) -> None:
        def set_index(key: str, index: list, data: dict) -> None:
            data[key] = index[0]
            index[0] += 1
        index = [1]
        [set_index(key, index, self.stopwords  ) for key in self.stopwords.keys()]
        [set_index(key, index, self.punctuation) for key in self.punctuation.keys()]
        [set_index(key, index, self.words      ) for key in self.words.keys()]

    def text_to_indexes(self, title: str, text: str) -> list: 
        text =  title + ' ' + text
        dt = {**self.stopwords, **self.punctuation, **self.words}
        text = self.wm.split(text, ' ')
        indexes = []
        [indexes.append(dt[item]) for item in text]
        return indexes


if __name__ == 'main':
    try:
        argv[1]
    except:
        print("Expected the path to the json files")

    files = glob.glob(argv[1])
    r = ReverseIndex()
    
    # Read all json files
    def add_json_to_dict(path: str, dt: dict) -> None:
        t = read_from_json(path)
        dt[t['indice']] = t
    pages = {}
    [add_json_to_dict(path, pages) for path in files]
    
    # Count the frequency of all pages and sort
    [r.count(pages[key]['titulo'], pages[key]['texto']) for key in pages.keys()]
    r.counting = r.sort_by_freq(r.counting)

    # Set all elements to the respective dictionary
    r.find_stopwords()
    r.find_puctuations()
    r.find_words()

    # Set a unique index for each element
    r.set_indexes()

    # Convert text and title into word indexes
    pages_indexes = {}
    [add_to_dict(pages_indexes, key, \
        r.text_to_indexes(pages[key]['titulo'], pages[key]['texto']))\
        for key in pages.keys()]

    # Convert list of indexes to string and save to .txt
    def list_to_string(data: list) -> str:
        data = [str(e) for e in data]
        return ' '.join(data)
    [save_to_txt('../text_indexes/' + str(key)+ '.txt', 'w', list_to_string(pages[key])) for key in pages.keys()]

    # Save the dictionary of indices
    save_to_json("saparadores.json", r.punctuation)
    save_to_json("stopwords.json"  , r.stopwords)
    save_to_json("wordindexes.json", r.words)

