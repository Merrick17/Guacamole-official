import BurnNftToken from "@/components/views/tools/burn-nft-token";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Burn Tokens & NFTS | Guacamole",
  description:
    "Receiving spam NFTs and Tokens on Solana? You can burn those worthless tokens here and even reclaim some Solana back from rent accounts.",
  openGraph: {
    images: ["images/seo/tools.png"],
  },
};
const Page = () => {
  return <BurnNftToken />;
};

export default Page;
