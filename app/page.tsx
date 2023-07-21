import ColorBlocks from '@/components/common/color-block';
import HomeContent from '@/components/views/home/home-content';
import HomeList from '@/components/views/home/home-list';

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
      <HomeContent />
      <HomeList />
      <ColorBlocks className="ml-auto" />
    </main>
  );
}
