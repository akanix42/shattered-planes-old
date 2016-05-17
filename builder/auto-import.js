const recursive = require('recursive-readdir');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const directory = args[0];
console.log('auto import', directory)

const outputFile = `${directory}/${path.basename(directory)}.js`;

recursive(directory, ['!*.js', outputFile], function (err, files) {
  // Files is an array of filename
  console.log(files);
  files = files.map(file=> file.replace(/\\/g, '/'));
  const importStatements = [];
  const importRegistrations = [];

  files.forEach(file=> {
    const importAs = path.relative(directory, file).replace(/\//g, '_').replace(/\./g, '_');
    const importStatement = `import ${importAs} from './${file}';`;
    const importRegistration = `importRegistrations[${importAs}.name] = ${importAs};`;
    importStatements.push(importStatement);
    importRegistrations.push(importRegistration);
  });

  fs.writeFileSync(outputFile, getOutput(importStatements, importRegistrations));
});

function getOutput(importStatements, importRegistrations) {
  return `
${importStatements.join('\n')}

const importRegistrations = {};
${importRegistrations.join('\n')}

export default importRegistrations;
  `;

}
