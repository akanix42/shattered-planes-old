import {serializable} from '/lib/jsonc';

@serializable('Point')
export default class Point {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
}
