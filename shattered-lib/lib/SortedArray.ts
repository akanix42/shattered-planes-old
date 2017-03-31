'use strict';
import { serializable } from 'lib/jsonc';

@serializable('SortedArray')
export default class SortedArray<T> {
  private compare: ISortComparer<T>;

  public array: Array<T>;

  constructor(array?: Array<T> | null, compare: ISortComparer<T> = compareDefault) {
    this.compare = compare;
    this.array = [];

    if (array && array instanceof Array) {
      const length = array.length;
      let index = 0;

      while (index < length) this.push(array[index++]);
    }
  }

  get(index: number) {
    return this.array[index];
  }

  get length() {
    return this.array.length;
  }

  push(element: T) {
    const array = this.array;
    const compare = this.compare;
    let index = array.length;

    array.push(element);

    while (index > 0) {
      var i = index, j = --index;

      if (compare(array[i], array[j]) < 0) {
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      } else
        break;
    }

    return this;
  }

  indexOf(element: T) {
    const array = this.array;
    const compare = this.compare;
    let high = array.length;
    let low = 0;

    while (high > low) {
      const index = (high + low) / 2 >>> 0;
      const ordering = compare(array[index], element);

      if (ordering < 0) low = index + 1;
      else if (ordering > 0) high = index;
      else return index;
    }

    return -1;
  }

  remove(element: T) {
    const index = this.array.indexOf(element);
    if (index >= 0) this.array.splice(index, 1);
    return this;
  }

}

SortedArray.comparing = function (property, array) {
  return new SortedArray(array, function (a, b) {
    return compareDefault(property(a), property(b));
  });
};

function compareDefault<T>(a: T, b: T) {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}
