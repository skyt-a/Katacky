import { useState, useCallback, ChangeEvent } from "react";

export const useInput = <T>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as unknown as T);
  }, []);

  return { value, onChange };
};

export const ph = (target: string, placeholder: string) =>
  !target || target.length === 0 ? placeholder : target;
