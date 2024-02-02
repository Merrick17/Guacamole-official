
import { SelectedTokenProvider } from "@/context/coin-details";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Trade Solana Tokens With Charts & Data | Guacamole",
};
const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <SelectedTokenProvider>{children}</SelectedTokenProvider>
    </>
  );
};

export default Layout;
