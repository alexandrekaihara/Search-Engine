
class Hash{
	constructor(mod, prime){
		this.mod = mod;
		this.prime = prime;
	}

	getCharCode(char){
		let base = "a".charCodeAt(0);
		let code = char.charCodeAt(0);
		return code - base;
	}

	hashString(string){
		let hashList = [];
		let mul = 1;
		for(var i = 0; i < string.length; i++){
			var code = this.getCharCode(string.charAt(i));
			hashList.push( (code*mul)%this.mod );
			mul = (mul*this.prime)%this.mod;
		}
		return hashList;
	}
}

let string = "abcefghijklmno";
const hasher = new Hash(1e9+7, 31);

let hashList = hasher.hashString(string)

console.log(hashList)