const recursive = require('recursive-readdir');
const path = require('path');
const fs = require('fs');

const useNew = false;

module.exports = function indexDirectory(directory, globExcludePatterns, outputFile = `${directory}/index.js`) {
  globExcludePatterns = globExcludePatterns.concat(outputFile);
  recursive(directory, globExcludePatterns, function (err, files) {
    // Files is an array of filename
    if (!files) return;
    // console.log(files);
    files = files.map(file=> file.replace(/\\/g, '/'));
    const importStatements = [];
    const importRegistrations = [];

    files.forEach(file=> {
      let relativeFile = path.relative(directory, file);
      relativeFile = path.basename(relativeFile, path.extname(relativeFile))
      const importAs = relativeFile.replace(/\//g, '_').replace(/\./g, '_');
      const importStatement = `import ${importAs} from './${relativeFile}';`;
      const loadedFile = require(path.join(process.cwd(), file));
      const registration = loadedFile.default._name || loadedFile.default.__type__;
      const importRegistration = `importRegistrations.${registration} = ${useNew ? `new ${importAs}();` : importAs};`;
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
};

