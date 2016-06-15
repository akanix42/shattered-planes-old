'use strict';Object.defineProperty(exports, "__esModule", { value: true });

var _entitiesarchitecture = require('./entitiesarchitecture.js');var _entitiesarchitecture2 = _interopRequireDefault(_entitiesarchitecture);
var _entitiescreatures = require('./entitiescreatures.js');var _entitiescreatures2 = _interopRequireDefault(_entitiescreatures);
var _entitiesindex = require('./entitiesindex.js');var _entitiesindex2 = _interopRequireDefault(_entitiesindex);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var importRegistrations = {};
importRegistrations[_entitiesarchitecture2.default.__type__] = _entitiesarchitecture2.default;
importRegistrations[_entitiescreatures2.default.__type__] = _entitiescreatures2.default;
importRegistrations[_entitiesindex2.default.__type__] = _entitiesindex2.default;exports.default = 

importRegistrations;
//# sourceMappingURL=index.js.map
