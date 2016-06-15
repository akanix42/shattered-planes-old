/**
 * This file ties together the library's ComponentGenerator class and the game's components.
 * It must be imported once to complete this process.
 * After it has been imported once, the generator can be referenced by importing either this file
 * or the original library file.
 */
'use strict';Object.defineProperty(exports, "__esModule", { value: true });
var _index = require('./components/index');var _index2 = _interopRequireDefault(_index);
var _ComponentGenerator = require('shattered-lib/generators/ComponentGenerator');var _ComponentGenerator2 = _interopRequireDefault(_ComponentGenerator);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_ComponentGenerator2.default._components = _index2.default;exports.default = _ComponentGenerator2.default;
//# sourceMappingURL=ComponentGenerator.js.map
