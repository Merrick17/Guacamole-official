import { Button, ButtonProps } from './button';
import { GrClose, GrMenu } from 'react-icons/gr';

interface HamburgerProps extends ButtonProps {
  isOpen?: boolean;
  onClick?: () => void;
}

export default function Hamburger({
  isOpen,
  onClick,
  ...props
}: HamburgerProps) {
  return (
    <div
      onClick={onClick}
      className="focus:outline-none cursor-pointer p-2 rounded-full bg-white text-black shadow-openMenuShadow flex items-center justify-center w-10 aspect-square"
    >
      {isOpen ? <GrClose /> : <GrMenu />}
    </div>
  );
}
