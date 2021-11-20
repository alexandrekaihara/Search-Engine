# Search Engine - Projeto e Análise de Algoritmos
Este trabalho visa construir um algoritmo busca de páginas eficiente através da indexação de páginas e disponibilizar através de um serviço Web. A solução proposta é realizar a indexação inversa de páginas implementado essencialmente em JavaScript. 

O processo de indexação inversa foi decomposta em etapas para o desenvolvimento independente de cada dupla do grupo. Vale ressaltar que já existe um conjunto exemplo de páginas baixadas e processadas com os índices reversos no repositório, se o usuário quiser, pode pular para a etapa de configuração do servidor para executar o Search Engine.

# WebCrawler
Foi feito um script em python para poder baixar o html das páginas na web. O único requisito para a sua utilização é o download da biblioteca “beautifulsoup” através do comando no terminal:
> pip install beautifulsoup4

Agore acesse o diretório do webcrawler, a partir do diretório raiz do projeto:

> cd src/webcrawler

Para utilizar, dentro do diretório tem um arquivo chamado words.txt que é utilizado determinar quais buscas serão feitas no google para baixar as páginas html.

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
A partir do diretório raiz do projeto, acesse:

> cd src/server/

Executer todos esses comandos para a configuração:

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

Assim que realizar todas as configurações abra o browser e digite:

> localhost:3000

Será possível visualizar um campo para digitar a busca e outro para realizar a consulta. Nesse campo realize uma consulta qualquer e automaticamente será encaminhado para uma nova página contendo o resultado da consulta feita.

# Intruções de Uso
Na página inicial será exibido um campo em que será possível inserir a busca. Assim como no Google, é possível adicionar algumas operações dentro da busca para torná-la mais precisa. Tais operações são o AND, OR, busca literal e negação. Nas buscas é possível fazer qualquer composição dessas operações e inclusive adicionar ordem de precedência utilizando-se parênteses.

## Operação AND
A operação AND significa a interseção entre o resultado de duas buscas. Por exemplo:
> unb AND notícias
Retornará todos os resultados que conter a palavra unb e notícias.

## Operação OR
A operação OR significa a interseção entre o resultado de duas buscas. Por exemplo:
> unb OR notícias
Retornará todos os resultados que conter a palavra unb e/ou notícias.

## Operação Busca Literal
A busca literal significa será feita a busca por páginas que contenham exatamente um trecho que tenha o mesmo texto contido na busca. Por exemplo:
> "unb notícias"
Retornará todas as buscas que tiver literalmente "unb notícias".

## Operação Negação
A negação é a eliminação das páginas de um conjunto que contenham uma determinada busca ou palavra. Por exemplo:
> unb -notícias
Retornará todas as páginas que tiverem a palavra unb mas não notícias no mesmo documento.

# Autores
1. Alexandre Mitsuru Kaihara
2. Pedro Luis Chaves Rocha 
3. Gabriel Rodrigues Diogenes Macedo 
4. Guilherme Chagas Suzuki
5. Italo FRanklin Cardoso Vaz
6. Jaqueline Gutierri Coelho 
7. Felipe Xavier Barbosa da Silva

