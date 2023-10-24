"use client";
import Container from "@/components/common/container";
import { Badge } from "@/components/ui/badge";
import { AccentColors } from "@/config/themes";
import { cn } from "@/lib/utils";
import numeral from "numeral";
import axios from "axios";
import Image from "next/image";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
interface SolanaTvlRankingProps extends React.HTMLAttributes<HTMLDivElement> {}
const relDiff = (final, init) => {
  return ((final - init) / init) * 100;
};
const SolanaTvlRanking: FunctionComponent<SolanaTvlRankingProps> = ({
  className,
  ...rest
}) => {
  const [protocolList, setProtocolList] = useState([]);
  const pullData = useCallback(async () => {
    try {
      let { data } = await axios.get("https://api.llama.fi/lite/protocols2");
      setProtocolList(
        data.protocols.filter((elm) => elm.chains.includes("Solana"))
      );
    } catch (error) {}
  }, []);

  useEffect(() => {
    pullData();
  }, [pullData]);
  return (
    <Container
      className={cn(
        "p-5 flex flex-col bg-foreground gap-5 max-h-[560px]",
        className
      )}
    >
      <div className="w-full flex items-center justify-between text-black">
        <Badge variant="default" className="rounded-lg">
          Solana TVL Rankings
        </Badge>
        <Badge
          className="rounded-lg"
          style={{
            backgroundColor: AccentColors.red,
          }}
        >
          Start Liquid Staking
        </Badge>
      </div>
      <div className="flex flex-col gap-[10px] w-full max-h-[530px] overflow-auto no-scrollbar">
        {protocolList
          .sort((a, b) => b.chainTvls.Solana.tvl - a.chainTvls.Solana.tvl)
          .map((itm, idx) => (
            <TopNftCollectionItem
              key={idx}
              {...itm}
              title={itm.name}
              floor={itm.category}
              image={itm.logo}
              price={itm.chainTvls.Solana.tvl}
              tvl={itm.chainTvls}
            />
          ))}
      </div>
    </Container>
  );
};

const topNfts = [
  {
    price: "1,000.00",
    image: "/images/solscan.png",
    title: "NFT Collection 1",
    floor: "0.5",
  },
  {
    price: "2,500.00",
    image: "/images/solscan.png",
    title: "NFT Collection 2",
    floor: "1.2",
  },
  {
    price: "5,000.00",
    image: "/images/solscan.png",
    title: "NFT Collection 3",
    floor: "2.5",
  },
];

type TopNftCollectionItemProps = {
  price: string;
  image: string;
  title: string;
  floor: string;
  tvl?: any;
};

const TopNftCollectionItem: FunctionComponent<TopNftCollectionItemProps> = ({
  price,
  image,
  title,
  floor,
  tvl,
}) => {
  return (
    <Container className="px-3 py-[10px] bg-background flex items-center justify-between gap-4 w-full">
      <div className="text-xs  flex items-center gap-[10px]">
        <div className="w-9 h-9 rounded-[5px] relative">
          <Image src={image} fill alt={title} className="rounded-[5px]" />
        </div>
        <div className="text-xs  flex flex-col gap-2">
          <h1 className="font-medium">{title}</h1>
          <p className="text-muted-foreground "> {floor}</p>
        </div>
      </div>
      <div className="text-xs  flex flex-col items-center gap-2 h-full">
        <p className="font-medium ">${numeral(price).format("0,0")}</p>
        <div className="text-primary bg-foreground px-2 py-[2px] rounded-full text-center mt-auto">
          {isNaN(relDiff(tvl.Solana.tvl, tvl.Solana.tvlPrevWeek))
            ? "N/A"
            : (relDiff(tvl.Solana.tvl, tvl.Solana.tvlPrevWeek) > 0 ? "+" : "") +
              relDiff(tvl.Solana.tvl, tvl.Solana.tvlPrevWeek).toFixed(3) +
              "% 1W"}
        </div>
      </div>
    </Container>
  );
};

export default SolanaTvlRanking;
