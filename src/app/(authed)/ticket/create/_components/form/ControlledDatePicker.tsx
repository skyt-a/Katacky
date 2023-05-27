import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { CalendarDatePicker } from "~/components/common/datePicker";

type ControlledDatePickerProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
};

export const ControlledDatePicker = <T extends FieldValues>({
  name,
  control,
}: ControlledDatePickerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <CalendarDatePicker
          {...field}
          value={field.value}
          onChange={field.onChange}
          placeHolder="有効期限を選択してください"
          fromDate={new Date()}
        />
      )}
    />
  );
};
