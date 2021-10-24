import {intersection,union,difference} from "./operacoes.mjs"

export function calcular(Universal_set) {
	// dados
	var operator = new Map([['&',AND],['|',OR]]);
	// funcao que calcula a expressão na forma de lista de Operandos e Operadores
	return (expressao) => {
		let pilha = [];
		for(const e of expressao) {
			if(e.op === undefined) 
				pilha.push({conj:e,neg:false});
			else if(e.op==='-') {
				let value = pilha.pop();
				value.neg = !value.neg;
				pilha.push(value);
			} else {
				// Obtém operandos
				let values=[];
				for(let i=0; i<e.n; i++)
					values.push(pilha.pop());

				// Aplica operação
				let f = operator.get(e.op);
				let result = f(values[0],values[1]);
				for(let i=2; i<e.n; i++)
					result = f(result,values[i]);

				// Guarda resultado como operando
				pilha.push(result);
			}
		}
		let result = pilha.pop();
		if(result.neg) 	
			// ~A = U-A
			result.conj = difference(Universal_set,result.conj);

		return result.conj;
	}
}


function AND(a, b) {
	if(!a.neg && !b.neg)
		// A & B
		return {conj:intersection(a.conj,b.conj), neg:false};

	if(a.neg && !b.neg)
		// ~A & B = B-A 
		return {conj:difference(b.conj,a.conj), neg: false};

	if(!a.neg && b.neg)
		// A & ~B = A-B 
		return {conj:difference(a.conj,b.conj), neg: false};

	// ~A & ~B = ~(A | B)
	return {conj:union(a.conj,b.conj),neg:true}; 
}

function OR(a, b) {	
	if(!a.neg && !b.neg)
		// A | B
		return {conj:union(a.conj,b.conj), neg:false};
	
	if(a.neg && !b.neg)
		// ~A | B  = ~(A & ~B) = ~(A-B)
		return {conj:difference(a.conj,b.conj), neg: true};

	if(!a.neg && b.neg)
		// A | ~B  = ~(~A & B) = ~(B-A)
		return {conj:difference(b.conj,a.conj), neg: true};

	// ~A|~B = ~(A & B)
	return {conj:intersection(a.conj,b.conj),neg:true}; 
}

/*
var f = calcular([0,1,2,3,4,5,6,7,8,9,11]);
var exp = [[0,1,2,3,4],{op:'-'},[2,3,4,5],[3,4,5],{op:'&',n:3},[7,8,9],[1,2],[0,1,2,3,4,5,6,7,8,9],{op:'-'},{op:'|',n:4}];
console.log("(Calcular.mjs)",f(exp));
*/