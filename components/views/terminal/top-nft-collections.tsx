import { cn } from "@/lib/utils";
import Image from "next/image";
import { FunctionComponent } from "react";
import { Badge } from "@/components/ui/badge";
interface TopNftCollectionsProps extends React.HTMLAttributes<HTMLDivElement> {}
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Container from "@/components/common/container";
import { AccentColors } from "@/config/themes";
const TopNftCollections: FunctionComponent<TopNftCollectionsProps> = ({
  className,
  ...rest
}) => {
  return (
    <Container
      className={cn("p-5 flex flex-col bg-foreground gap-5", className)}
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
      <div className="flex flex-col gap-[10px] w-full">
        {topNfts.map((itm, idx) => (
          <TopNftCollectionItem key={idx} {...itm} />
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
          <Image src={image} fill alt={title} />
        </div>
        <div className="text-xs  flex flex-col gap-2">
          <h1 className="font-medium">{title}</h1>
          <p className="text-muted-foreground ">Floor: {floor}</p>
        </div>
      </div>
      <div className="text-xs  flex flex-col items-center gap-2 h-full">
        <p className="font-medium ">${price}</p>
        <div className="text-primary bg-foreground px-2 py-[2px] rounded-full text-center mt-auto">
          Marketcap
        </div>
      </div>
    </Container>
  );
};

export default TopNftCollections;
