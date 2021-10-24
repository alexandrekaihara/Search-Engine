// Função auxiliar do kpm que preprocessa a string/lista
function preprocess(s=[]) {
	let P = [0];
	let length = 0;
	for(let matches=1; matches<s.length; matches++) {
		while(length>0 && s[length] != s[matches])
			length = P[length];
		if(s[length]==s[matches])
			length++;
		P.push(length);	// P[matches] = length
	}
	return P;
}

// Algoritmo de Knuth_Morris_Pratt adaptado para listas de inteiros
// s := lista de inteiros a ser buscada
// t := lista de inteiros onde a busca será feita 
export function Knuth_Morris_Pratt(s=[],t=[],one=false) {
	let F = [];
	let matches = 0;
	let P = preprocess(s);
	for(let i=0; i<t.length; i++) {
		while(matches>0 && s[matches] != t[i])
			matches = P[matches-1];
		if(s[matches]==t[i])
			matches++;
		if(matches==s.length){
			F.push(i-s.length+1);
			if(one)
				return F;
			matches = P[matches-1];
		}
	}
	return F;
}

/*
let s = [1,2,3,1];
let t = [1,3,1,2,4,1,2,3,1,2,3,1,4,6,4,5,3,1,2,1,2,3,1];
console.log(Knuth_Morris_Pratt(s,t,false));
*/