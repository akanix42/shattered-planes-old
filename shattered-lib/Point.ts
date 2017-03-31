import { serializable } from 'jcson';

@serializable('Point')
export default class Point {
  constructor(public x: number, public y: number) { }
}
