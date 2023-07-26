import ToolHeader from '@/components/common/tool-header';
import { Button } from '@/components/ui/button';
import TokenMultiSenderCsvForm from '@/components/views/token-multi-sender-csv/token-multi-sender-csv-form';
const TokenMultiSenderCSV = () => {
  return (
    <main className="container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
      <div className=" mx-auto flex w-full max-w-lg flex-col gap-6 rounded-lg bg-white px-6 py-5">
        <ToolHeader title="Token Multi Sender By CSV" />
        <hr className="border-dashed border-[#E5E7EB]" />
        <div className="text-black/50 text-sm ">
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
      </div>
    </main>
  );
};

export default TokenMultiSenderCSV;
