'use strict';var _ComponentGenerator = require('./ComponentGenerator');var _ComponentGenerator2 = _interopRequireDefault(_ComponentGenerator);
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_chai2.default.should();

describe('ComponentGenerator', function () {
  it('should have loaded generators', function () {
    Object.keys(_ComponentGenerator2.default._components).length.should.be.ok;});});
//# sourceMappingURL=ComponentGenerator.tests.js.map
