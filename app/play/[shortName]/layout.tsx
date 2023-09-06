import Featured from '@/components/views/play/featured';
import RecentPlay from '@/components/views/play/recent-play';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      {children}
      <Featured />
      <RecentPlay />
    </div>
  );
}
