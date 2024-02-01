"use client";
import { Links } from "@/config/links";
import { cn } from "@/lib/utils";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";

export function MenuItems() {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {}, [pathname]);
  return (
    <div className="flex items-center gap-[30px] text-muted-foreground p-2  rounded-lg">
      {Links.filter((item) => !item.hide).map((item, index) => {
        const isActive = pathname !== item.href && pathname.includes(item.href);
        return (
          <Fragment key={item.name + index}>
            {item.dropdownItems ? (
              <div className="relative">
                <Menu>
                  <Menu.Button
                    className={cn(
                      "flex items-center gap-3 text-base font-medium capitalize rounded-lg transition justify-center text-[#FCFCFC] ",
                      isActive && `!text-primary`
                    )}
                    onClick={() => router.push(item.href)}
                  >
                    {item.name}
                  </Menu.Button>
                </Menu>
              </div>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  " text-base font-medium capitalize text-[#FCFCFC]",
                  item.href == pathname && "!text-primary"
                )}
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
