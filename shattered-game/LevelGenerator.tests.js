'use strict';var _LevelGenerator = require('./LevelGenerator');var _LevelGenerator2 = _interopRequireDefault(_LevelGenerator);
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_chai2.default.should();

describe('LevelGenerator', function () {
  it('should have loaded generators', function () {
    Object.keys(_LevelGenerator2.default._generators).length.should.be.ok;});});
//# sourceMappingURL=LevelGenerator.tests.js.map
