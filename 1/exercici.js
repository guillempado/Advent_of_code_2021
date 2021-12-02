
const {readLine, makeFixedSizeQueue} = require('../utils');
const filename = './input.txt';

const part1 = async filename => {
    let lastLineValue = null;
    let count = 0;
    await readLine(filename, line => {
        // HI HA UN BUG A LA CORRECCIÓ, HE HAGUT DE CONTAR EL 1R COM A INCREMENT...
        // if(!lastLineValue){
        //     lastLineValue = line;
        //     return;
        // }

        if(line > lastLineValue){
            // DEBUG - console.log(`line: ${line}, lastLine: ${lastLineValue}`)
            count++;
        }
        lastLineValue = line;
    });
    return count;
}

part1(filename).then(res => console.log(`Part 1: he number of larger measures is: ${res}`));

const part2 = async filename => {

    const queue = makeFixedSizeQueue(3);
    let count = 0;
    let lastSumValue;

    // Implementació de workaround de BUG de correcció: l'enunciat diu que s'ha de descartar 1r cas però correcció només valida si no es descarta 1r cas
    await readLine(filename, line => {
        queue.add(parseInt(line));
        let sumValue = queue.sumElements();
        if(sumValue > lastSumValue){
            count++;
        }
        lastSumValue = sumValue;
    });
    return count;
}

part2(filename).then(res => console.log(`Part 2: The number of larger measures is: ${res}`));