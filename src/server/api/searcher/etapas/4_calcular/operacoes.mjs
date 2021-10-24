// A,B := arrays de inteiros ordenados em ordem crescente
// Ordem dos operadores: A\B
export function difference(A=[],B=[]) {
	let C = [];	// C = conjunto vazio
	let i=0,j=0;
	while(i<A.length && j<B.length) {
		// Inserir elemento em comum	
		if(A[i]<B[j]) {
			// Inserir elemento de A que não existe em B
			C.push(A[i]);
			i++;
		} else if(B[j]<A[i])
			j++;
		else {	// A[i]==B[j]
			i++; j++;
		} 
	}
	C = C.concat(A.slice(i));

	return C;
}
// A,B := arrays de inteiros ordenados em ordem crescente
export function union(A=[],B=[]) {
	let C = [];	// C = conjunto vazio
	let i=0,j=0;
	while(i<A.length && j<B.length) {
		// Inserir o menor elemento primeiro
		if(A[i]<B[j]) {
			C.push(A[i]);
			i++;
		} else if(B[j]<A[i]) {
			C.push(B[j]);
			j++;
		} else {	// A[i] == B[j]
			C.push(A[i]);
			i++; j++;
		}
	}
	C = C.concat(A.slice(i),B.slice(j));

	return C;
}
// A,B := arrays de inteiros ordenados em ordem crescente
export function intersection(A=[],B=[]) {
	let C = [];	// C = conjunto vazio
	let i=0,j=0;
	while(i<A.length && j<B.length) {
		if(A[i]<B[j])
			i++;
		else if(B[j]<A[i])
			j++;
		else {	// A[i]==B[j]
			// Inserir elemento em comum
			C.push(A[i]);
			i++; j++;
		} 
	}
	return C;
}