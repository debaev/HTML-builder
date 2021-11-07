const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.mkdir(`${__dirname}/files-copy`, {recursive: true});

// async function getFolderFiles(folderName) {
//   const files = await fsPromise.readdir(folderName, {withFileTypes: true});
//   console.log(files);
//   for (const file of files) {
//     // fs.stat(`./03-files-in-folder/secret-folder/${file.name}`, (err, stats) => {
//     //   err ? console.log(err) : '';
//     //   stats.isFile() ?  : '';
//     // })
//     console.log(file);
//   }
// }

// getFolderFiles(`${__dirname}files/`);

console.log(`${__dirname}/files`);
const path = require('path');
console.log(path.join(__dirname, 'files'));