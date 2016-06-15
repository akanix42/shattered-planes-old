'use strict';var _index = require('./index');var _index2 = _interopRequireDefault(_index);
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var expect = _chai2.default.expect;

describe('components', function () {
  var keys = Object.keys(_index2.default);
  keys.forEach(function (key) {
    describe(key, function () {
      it('should be serializable', function () {
        var component = _index2.default[key];
        console.log(key);
        expect(component.__type__).to.be.ok;});


      it('should have a name', function () {
        var component = _index2.default[key];
        console.log(key);
        expect(component._name).to.be.ok;});});});});
//# sourceMappingURL=components.tests.js.map
