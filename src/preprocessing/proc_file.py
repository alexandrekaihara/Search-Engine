# -*- coding: utf-8 -*-
from random import randint
import os 
import json
import sys


# '/Users/italo.vaz/OneDrive/UNB/PAA/Pages/' --- PROGRAMA BUSCA ARQUIVOS JSON NA PASTA PAGES
# '/Users/italo.vaz/OneDrive/UNB/PAA/Processed/' --- CRIA OS ARQUIVOS .TXT E SALVA NA PASTA PROCESSED

#ENCONTA TODOS OS ARQUIVOS JSON NA PASTA INDICADA
path_to_json = sys.argv[1]
json_files = [pos_json for pos_json in os.listdir(path_to_json) if pos_json.endswith('.json')]

print("\n")
print("ARQUIVOS LOCALIZADOS: {}".format(json_files))  # printa os nomes dos arqeuivos jsons
print("\n")

#LER ARQUIVOS, TRATA O TEXTO E GRAVA NO .TXT
for n in range (0, len(json_files)):
    with open(sys.argv[1]+json_files[n], 'r', encoding='latin-1') as f:
        example_dict = json.load(f)
        i = str(example_dict['indice'])
        titulo = (example_dict['titulo'])
        texto = (example_dict['texto'])
        texto = titulo + " " + texto.replace(',',' , ',).replace('!', ' ! ').replace(';', ' ; ').replace('.',' . ').replace('?', ' ? ').replace('/',' / ').replace('|', ' | ').replace('#',' # ').replace('$', ' $ ').replace('+', ' + ').replace('\n', ' \n ').replace('\t', ' \t ')
        resultado = texto.strip().lower()

        arquivo = open(sys.argv[2] + i + '.txt', 'w', encoding='latin-1')
        arquivo.write(resultado + ' ' + '\n')
        arquivo.close()


#print("{}".format(resultado))
print("OPERACAO CONCLUIDA")
print("\n")
#print("{}".format(texto))
#print(example_dict['url'])
#print(example_dict['texto'])