'use strict';Object.defineProperty(exports, "__esModule", { value: true });
var _CollideComponent = require('./CollideComponent.js');var _CollideComponent2 = _interopRequireDefault(_CollideComponent);
var _MoveComponent = require('./MoveComponent.js');var _MoveComponent2 = _interopRequireDefault(_MoveComponent);
var _MoveComponentTests = require('./MoveComponent.tests.js');var _MoveComponentTests2 = _interopRequireDefault(_MoveComponentTests);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var importRegistrations = {};
importRegistrations[_CollideComponent2.default.name] = _CollideComponent2.default;
importRegistrations[_MoveComponent2.default.name] = _MoveComponent2.default;
importRegistrations[_MoveComponentTests2.default.name] = _MoveComponentTests2.default;exports.default = 

importRegistrations;
//# sourceMappingURL=components.js.map
