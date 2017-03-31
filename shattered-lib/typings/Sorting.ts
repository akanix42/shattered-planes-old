interface ISortComparer<T> {
  (a: T, b: T) : SortResult;
}

declare type SortResult = 1 | 0 | -1;
