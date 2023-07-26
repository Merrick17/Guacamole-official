import ToolHeader from '@/components/common/tool-header';
import Banner from '@/components/views/play/banner';
import routes from '@/config/routes';

const TokenMultiSender = () => {
  return (
    <main className="container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
      <div className=" mx-auto flex w-full max-w-lg flex-col gap-6 rounded-lg bg-white px-6 py-5">
        <ToolHeader title="Token Multi Sender" />
        <hr className="border-dashed border-[#E5E7EB]" />
        <div className="flex flex-col gap-3">
          <Banner
            title="1 Token To Multiple Wallets"
            image="/images/token-to-multiple-wallets.png"
            btnClassName="min-w-[258px]"
            path={routes.tokenToManyWallets}
          />
          <Banner
            title="Upload csv for airdrop"
            image="/images/upload-csv-for-airdrop.png"
            btnClassName="min-w-[258px]"
            path={routes.tokenMultiSenderCsv}
          />
          <Banner
            title="Emergency send all"
            image="/images/emergency-send-all.png"
            btnClassName="min-w-[258px]"
            path={routes.emergencySend}
          />
        </div>

        <hr className="border-dashed border-[#E5E7EB]" />
        <p className="text-center text-black/50 text-sm ">
          Select one of the token multi send options above to proceed. All multi
          send options support public addresses, .sol domains, and the new ANS
          standard as well!
        </p>
      </div>
    </main>
  );
};

export default TokenMultiSender;
