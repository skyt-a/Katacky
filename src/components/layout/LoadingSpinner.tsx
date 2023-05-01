import { Spinner } from "~/components/common/spinner";

export const LoadingSpinner = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <Spinner />
    </div>
  );
};
