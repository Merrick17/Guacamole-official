"use client";
import Container from "@/components/common/container";
import { Badge } from "@/components/ui/badge";
import { AccentColors } from "@/config/themes";
import { cn } from "@/lib/utils";
import numeral from "numeral";
import axios from "axios";
import Image from "next/image";
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface SolanaTvlRankingProps extends React.HTMLAttributes<HTMLDivElement> {}
const relDiff = (final, init) => {
  return ((final - init) / init) * 100;
};
const SolanaTvlRanking: FunctionComponent<SolanaTvlRankingProps> = ({
  className,
  ...rest
}) => {
  const [protocolList, setProtocolList] = useState([]);
  const [selectedValue, setSelectedValue] = useState("tvl");
  const [supportedProtocols, setSupportedProtocols] = useState([]);
  const [poolList, setPoolList] = useState([]);
  const [editPoolList, setEditPoolList] = useState([]);
  const [yieldList, setYieldList] = useState([]);

  const fetchProtocolData = useCallback(async () => {
    try {
      let result = await axios.all([
        axios.get("https://yields.llama.fi/pools"),
        axios.get("https://api.llama.fi/lite/protocols2"),
        axios.get("https://api.llama.fi/config/yields?a=1"),
      ]);
      //   console.log("Data", result);
      setSupportedProtocols(
        result[1].data.protocols.filter((elm) => elm.chains.includes("Solana"))
      );
      setPoolList(
        result[0].data.data.filter(
          (elm) => elm.chain.toUpperCase() === "SOLANA"
        )
      );

      setYieldList(result[2].data.protocols);
    } catch (error) {
      console.log("err", error.message);
    }
  }, []);
  useEffect(() => {
    fetchProtocolData();
  }, [fetchProtocolData]);
  useMemo(() => {
    let mappedData = poolList
      .sort((a, b) => b.tvlUsd - a.tvlUsd)
      .slice(0, 9)
      .map((elm) => {
        let selectedPool;
        let selectedYield = yieldList[elm.project];
        //console.log("selected Yield", selectedYield);
        if (selectedYield) {
          selectedPool = supportedProtocols.find(
            (elm) => elm.name.toUpperCase() === selectedYield.name.toUpperCase()
          );
        }
        return { ...elm, poolInfo: selectedPool };
      });

    setEditPoolList(mappedData);
  }, [poolList, supportedProtocols, yieldList]);
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
        {/* <Badge variant="default" className="rounded-lg">
          Solana TVL Rankings
        </Badge> */}
        <div className=" text-black">
          <Select
            defaultValue="tvl"
            value={selectedValue}
            onValueChange={(value) => {
              setSelectedValue(value);
            }}
          >
            <SelectTrigger className="w-[170px] h-[27px] rounded-lg inline-flex items-center border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 ">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tvl">Solana TVL Rankings </SelectItem>
              <SelectItem value="yields">Solana Lending Yields</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
        {selectedValue == "tvl" ? (
          protocolList
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
                item={itm}
              />
            ))
        ) : (
          <>
            {editPoolList
              .sort((a, b) => b.apy - a.apy)
              .map((item, idx) => (
                <TopYieldItem
                  key={idx.toString()}
                  title={item.symbol}
                  floor={item.project}
                  image={item.poolInfo.logo}
                  price={`${numeral(item.apy).format("0,0.000")}`}
                  tvl={"APY"}
                  item={item}
                />
              ))}
          </>
        )}
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
  item?: any;
};

