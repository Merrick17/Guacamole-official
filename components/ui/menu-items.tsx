'use client';
import { Links } from '@/config/links';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function MenuItems() {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-[30px] text-muted-foreground p-2 bg-background rounded-lg">
      {Links.filter((item) => !item.hide).map((item, index) => {
        const isActive = pathname !== item.href && pathname.includes(item.href);
        return (
          <Fragment key={item.name + index}>
            {item.dropdownItems ? (
              <div className="relative">
                <Menu>
                  <Menu.Button
                    className={cn(
                      'flex items-center gap-3 text-base font-medium capitalize rounded-lg p-2 transition justify-center ',

                      isActive && 'bg-primary text-black'
                    )}
                  >
                    {item.name}
                  </Menu.Button>
                  {/* <Transition
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4"
                    enterTo="opacity-100 translate-y-0"
                    leave="ease-in duration-300"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-4"
                  >
                    <Menu.Items className="absolute mt-5 w-64 origin-top-right rounded-lg bg-foreground p-3 shadow-large left-0 ">
                      {item.dropdownItems.map((dropDownItem, index) => (
                        <Menu.Item key={dropDownItem.name + index}>
                          <div>
                            {dropDownItem.disabled ? (
                              <div className="block rounded-lg px-3 py-2 text-sm font-medium capitalize !text-gray-600 cursor-not-allowed transition hover:bg-gray-50 hover:text-gray-900 dark:!text-white dark:hover:bg-gray-700/50">
                                {dropDownItem.name}
                              </div>
                            ) : (
                              <Link
                                href={dropDownItem.href}
                                className="block rounded-lg px-3 py-2 text-sm font-medium capitalize  transition hover:bg-gray-50 hover:text-gray-900 dark:!text-white dark:hover:bg-gray-700/50"
                                // activeClassName="!bg-gray-100 dark:!bg-gray-700 my-1 last:mb-0 first:mt-0 !text-gray-900 dark:!text-white"
                              >
                                {dropDownItem.name}
                              </Link>
                            )}
                          </div>
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition> */}
                </Menu>
              </div>
            ) : (
              <Link
                href={item.href}
                className=" text-base font-medium capitalize  "
                // activeClassName="!text-gray-900 dark:!text-white"
              >
                {item.name}
              </Link>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
