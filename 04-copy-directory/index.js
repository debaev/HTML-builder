const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const srcPath = path.join(__dirname,'files')

const rmMkDir = async () => {
    await fsPromises.rm(`${srcPath}-copy`, { force: true, recursive: true });
    await fsPromises.mkdir(`${srcPath}-copy`);
} 

async function getFolderFiles(folderName) {
  await rmMkDir();
  const files = await fsPromises.readdir(folderName, {withFileTypes: true});
  for (const file of files) {
  fsPromises.copyFile(path.join(srcPath,file.name),path.join(__dirname,'files-copy', file.name))
  }
}

getFolderFiles(srcPath);