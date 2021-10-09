from json import load
from json import dump


def add_to_dict(count: dict, key: str, val: str) -> None:
            count[key] = val

def read_from_json(path: str):
    with open(path, 'r') as f:
        t = load(f)
    return t

def save_to_json(path: str, data, encoding) -> None:
    with open(path, 'w', encoding=encoding) as f:
        dump(data, f)

def save_to_txt(path:str, data, encoding) -> None:
    with open(path, 'w', encoding=encoding) as f:
        f.write(data)

def read_txt(path:str, encoding) -> str:
    with open(path, 'r', encoding=encoding) as f:
        return f.read()