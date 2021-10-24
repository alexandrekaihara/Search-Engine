import {Knuth_Morris_Pratt} from './kmp.mjs';

export function buscar(ids,index,text_index_acess) {
	// funcao que recebe uma lista de palavras e retorna a lista de subconjuntos de páginas 
	return (palavras) => {
		let results = new Map();
		let page_matches = new Map();
		for(let palavra of palavras) {
			let termo = palavra[0];
			let lista_ids = palavra.map(s=>ids[s]);
			let conjunto = index(termo);
			// Caso seja palavra composta
			let novo_conjunto=[];
			for(let pagina of conjunto) {
				let t = text_index_acess.readList(pagina);
				t = t.map(e => parseInt(e,10));
				let match;
				if((match = Knuth_Morris_Pratt(lista_ids,t,false)).length>0) {
					novo_conjunto.push(pagina);
					if(!page_matches.has(pagina))
						page_matches.set(pagina,[]);
					page_matches.get(pagina).push({string:palavra, posicao:match.pop()});
				}
			}
			conjunto=novo_conjunto;
			results.set(palavra,conjunto);
		}		
		return [page_matches, results];
	}
}

/*
import {makeIndex} from '../../index/index.mjs';
import {makeFileAcess,readWords} from '../../util/file_acess.mjs'
let text_index_acess = makeFileAcess('../../../data/text_indexes/');
let index_acess = makeFileAcess('../../../data/invertedIndexes/');
let words_path = '../../../data/word_indexes/';
let ids = readWords(words_path);
let index = makeIndex(ids, text_index_acess, index_acess);
let f = procurar(ids,index,text_index_acess);
console.log(f(["vestibular","atividades","atividades    presenciais"]));
*/