/**
 * This file ties together the library's EntityGenerator class with the game's entity templates.
 * It must be imported once to complete this process.
 * After it has been imported once, the generator can be referenced by importing either this file
 * or the original file.
 */
'use strict';Object.defineProperty(exports, "__esModule", { value: true });
var _index = require('./data/entities/index');var _index2 = _interopRequireDefault(_index);
var _EntityGenerator = require('shattered-lib/generators/EntityGenerator');var _EntityGenerator2 = _interopRequireDefault(_EntityGenerator);
var _ramda = require('ramda');var _ramda2 = _interopRequireDefault(_ramda);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _templates = _ramda2.default.fromPairs(_ramda2.default.map(function (template) {return [template.name, template];}, _ramda2.default.flatten(_ramda2.default.values(_index2.default))));
_EntityGenerator2.default._templates = _templates;exports.default = _EntityGenerator2.default;
//# sourceMappingURL=EntityGenerator.js.map
