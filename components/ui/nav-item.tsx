'use client';
import Link from 'next/link';
import { FC, useState } from 'react';
import { MdExpandMore } from 'react-icons/md';
type DropdownItemProps = {
  name: string;
  href: string;
};

interface NavItemProps {
  name?: string;
  href: string;
  dropdownItems?: DropdownItemProps[];
  isActive?: boolean;
}

const NavItem: FC<NavItemProps> = ({ name, href, dropdownItems, isActive }) => {
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
                  className={`inline-flex items-center w-full text-base font-medium transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${
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
            className={`inline-flex items-center w-full text-base font-medium transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${
              isActive && 'text-gray-800 dark:text-gray-100'
            }`}
            href={href}
          >
            <span>{name}</span>
          </Link>
        </li>
      )}
    </>
  );
};

export default NavItem;
