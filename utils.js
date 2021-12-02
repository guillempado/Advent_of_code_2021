const fs = require('fs');
const rl = require('readline');


const readLine = async (filename, callback) => {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filename);
        const reader = rl.createInterface({input: stream});
        reader.on('line', line => callback(line));
        reader.on('close', resolve);
    })
}

const makeFixedSizeQueue = (length) => {
    let queue = Array(length);

    queue.add = element => {
        // És una cua de mida fixa, quan entra un element pel final en surt un pel principi
        queue.push(element);
        return queue.shift();
    }

    queue.peek = () => {
        return queue[0];
    }

    queue.isFull = () => {
        return queue[0] !== undefined;
    }

    queue.sumElements = () => queue.isFull() ? queue[0] + queue[1] + queue[2] : undefined;

    return queue;
}

module.exports = {
    readLine, makeFixedSizeQueue
}