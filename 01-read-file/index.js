const fs = require('fs');
const path = require('path');

let readStream = fs.createReadStream(path.join(__dirname,'text.txt'),'utf8');
readStream.on('data', result => process.stdout.write(result.trim()));