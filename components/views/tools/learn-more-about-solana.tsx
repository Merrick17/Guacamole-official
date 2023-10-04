import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";

interface LearnMoreAboutSolanaProps {
  className?: string;
}

const LearnMoreAboutSolana: FC<LearnMoreAboutSolanaProps> = ({ className }) => {
  return (
    <Container className={cn("flex flex-col gap-5", className)}>
      <div className="flex flex-row gap-2 items-center">
        <div className="shrink-0 w-5 aspect-square">
          <Image
            src="/images/themes/white.png"
            width={20}
            height={20}
            alt="trending"
          />
        </div>
        <h1 className="text-xl capitalize">Learn More About Solana</h1>
      </div>
      {items.map((item, index) => (
        <LearnMoreAboutSolanaItem key={item.title + index} {...item} />
      ))}
    </Container>
  );
};

export default LearnMoreAboutSolana;

const LearnMoreAboutSolanaItem = ({
  title,
  description,
  disabled,
}: {
  title: string;
  description: string;
  disabled?: boolean;
}) => {
  return (
    <div className="flex flex-col bg-background p-5 rounded-lg h-full">
      <h2 className="text-base ">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
      <Button disabled={disabled} className="w-max mt-auto">
        {disabled ? "Coming Soon" : "View Guide"}
      </Button>
    </div>
  );
};

const items = [
  {
    title: "What is “Rent” & Reclaiming SOL",
    description:
      "The rent fee is associated with every Solana account in order to store data. You can reclaim SOL for burning NFTs & Tokens or closing these accounts.",
  },
  {
    title: "Asset Protection With D3fenders Vaults",
    description:
      "Wallet drainers are your worst enemy! Explore how the def3nders vault system protects you with an extra layer of asset protection.",
    disabled: true,
  },
];
