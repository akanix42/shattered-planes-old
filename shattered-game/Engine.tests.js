'use strict';
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);
var _Engine = require('./Engine.js');var _Engine2 = _interopRequireDefault(_Engine);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_chai2.default.should();

describe('Engine', function () {

  describe('add', function () {
    it('should add the actor to the scheduler as a recurring item', function () {
      var result = {};
      var actor = { 
        act: function act() {} };


      var engine = new _Engine2.default();
      engine._scheduler = { 
        add: function add(actor, isRecurring) {
          result = { actor: actor, isRecurring: isRecurring };} };



      engine.add(actor);

      result.should.deep.equal({ actor: actor, isRecurring: true });});


    it('should add the actor to the scheduler as a non-recurring item', function () {
      var result = {};
      var actor = { 
        act: function act() {} };


      var engine = new _Engine2.default();
      engine._scheduler = { 
        add: function add(actor, isRecurring) {
          result = { actor: actor, isRecurring: isRecurring };} };



      engine.add(actor, false);

      result.should.deep.equal({ actor: actor, isRecurring: false });});});



  describe('remove', function () {
    it('should remove the actor from the scheduler', function () {
      var result = {};
      var actor = { 
        act: function act() {} };


      var engine = new _Engine2.default();
      engine._scheduler = { 
        remove: function remove(actor) {
          result = { actor: actor };} };



      engine.remove(actor);

      result.should.deep.equal({ actor: actor });});});



  describe('lock', function () {
    it('should pause the engine', function () {
      var wasCalled = false;
      var engine = new _Engine2.default();

      engine.lock();
      engine.add({ 
        act: function act() {
          wasCalled = true;} });


      wasCalled.should.be.false;});});



  describe('unlock', function () {
    it('should cause the scheduler to run', function () {
      var wasCalled = false;
      var engine = new _Engine2.default();

      engine.add({ 
        act: function act() {
          wasCalled = true;} }, 

      false);
      engine.unlock();

      wasCalled.should.be.true;});


    it('should not unlock the engine if there are no actors', function () {
      var wasCalled = false;
      var engine = new _Engine2.default();

      engine.unlock();
      engine.add({ 
        act: function act() {
          wasCalled = true;} }, 

      false);

      wasCalled.should.be.false;});});});
//# sourceMappingURL=Engine.tests.js.map
