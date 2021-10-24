import {makeListReader,readWords} from '../../util/file_acess.mjs';
import {init_Index_files} from './inicializar.mjs';

export function makeIndex(ids, text_index_acess, index_acess) {
    init_Index_files(text_index_acess, index_acess.path);
    return (word) => {
        if(!(word in ids))
            return [];

    	let list = index_acess.readList(ids[word]);
        return list.map(e=>parseInt(e,10));
    }
}

/*
let text_indexes_path = '../../data/text_indexes/';
let index_path = '../../data/invertedIndexes/';
let words_path = '../../data/word_indexes/';
let f = makeIndex(readWords(words_path),text_indexes_path,index_path,words_path);
console.log("unb",f("unb"));
*/