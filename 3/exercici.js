
const {readLine} = require('../utils');
const filename = './input.txt';

const part1 = async () => {
    const digits = Array(12).fill(0);
    let count = 0;

    // Omple count i digits
    await readLine(filename, line => {
        // Suma cops que digits son 1
        for(let i = 0; i < 12; i++){
            if(line[i] == '1'){
                digits[i]++;
            }
        }
        count++;
    });

    // Computa gamma i epsilon

    let gamma = Array(12).fill(0);
    let epsilon = Array(12).fill(0);

    for(let i = 0; i < 12; i++){
        if(digits[i]/count >= 0.5){
            gamma[i] = 1;
        }
        else{
            epsilon[i] = 1;
        }
    }

    // Interpreta en binari
    const gammaDec = parseInt(gamma.join(''),2)
    const epsilonDec = parseInt(epsilon.join(''),2)

    return gammaDec*epsilonDec;
}

part1().then(res => console.log(res))


const part2 = async () => {

    // Com que he fer més d'una passada sobre l'array original i només té 1000 línies, el carrego sencer en memòria
    let file = [];
    await readLine(filename, line => {
        file.push(line);
    });

    const SplitMode = {
        O2Gen: "O2Generator",
        CO2Scrubber: "CO2Scrubber"
    };

    function splitByDigitRecursive(array, position, splitMode){

        if(array.length <= 1 || position > 11)
            return array;

        let have1 = [], have0 = [];
        array.map((element) => {
            if(element[position] == '1'){
                have1.push(element);
            }
            else{
                have0.push(element);
            }
        });

        const morePopularSet = have1.length >= have0.length ? have1 : have0;
        const lessPopularSet = have1.length >= have0.length ? have0 : have1;

        if(splitMode == SplitMode.O2Gen) {
            return splitByDigitRecursive(morePopularSet, position + 1, splitMode);
        } else if(splitMode == SplitMode.CO2Scrubber){
            return splitByDigitRecursive(lessPopularSet, position + 1, splitMode);
        }
    }

    let O2Gen = splitByDigitRecursive(file, 0, SplitMode.O2Gen);
    let CO2Scrubber = splitByDigitRecursive(file, 0, SplitMode.CO2Scrubber);

    return parseInt(O2Gen.join(''),2)
        * parseInt(CO2Scrubber.join(''),2);
}

part2().then(res => console.log(res))