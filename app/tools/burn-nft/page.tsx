import NftCard from '@/components/common/nft-card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CreateSplTokenForm from '@/components/views/create-spl-token/create-spl-token-form';
import Banner from '@/components/views/play/banner';

const CreateSplToken = () => {
  return (
    <main className="container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
      <div className=" mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-lg bg-white px-6 py-5">
        <header className="flex flex-row items-center justify-between  capitalize">
          <h1 className="font-medium text-base text-[#4B5563]">
            Burn NFT To Redeem $SOL{' '}
          </h1>
          <div className="flex flex-row items-center gap-5">
            <Button variant="destructive">Burn All Selected</Button>
            <Button>View Tutorial</Button>
          </div>
        </header>
        <hr className="border-dashed border-[#E5E7EB]" />
        <div className="grid grid-cols-3  gap-4">
          <NftCard title="<Insert NFT Name>" image="" />
          <NftCard title="<Insert NFT Name>" image="" />
          <NftCard title="<Insert NFT Name>" image="" />
          <NftCard title="<Insert NFT Name>" image="" />
          <NftCard title="<Insert NFT Name>" image="" />
          <NftCard title="<Insert NFT Name>" image="" />
          <NftCard title="<Insert NFT Name>" image="" />
          <NftCard title="<Insert NFT Name>" image="" />
          <NftCard title="<Insert NFT Name>" image="" />
          <NftCard title="<Insert NFT Name>" image="" />
          <NftCard title="<Insert NFT Name>" image="" />
          <NftCard title="<Insert NFT Name>" image="" />
          <NftCard title="<Insert NFT Name>" image="" />
          <NftCard title="<Insert NFT Name>" image="" />
          <NftCard title="<Insert NFT Name>" image="" />
          <NftCard title="<Insert NFT Name>" image="" />
          <NftCard title="<Insert NFT Name>" image="" />
          <NftCard title="<Insert NFT Name>" image="" />
        </div>
      </div>
    </main>
  );
};

export default CreateSplToken;
