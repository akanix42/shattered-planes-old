'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _GameGenerator = require('f:/projects/shattered-planes/shattered-game/shattered-game/src/GameGenerator');var _GameGenerator2 = _interopRequireDefault(_GameGenerator);
var _Entity = require('shattered-lib/Entity');var _Entity2 = _interopRequireDefault(_Entity);
var _index = require('f:/projects/shattered-planes/shattered-game/shattered-game/src/components/index');var _index2 = _interopRequireDefault(_index);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 

TestDrivenActorComponent = function () {function TestDrivenActorComponent() {_classCallCheck(this, TestDrivenActorComponent);this.
    onAct = null;}_createClass(TestDrivenActorComponent, [{ key: 'act', value: function act() 

    {
      this.onAct();} }]);return TestDrivenActorComponent;}();



describe('moving entity', function () {
  it('should create an entity and move it around the map', function () {
    var gameGenerator = new _GameGenerator2.default();
    var game = gameGenerator.generate({ numberOfLevels: 1 });
    game.start();

    var entity = new _Entity2.default();
    var testDrivenActor = new TestDrivenActorComponent();
    testDrivenActor.onAct = function () {
      console.dir(this.entity);};

    testDrivenActor.act();
    entity.
    addComponent(new _index2.default.NormalMovementComponent()).
    addComponent(new _index2.default.PositionComponent()).
    addComponent(testDrivenActor);});});
//# sourceMappingURL=game.js.map
