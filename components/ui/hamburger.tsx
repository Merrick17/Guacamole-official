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
      className="focus:outline-none cursor-pointer rounded-lg p-3 w-[40px] h-[40px] guac-bg  flex items-center justify-center aspect-square"
    >
      {isOpen ? (
        <GrClose className="w-[25px] h-[25px] stroke-black " />
      ) : (
        <GrMenu className="w-[25px] h-[25px] stroke-black" />
      )}
    </div>
  );
}
