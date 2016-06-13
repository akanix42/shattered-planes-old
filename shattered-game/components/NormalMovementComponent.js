'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _dec, _class;
var _jsonc = require('jsonc');
var _Component2 = require('shattered-lib/Component');var _Component3 = _interopRequireDefault(_Component2);
var _events = require('f:/projects/shattered-planes/shattered-game/shattered-game/src/events');var _events2 = _interopRequireDefault(_events);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var 


NormalMovementComponent = (_dec = (0, _jsonc.serializable)('NormalMovementComponent'), _dec(_class = function (_Component) {_inherits(NormalMovementComponent, _Component);
  function NormalMovementComponent() {_classCallCheck(this, NormalMovementComponent);var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NormalMovementComponent).call(this));

    _this.addHandler(_events2.default.move, 100, _this.onMove);return _this;}_createClass(NormalMovementComponent, [{ key: 'onMove', value: function onMove(


    event) {
      var actionTime = this._calculateActionTime();
      this.entity.emit({ name: _events2.default.position, destination: event.destination });
      return actionTime;} }, { key: '_calculateActionTime', value: function _calculateActionTime() 


    {
      var speed = this.entity.attributes.moveSpeed.current;
      return speed;} }]);return NormalMovementComponent;}(_Component3.default)) || _class);exports.default = 



NormalMovementComponent;
//# sourceMappingURL=NormalMovementComponent.js.map
