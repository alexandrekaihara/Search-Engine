import {init_Index_files} from './searcher/etapas/1_inicializar/inicializar.mjs';
import {makeFileAcess} from './searcher/util/file_acess.mjs';

let index_path = __dirname + 'data/invertedIndexes/';
let text_index_acess = makeFileAcess(__dirname + 'data/text_indexes/');

init_Index_files(text_index_acess, index_path);