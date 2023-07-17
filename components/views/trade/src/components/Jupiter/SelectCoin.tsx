import { useRef, useMemo, useState } from 'react';
import { useJupiterApiContext } from '../../contexts';
import { TokenInfo } from '@solana/spl-token-registry';
import { useVirtualList } from 'ahooks';
import { BiChevronDown, BiLink } from 'react-icons/bi';
import { Link } from '../Link';
import Urls from '../../settings/urls';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

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
      <Link className="z-1" href={Urls.solscanAddress + info.address}>
        <Button className="!pl-4 !pr-4 rounded-xl">
          <BiLink className="h-[20px]" />
        </Button>
      </Link>
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
        <span className="ml-4 text-lg font-bold text-black">
          {tokenInfo.symbol}
        </span>
        <BiChevronDown className="text-grey ml-2 w-[20px]" />
      </div>
    </div>
  );
};

const TOP_COINS = [
  'EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp', // FIDA
  'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt', // SRM
  '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E', // BTC
  'So11111111111111111111111111111111111111112', // wSOL
  '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R', // RAY
  'MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac', // Mango
  'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', // USDT
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
  'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So', // mSOL
];

const TopCoin = ({
  token,
  handleSelect,
}: {
  token: TokenInfo;
  handleSelect: (e: TokenInfo) => void;
}) => {
  return (
    <button
      type="button"
      onClick={() => handleSelect(token)}
      className="m-1 flex cursor-pointer flex-row rounded-[5px] border border-[#E4E9EE] border-opacity-50 p-2  "
    >
      <img
        className="mr-2 h-[18px] w-[18px]"
        src={token.logoURI as string}
        alt="Token logo"
      />
      <span className="text-xs font-bold text-black">{token.symbol}</span>
    </button>
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

  const topList = originalList.filter((e) => TOP_COINS.includes(e.address));

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

  return (
    <Dialog open={visible} onOpenChange={() => setVisible(false)}>
      <div className="w-max cursor-pointer" onClick={() => setVisible(true)}>
        <Coin tokenInfo={tokenInfo} />
      </div>
      <DialogContent closeBtn={false}>
        <DialogHeader>
          <DialogTitle>
            <input
              value={search || ''}
              onChange={(e) => {
                setSearch(e.target.value.trim());
                scrollTo(0);
              }}
              type="text"
              id="search-token"
              placeholder="Search"
              className=" mb-3  w-full rounded-xl !border-none !bg-[#E5E7EB] text-xs font-bold !outline-none sm:text-lg p-2"
              spellCheck={false}
            />
          </DialogTitle>
          <DialogDescription>
            <div className="h-[70vh] max-h-[70vh]  overflow-auto">
              <div className="flex flex-row flex-wrap justify-start">
                {topList.map((e, idx) => (
                  <TopCoin
                    key={`top-coin-${idx}`}
                    handleSelect={handleSelect}
                    token={e}
                  />
                ))}
              </div>

              <div className="mt-2 border-[0.5px] border-[#E4E9EE] border-opacity-50" />

              <div
                ref={containerRef}
                className="h-full min-h-[200px] overflow-scroll overscroll-contain"
              >
                <div ref={wrapperRef}>
                  {list.map((e) => (
                    <Row
                      key={e.index}
                      info={e.data}
                      handleSelect={handleSelect}
                    />
                  ))}
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
