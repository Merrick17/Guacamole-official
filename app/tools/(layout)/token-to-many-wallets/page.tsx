import Container from "@/components/common/container";
import ToolHeader from "@/components/common/tool-header";
import TokenToManyWalletsForm from "@/components/views/tools/token-to-many-wallet/token-to-many-wallets-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airdrop Tokens | Multi-Sender | Guacamole ",
  description:
    "Easily send tokens to a list of Solana addresses with our airdrop and multi-sender tools on Guacamole!    ",
  openGraph: {
    images: ["images/seo/tools.png"],
  },
};
const TokenToManyWallets = () => {
  return (
    <Container className=" mx-auto flex w-full max-w-lg bg-foreground flex-col gap-6 rounded-lg px-6 py-5  shadow-md border">
      <ToolHeader
        title="Token Multi Sender"
        tutorialLink="https://docs.guacamole.gg/products-and-features/tools/token-multi-sender"
      />
<hr className="border border-[rgba(168, 168, 168, 0.10)] " />
      <p className="text-muted-foreground text-sm text-center">
        Select a token and insert the addresses and amount you would like to
        send in one simple transaction. We support .sol and ans domains!
      </p>
      <TokenToManyWalletsForm />
    </Container>
  );
};

export default TokenToManyWallets;
