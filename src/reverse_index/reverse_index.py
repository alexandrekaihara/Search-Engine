import glob
from wordsmanager import *
from sys import argv
from os import path
from other import *
from json import loads


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

    def count(self, wordlist: str) -> None:
        dt = self.wm.word_frequency(wordlist)
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
    
    def split_words(self) -> None:
        def add_to_dict(key):
            if self.wm.is_stopword(key):
                self.stopwords[key] = 0
            elif self.wm.is_punctuation(key):
                self.punctuation[key] = 0
            else:
                self.words[key] = 0
        [add_to_dict(key) for key in self.counting.keys()]

    def set_indexes(self) -> None:
        def set_index(key: str, index: list, data: dict) -> None:
            data[key] = index[0]
            index[0] += 1
        index = [1]
        [set_index(key, index, self.stopwords  ) for key in self.stopwords.keys()]
        [set_index(key, index, self.punctuation) for key in self.punctuation.keys()]
        [set_index(key, index, self.words      ) for key in self.words.keys()]

    def text_to_indexes(self, wordlist: list) -> list: 
        dt = {**self.stopwords, **self.punctuation, **self.words}
        indexes = []
        def add_to_indexes(l, dt, item):
            try:
                indexes.append(dt[item])
            except:
                indexes.append(-1)       
        [add_to_indexes(indexes, dt, item) for item in wordlist]
        return indexes

def main():
    try:
        argv[1]
        argv[2]
    except:
        print("Expected the path to the text tokenized files (src) and destination directory (dst) as follows:\npython reverse_index.py [src] [dst]")
        exit(0)

    print("** Starting script")
    r = ReverseIndex()
    files = glob.glob(argv[1] + "*.txt")
    print("** Found", len(files), " paths on specified directory")
    
    # Read all json files
    print("** Reading files")
    def add_json_to_dict(p: str, dt: dict) -> None:
        t = loads(read_txt(p, encoding='utf-8'))
        index = int(path.basename(p).replace(".txt", ''))
        dt[index] = t

    pages = {}
    [add_json_to_dict(path, pages) for path in files]
    print("**", len(pages.keys()), " files sucessfully read")

    # Count the frequency of all pages and sort
    print("** Starting word count")
    [r.count(pages[key]['texto']) for key in pages.keys()]
    r.counting = r.sort_by_freq(r.counting)
    print("** Finished counting words")

    # Set all elements to the respective dictionary
    print("** Separating stopwords, punctuation and words")
    r.split_words()

    # Set a unique index for each element
    print("** Setting indexes for words")
    r.set_indexes()

    # Convert text and title into word indexes
    print("** Starting indexing pages")
    pages_indexes = {}
    [add_to_dict(pages_indexes, key, \
        r.text_to_indexes(pages[key]['texto']))\
        for key in pages.keys()]

    # Convert list of indexes to string and save to .txt
    print("** Converting list of indexes to string")
    def list_to_string(data: list) -> str:
        data = [str(e) for e in data]
        return ' '.join(data)
    [save_to_txt("{}{}.txt".format(argv[2], str(key)), list_to_string(pages_indexes[key]), encoding='utf-8') for key in pages.keys()]
    
    # Save the dictionary of indices
    print("** Saving list of word and its respective indexes")
    save_to_json("../../word_indexes/separadores.json", r.punctuation, encoding='utf-8')
    save_to_json("../../word_indexes/stopwords.json"  , r.stopwords, encoding='utf-8')
    save_to_json("../../word_indexes/wordindexes.json", r.words, encoding='utf-8')

    print("** Finished execution")

if __name__ == '__main__':
    main()