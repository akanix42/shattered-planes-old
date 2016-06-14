const recursive = require('recursive-readdir');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const directory = args[0];
console.log('auto import', directory)
const useNew = args.indexOf('--new') != -1;

const outputFile = `${directory}/index.js`;

recursive(directory, ['!*.js', '*.tests.js', outputFile], function (err, files) {
  // Files is an array of filename
  if (!files) return;
  console.log(files);
  files = files.map(file=> file.replace(/\\/g, '/'));
  const importStatements = [];
  const importRegistrations = [];

  files.forEach(file=> {
    const relativeFile = path.relative(directory, file);
    const importAs = path.basename(relativeFile, path.extname(relativeFile)).replace(/\//g, '_').replace(/\./g, '_');
    const importStatement = `import ${importAs} from './${relativeFile}';`;
    const importRegistration = `importRegistrations[${importAs}._name||${importAs}.__type__] = ${useNew ? `new ${importAs}();` : importAs};`;
    importStatements.push(importStatement);
    importRegistrations.push(importRegistration);
  });

  fs.writeFileSync(outputFile, getOutput(importStatements, importRegistrations));
});

function getOutput(importStatements, importRegistrations) {
  return `
'use strict';
${importStatements.join('\n')}

const importRegistrations = {};
${importRegistrations.join('\n')}

export default importRegistrations;
  `;

}
