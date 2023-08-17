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
      className="focus:outline-none cursor-pointer border border-[#E5E7EB] rounded-lg p-3 w-12 h-12 bg-white text-black shadow-openMenuShadow flex items-center justify-center aspect-square"
    >
      {isOpen ? (
        <GrClose className="w-[25px] h-[25px] " />
      ) : (
        <GrMenu className="w-[25px] h-[25px]" />
      )}
    </div>
  );
}
