"use client";
import FallbackImage from "@/components/common/FallbackImage";
import Container from "@/components/common/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AccentColors } from "@/config/themes";
import { cn } from "@/lib/utils";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import axios from "axios";
import { HyperspaceClient } from "hyperspace-client-js";
import Image from "next/image";
import numeral from "numeral";
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

  useEffect(() => {
    let isMounted = true;

    const getTopNftCollections = async () => {
      try {
        const { data } = await axios.get(
          `https://corsproxy.io/?https%3A%2F%2Fapi-mainnet.magiceden.dev%2Fv2%2Fmarketplace%2Fpopular_collections`
        );
        if (isMounted) {
          setTopCollections(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getTopNftCollections();

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <Container
      className={cn(
        "p-5 flex flex-col bg-foreground gap-5 max-h-[560px]",
        className
      )}
    >
      <div className="w-full flex items-center justify-between text-black">
        <Badge variant="default" className="rounded-lg">
          Trending NFT Collections
        </Badge>

        <Dialog>
          <DialogTrigger asChild>
            <Badge
              className="rounded-lg cursor-pointer"
              style={{
                backgroundColor: AccentColors.violet,
              }}
            >
              Trade Avotars
            </Badge>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] ">
            <h1>Trade Avotar Collection</h1>
            <DialogFooter className="border-t-2 py-3 justify-center items-center flex flex-col w-full border-[#FFFFF]">
              <div className="flex flex-col w-full gap-3">
                <Button
                  className="w-full"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.open(
                        "https://magiceden.io/marketplace/avotar",
                        "blank"
                      );
                    }
                  }}
                >
                  View Avotars On Magic Eden
                </Button>
                <Button
                  className="w-full"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.open(
                        "https://www.tensor.trade/trade/avotar",
                        "blank"
                      );
                    }
                  }}
                >
                  View Avotars On Tensor
                </Button>
                <Button
                  className="w-full"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.open(
                        "https://beta.hadeswap.com/collection/5kLFeUTakztvJpWqAAvPPncd4RkcNR4rU2W4mzZH3jAF",
                        "blank"
                      );
                    }
                  }}
                >
                  View Avotars On Hadeswap
                </Button>
                <Button className="w-full" disabled>
                  View Avotars On Guacamole
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col gap-[10px] w-full max-h-[530px] overflow-auto no-scrollbar">
        {topCollections.map((itm, idx) => (
          <TopNftCollectionItem
            key={idx}
            image={itm.image}
            title={itm.name}
            floor={(itm.floorPrice / LAMPORTS_PER_SOL).toFixed(3)}
            price={itm.volumeAll}
            item={itm}
          />
        ))}
      </div>
    </Container>
  );
};

type TopNftCollectionItemProps = {
  price: string;
  image: string;
  title: string;
  floor: string;
  item: any;
};

const TopNftCollectionItem: FunctionComponent<TopNftCollectionItemProps> = ({
  price,
  image,
  title,
  floor,
  item,
}) => {
  const [nftDetails, setNftDetails] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const getNftData = async () => {
        try {
          const url =
            `https://corsproxy.io/?` +
            encodeURIComponent(
              `https://api-mainnet.magiceden.dev/v2/collections/${item.symbol}/stats`
            );
          const { data } = await axios.get(url);
          setNftDetails(data);
        } catch (error) {
          console.error(error);
        }
      };

      getNftData();
    }
  }, [open, item.symbol]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          onClick={() => {
            setOpen(true);
          }}
        >
          <Container className="hover:border-2 px-3 py-[10px] bg-background hover:border-primary flex items-center justify-between gap-4 w-full cursor-pointer">
            <div className="text-xs  flex items-center gap-[10px]">
              <div className="w-9 h-9 rounded-[5px] relative">
                <FallbackImage
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
              <p className="font-medium ">{numeral(price).format("0,0")} SOL</p>

              <div className="text-primary bg-foreground px-2 py-[2px] rounded-full text-center mt-auto">
                Total Volume
              </div>
            </div>
          </Container>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <div className="flex flex-col flex-1 p-0">
          <div className="flex justify-between items-center pb-3 border-b-2 border-[#FFFFF]">
            <div className="text-xs  flex items-center gap-[10px]">
              <div className="w-9 h-9 rounded-[5px] relative">
                <FallbackImage
                  src={image}
                  fill
                  alt={title}
                  unoptimized
                  className="rounded-[5px]"
                />
              </div>
              <div className="text-xs  flex flex-col ">
                <h1 className="font-medium">{title}</h1>
                <p className="text-muted-foreground ">
                  NFT Collection Tracking
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center w-full my-2">
            <p className="text-muted-foreground text-xs ">Floor: </p>
            <p className="text-muted-foreground text-xs "> {floor} SOL</p>
          </div>
          <div className="flex justify-between items-center w-full my-2">
            <p className="text-muted-foreground text-xs ">
              Average Sale (24hr):{" "}
            </p>
            <p className="text-muted-foreground text-xs ">
              {" "}
              {nftDetails &&
                numeral(nftDetails.avgPrice24hr).format("0,0.000")}{" "}
              SOL
            </p>
          </div>
          <div className="flex justify-between items-center w-full my-2">
            <p className="text-muted-foreground text-xs ">Listed Count: </p>
            <p className="text-muted-foreground text-xs ">
              {" "}
              {nftDetails && nftDetails.listedCount}
            </p>
          </div>
          <div className="flex justify-between items-center w-full my-2">
            <p className="text-muted-foreground text-xs ">
              Total Collection Volume:{" "}
            </p>
            <p className="text-muted-foreground text-xs ">
              {" "}
              {item.volumeAll} SOL
            </p>
          </div>
        </div>
        <DialogFooter className="border-t-2 py-3 justify-center items-center flex w-full border-[#FFFFF]">
          <Button
            className="w-full"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.open(
                  `https://magiceden.io/marketplace/${item.symbol}`,
                  "blank"
                );
              }
            }}
          >
            Buy And Sell on MagicEden
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TopNftCollections;
