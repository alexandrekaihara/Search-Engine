from json import load
from json import dump

def add_to_dict(count: dict, key: str, val: str) -> None:
            count[key] = val

def read_from_json(path: str, encoding=None):
    if encoding:
        with open(path, 'r', encoding='utf-8') as f:
            return load(f)
    else:
        with open(path, 'r') as f:
            return load(f)

def save_to_json(path: str, data, encoding=None) -> None:
    if encoding:
        with open(path, 'w', encoding='utf-8') as f:
            dump(data, f, ensure_ascii=False)
    else:
        with open(path, 'w', encoding='utf-8') as f:
            dump(data, f, ensure_ascii=False)

def save_to_txt(path:str, data, encoding) -> None:
    with open(path, 'w', encoding="utf-8") as f:
        f.write(data)

def read_txt(path:str, encoding) -> str:
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def printProgressBar (iteration, total, prefix = '', suffix = '', decimals = 1, length = 100, fill = '█', printEnd = "\r"):
    """
    Call in a loop to create terminal progress bar
    @params:
        iteration   - Required  : current iteration (Int)
        total       - Required  : total iterations (Int)
        prefix      - Optional  : prefix string (Str)
        suffix      - Optional  : suffix string (Str)
        decimals    - Optional  : positive number of decimals in percent complete (Int)
        length      - Optional  : character length of bar (Int)
        fill        - Optional  : bar fill character (Str)
        printEnd    - Optional  : end character (e.g. "\r", "\r\n") (Str)
    """
    percent = ("{0:." + str(decimals) + "f}").format(100 * (iteration / float(total)))
    filledLength = int(length * iteration // total)
    bar = fill * filledLength + '-' * (length - filledLength)
    print(f'\r{prefix} |{bar}| {percent}% {suffix}', end = printEnd)
    # Print New Line on Complete
    if iteration == total: 
        print()