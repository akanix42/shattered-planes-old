'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _rotJs = require('rot-js');var _rotJs2 = _interopRequireDefault(_rotJs);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 

Engine = function () {function Engine() {_classCallCheck(this, Engine);this.
    _scheduler = new _rotJs2.default.Scheduler.Action();this.
    _lock = 1;}_createClass(Engine, [{ key: 'add', value: function add(

    actor) {var isRecurring = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
      this._scheduler.add(actor, isRecurring);} }, { key: 'remove', value: function remove(


    actor) {
      this._scheduler.remove(actor);} }, { key: 'lock', value: function lock() 


    {
      this._lock++;} }, { key: 'unlock', value: function unlock() 


    {
      if (!this._lock) {throw new Error("Cannot unlock unlocked engine");}
      this._lock--;

      while (!this._lock) {
        var actor = this._scheduler.next();
        if (!actor) {return this.lock();} /* no actors */
        var result = actor.act();
        if (result && result.then) {/* actor returned a "thenable", looks like a Promise */
          this.lock();
          result.then(this.unlock.bind(this));}}} }]);return Engine;}();exports.default = 





Engine;
//# sourceMappingURL=Engine.js.map
