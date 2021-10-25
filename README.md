# Search Engine - Projeto e Análise de Algoritmos
## 1. Alunos
1. Alexandre Mitsuru Kaihara - 18/0029690
2.  Pedro Luis Chaves Rocha - 180054635
3. Gabriel Rodrigues Diogenes Macedo - 150126808
4. Guilherme Chagas Suzuki - 180032518
5. ITALO FRANKLIN CARDOSO VAZ - 130115428
6.  JAQUELINE GUTIERRI COELHO - 150131283
7.  Felipe Xavier Barbosa da Silva - 180016326

# Server

Foi utilizado o framework chamado Nuxtjs em que utiliza um servidor Node juntamente com uma interface gráfica em Vue para prover uma o buscador em uma aplicação web. O algoritmo de busca foi feito em javascript, assim, tudo será rodado no servidor Node que o Nuxt fornece. Assim, a interface gráfica tem acesso aos resultado por meio de um request do tipo GET ao servidor.

## Requirements

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

## WebCrawler
### Requisitos 
Foi feito um script em python para poder baixar o html das páginas na web. O único requisito para a sua utilização é o download da biblioteca “beautifulsoup” através do comando no terminal:
> pip install beautifulsoup4p

Agore acesse o diretório do webcrawler:

> cd src/webcrawler

Para utilizar, dentro do diretório tem um arquivo chamado words.txt que é utilizado para fazer buscas no google para baixar as páginas html.

Para executar, basta passar como parâmetro dois caminhos para a localização do arquivo words.txt e o diretório de destino.

> python webcrawler.py words.txt ../server/api/data/pages/
