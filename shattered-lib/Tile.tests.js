'use strict';
var _Tile = require('./Tile.js');var _Tile2 = _interopRequireDefault(_Tile);
var _Inventory = require('./Inventory');var _Inventory2 = _interopRequireDefault(_Inventory);
var _Entity = require('./Entity.js');var _Entity2 = _interopRequireDefault(_Entity);

var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
_chai2.default.should();
var expect = _chai2.default.expect;

describe('Tile', function () {

  describe('point', function () {
    it('should return the tile`s point coordinates', function () {
      var point = {};
      var tile = new _Tile2.default(point, {});
      tile.point.should.equal(point);});});



  describe('level', function () {
    it('should return the tile`s level', function () {
      var level = {};
      var tile = new _Tile2.default({}, { level: level });
      tile.level.should.equal(level);});});



  describe('addOccupant()', function () {

    it('should add the occupant', function () {
      var tile = new _Tile2.default();
      var occupant = new _Entity2.default();
      tile.addOccupant(occupant);
      expect(tile.occupants[0]).to.equal(occupant);});


    it('should add multiple occupants', function () {
      var tile = new _Tile2.default();
      var occupant = new _Entity2.default();
      var occupant2 = new _Entity2.default();
      tile.addOccupant(occupant);
      tile.addOccupant(occupant2);
      expect(tile.occupants[0]).to.equal(occupant);
      expect(tile.occupants[1]).to.equal(occupant2);});


    it('should add the occupant\'s handlers to the combined handlers list', function () {
      var tile = new _Tile2.default();
      var occupant = new _Entity2.default();
      var handler = { eventName: 'test', callback: null, component: {} };
      occupant.subscribedHandlers.add(handler);
      tile.addOccupant(occupant);

      expect(tile._handlers._handlersByEvent['test'][0]).to.equal(handler);});});



  describe('removeOccupant()', function () {

    it('should remove the occupant', function () {
      var tile = new _Tile2.default();
      var occupant = new _Entity2.default();
      tile.addOccupant(occupant);
      expect(tile.occupants[0]).to.equal(occupant);});


    it('should remove the occupant\'s handlers from the combined handlers list', function () {
      var tile = new _Tile2.default();
      var occupant = new _Entity2.default();
      var handler = { eventName: 'test', callback: null, component: {} };
      occupant.subscribedHandlers.add(handler);
      tile.addOccupant(occupant);

      expect(tile._handlers._handlersByEvent['test'][0]).to.equal(handler);

      tile.removeOccupant(occupant);
      expect(tile._handlers._handlersByEvent['test'].length).to.equal(0);});});



  describe('architecture', function () {

    it('should add the architecture\'s handlers to the combined handlers list', function () {
      var tile = new _Tile2.default();
      var result = void 0;
      var architecture = new _Entity2.default();
      var handler = { eventName: 'test', callback: null, component: {} };
      architecture.subscribedHandlers.add(handler);
      tile.architecture = architecture;

      expect(tile._handlers._handlersByEvent['test'][0]).to.equal(handler);});});




  describe('inventory', function () {

    it('should be an instance of Inventory', function () {
      var tile = new _Tile2.default();
      expect(tile.inventory).to.be.an.instanceOf(_Inventory2.default);});});});
//# sourceMappingURL=Tile.tests.js.map
