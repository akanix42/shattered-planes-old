'use strict';var _EntityGenerator = require('./EntityGenerator');var _EntityGenerator2 = _interopRequireDefault(_EntityGenerator);
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_chai2.default.should();

describe('EntityGenerator', function () {
  it('should have loaded entity templates', function () {
    Object.keys(_EntityGenerator2.default._templates).length.should.be.ok;});});
//# sourceMappingURL=EntityGenerator.tests.js.map
