var mkdirp = require('mkdirp');
var path = require('path');
// console.log(process.argv);
mkdirp(path.dirname(process.argv[2]));
