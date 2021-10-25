# Search Engine - Projeto e Análise de Algoritmos
Este trabalho visa construir um algoritmo busca de páginas eficiente através da indexação de páginas. A solução proposta é realizar a indexação inversa de páginas implementado essencialmente em JavaScript. Devido ao tamanho excessivo dos dados e do código gerado pelo Yarn, todos os arquivos estarão disponíveis em https://github.com/mdewinged/search_engine.git

## 1. Alunos
1. Alexandre Mitsuru Kaihara - 18/0029690
2.  Pedro Luis Chaves Rocha - 180054635
3. Gabriel Rodrigues Diogenes Macedo - 150126808
4. Guilherme Chagas Suzuki - 180032518
5. ITALO FRANKLIN CARDOSO VAZ - 130115428
6.  JAQUELINE GUTIERRI COELHO - 150131283
7.  Felipe Xavier Barbosa da Silva - 180016326

# WebCrawler
Foi feito um script em python para poder baixar o html das páginas na web. O único requisito para a sua utilização é o download da biblioteca “beautifulsoup” através do comando no terminal:
> pip install beautifulsoup4

Agore acesse o diretório do webcrawler:

> cd src/webcrawler

Para utilizar, dentro do diretório tem um arquivo chamado words.txt que é utilizado para fazer buscas no google para baixar as páginas html.

Para executar, basta passar como parâmetro dois caminhos para a localização do arquivo words.txt e o diretório de destino.

> python webcrawler.py words.txt ../server/api/data/pages/


# Tokenizer
Depois de baixadas as páginas web e salvar no diretório "../server/api/data/pages/", executamos o tokenizer. Esse é um script que faz um preprocessamento em todos os textos de todas as páginas web baixadas e separa todas as palavras em um array.

Não há nenhuma dependência para esse script, uma vez que todas as bibliotecas usadas são as padrões do próprio python.

Acesse o diretório do tokenizer a partir do diretório raiz do projeto:

> cd src/tokenizing/

Para executar o script use o comando:

> python tokenize.py ../server/api/data/pages/ ../server/api/data/tokenized_pages/

#  Word Indexes
Depois de tokenizado o texto das páginas, convertemos as palavras em indices, de tal forma que posteriormente as execuções não serão mais feitas por comparação de strings, mas serão gerados arquivos que representam subconjuntos de páginas que contém uma determinada palavra.

Para isso é necessário instalar a biblioteca do nltk através do comando:

> pip install nltk

Acesse o diretório api do servidor a partir do diretório raiz do projeto:

> cd src/reverse_index

Em seguida para executar precisamos usar o seguinte comando:

> python reverse_index.py ../server/api/data/tokenized_pages/ ../server/api/data/text_indexes/

E assim, todas as novas páginas web baixadas poderão ser indexadas pelo algoritmo desenvolvido por nós.

#  Reverse index Generator
Apór termos todas as páginas indexadas, esse script é responsável para gerar todos os reverse index para a busca.

Acesse o diretório api do servidor a partir do diretório raiz do projeto:

> cd src/server/api

Para executar é necessário utilizar o nodejs que instalado na seção do servidor:

> node init_files.mjs

# Server

Foi utilizado o framework chamado Nuxtjs em que utiliza um servidor Node juntamente com uma interface gráfica em Vue para prover uma o buscador em uma aplicação web. O algoritmo de busca foi feito em javascript, assim, tudo será rodado no servidor Node que o Nuxt fornece. Assim, a interface gráfica tem acesso aos resultado por meio de um request do tipo GET ao servidor.

## Requirements
A partir do diretório raiz, acesse:

> cd src/server/

```bash
# Linux

# install nodejs
$ sudo apt-get update
$ sudo apt-get intall nodejs

# install npm
$ sudo apt-get update
$ sudo apt-get intall npm

# Windows 

# install nodejs and npm
$ https://nodejs.org/en/

# install yarn
$ npm install --global yarn
```

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

Assim que realizar todas as configurações abra o browser e digite:

> localhost:3000

Será possível visualizar um campo para digitar a busca e outro para realizar a consulta. Nesse campo realize uma consulta qualquer e automaticamente será encaminhado para uma nova página contendo o resultado da consulta feita.

As demais seções não são necessárias para a execução do programa, uma vez que os dados necessários para a execução já estão prontos. Caso queira executar a nossa seach engine com um novo conjunto de dados, é necessário baixar através do nosso webcrawler e seguir com os demais processamentos - NECESSARIAMENTE nessa ordem - em cima dos dados baixados.
