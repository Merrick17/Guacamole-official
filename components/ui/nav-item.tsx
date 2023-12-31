'use client';
import Link from 'next/link';
import { FC, useState } from 'react';
import { IconType } from 'react-icons';
import { MdExpandMore } from 'react-icons/md';
import { Button } from './button';
import { cn } from '@/lib/utils';
type DropdownItemProps = {
  name: string;
  href: string;
};

interface NavItemProps {
  name?: string;
  href: string;
  Icon?: IconType;
  dropdownItems?: DropdownItemProps[];
  isActive?: boolean;
}

const NavItem: FC<NavItemProps> = ({
  name,
  href,
  dropdownItems,
  isActive,
  Icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {dropdownItems ? (
        <li
          className="relative cursor-pointer "
          onClick={() => setIsOpen((s) => !s)}
        >
          <div className="flex flex-row items-center gap-1">
            <span
              className={`inline-flex items-center w-full text-base font-medium transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${
                isActive && 'text-gray-800 dark:text-gray-100'
              }`}
            >
              {name}
            </span>
            <MdExpandMore className="text-xl shrink-0" />
          </div>

          <ul
            className={`absolute top-full right-0 w-full min-w-[200px] bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-10 ${
              isOpen ? 'block' : 'hidden'
            }`}
          >
            {dropdownItems.map((item, index) => (
              <li key={index} className="relative p-2">
                <Link
                  className={`flex items-center w-full text-base font-medium transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${
                    isActive && 'text-gray-800 dark:text-gray-100'
                  }`}
                  href={item.href}
                >
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ) : (
        <li className="relative cursor-pointer">
          <Link
            className={` hidden sm:flex  px-4 py-3 font-normal text-xs
               items-center w-full sm:px-0 sm:py-0 sm:text-base sm:font-medium transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${
                 isActive && 'text-gray-800 dark:text-gray-100'
               }`}
            href={href}
          >
            <span>{name}</span>
          </Link>

          <Link
            href={href}
            className={cn('flex items-center justify-start gap-4 sm:hidden ')}
          >
            <Button
              className={cn(
                'w-full  h-12 justify-start gap-4 !m-0 bg-white text-black font-normal',
                isActive && 'bg-black text-white'
              )}
            >
              {Icon && (
                <div className="block sm:hidden text-base">
                  <Icon />
                </div>
              )}
              <span>{name}</span>
            </Button>
          </Link>
        </li>
      )}
    </>
  );
};

export default NavItem;
