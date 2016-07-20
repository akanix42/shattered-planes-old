import ROT from 'shattered-lib/lib/rot-js';

function getPathToTarget(currentTile, targetTile) {
  var checkIfPassable = (x, y) => true;
  var astar = new ROT.Path.AStar(targetTile.point.x, targetTile.point.y, checkIfPassable, { topology: 8 });

  var path = [];
  var pathCallback = function (x, y) {
    path.push(currentTile.level.getTileAtXY(x, y));
  };
  astar.compute(currentTile.point.x, currentTile.point.y, pathCallback);
  path.shift();
  return path;
}

export { getPathToTarget };
