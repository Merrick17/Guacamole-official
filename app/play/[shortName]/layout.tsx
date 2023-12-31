import Featured from '@/components/views/play/featured';
import RecentPlay from '@/components/views/play/recent-play';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Featured />
      <RecentPlay />
    </>
  );
}
