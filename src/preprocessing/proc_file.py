import os 
import json
import re
import sys


def save_to_txt(path:str, data, encoding) -> None:
    with open(path, 'w', encoding=encoding) as f:
        f.write(data)

#ENCONTA TODOS OS ARQUIVOS JSON NA PASTA INDICADA
path_to_json = sys.argv[1]
json_files = [pos_json for pos_json in os.listdir(path_to_json) if pos_json.endswith('.txt')]

print("\n")
print("ARQUIVOS LOCALIZADOS: {}".format(json_files))  # printa os nomes dos arqeuivos jsons
print("\n")

#LER ARQUIVOS, TRATA O TEXTO E GRAVA NO .TXT
for n in range (0, len(json_files)):
    filename = os.path.basename(json_files[n])
    enc = filename[filename.find("_")+1: filename.find(".")]
    with open(path_to_json+json_files[n], 'r', encoding=enc) as f:
        example_dict = json.load(f)
    i = str(example_dict['indice'])
    texto = (example_dict['texto'])
    texto = texto.replace(',',' , ',).replace('!', ' ! ').replace(';', ' ; ').replace('.',' . ').replace('?', ' ? ').replace('/',' / ').replace('|', ' | ').replace('#',' # ').replace('$', ' $ ').replace('+', ' + ').replace('\n', ' \n ').replace('\t', ' \t ')
    texto = re.sub(" +", " ", texto)
    resultado = texto.strip().lower()

    save_to_txt(sys.argv[2]+filename, resultado, enc)


#print("{}".format(resultado))
print("OPERACAO CONCLUIDA")
print("\n")
#print("{}".format(texto))
#print(example_dict['url'])
#print(example_dict['texto'])