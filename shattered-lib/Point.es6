import {serializable} from 'shattered-lib/jsonc';

@serializable('Point')
export default class Point {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
}
