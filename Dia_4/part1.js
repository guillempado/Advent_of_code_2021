const {readLines} = require('../utils');
const filename = './input.txt';

const loadFile = async () => {

    let game = {
        drawnNumbers: [],
        carboards: []
    };

    await readLines(filename, (line) => {
        // Línies buides separen cardboards
        if (line.length === 0) {
            // Afegeix nou cardboard
            game.carboards.push([]);
        }
        // Línies de 14 caràcters afegeixen valors a cardboard creat anteriorment
        else if (line.length === 14) {
            // Recupera últim cardboard creat i afegeix-li una línia
            game.carboards[game.carboards.length - 1]
                .push(line.split(' ').map(Number));
        }
        // First line == length > 14 == drawnNumbers
        else {
            game.drawnNumbers = line.split(',').map(Number);
        }
    })

    return game;
}


const run = async ()=> {
    const game = await loadFile();
    ;
}

run();