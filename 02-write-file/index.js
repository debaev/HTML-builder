const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
const writeStream = fs.createWriteStream(filePath);

process.stdout.write('Write down whatever you want below and once you\'re done press ctrl+c or type "exit" and i\'mma show you what you wrote.\n');

rl.on('line', (inputVal) => {
  inputVal = inputVal.toString().trim();
  inputVal === 'exit' ? rl.close() : writeStream.write(inputVal + '\n');
});

rl.on('close', () => {
  process.stdout.write(`\n\nSo here's what you wrote:\n\n`);
  fs.createReadStream(filePath,'utf8').on('data', result => process.stdout.write(result));
});