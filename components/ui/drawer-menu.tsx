"use client";
import { Links } from "@/config/links";
import { Logo } from "../views/trade/src/components/navigation-frame/TopBar/Logo";
import { Button } from "./button";
import { GrClose } from "react-icons/gr";
import MenuItem from "./menu-item";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
export function DrawerMenu({ closeDrawer }: { closeDrawer: () => void }) {
  const { connected, connecting } = useWallet();
  const pathname = usePathname();

  return (
    <div className={cn("fixed w-full h-full top-0 z-[9999] ")}>
      <div
        className=" fixed bg-black/50 w-screen h-screen cursor-pointer "
        onClick={closeDrawer}
      />

      <div className="relative h-full  w-full max-w-full md:max-w-md bg-foreground xs:w-80 ">
        <div className="flex items-center justify-between overflow-hidden px-4 py-3">
          <div className="flex items-center gap-2">
            <Logo />
            <h1 className=" block text-2xl font-medium uppercase ">
              Guacamole
            </h1>
          </div>
          <div
            onClick={() => closeDrawer()}
            className="focus:outline-none cursor-pointer p-2 rounded-full bg-primary  shadow-openMenuShadow flex items-center justify-center w-10 aspect-square"
          >
            <GrClose />
          </div>
        </div>
        <div
          className="overflow-y-auto"
          style={{ height: "calc(100% - 96px)" }}
        >
          <div className="px-6 py-2">
            {Links.map((item, index) => (
              <MenuItem
                key={item.name + index}
                name={item.name}
                href={item.href}
                Icon={item.Icon}
                dropdownItems={item.dropdownItems}
                isActive={pathname === item.href}
                closeMenu={closeDrawer}
              />
            ))}
          </div>
        </div>
        <div className="absolute bottom-4 right-0 z-10 w-full px-6  ">
          <WalletMultiButtonDynamic
            className="w-full flex items-center text-black bg-primary justify-center !rounded-lg"
            startIcon={undefined}
            style={{ width: "100%" }}
            onClick={() => !connected && closeDrawer()}
          />
        </div>
      </div>
    </div>
  );
}
