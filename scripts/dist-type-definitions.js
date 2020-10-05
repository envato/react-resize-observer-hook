const fs = require('fs');
const path = require('path');

const sourceRoot = path.resolve('src/resize-observer');
const destinationRoot = path.resolve('dist/resize-observer');

fs.mkdirSync(destinationRoot);

fs.readdirSync(sourceRoot).forEach(fileName => {
  const sourceFile = path.resolve(sourceRoot, fileName);
  const destinationFile = path.resolve(destinationRoot, fileName);

  fs.copyFileSync(sourceFile, destinationFile);
});
