'use client';

import { useState, useEffect, FC } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useMeasure } from '@/hooks/use-measure';
import { BsChevronDown } from 'react-icons/bs';
import { cn } from '@/lib/utils';
import { IconType } from 'react-icons';
import Link from 'next/link';
import { Button } from './button';

type MenuItemProps = {
  name?: string;
  Icon: IconType;
  href: string;
  dropdownItems?: DropdownItemProps[];
  isActive?: boolean;
};

type DropdownItemProps = {
  name: string;
  href: string;
};

const MenuItem: FC<MenuItemProps> = ({
  name,
  href,
  Icon,
  dropdownItems,
  isActive,
}) => {
  const pathname = usePathname()?.split('/') ?? '';
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [ref, { height }] = useMeasure<HTMLUListElement>();
  const isChildrenActive =
    dropdownItems && dropdownItems.some((item) => item.href === pathname);
  useEffect(() => {
    if (isChildrenActive) {
      setIsOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="mb-2 min-h-[48px] list-none last:mb-0">
      {dropdownItems?.length ? (
        <>
          <div
            className={cn(
              'relative flex h-12 cursor-pointer items-center justify-between whitespace-nowrap  rounded-lg px-4 text-sm transition-all',
              isChildrenActive
                ? 'text-white'
                : 'text-gray-500 hover:text-brand dark:hover:text-white'
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="z-[1] flex items-center ">
              <span className={cn()}>
                <Icon />
              </span>
              {name}
            </span>
            <span
              className={`z-[1] transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            >
              <BsChevronDown />
            </span>

            {isChildrenActive && (
              <motion.span
                className="absolute bottom-0 left-0 right-0 h-full w-full rounded-lg bg-brand shadow-large"
                layoutId="menu-item-active-indicator"
              />
            )}
          </div>

          <div
            style={{
              height: isOpen ? height : 0,
            }}
            className="ease-[cubic-bezier(0.33, 1, 0.68, 1)] overflow-hidden transition-all duration-[350ms]"
          >
            <ul ref={ref}>
              {dropdownItems.map((item, index) => (
                <li className="first:pt-2" key={index}>
                  <Button
                    variant={isChildrenActive ? 'default' : 'ghost'}
                    onClick={() => {
                      isOpen && setIsOpen(false);
                      router.push(item.href);
                    }}
                    className="flex items-center rounded-lg p-3 text-sm text-gray-500 transition-all before:h-1 before:w-1 before:rounded-full before:bg-gray-500 hover:text-brand ltr:pl-6 before:ltr:mr-5 rtl:pr-6 before:rtl:ml-5 dark:hover:text-white"
                    // activeClassName="!text-brand dark:!text-white dark:before:!bg-white before:!bg-brand before:!w-2 before:!h-2 before:-ml-0.5 before:ltr:!mr-[18px] before:rtl:!ml-[18px] !font-medium"
                  >
                    {item.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Link
          href={href}
          className={cn(
            'relative flex h-12 items-center whitespace-nowrap rounded-lg px-4 text-sm text-gray-500 transition-all hover:text-brand dark:hover:text-white',
            {
              'bg-brand !text-white': isActive,
            }
          )}
        >
          <span
            className={cn(
              'relative z-[1] duration-100 before:absolute before:-right-3 before:top-[50%] before:h-1 before:w-1 before:-translate-y-2/4 before:rounded-full before:bg-none ltr:mr-3 rtl:ml-3',
              {
                'text-white': isActive,
                'text-gray-500': !isActive && !name,
              }
            )}
          >
            <Icon />
          </span>
          <span className="relative z-[1] "> {name}</span>

          {href === pathname && (
            <motion.span
              className="absolute bottom-0 left-0 right-0 h-full w-full rounded-lg bg-brand shadow-large"
              layoutId="menu-item-active-indicator"
            />
          )}
        </Link>
      )}
    </div>
  );
};

export default MenuItem;
