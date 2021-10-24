function adjust_intervals(intervals, upper_limit){
    let intervalos = intervals.sort(function(a, b) {
        return a - b;
    });

    let atual = intervalos[0]
    let finais = []

    for(var i = 1; i < intervalos.length; i++){
        if( atual[1] >= intervalos[i][0] - 1 ){
            atual[1] = Math.max(atual[1], intervalos[i][1])
        }else{

            atual[0] = Math.max(0, atual[0])
            atual[1] = Math.min(upper_limit, atual[1])

            finais.push(atual)
            atual = intervalos[i]
        }
    }

    atual[0] = Math.max(0, atual[0])
    atual[1] = Math.min(upper_limit, atual[1])

    finais.push(atual)
    return finais
}   

//console.log(adjust_intervals([[1, 2], [3, 4], [2, 5], [6, 6], [6, 8], [10, 13]], 13))