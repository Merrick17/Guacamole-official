import { cn } from '@/lib/utils';
import { FC } from 'react';
import { Raleway } from 'next/font/google';
const RalewayFont = Raleway({
  weight: ['500', '700'],
  subsets: ['latin'],
});
interface HomeHeadlineProps {
  title: string;
  description: string;
}

const HomeHeadline: FC<HomeHeadlineProps> = ({ title, description }) => {
  return (
    <div
      className={cn(
        'px-14 py-10 bg-[#F0FDF4] rounded-lg border botder-[#E5E7EB] backdrop:blur-[4px] space-y-5',
        RalewayFont.className
      )}
    >
      <h1 className="font-bold text-[40px]">{title}</h1>
      <p className="text-[#5B5B5B] text-xl font-normal">{description}</p>
    </div>
  );
};

export default HomeHeadline;
