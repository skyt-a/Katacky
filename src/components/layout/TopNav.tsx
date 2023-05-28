import { DarkModeButton } from "~/components/layout/DarkModeButton";
import { RefreshButton } from "~/components/layout/RefreshButton";

export const TopNav = () => {
  return (
    <header className="flex items-center justify-between fixed z-50 top-0 inset-0 bg-secondary w-full h-12 border-b border-b-gray-500 container">
      <div className="w-10 h-10 bg-light-icon dark:bg-dark-icon bg-cover" />
      <DarkModeButton className="ml-auto" />
      <RefreshButton />
    </header>
  );
};
