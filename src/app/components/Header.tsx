import { Menu } from "lucide-react";

interface HeaderProps {
  handleToggleMenu: () => void;
}

export default function Header({ handleToggleMenu }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4">
      <button onClick={handleToggleMenu} className="open-nav-button">
        <Menu className="w-6 h-6" />
      </button>
      <h1 className="text-gradient text-3xl font-bold">Monstropedia</h1>
    </header>
  );
}
