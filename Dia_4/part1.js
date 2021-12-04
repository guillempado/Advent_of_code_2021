const {readLines} = require('../utils');
const filename = './input.txt';

const loadGameFile = async () => {

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
                // Cal convertir dobles espais a single espais perquè no generi elements buits q dp en fer map a Number converteixi a zeros fent línies amb un element més que és zero allà on hi havia dobles espais (pq l'element següent tingui només un dígit)
                .push(line.replace("  ", " ").trimStart(' ').split(' ').map(Number));
        }
        // First line == length > 14 == drawnNumbers
        else {
            game.drawnNumbers = line.split(',').map(Number);
        }
    })

    return game;
}

const markNumber = (cardboard, solution, drawnNumber) => {
    for(let row = 0; row < cardboard.length; row++){
        for(let column = 0; column < cardboard[0].length; column++){
            if(cardboard[row][column] === drawnNumber){
                solution[row][column] = true;
                // Return true només si la crida ha tingut efecte
                return true;
            }
        }
    }
    return false;
}

const cardboadIsSolved = (solution) => {
    // Check Rows
    for (let row = 0; row < solution.length; row++) {
        // mira que tots els valors de l'array contingut al row siguin true
        if(solution[row].every(Boolean)){
            return true;
        }
    }

    // Check columns
    // Per cada columna
    for (let column = 0; column < solution.length; column++) {
        let columnIsValid = true;
        // Mira el valor a cada fila i para quan trobis false
        for (let row = 0; row < solution.length; row++) {
            if(solution[row][column] === false){
                columnIsValid = false;
                break;
            }
        }
        // si no has parat tots son true i pots retornar true
        if(columnIsValid){
            return true;
        }
    }
    return false;
}

const sumUnmarkedNumbers = (cardboard, solution) => {
    let sum = 0;
    for(let row = 0; row < cardboard.length; row++){
        for(let column = 0; column < cardboard[0].length; column++){
            if(!solution[row][column]){
                sum += cardboard[row][column];
            }
        }
    }
    return sum;
}

const getGameScore = (game) => {

    // Data Structure on anar marcant true quan un cardboard tingui un número que coincideixi amb un drawnNumber
    let solutions = [];
    for (let i = 0; i < game.carboards.length; i++) {
        solutions.push([]);
        for(let j = 0; j < 5; j++){
            solutions[i].push([]);
            for(let k = 0; k < 5; k++){
                solutions[i][j].push(false);
            }
        }

    }

    // Game loop
    let sum;
    for (const drawnNumber of game.drawnNumbers) {
        for (let i = 0; i < game.carboards.length; i++) {
            if(markNumber(game.carboards[i], solutions[i], drawnNumber)){
                if(cardboadIsSolved(solutions[i])){
                    sum = sumUnmarkedNumbers(game.carboards[i], solutions[i]);
                    return sum * drawnNumber;
                }
            }
        }
    }
}

loadGameFile().then(game => console.log(`The Game Score is ${getGameScore(game)}`));