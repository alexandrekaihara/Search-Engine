



# SearchEngine

Funcionando por enquanto, 

**mas faltam ajustes que ficarão mais claros na hora de integrar o projeto, relacionados à compatibilidade da implementação com os arquivos fornecidos.**

## Como usar 

Invoque a função **makeSearcher**, passando os argumentos apropriados seguindo esta ordem:

> 1. **text_index_path**: Diretório do text_index (contendo arquivos contendo índices de palavras de cara página);
> 2. **index_path**: Diretório que será criado/usado para armazenar informações do índice Inverso.
> 3. **words_path**: Diretório usado para armazenar informações de índices de palavras;
> 4. **JSON_text_path**: Diretório contendo os documentos JSON das páginas;

Note que **index_path** é um local onde o programa escreverá arquivos novos. Além disso, todos diretórios devem ser absolutos.

A chamada a função **makeSearcher** retornará um objeto com as seguintes funções:

> 1. **search**: Realiza busca e retorna ids das páginas contidas no resultado;
> 2. **result**: Consulta resultado gerado pela chamada **search** imediatamente anterior;
> 3. **retrieve_preview**: Retorna, para dado *id* de página e *n*, um conjunto contendo listas de strings que formam a preview com n
> palavras vizinhas.

Um exemplo de utilização:
    	

    let searcher = make_Searcher(text_index_path, index_path, words_path, JSON_text_path);
        let ans = searcher.search("unb AND-(-\"distrito federal\" OR vestibular)");
        console.log(ans);
        console.log(searcher.result());
        console.log(searcher.retrieve_preview(searcher.result()[0],1));
        console.log(searcher.retrieve_preview(searcher.result()[0],2));
