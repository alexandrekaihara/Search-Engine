// Converte uma string de busca para uma notação polonesa válida
export function processar(){
    return (string) => {
        string = string.replace('""', '') // Remove aspas sem nada dentro
        
        let string_list = string.split('')

        verificar_aspas(string_list) // Remove aspas sem correspondência
        verificar_parenteses(string_list) // Remove parênteses sem correspondência
        adicionar_aspas(string_list) // Adiciona aspas ao redor de palavras
        string = string_list.join('')

        string = string.replace(/"(.*?)"/g, '("$1")') // Adiciona parêntesis ao redor de aspas
        
        string = notacao_polonesa(string)

        string = otimizar_notacao_polonesa(string)

        return string.reverse();
    }
}


function verificar_aspas(string){
    var aspas = []
    for(var i = 0; i < string.length; i++){
        var char = string[i]
        if(char === '"')
            aspas.push(i)
    }
    if(aspas.length%2 === 1){
        var ultimo = aspas.pop()
        string[ultimo] = ' '
    }
}

function verificar_parenteses(string){
    var stack = []
    for(var i = 0; i < string.length; i++){
        var char = string[i];
        if(char === '"'){ // Se encontrar um termo entre aspas, ignorar todo o termo
            for(i++; i < string.length && string[i] != '"'; i++)
            continue
        }
        if(char === '('){
            stack.push(i)
        }else if(char === ')' && stack.length > 0){
            stack.pop()
        }else if(char === ')')
            string[i] = ' '
    }
    while(stack.length > 0){
        var ultimo = stack.pop()
        string[ultimo] = ' '
    }
}

// Retorna true se o caractere não estiver em [' ', '"', '(', ')', '-']
function is_word_character(char){
    var lista = [' ', '"', '(', ')', '-']

    for(var i = 0; i < lista.length; i++)
        if(char === lista[i])
            return false

    return true
}

// Adiciona aspas ao redor de palavras
function adicionar_aspas(string){
    for(var i = 0; i < string.length; i++){
        if(string[i] === '"'){ // Se encontrar um termo entre aspas, ignorar todo o termo
            for(i++; i < string.length && string[i] != '"'; i++);
            continue
        }

        if( !is_word_character(string[i]) ){ // Se o caractere não for de uma palavra, ignorar
            continue
        }
        
        // Se o caractere for de uma palavra, ler até o final dela e colocar tudo entre aspas
        var palavra = []
        var start = i
        palavra.push(string[i])
        for(i++; i < string.length && is_word_character(string[i]); i++)
            palavra.push(string[i])
        i--
        var end = i

        if(palavra.join('') === 'AND' || palavra.join('') === 'OR')
            continue

        string[start] = '"' + string[start]
        string[end] = string[end] + '"'
    }
}

function tratar_pilhas(nivel, operadores, elementos){
    var operador = {op: '', nivel: -1}
    var elemento1 = ''
    var elemento2 = ''
    var elementos_no_nivel = nivel[nivel.length - 1]


    if(operadores.length > 0){
        operador = operadores.pop()
        if(operador.nivel != nivel.length){
            operadores.push({op: operador.op, nivel: operador.nivel})
            operador.op = ''
        }
    }
    if( elementos_no_nivel > 0)
        elemento2 = elementos.pop()
    if( elementos_no_nivel > 1)
        elemento1 = elementos.pop()

    if( operador.op === '-' && elementos_no_nivel > 0 ){
        if(elementos_no_nivel > 1)
            elementos.push(elemento1)
        elementos.push('- ' + elemento2)
    }
    else if( operador.op === 'OR' && elementos_no_nivel === 2 ){
        elementos.push( '| ' + elemento1 + ' ' + elemento2 + ' ')
        nivel[nivel.length - 1] -= 1
    }
    else if( elementos_no_nivel === 2 ){
        elementos.push( '& ' + elemento1 + ' ' + elemento2 + ' ')
        nivel[nivel.length - 1] -= 1

        if(operador.op === '')
            operadores.push(operador)
    }
    else{
        if(operador.op != '')
            operadores.push(operador)
        if(elemento1 != '')
            elementos.push(elemento1)
        if(elemento2 != '')
            elementos.push(elemento2)
        return false // retorna falso se nenhuma operação foi feita
    }
    
    return true // retorna true se alguma operação foi feita
}

function notacao_polonesa(string){
    var nivel = [0]
    var operadores = []
    var elementos = []
    for(var i = 0; i < string.length; i++){
        var char = string[i]
        if(char === ' '){
            continue
        }else if(char === '('){
            nivel.push(0)
        }else if(char === ')'){
            var elementos_no_nivel = nivel.pop()
            if(elementos_no_nivel === 1)
                nivel[nivel.length - 1] += 1
        }else if(char === '"'){
            var operando = []
            for(i++; i < string.length && string[i] != '"'; i++)
                operando.push(string[i])
            elementos.push( '"' + operando.join('') + '"' )
            nivel[nivel.length - 1] += 1
        }else if(string.length - i > 3 && string[i] === 'A' && string[i+1] === 'N' && string[i+2] === 'D'){
            operadores.push({op: 'AND', nivel: nivel.length})
            i += 2;
        }else if(string.length - i > 2 && string[i] === 'O' && string[i+1] === 'R'){
            operadores.push({op: 'OR', nivel: nivel.length})
            i += 1;
        }else if(char === '-'){
            operadores.push({op: '-', nivel: nivel.length})
            continue
        }

        while(tratar_pilhas(nivel, operadores, elementos));

    }
    return elementos[elementos.length - 1]
}

function otimizar_notacao_polonesa(string){
    var count = 0
    var last = ''
    let output = []
    for(var i = 0; i < string.length; i++){
        if(string[i] === '"'){
            var termo = []
            var palavra = []
            for(i++; i < string.length && string[i] != '"'; i++){
                if(string[i] == ' '){
                    termo.push(palavra.join(''))
                    palavra = []
                }else
                    palavra.push(string[i])
            }
            termo.push(palavra.join(''))

            if(last != ''){
                output.push({op: last, n: count+1})
                last = ''
                count = 0
            }
            
            output.push(termo)
        }else if(string[i] === ' ')
            continue
        else if(string[i] === '-'){

            if(last != ''){
                output.push({op: last, n: count+1})
                last = ''
                count = 0
            }

            output.push({op: '-'})
        }else if(string[i] === last){
            count += 1
        }else{
            if(last != '')
                output.push({op: last, n: count+1})
            last = string[i]
            count = 1
        }
    }

    return output
}

/*
let f = processar();

let string = '""abc"(() -def'
console.log(f(string))

string = '(xy yz)(" -def'
console.log(f(string))

string = 'b -(a OR c AND d)-"d"AND"k"'
console.log(f(string))

string = ' (unb OR "universidade de Brasília" ) AND "notícias atuais" '
console.log(f(string))

string = ' abc '
console.log(f(string))

string = ' abc -xyz '
console.log(f(string))

string = ' (ab AND cd) OR (ef AND gh) AND -xy'
console.log(f(string))

string = 'a b c (d OR e)'
console.log(f(string))

string = 'a OR b AND c'
console.log(f(string))

string = '(a OR b) AND c'
console.log(f(string))

string = 'a OR (b AND c)'
console.log(f(string))

string = ' "ab" '
console.log(f(string))
*/