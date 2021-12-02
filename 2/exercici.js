
const {readLine} = require('../utils');
const filename = './input.txt';

const part1 = async () => {
    let x = 0, y = 0;
    await readLine(filename, (line) => {
        const [instruction, steps] = line.split(' ');
        switch(instruction){
            case 'forward':     x += parseInt(steps);   break;
            case 'up':          y -= parseInt(steps);   break;
            case 'down':        y += parseInt(steps);   break;
        }
    })
    return x * y;
}

part1().then(res => console.log(res));

const part2 = async () => {
    let x = 0, y = 0, aim = 0;
    await readLine(filename, (line) => {
        let [instruction, steps] = line.split(' ');
        steps = parseInt(steps);
        switch(instruction){
            case 'forward':     x += steps; y += aim * steps;   break;
            case 'up':          aim -= steps;                   break;
            case 'down':        aim += steps;                   break;
        }
    })
    return x * y
}

part2().then(res => console.log(res));