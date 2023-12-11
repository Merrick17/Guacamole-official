import Container from "@/components/common/container";
import ToolHeader from "@/components/common/tool-header";
import TokenMultiSenderCsvForm from "@/components/views/tools/token-multi-sender-csv/token-multi-sender-csv-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airdrop Tokens Via CSV | Guacamole",
  description:
    "Upload your csv file to easily populate a list of Solana addresses to airdrop tokens to.    ",
  openGraph: {
    images: ["images/seo/tools.png"],
  },
};
const TokenMultiSenderCSV = () => {
  return (
    <Container className=" mx-auto flex w-full max-w-lg bg-foreground flex-col gap-6 rounded-lg  px-6 py-5  shadow-md">
      <ToolHeader
        title="Token Multi Sender By CSV"
        tutorialLink="https://docs.guacamole.gg/products-and-features/tools/token-multi-sender"
      />
      <hr className="border-dashed border-[#E5E7EB]" />
      <div className="text-muted-foreground text-sm ">
        <p>
          You can use this tool to upload a .csv file instead of manually
          inputting addresses in each input.
        </p>
        <br />
        <p className="font-medium">
          The uploaded file should respect the following order:
        </p>
        <p>receiver`s address, token address, amount to send</p>
      </div>

      <TokenMultiSenderCsvForm />
    </Container>
  );
};

export default TokenMultiSenderCSV;
