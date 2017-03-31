
export interface IActor {
  isRepeating: boolean;
  act(): Promise<number> | number
}
