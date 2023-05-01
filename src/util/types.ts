export type UnionNullToUndefined<T> = {
  [K in keyof T]: T[K] extends unknown | null
    ? Exclude<T[K], null> | undefined
    : T[K];
};
