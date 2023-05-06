import { PropsWithChildren } from "react";
import { Label } from "~/components/common/label";

type FormControlWrapperProps = PropsWithChildren<{
  id: string;
  className?: string;
  label: string;
}>;

export const FormControlWrapper = ({
  id,
  className,
  label,
  children,
}: FormControlWrapperProps) => {
  return (
    <div className={className}>
      <div className="block mb-2">
        <Label htmlFor={id}>{label}</Label>
      </div>
      {children}
    </div>
  );
};
