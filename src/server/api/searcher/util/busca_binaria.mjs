export function bsearch(e, arr) {
	let idiv = (a,b)=> a/b>>0;
	let i,l=0,r=arr.length-1;
	do {
		i = idiv(l+r,2);
		if(arr[i]===e)
			return true;

		if(e<arr[i])
			r=i-1;
		else
			l=i+1;
	} while(l<=r);

	return false;
}

