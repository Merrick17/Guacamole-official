import Image from 'next/image';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
const inter = Inter({
  weight: ['500', '600'],
  subsets: ['latin'],
});
const EarnFooter = () => {
  return (
    <footer className={cn('flex items-center justify-center', inter.className)}>
      <p className="text-black/50 text-xs font-medium">Provided By</p>
      <Image
        src={'/icons/earn/meteora.svg'}
        width={30}
        height={30}
        alt={'Meteora'}
      />
      <h1 className="font-semibold">Meteora</h1>
    </footer>
  );
};

export default EarnFooter;
