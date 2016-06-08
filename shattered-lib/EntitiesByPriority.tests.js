'use strict';
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);
var _EntitiesByPriority = require('./EntitiesByPriority.js');var _EntitiesByPriority2 = _interopRequireDefault(_EntitiesByPriority);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_chai2.default.should();

describe('EntitiesByPriority', function () {

  describe('add', function () {
    it('should add the entity', function () {
      var entities = new _EntitiesByPriority2.default();
      var entity = {};

      entities.add(entity, 0);});});



  describe('emit', function () {

    it('should emit the event to all entities in priority order', function () {
      var entities = new _EntitiesByPriority2.default();
      var calledFirst = [];
      var entity1 = {};
      entity1.emit = function () {return calledFirst.push(entity1);};
      var entity2 = { emit: function emit() {return calledFirst.push(entity2);} };
      var entity3 = { emit: function emit() {return calledFirst.push(entity3);} };

      entities.add(entity2, 10);
      entities.add(entity1, 0);
      entities.add(entity3, 20);

      var event = { name: 'test' };
      entities.emit(event);

      calledFirst[0].should.equal(entity1);
      calledFirst[1].should.equal(entity2);
      calledFirst[2].should.equal(entity3);});


    it('should pass the event to the entity', function () {
      var entities = new _EntitiesByPriority2.default();
      var handledEvent = void 0;
      var entity = { emit: function emit(event) {return handledEvent = event;} };
      entities.add(entity, 0);

      var event = { name: 'test' };
      entities.emit(event);

      handledEvent.should.equal(event);});


    it('should return the updated event from the handler\'s callback', function () {
      var entities = new _EntitiesByPriority2.default();
      var updatedEvent = {};
      var entity = { emit: function emit(event) {return updatedEvent;} };
      entities.add(entity, 0);

      var event = { name: 'test' };
      var result = entities.emit(event);
      result.should.equal(updatedEvent);});});



  describe('remove', function () {

    it('should remove the entity', function () {
      var entities = new _EntitiesByPriority2.default();
      var eventWasHandled = false;
      var entity = { emit: function emit() {return eventWasHandled = true;} };

      entities.add(entity, 0);
      entities.remove(entity);
      entities.emit({});

      eventWasHandled.should.be.false;});});});
//# sourceMappingURL=EntitiesByPriority.tests.js.map
