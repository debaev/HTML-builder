const { createWriteStream, readFile } = require('fs');
const {readdir, appendFile, mkdir, rm, writeFile, copyFile } = require('fs').promises;
const fsPromise = require('fs').promises;
const { extname, basename, join } = require('path');
const distPath = join(__dirname, 'project-dist')


const createDirs = async () => {
  await rm(distPath, { force: true, recursive: true, maxRetries: 1 });
  await mkdir(distPath);
  await mkdir(join(distPath, 'assets'));
  await mkdir(join(distPath, 'assets', 'fonts'));
  await mkdir(join(distPath, 'assets', 'img'));
  await mkdir(join(distPath, 'assets', 'svg'));
  await createWriteStream(join(distPath, 'index.html'));
  await createWriteStream(join(distPath, 'style.css'));
}

const rebaseHTML = async () => {
  
  await readFile(join(__dirname, 'template.html'), 'utf-8', (err, content) => {
    if (err) throw err;
    appendFile(join(distPath, 'index.html'), content);
  });
  
  const componentContents = async () => {
  const files = await readdir(join(__dirname, 'components'), { withFileTypes: true });
  for (const file of files) {
      if (file.isFile() && extname(file.name) === '.html') {
        const componentName = basename(file.name, '.html');
        const componentContent = await fsPromise.readFile(join(__dirname, 'components', `${file.name}`), 'utf-8');
        const tagPlaceholder = `{{${componentName}}}`;
        const htmlContent = await fsPromise.readFile(join(distPath, 'index.html'), 'utf-8');
        await writeFile(join(distPath, 'index.html'), htmlContent.replace(tagPlaceholder, componentContent));
      }
    }
  }
  await componentContents();
}

const mergeStyles = async () => {
  const files = await readdir(join(__dirname, 'styles'), { withFileTypes: true });
  for (const file of files) {
    if (file.isFile() && extname(file.name) === '.css') {
      readFile(join(__dirname, 'styles', file.name), 'utf-8', (err, styleContent) => {
        if (err) throw err;
        extname(file.name) === '.css' ? appendFile(join(distPath, 'style.css'), `${styleContent}\n`) : '';
      })
    }
  }
}

const getFolderFiles = async () => {
    const folderPath = join(__dirname, 'assets', '/');
    const copyingFolderPath = join(__dirname, 'project-dist','assets', '/');
    console.log(copyingFolderPath);
    const dirs = await readdir(folderPath);
    for (const dir of dirs) {
      const dirPath = folderPath + dir + '/';
      const copyingDirPath = copyingFolderPath + dir + '/';
      const files = await readdir(dirPath);
      for (const file of files) {
        const filePath = dirPath + file;
        const copyingFilePath = copyingDirPath + file;
        await copyFile(filePath, copyingFilePath);
      }}
}


const init = async () => {
  await createDirs();
  await rebaseHTML();
  await mergeStyles();
  await getFolderFiles();
}

init();