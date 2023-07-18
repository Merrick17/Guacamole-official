import { Kanit } from 'next/font/google';
import Header from '@/components/ui/header';
import Featured from '@/components/views/play/featured';
import RecentPlay from '@/components/views/play/recent-play';

const kanit = Kanit({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto flex flex-col gap-14 px-16 py-12 max-w-[1440px]  ">
      <div className="flex flex-col items-center gap-7 ">
        {children}
        <Featured />
        <RecentPlay />
      </div>
    </main>
  );
}
