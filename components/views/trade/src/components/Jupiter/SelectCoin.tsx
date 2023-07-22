import { useRef, useMemo, useState } from 'react';
import { useJupiterApiContext } from '../../contexts';
import { TokenInfo } from '@solana/spl-token-registry';
import { useVirtualList } from 'ahooks';
import { BiChevronDown } from 'react-icons/bi';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Skeleton } from '@/components/ui/skeleton';

const Row = ({
  info,
  handleSelect,
}: {
  info: TokenInfo;
  handleSelect: (e: TokenInfo) => void;
}) => {
  return (
    <button
      type="button"
      className="flex w-full cursor-pointer flex-row items-center justify-between rounded-xl bg-white p-3 hover:bg-[#E5E7EB]"
    >
      <div
        onClick={() => handleSelect(info)}
        className="flex h-full w-full flex-row items-center"
      >
        <div>
          <img
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = '/images/default-coin.png';
            }}
            src={info.logoURI as string}
            width={20}
            height={20}
            className="h-[20px] w-[20px]"
            alt="coin logo"
          />
        </div>
        <div className="ml-3 flex flex-col items-start text-black">
          <span className="text-sm ">{info.symbol}</span>
          <span className="text-sm opacity-80">{info.name}</span>
        </div>
      </div>
    </button>
  );
};

const Coin = ({ tokenInfo }: { tokenInfo: TokenInfo }) => {
  return (
    <div className="flex flex-row items-center justify-start rounded-xl border border-[#E5E7EB] bg-[#E5E7EB] px-3 py-2">
      <img
        src={tokenInfo?.logoURI as string}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = '/images/default-coin.png';
        }}
        width={20}
        height={20}
        className="h-[20px] w-[20px]"
        alt="coin logo"
      />
      <div className="flex flex-row items-center">
        <span className="ml-4 text-base  text-black">{tokenInfo.symbol}</span>
        <BiChevronDown className="text-grey ml-2 w-[20px]" />
      </div>
    </div>
  );
};

export const SelectCoin = ({
  tokenInfo,
  setCoin,
}: {
  tokenInfo: TokenInfo | null | undefined;
  setCoin: React.Dispatch<React.SetStateAction<TokenInfo | null | undefined>>;
}) => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const { tokenMap } = useJupiterApiContext();
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);

  const originalList = useMemo(
    () =>
      Array.from(tokenMap.values()).filter(
        (e) =>
          e.address.includes(search) ||
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.symbol.toLowerCase().includes(search.toLowerCase())
      ),
    [search, tokenInfo]
  );

  const [list, scrollTo] = useVirtualList(originalList, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef,
    itemHeight: 70,
    overscan: 10,
  });

  const handleSelect = (e: TokenInfo) => {
    setCoin(e);
    setVisible(false);
  };

  if (!tokenInfo) {
    return null;
  }
  console.log({ tokenInfo, tokenMap });
  return (
    <Dialog open={visible} onOpenChange={() => setVisible(false)}>
      <div className="w-max cursor-pointer" onClick={() => setVisible(true)}>
        <Coin tokenInfo={tokenInfo} />
      </div>
      <DialogContent
        closeBtn={false}
        className="h-[70vh] max-h-[70vh] overflow-auto"
      >
        <DialogHeader>
          <DialogTitle className="relative">
            <h2 className="text-base  text-black text-center ">Select Route</h2>
            <AiOutlineArrowLeft
              className=" absolute w-4 h-4 top-1/2 -left-2 -translate-y-1/2 cursor-pointer"
              onClick={() => setVisible(false)}
            />
          </DialogTitle>
          <DialogDescription className="!mt-4">
            <div className="">
              <input
                value={search || ''}
                onChange={(e) => {
                  setSearch(e.target.value.trim());
                  scrollTo(0);
                }}
                type="text"
                id="search-token"
                placeholder="Search"
                className=" mb-3  w-full rounded-xl !border-none !bg-[#E5E7EB] text-black text-xs placeholder:text-black/50 !outline-none sm:text-lg p-2"
                spellCheck={false}
              />
              {/* <div className="flex flex-row flex-wrap justify-start">
                {topList.map((e, idx) => (
                  <TopCoin
                    key={`top-coin-${idx}`}
                    handleSelect={handleSelect}
                    token={e}
                  />
                ))}
              </div> */}

              <div className="mt-2 border-[0.5px] border-[#E4E9EE] border-opacity-50" />

              <div
                ref={containerRef}
                className="h-full min-h-[200px] overflow-scroll overscroll-contain"
              >
                <div ref={wrapperRef}>
                  {/* {list.map((e) => (
                    <Row
                      key={e.index}
                      info={e.data}
                      handleSelect={handleSelect}
                    />
                  ))} */}

                  {originalList.map((e) => (
                    <Row key={e.address} info={e} handleSelect={handleSelect} />
                  ))}
                </div>
                {!wrapperRef.current && (
                  <div className="flex  flex-col gap-1">
                    {Array.from({ length: 10 }).map((_, idx) => (
                      <Skeleton key={idx} className="h-16 w-full rounded-xl" />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
