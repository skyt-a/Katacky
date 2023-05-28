"use client";
import { RefreshIcon } from "~/components/icons/refresh";

export const RefreshButton = () => {
  return (
    <button
      onClick={() => {
        window.location.reload();
      }}
      className="p-3 h-12 w-12"
    >
      <RefreshIcon />
    </button>
  );
};
