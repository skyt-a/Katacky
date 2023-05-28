type NullToUndefined<T> = T extends null ? undefined : T;

export type UnionNullToUndefined<T> = {
  [K in keyof T]: NullToUndefined<T[K]>;
};
