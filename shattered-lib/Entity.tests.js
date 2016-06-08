'use strict';
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);
var _Entity = require('./Entity.js');var _Entity2 = _interopRequireDefault(_Entity);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_chai2.default.should();

describe('Entity', function () {
  describe('addComponent', function () {

    it('should add a new component', function () {
      var entity = new _Entity2.default();
      var component = { _key: 'component', handlers: [] };
      entity.addComponent(component);

      entity._components['component'].should.equal(component);});});



  describe('addStat', function () {

    it('should add a stat', function () {
      var entity = new _Entity2.default();
      entity.addStat('test');

      ('test' in entity.stats).should.be.true;});


    it('should emit a get event when the stat is referenced', function () {
      var entity = new _Entity2.default();
      var eventName = '';
      entity.emit = function (event) {return eventName = event.name;};

      entity.addStat('test');
      entity.stats.test;
      eventName.should.equal('onStat.test');});});




  describe('removeComponent', function () {

    it('should remove an existing component', function () {
      var entity = new _Entity2.default();
      entity._components = { _key: 'component' };
      entity.removeComponent('component');

      entity._components.should.not.have.property('component');});});




  describe('emit', function () {

    it('should emit the event to the subscribed handlers', function () {
      var entity = new _Entity2.default();
      var wasEventEmitted = false;
      entity.subscribedHandlers = { emit: function emit(event) {return wasEventEmitted = true;} };
      entity.emit({});

      wasEventEmitted.should.be.true;});


    it('should return the updated event', function () {
      var entity = new _Entity2.default();
      var updatedEvent = {};
      entity.subscribedHandlers = { emit: function emit(event) {return updatedEvent;} };
      var result = entity.emit({});

      result.should.equal(updatedEvent);});});




  it('should be serializable', function () {
    _Entity2.default.__type__.should.equal('Entity');});});
//# sourceMappingURL=Entity.tests.js.map
