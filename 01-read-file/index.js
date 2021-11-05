const fs = require('fs');
const process = require('process');

let readStream = fs.createReadStream(`${__dirname}/text.txt`,'utf8');
readStream.on('data', result => process.stdout.write(result.trim()));

// fs.createReadStream(`${__dirname}/text.txt`,'utf8').on('data', result => process.stdout.write(result.trim()));