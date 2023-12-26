"use client";

import routes from "@/config/routes";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "./theme-switcher";
import WalletDrawer from "./wallet-drawer";

const LeftSideUtility = () => {
  const pathname = usePathname();
  if (
    pathname === routes.earn.root ||
    pathname === routes.play.root ||
    pathname === routes.trade.root ||
    pathname === routes.tools.root ||
    pathname === routes.launch.root ||
    pathname === routes.home
  ) {
    return <ThemeSwitcher />;
  } else {
    //return <WalletDrawer />;
    return <></>;
  }
};

export default LeftSideUtility;
