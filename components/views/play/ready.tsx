import ColorBlocks from '@/components/common/color-block';

const Ready = () => {
  return (
    <div className="flex max-w-lg flex-col gap-[10px] rounded-lg bg-white px-5 py-7">
      <header className="flex flex-col gap-6">
        <ColorBlocks />
        <h1 className="text-2xl font-medium leading-[72px] text-black">
          Ready To Play Some Fun Games? 🥑
        </h1>
      </header>
      <p className="text-[#5B5B5B]">
        Connect your wallet and enjoy a variety of fun and simple on-chain games
        where you can potentially win SOL, GUAC, and more!
      </p>
    </div>
  );
};

export default Ready;
