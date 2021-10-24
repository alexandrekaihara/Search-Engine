from glob import glob
from sys import argv
from other import *
from json import loads, dumps
import os


special_char = [',', '.', '\'', '\"', '-', '!', '#', '$', '%', '&', '*', '(', ')', '_', '=', '+', '>', '<', ';', ]

def run(dstpath: str, path: str) -> None:
    print("** Starting file {}".format(path))
    file = loads(read_txt("{}".format(path), 'utf-8'))
    file['texto'] = tokenize(file["texto"])
    filename = os.path.basename(path)
    save_to_txt("{}{}".format(dstpath, filename), dumps(file, ensure_ascii=False), "utf-8")

def tokenize(text: str) -> str:
    text = sep_special_char(text)
    text = text.split(' ')
    return list(filter(None, text))
    
def sep_special_char(text: str) -> str:
    global special_char
    for c in special_char:
        text = text.replace(c, " {} ".format(c))
    return text

if __name__ == '__main__':
    try:
        files_path, dest_path = argv[1], argv[2]
    except:
        print("Expected python tokenize.py [felis_path] [dest_path]")
        exit(0)
    
    files_list = glob("{}*.txt".format(files_path))
    print("** Found {} files".format(len(files_list)))

    [run(dest_path, file) for file in files_list]
    print("** Finished tokenizing")

    
