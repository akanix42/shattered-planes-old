'use strict';Object.defineProperty(exports, "__esModule", { value: true });

var _architecture = require('./architecture.js');var _architecture2 = _interopRequireDefault(_architecture);
var _creatures = require('./creatures.js');var _creatures2 = _interopRequireDefault(_creatures);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var importRegistrations = {};
importRegistrations[_architecture2.default.__type__] = _architecture2.default;
importRegistrations[_creatures2.default.__type__] = _creatures2.default;exports.default = 

importRegistrations;
//# sourceMappingURL=index.js.map
