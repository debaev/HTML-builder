const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');
const fileSrc = path.join('03-files-in-folder','secret-folder')

async function getFolderFiles(folderName) {
  const files = await fsPromise.readdir(folderName, {withFileTypes: true});
  
  for (const file of files) {
    fs.stat(path.join(fileSrc,`${file.name}`), (err, stats) => {
      err ? console.log(err) : '';
      stats.isFile() ? process.stdout.write(`${path.parse(file.name).name} - ${path.extname(file.name).slice(1)} - ${stats.size / 1000}kb\n`) : '';
    })
  }
}

getFolderFiles(path.join(__dirname,'secret-folder'));