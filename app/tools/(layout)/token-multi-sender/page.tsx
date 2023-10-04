import Container from '@/components/common/container';
import ToolHeader from '@/components/common/tool-header';
import Banner from '@/components/views/play/banner';
import routes from '@/config/routes';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Token Multi Sender | Guacamole',
  description:
    'Multiple airdrop and multi-send options to send tokens to Solana addresses and domains. Connect your wallet, enter the addresses, and airdrop your tokens!',
};
const TokenMultiSender = () => {
  return (
    <>
      <Container className=" mx-auto flex w-full max-w-lg bg-foreground flex-col gap-6 rounded-lg  px-6 py-5   shadow-md">
        <ToolHeader
          title="Token Multi Sender"
          tutorialLink="https://docs.guacamole.gg/products-and-features/tools/token-multi-sender"
        />
        <hr className="border-dashed border-[#E5E7EB]" />
        <div className="flex flex-col gap-3">
          <Banner
            title="1 Token To Multiple Wallets"
            image="/images/token-to-multiple-wallets.png"
            btnClassName="min-w-[258px]"
            path={routes.inPageLinks.tokenMultiSender.tokenToManyWallets}
          />
          <Banner
            title="Upload csv for airdrop"
            image="/images/upload-csv-for-airdrop.png"
            btnClassName="min-w-[258px]"
            path={routes.inPageLinks.tokenMultiSender.csv}
          />
          <Banner
            title="Emergency send all"
            image="/images/emergency-send-all.png"
            btnClassName="min-w-[258px]"
            path={routes.inPageLinks.tokenMultiSender.emergencySend}
          />
        </div>

        <hr className="border-dashed border-[#E5E7EB]" />
        <p className="text-center text-muted-foreground text-sm ">
          Select one of the token multi send options above to proceed. All multi
          send options support public addresses, .sol domains, and the new ANS
          standard as well!
        </p>
      </Container>
    </>
  );
};

export default TokenMultiSender;
