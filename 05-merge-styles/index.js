const { createWriteStream, readFile } = require('fs');
const {readdir, appendFile } = require('fs').promises;
const { extname, join } = require('path');
const folderPath = join(__dirname, 'project-dist')

const mergeStyles = async () => {
  await createWriteStream(join(folderPath, 'bundle.css'));
  const files = await readdir(join(__dirname, 'styles'), { withFileTypes: true });
  for (const file of files) {
    if (file.isFile() && extname(file.name) === '.css') {
      readFile(join(__dirname, 'styles', file.name), 'utf-8', (err, styleContent) => {
        if (err) throw err;
        extname(file.name) === '.css' ? appendFile(join(folderPath, 'bundle.css'), `${styleContent}\n`) : '';
      })
    }
  }
}

mergeStyles();