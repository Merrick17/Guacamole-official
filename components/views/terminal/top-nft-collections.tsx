"use client";
import Container from "@/components/common/container";
import { Badge } from "@/components/ui/badge";
import { AccentColors } from "@/config/themes";
import { cn } from "@/lib/utils";
import { HyperspaceClient } from "hyperspace-client-js";
import numeral from "numeral";
import Image from "next/image";
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
interface TopNftCollectionsProps extends React.HTMLAttributes<HTMLDivElement> {}
const TopNftCollections: FunctionComponent<TopNftCollectionsProps> = ({
  className,
  ...rest
}) => {
  const [topCollections, setTopCollections] = useState([]);
  const hsClient = useMemo(
    () =>
      new HyperspaceClient(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJDb21wZW5kaXVtIiwibmFtZSI6Ikh5cGVyc3BhY2UiLCJpYXQiOjE1MTYyMzkwMjJ9.0wGMPCzZqg0qUY9nlH9Es9F-sZBsiLiWqEl1k6EtAlU"
      ),
    []
  );
  const getTopNftCollections = useCallback(async () => {
    try {
      const { getProjectStats } = await hsClient.getProjects({
        orderBy: {
          field_name: "market_cap",
          //@ts-ignore
          sort_order: "DESC",
        },
      });

      if (getProjectStats && getProjectStats.project_stats) {
        setTopCollections(getProjectStats.project_stats);
      }
    } catch (error) {
      console.error(error);
    }
  }, [hsClient]);

  useEffect(() => {
    getTopNftCollections();
  }, [getTopNftCollections]);
  return (
    <Container
      className={cn(
        "p-5 flex flex-col bg-foreground gap-5 max-h-[560px]",
        className
      )}
    >
      <div className="w-full flex items-center justify-between text-black">
        <Badge variant="default" className="rounded-lg">
          Top NFT Collections
        </Badge>
        <Badge
          className="rounded-lg"
          style={{
            backgroundColor: AccentColors.violet,
          }}
        >
          Start Trading NFTs
        </Badge>
      </div>
      <div className="flex flex-col gap-[10px] w-full max-h-[530px] overflow-auto no-scrollbar">
        {topCollections.map((itm, idx) => (
          <TopNftCollectionItem
            key={idx}
            image={itm.project.img_url}
            title={itm.project.display_name}
            floor={itm.floor_price}
            price={itm.market_cap}
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
};

const TopNftCollectionItem: FunctionComponent<TopNftCollectionItemProps> = ({
  price,
  image,
  title,
  floor,
}) => {
  return (
    <Container className="px-3 py-[10px] bg-background flex items-center justify-between gap-4 w-full">
      <div className="text-xs  flex items-center gap-[10px]">
        <div className="w-9 h-9 rounded-[5px] relative">
          <Image
            src={image}
            fill
            alt={title}
            unoptimized
            className="rounded-[5px]"
          />
        </div>
        <div className="text-xs  flex flex-col gap-2">
          <h1 className="font-medium">{title}</h1>
          <p className="text-muted-foreground ">Floor: {floor}</p>
        </div>
      </div>
      <div className="text-xs  flex flex-col items-center gap-2 h-full">
        <p className="font-medium ">${numeral(price).format("0,0")}</p>
        <div className="text-primary bg-foreground px-2 py-[2px] rounded-full text-center mt-auto">
          Marketcap
        </div>
      </div>
    </Container>
  );
};

export default TopNftCollections;
