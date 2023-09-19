import Featured from '@/components/views/play/featured';
import RecentPlays from '@/components/common/recent-plays';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-4 ">
      {children}
      <Featured />
      <RecentPlays />
    </div>
  );
}
