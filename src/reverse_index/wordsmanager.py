import nltk
import string
from etc import *
from numpy import array, unique


class WordsManager():
    # Brief:
    #   Initialize the stopwords and punctuation list on memory
    # Param:
    # Return:
    def __init__(self) -> None:
        # Load stopwords
        nltk.download("stopwords")
        self.stopwords = nltk.corpus.stopwords.words('portuguese')

        # Load punctuation
        self.punctuation = string.punctuation
        self.punctuation += '\n\t'
        self.punctuation = self.punctuation.replace("@", "")

    # Brief:
    #   Split a string into parts separated by a pattern
    # Param:
    #   string: string to be splitted
    #   sep: the pattern to be used as separator
    # Return:
    #   List of separated parts of the string
    def split(self, string: str, sep = " ") -> list:
        return string.split(sep)

    # Brief:
    #   Check whether is a stopword or not
    # Param:
    #   word: Word to be verified
    # Return:
    #   return True if is in the stopwords list or false otherwise
    def is_stopword(self, word: str) -> bool:
        return word in self.stopwords

    # Brief:
    #   Check whether is a punctuation or not
    # Param:
    #   punctuation: punctuation to be verified
    # Return:
    #   return True if is in the punctuation list or false otherwise
    def is_punctuation(self, punctuation) -> bool:
        return punctuation in self.punctuation

    # Brief:
    #   Counts the frequency of a list of terms
    # Param:
    #   wordlist: list of words to be counted
    # Return:
    #   returns a dictionary of words: frequency
    def word_frequency(self, wordlist: list) -> dict:
        count = {}
        uniquewords = unique(array(wordlist))
        [add_to_dict(count, word, wordlist.count(word)) for word in uniquewords]
        return count
        
