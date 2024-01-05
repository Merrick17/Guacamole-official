import { AccentColors } from "@/config/themes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import GuacContentCard from "@/components/views/home/guac-content-card";
import TradeContentCard from "@/components/views/home/trade-content-card";
import EarnContentCard from "@/components/views/home/earn-content-card";
import PlayContentCard from "@/components/views/home/play-content-card";
//import ManageContentCard from "@/components/views/home/Manage-content-card";
import LaunchContentCard from "@/components/views/home/launch-content-card";
import ManageContentCard from "@/components/views/home/manage-content-card";

export default function Home() {
  return (
    <>
      {/* <BackgroundSplash className="bg-home-bg " /> */}
      <main
        className={cn(
          "container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] "
        )}
      >
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          <GuacContentCard className="col-span-1 md:col-span-2" />
          <TradeContentCard className="hover:border-[#bbb0db]" />
          <EarnContentCard className="hover:border-[#ff8f8f]" />
          <PlayContentCard className="hover:border-[#fff281]" />
          <ManageContentCard className="hover:border-[#ffefdc]" />
          <LaunchContentCard className="col-span-1 md:col-span-2 hover:border-[#D6776A]" />

          {/* {lg:h-[560px]} */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-8    gap-[60px] h-full  overflow-hidden">
            <HeroHeadline
              className="col-span-1  lg:col-span-5"
              title={
	@@ -43,47 +55,16 @@ export default function Home() {
                user-friendly experience. Get started and unlock a world of
                possibilities!
              </p>
              <Link className="text-xl text-primary" href={"/terminal"}>
                Scoop The Dip ➜
              </Link>
            </HeroHeadline>
            <TrendingToday className="col-span-1 lg:col-span-3  bg-foreground" />
          </div>
          <HeroList listItems={HomeListItems} />
          <ColorBlocks className="mx-auto" /> */}
        </section>
      </main>
    </>
  );
}
