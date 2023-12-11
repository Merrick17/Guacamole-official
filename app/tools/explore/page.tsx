import Container from "@/components/common/container";
import InfoCard from "@/components/common/info-card";
import routes from "@/config/routes";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import { FC } from "react";

interface ToolsProps {}

export const metadata: Metadata = {
  title: "Useful Tools For All Solana Users | Guacamole",
  description:
    "Find a variety of easy to use tools in our suite that can instantly help improve your quality of life while interacting with the Solana blockchain or starting your own project!",
  openGraph: {
    images: "/images/seo/tools.png",
  },
};
const page: FC<ToolsProps> = () => {
  return (
    <main className="container mx-auto  items-center flex flex-col  gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
      <div
        className={
          " mx-auto grid grid-cols-1 sm:grid-cols-2 max-w-6xl lg:grid-cols-3 gap-x-6 gap-y-6"
        }
      >
        {tools.map((tool, index) => (
          <InfoCard key={index} {...tool} />
        ))}
        <Container className=" col-span-1 sm:col-span-2 lg:col-span-3 bg-foreground p-6 rounded-lg  border border-transparent  hover:border-primary transition-all duration-500 ease-in-out">
          <h5 className="mb-2 text-2xl font-semibold tracking-tight capitalize">
            Secure Your Assets With D3fenders
          </h5>
          <p className="mb-3 font-normal text-muted-foreground">
            Use the D3fenders decentralized vault system for an additional layer
            of asset protection.
          </p>
          <Link
            href={""}
            className={cn(
              "inline-flex items-center text-primary hover:underline mt-auto cursor-not-allowed opacity-50"
            )}
          >
            Coming Soon
            <svg
              className="w-3 h-3 ml-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
              />
            </svg>
          </Link>
        </Container>
      </div>
    </main>
  );
};

export default page;

const tools: {
  image: string;
  name: string;
  description: string;
  href?: string;
  buttonTxt?: string;
}[] = [
  {
    image: "/icons/tools/airdrop.svg",
    name: "Airdrop Tokens",
    description:
      "Send tokens to  Solana addresses. The best way to airdrop tokens!",
    href: routes.tools.tokenMultiSender,
    buttonTxt: "Use This Tool",
  },
  {
    image: "/icons/tools/airdrop.svg",
    name: "Airdrop via CSV",
    description:
      "Send tokens to Solana addresses via an uploadable .csv template.!",
    href: routes.inPageLinks.tokenMultiSender.csv,
    buttonTxt: "Use This Tool",
  },
  {
    image: "/icons/tools/emergency-send.svg",
    name: "Emergency Send",
    description:
      "Send everything from one wallet to a new wallet of your choice.",
    href: routes.tools.emergencySend,
    buttonTxt: "Use This Tool",
  },
  {
    image: "/icons/tools/burn-nft.svg",
    name: "Burn Tokens",
    description:
      "Burn those worthless and SPL tokens to reclaim $SOL from rent.",
    href: routes.tools.burnSplToken,
    buttonTxt: "Use This Tool",
  },
  {
    image: "/icons/tools/burn-nft.svg",
    name: "Burn NFTs",
    description:
      "Burn those worthless and “rugged” NFTs to reclaim $SOL from rent.",
    href: routes.tools.burnNftToken,
    buttonTxt: "Use This Tool",
  },
  {
    image: "/icons/tools/close-accounts.svg",
    name: "Close Accounts",
    description:
      "Close unused token & NFT accounts to easily reclaim $SOL from rent.",
    href: routes.tools.closeTokenAccounts,
    buttonTxt: "Use This Tool",
  },
];
