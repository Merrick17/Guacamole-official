import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { FC } from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
export type DynmaicVaultItemProps = {
  image: string;
  title: string;
  walletBalance: string;
  yourDeposit: string;
  VirtualPrice: string;
  TVL: string;
  estimatedAPY: string;
};
const DynmaicVaultItem: FC<DynmaicVaultItemProps> = ({
  image,
  title,
  walletBalance,
  yourDeposit,
  VirtualPrice,
  TVL,
  estimatedAPY,
}) => {
  return (
    <div className="py-4 px-5 border border-[#E5E7EB] bg-white rounded-lg flex flex-col gap-3 hover:bg-[#F0FDF4] transition-colors text-center ">
      <header className="flex items-center justify-center">
        <Image src={image} width={40} height={40} alt={title} />
      </header>
      <h1 className="text-3xl">{title}</h1>
      <Separator color="#E5E7EB99" />
      <div className="flex flex-col gap-1 capitalize">
        <div className="flex items-center justify-between">
          <h2>Wallet Balance</h2>
          <p>{walletBalance}</p>
        </div>
        <div className="flex items-center justify-between">
          <h2>Your Deposits</h2>
          <p>{yourDeposit}</p>
        </div>
        <div className="flex items-center justify-between">
          <h2>Virtual Price</h2>
          <p>{VirtualPrice}</p>
        </div>
        <div className="flex items-center justify-between">
          <h2>TVL</h2>
          <p>{TVL}</p>
        </div>
      </div>
      <Separator color="#E5E7EB99" />
      <div>
        <h1 className="text-[32px] font-medium">{estimatedAPY}%</h1>
        <div className="flex items-center gap-1 justify-center">
          <h2 className="text-sm ">Estimated APY</h2>
          <AiOutlineQuestionCircle />
        </div>
      </div>
      <Button>View Vault</Button>
    </div>
  );
};

export default DynmaicVaultItem;
