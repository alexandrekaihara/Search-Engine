from json import load
from glob import glob
from sys import argv

files = glob(argv[1] + '*.json')

for path in files:
    print(path)
    with open(path, 'r', encoding='latin-1') as f:
        data = load(f)
    print(data)