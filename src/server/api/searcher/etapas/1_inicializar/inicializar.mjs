import {writeFileSync,readdirSync,existsSync,mkdirSync} from 'fs';
import {makeListReader} from '../../util/file_acess.mjs';
import {ordenar} from '../../util/ordenar.mjs'

// Pega uma lista de documentos em uma pasta e gera a indexação inversa das palavras nesses documentos
export function init_Index_files(text_index_acess, index_path) {
    // Obter conjunto de índices
    let sorted_file_indexes = (() => {
        // Fazer lista de ids
        let file_names = readdirSync(text_index_acess.path);
        let list = file_names.map(fn=>fn.match(/\d+/g).pop());
        ordenar(list,(l,r)=>{return parseInt(l,10)-parseInt(r,10)});
        return list;
    })();

    let indexFile = {};

    var readList = text_index_acess.readList;
    for(let i of sorted_file_indexes){
        // Extrair lista de ids do arquivo
        let content = readList(i);
        // Tirar repetições
        let unique = [... new Set(content)];
        for(let u of unique)
            if(u in indexFile)
                indexFile[u] = indexFile[u].concat(' ' + i);
            else
                indexFile[u] = i;
    }

    if(!existsSync(index_path))
        mkdirSync(index_path);

    let writeListToFile = (word_id) => {writeFileSync(index_path + word_id +'.txt', indexFile[word_id], "utf8");};
    for(let word_id in indexFile)
        writeListToFile(word_id);
}

/*
import {makeListReader} from '../../file_acess/file_acess.mjs';
let folder_path = '../../../data/text_indexes/';
let index_path = '../../../data/invertedIndexes/';
init_Index_files(folder_path, makeListReader(folder_path) , index_path);
*/