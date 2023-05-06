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

export const setDateDayEnd =
  (setDate: (date: Date | undefined) => void) => (date: Date | undefined) => {
    if (!date) {
      setDate(date);
      return;
    }
    const newDate = new Date(date);
    newDate.setHours(23, 59, 59, 999);
    setDate(newDate);
  };
