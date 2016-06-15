'use strict';Object.defineProperty(exports, "__esModule", { value: true });

var _ArchitectureComponent = require('./ArchitectureComponent.js');var _ArchitectureComponent2 = _interopRequireDefault(_ArchitectureComponent);
var _CollisionComponent = require('./CollisionComponent.js');var _CollisionComponent2 = _interopRequireDefault(_CollisionComponent);
var _NormalMovementComponent = require('./NormalMovementComponent.js');var _NormalMovementComponent2 = _interopRequireDefault(_NormalMovementComponent);
var _OccupantComponent = require('./OccupantComponent.js');var _OccupantComponent2 = _interopRequireDefault(_OccupantComponent);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var importRegistrations = {};
importRegistrations[_ArchitectureComponent2.default._name || _ArchitectureComponent2.default.__type__] = _ArchitectureComponent2.default;
importRegistrations[_CollisionComponent2.default._name || _CollisionComponent2.default.__type__] = _CollisionComponent2.default;
importRegistrations[_NormalMovementComponent2.default._name || _NormalMovementComponent2.default.__type__] = _NormalMovementComponent2.default;
importRegistrations[_OccupantComponent2.default._name || _OccupantComponent2.default.__type__] = _OccupantComponent2.default;exports.default = 

importRegistrations;
//# sourceMappingURL=index.js.map