const TopNftCollectionItem: FunctionComponent<TopNftCollectionItemProps> = ({
  price,
  image,
  title,
  floor,
  tvl,
  item,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          onClick={() => {
            setOpen(true);
          }}
        >
          <Container className="hover:border-2 cursor-pointer px-3 py-[10px] bg-background hover:border-primary flex items-center justify-between gap-4 w-full">
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
                  : (relDiff(tvl.Solana.tvl, tvl.Solana.tvlPrevWeek) > 0
                      ? "+"
                      : "") +
                    relDiff(tvl.Solana.tvl, tvl.Solana.tvlPrevWeek).toFixed(3) +
                    "% 1W"}
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
                <Image
                  src={image}
                  fill
                  alt={title}
                  unoptimized
                  className="rounded-[5px]"
                />
              </div>
              <div className="text-xs  flex flex-col ">
                <h1 className="font-medium">{title}</h1>
                <p className="text-muted-foreground ">{floor}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center w-full my-2">
            <p className="text-muted-foreground text-xs ">Current TVL: </p>
            <p className="text-muted-foreground text-xs ">
              {" "}
              ${numeral(item.chainTvls.Solana.tvl).format("0,0.000")}
            </p>
          </div>
          <div className="flex justify-between items-center w-full my-2">
            <p className="text-muted-foreground text-xs ">Yesterday’s TVL: </p>
            <p className="text-muted-foreground text-xs ">
              {" "}
              ${numeral(item.chainTvls.Solana.tvlPrevDay).format("0,0.000")}
            </p>
          </div>
          <div className="flex justify-between items-center w-full my-2">
            <p className="text-muted-foreground text-xs ">Last Week’s TVL: </p>
            <p className="text-muted-foreground text-xs ">
              {" "}
              ${numeral(item.chainTvls.Solana.tvlPrevWeek).format("0,0.000")}
            </p>
          </div>
          <div className="flex justify-between items-center w-full my-2">
            <p className="text-muted-foreground text-xs ">Last Month’s TVL: </p>
            <p className="text-muted-foreground text-xs ">
              {" "}
              ${numeral(item.chainTvls.Solana.tvlPrevMonth).format("0,0.000")}
            </p>
          </div>
        </div>
        <DialogFooter className="border-t-2 py-3 justify-center items-center flex w-full border-[#FFFFF]">
          <Button
            className="w-full"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.open(item.url, "blank");
              }
            }}
          >
            Visit {item.name}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
const TopYieldItem: FunctionComponent<TopNftCollectionItemProps> = ({
  price,
  image,
  title,
  floor,
  tvl,
  item,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    console.log("Item", item);
  }, [item]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          onClick={() => {
            setOpen(true);
          }}
        >
          <Container className="hover:border-2 cursor-pointer px-3 py-[10px] bg-background hover:border-primary flex items-center justify-between gap-4 w-full">
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
              <div className="text-primary bg-foreground px-2 py-[2px] rounded-full text-center mt-auto"></div>
            </div>
          </Container>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <div className="flex flex-col flex-1 p-0">
          <div className="flex justify-between items-center pb-3 border-b-2 border-[#FFFFF]">
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
              <div className="text-xs  flex flex-col ">
                <h1 className="font-medium">{title}</h1>
                <p className="text-muted-foreground ">{floor}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center w-full my-2">
            <p className="text-muted-foreground text-xs ">Current APY: </p>
            <p className="text-muted-foreground text-xs "> {item.apy}%</p>
          </div>
          <div className="flex justify-between items-center w-full my-2">
            <p className="text-muted-foreground text-xs ">7 Day APY Change: </p>
            <p className="text-muted-foreground text-xs ">{item.apyPct7D}%</p>
          </div>
          <div className="flex justify-between items-center w-full my-2">
            <p className="text-muted-foreground text-xs ">Current TVL: </p>
            <p className="text-muted-foreground text-xs ">
              {" "}
              ${numeral(item.tvlUsd).format("0,0.000")}{" "}
            </p>
          </div>
          <div className="flex justify-between items-center w-full my-2">
            <p className="text-muted-foreground text-xs ">
              Impermanent Loss Risk:{" "}
            </p>
            <p className="text-muted-foreground text-xs "> {item.ilRisk}</p>
          </div>
        </div>
        <DialogFooter className="border-t-2 py-3 justify-center items-center flex w-full border-[#FFFFF]">
          <Button
            className="w-full"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.open(item.poolInfo.url, "blank");
              }
            }}
          >
            Visit {title} {floor} Pool
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default SolanaTvlRanking;
