const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const sourceRoot = path.resolve('node_modules/@juggle/resize-observer/');
const destinationRoot = path.resolve('src/resize-observer');
const files = [
  ['LICENSE', 'LICENSE'],
  ['lib/ResizeObserver.d.ts', 'ResizeObserver.d.ts'],
  ['lib/ResizeObserverController.d.ts', 'ResizeObserverController.d.ts'],
  ['lib/ResizeObserverCallback.d.ts', 'ResizeObserverCallback.d.ts'],
  ['lib/ResizeObserverOptions.d.ts', 'ResizeObserverOptions.d.ts'],
  ['lib/ResizeObserverBoxOptions.d.ts', 'ResizeObserverBoxOptions.d.ts'],
  ['lib/ResizeObserverEntry.d.ts', 'ResizeObserverEntry.d.ts'],
  ['lib/ResizeObserverSize.d.ts', 'ResizeObserverSize.d.ts'],
  ['lib/DOMRectReadOnly.d.ts', 'DOMRectReadOnly.d.ts']
];

rimraf.sync(destinationRoot);
fs.mkdirSync(destinationRoot);

files.forEach(([sourcePath, destinationPath]) => {
  const sourceFile = path.resolve(sourceRoot, sourcePath);
  const destinationFile = path.resolve(destinationRoot, destinationPath);

  fs.copyFileSync(sourceFile, destinationFile);
});
