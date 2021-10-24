import {readFileSync,readdirSync} from 'fs';
import {ordenar} from './ordenar.mjs';

function idFileFormat(indice,extension) {
	return indice + '.' + extension;
}

// Retorna lista de string do arquivo
export function makeFileAcess(diretorio) {
	return {
		path: diretorio,
		readList: makeListReader(diretorio,' ')
	};
}

// Retorna lista de string do arquivo
export function makeListReader(diretorio,sep=' ') {
	return (indice) => {
		let file_name = idFileFormat(indice,'txt');
		return readFileSync(diretorio + file_name,"utf8").split(sep);
	}	
}
/*
let f = leitor_de_arquivos_de_indices("../data/text_indexes/");
console.log(f(1));
*/

function readJSON(folder_path, filename) {
	let text = readFileSync(folder_path + filename, 'utf8');
	return JSON.parse(text);
}

// Lê as listas de palavras de separadores, stopwords e palavras normais, e junta tudo em um objeto.
export function readWords(folder_path){
	let read = (filename) => readJSON(folder_path,filename); 
	let separadores = read('separadores.json');
	let stopwords = read('stopwords.json');
	let wordindexes = read('wordindexes.json');
	let words = Object.assign({}, separadores, stopwords, wordindexes);
    return words;
}

/*
let folder_path = '../data/word_indexes/';
let words = readWords(folder_path)
console.log(", =>", words[","]);
console.log("para =>", words["para"]);
console.log("unb =>", words["unb"]);
*/

export function makePageReader(folder_path) {
	return (page_id) => {
		let filename = idFileFormat(page_id,'JSON');
		return readJSON(folder_path,filename);
	}
}

export function getAllIndexes(folder_path) {
    let file_names = readdirSync(folder_path);
    let indexes = file_names.map(e=>parseInt(e,10));
    ordenar(indexes,(l,r)=>l-r);
    return indexes; 
}