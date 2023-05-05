import { DarkModeButton } from "~/components/layout/DarkModeButton";

export const TopNav = () => {
  return (
    <header className="fixed z-50 top-0 inset-0 bg-secondary w-full h-12 border-b border-b-gray-500 container">
      <DarkModeButton />
    </header>
  );
};
