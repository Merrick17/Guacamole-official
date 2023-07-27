import { Links } from '@/config/links';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment } from 'react';
import { BsChevronDown } from 'react-icons/bs';

export function MenuItems() {
  return (
    <div className="flex items-center gap-[30px] tex-[#4B5563]">
      {Links.map((item, index) => (
        <Fragment key={item.name + index}>
          {item.dropdownItems ? (
            <div className="relative">
              <Menu>
                <Menu.Button className="flex items-center gap-3 text-base font-medium capitalize  transition hover:text-black ">
                  {item.name}
                  <span className="z-[1] transition-transform duration-200 ">
                    <BsChevronDown />
                  </span>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4"
                  enterTo="opacity-100 translate-y-0"
                  leave="ease-in duration-300"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-4"
                >
                  <Menu.Items className="absolute mt-5 w-64 origin-top-right rounded-lg bg-white p-3 shadow-large ltr:right-0 rtl:left-0 dark:bg-gray-800">
                    {item.dropdownItems.map((dropDownItem, index) => (
                      <Menu.Item key={dropDownItem.name + index}>
                        <div>
                          <Link
                            href={dropDownItem.href}
                            className="block rounded-lg px-3 py-2 text-sm font-medium capitalize !text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 dark:!text-white dark:hover:bg-gray-700/50"
                            // activeClassName="!bg-gray-100 dark:!bg-gray-700 my-1 last:mb-0 first:mt-0 !text-gray-900 dark:!text-white"
                          >
                            {dropDownItem.name}
                          </Link>
                        </div>
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          ) : (
            <Link
              href={item.href}
              className=" text-base font-medium capitalize  hover:text-black "
              // activeClassName="!text-gray-900 dark:!text-white"
            >
              {item.name}
            </Link>
          )}
        </Fragment>
      ))}
    </div>
  );
}
