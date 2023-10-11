import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";

interface CreationWalkthroughsProps {
  className?: string;
}

const CreationWalkthroughs: FC<CreationWalkthroughsProps> = ({ className }) => {
  return (
    <Container className={cn("flex flex-col gap-5", className)}>
      <div className="flex flex-row gap-2 items-center">
        <div className="shrink-0 w-5 aspect-square">
          <Image
            src="/images/themes/red.png"
            width={20}
            height={20}
            alt="trending"
          />
        </div>
        <h1 className="text-xl capitalize">Creation Walkthroughs</h1>
      </div>
      {items.map((item, index) => (
        <CreationWalkthroughsItem key={item.title + index} {...item} />
      ))}
    </Container>
  );
};

export default CreationWalkthroughs;

const CreationWalkthroughsItem = ({ title, description }) => {
  return (
    <div className="flex flex-col bg-background p-5 rounded-lg h-full">
      <h2 className="text-base ">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
      <Button className="mt-auto w-max" disabled>Coming Soon</Button>
    </div>
  );
};

const items = [
  {
    title: "Create Your Own Token Project",
    description:
      "Follow this walkthrough guide for everything you need to launch your new token project, We have you covered from creation to distribution and liquidity.",
  },
  {
    title: "Create Your Own cNFT Collection",
    description:
      "Follow this walkthrough guide for everything you need to launch your new compressed NFT project. You can even use our other tools for distribution!",
  },
];
