/**
 * This file ties together the library's LevelGenerator class with the game's level generators.
 * It must be imported once to complete this process.
 * After it has been imported once, the generator can be referenced by importing either this file
 * or the original file.
 */
'use strict';Object.defineProperty(exports, "__esModule", { value: true });
var _index = require('./level-generators/index');var _index2 = _interopRequireDefault(_index);
var _LevelGenerator = require('shattered-lib/generators/LevelGenerator');var _LevelGenerator2 = _interopRequireDefault(_LevelGenerator);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_LevelGenerator2.default._generators = _index2.default;exports.default = _LevelGenerator2.default;
//# sourceMappingURL=LevelGenerator.js.map
