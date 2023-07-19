import { Button } from '@/components/ui/button';
import Featured from '@/components/views/play/featured';
import RecentPlay from '@/components/views/play/recent-play';
import { cn } from '@/lib/utils';
import { Bungee } from 'next/font/google';
import Image from 'next/image';
const bungee = Bungee({
  weight: '400',
  subsets: ['latin'],
});

export default function Page() {
  return (
    <div
      className={cn(
        'container mx-auto flex flex-col items-center gap-14 px-16 py-1  max-w-[1440px]',
        bungee.className
      )}
    >
      <h1 className=" text-[64px]">GUAC-A-MOLE</h1>
      <div className="flex w-full flex-col items-center gap-6">
        <p className="text-center text-2xl font-semibold">
          Select an avocado to SMASH:
        </p>
        <div className="flex w-full flex-row items-center justify-between">
          <div className="w-56 flex items-center flex-col ">
            <p className="text-center  font-body text-base font-semibold uppercase">
              Potential Payout
            </p>
            <h1 className="text-shadow  text-[86px]">0.20</h1>
          </div>
          <div className="mx-auto flex w-max flex-row gap-4">
            <Image
              src="/images/guac-happy.png"
              width={162}
              height={214}
              alt="guacomole"
            />
            <Image
              src="/images/guac-happy.png"
              width={162}
              height={214}
              alt="guacomole"
            />
          </div>
          <div className="w-56 flex items-center flex-col">
            <p className="text-center font-body text-base font-semibold uppercase">
              Odds
            </p>
            <h1 className="text-shadow text-[86px]">1/2</h1>
          </div>
        </div>
        <div className="flex w-full max-w-lg flex-row items-center justify-center gap-4 rounded-lg bg-white py-5 uppercase ">
          <Button className="!bg-[#4E8341] ">0.1 SOL</Button>
          <Button className="!bg-[#4E8341] ">2 Avocados</Button>
          <Button className="">Smash</Button>
        </div>
      </div>
    </div>
  );
}
