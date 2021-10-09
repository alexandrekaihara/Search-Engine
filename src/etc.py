from json import load
from json import dump


def add_to_dict(count: dict, key: str, val: str) -> None:
            count[key] = val

def read_from_json(path: str):
    with open(path, 'r') as f:
        t = load(f)
    return t

def save_to_json(path: str, data) -> None:
    with open(path, 'w') as f:
        dump(data, f)

def save_to_txt(path:str, data) -> None:
    with open(path, 'w') as f:
        f.write(data)