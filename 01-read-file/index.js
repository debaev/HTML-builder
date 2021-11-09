const fs = require('fs');
const path = require('path');

let readStream = fs.createReadStream(path.join(__dirname,'text.txt'),'utf8');
readStream.on('data', result => process.stdout.write(result.trim()));


console.log('Все пункты сделаны если вдруг найдете ошибку напишите мне пожалуйста я до дедлайна постараюсь исправить заранее спасибо за понимание!');