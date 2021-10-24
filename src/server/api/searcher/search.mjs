import {makeIndex} from "./etapas/1_inicializar/index.mjs";
import {readWords,makeFileAcess,makePageReader,getAllIndexes} from "./util/file_acess.mjs";
import {processar} from "./etapas/2_processar/processar.mjs";
import {buscar} from "./etapas/3_buscar/buscar.mjs";
import {calcular} from "./etapas/4_calcular/calcular.mjs";
import {isAbsolute as isAbs} from 'path';
import {bsearch} from "./util/busca_binaria.mjs";

export function make_Searcher(text_index_path, index_path, words_path, JSON_text_path){
	if(!isAbs(text_index_path) || !isAbs(index_path) || !isAbs(words_path) || !isAbs(JSON_text_path)) {
		console.error("Os diretórios devem ser absolutos!");
		return null;
	}

	let text_index_acess = makeFileAcess(text_index_path); 
	let index_acess = makeFileAcess(index_path);
	let ids = readWords(words_path);
	let index = makeIndex(ids, text_index_acess, index_acess);
	let Universal_set = getAllIndexes(text_index_path);

	let p = processar();
	let b = buscar(ids,index,text_index_acess);
	let c = calcular(Universal_set);

	let result,matches=new Map();

	let search = (str="") => {
		matches.clear();

		let notacao_polonesa = p(str);
		let page_sets;
		[matches,page_sets] = b(words_in(notacao_polonesa));

		// Substituir strings por seus subconjuntos correspondentes
		notacao_polonesa = notacao_polonesa.map(e=>e.op!==undefined? e:page_sets.get(e));

		result = c(notacao_polonesa);
		for(let [m,_] of matches)
			if(!bsearch(m,result)) 
				matches.delete(m);	// É um problema deletar iterador dentro de iteração?
		return result;
	};

	let getJSONFile = makePageReader(JSON_text_path);
	let retrieve_preview = (page_id,n) => {
		if(!matches.has(page_id))
			return null;

		// Fazer intervalos para a busca de preview
		let posicoes = matches.get(page_id);
		let intervals = posicoes.map(e=>({l: e.posicao-n, upper: e.posicao+n+e.string.length}));
		
		let page = getJSONFile(page_id);
		let word_list = page.texto.match(/[^\s]+/g);

		// Processar intervalos para evitar buscas fora de intervalos ou com intersecções entre si
		adjust_intervals(intervals,word_list.length);

		let previews = intervals.map(e=>word_list.slice(e.l,e.upper));
		let description = make_description(previews);

		return {name:page.titulo, url:page.url, description:description};
	}; 

	let get_result = (() => result);

	return {search:search, retrieve_preview:retrieve_preview, result: get_result};
}

function make_description(previews) {
	let str=null;
	for(let p of previews) {
		let substr = "";
		for(let word of p)
			substr += word + ' ';
		if(str===null)
			str = substr;
		else
			str += ' ... ' + substr;
	}
	return str;
}

function adjust_intervals(intervals, upper_limit) {
	for(let i=0; i<intervals.length; i++){
		let {l,upper} = intervals[i];
		intervals[i] = {l:Math.max(0,l),upper:Math.min(upper,upper_limit)};
	}
}

function words_in(notacao_polonesa) {
	let list = [];
	for(let element of notacao_polonesa)
		if(element.op===undefined)
			list.push(element);
	return list;
}


/*
let root_to_project = '/mnt/c/users/guilherme/desktop/searchengine/';
let text_index_path = root_to_project + 'data/text_indexes/';
let index_path = root_to_project + 'data/invertedIndexes/';
let words_path = root_to_project + 'data/word_indexes/';
let JSON_text_path = root_to_project + 'data/mockups/';	
let searcher = make_Searcher(text_index_path, index_path, words_path, JSON_text_path);
searcher.search("unb AND-(-\"distrito federal\" OR vestibular)");
console.log(searcher.retrieve_preview(searcher.result()[0],1));
console.log(searcher.retrieve_preview(searcher.result()[0],5));
console.log(searcher.result());
searcher.search("-LOL");
console.log(searcher.result());
searcher.search("\"LOL LOL\"");
console.log(searcher.result());
console.log(searcher.retrieve_preview(searcher.result()[0],3));
*/

