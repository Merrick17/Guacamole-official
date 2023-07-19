import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Featured from '@/components/views/play/featured';
import RecentPlay from '@/components/views/play/recent-play';
import { cn } from '@/lib/utils';
import { Bungee } from 'next/font/google';
import Image from 'next/image';
const bungee = Bungee({
  weight: '400',
  subsets: ['latin'],
});

const CoinFlip = () => {
  return (
    <>
      <div className="flex w-full flex-col items-center gap-6">
        <div className="flex w-full max-w-lg flex-row items-center justify-center gap-4 rounded-lg bg-white  !font-body py-5  font-normal">
          <Button className="uppercase">
            <span className="mr-3  ">Wager</span> 0.05 SOL
          </Button>
          <Button className="!bg-[#4E8341] uppercase ">Heads</Button>
          <Button className="!bg-[#CCC] text-white uppercase ">Tails</Button>
          <Button className="uppercase ">Flip</Button>
          <Separator orientation="vertical" className="h-10 bg-black/20" />
          <Image
            width={36}
            height={40}
            src={'/images/interrogation-btn.png'}
            alt="interrogation"
          />
        </div>
      </div>
    </>
  );
};

export default CoinFlip;
