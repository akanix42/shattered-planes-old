'use strict';
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);
var _Engine = require('./Engine.js');var _Engine2 = _interopRequireDefault(_Engine);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_chai2.default.should();

describe('Scheduler', function () {

  describe('add', function () {
    it('should add the actor to the scheduler as a recurring item', function () {
      var result = {};
      var actor = { act: function act() {} };
      var scheduler = new _Engine2.default();
      scheduler._scheduler = { 
        add: function add(actor, isRecurring) {
          result = { actor: actor, isRecurring: isRecurring };} };



      scheduler.add(actor, true);

      result.should.deep.equal({ actor: actor, true: true });});});});
//# sourceMappingURL=Scheduler.tests.js.map
