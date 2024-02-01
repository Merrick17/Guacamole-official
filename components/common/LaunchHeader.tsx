"use client";
import { FunctionComponent } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface LaunchHeaderProps {
  className?: string;
  burnAll?: boolean;
  closeAll?: boolean;
  revokeAll?: boolean;
  title?: string;
  handleBurn?: () => void;
  tutorialLink?: string;
}

const LaunchHeader: FunctionComponent<LaunchHeaderProps> = ({
  className,
  title,
  closeAll,
  burnAll,
  handleBurn,
  tutorialLink,
  revokeAll,
}) => {
  const router = useRouter();
  return (
    <header
      className={cn(
        "flex flex-col gap-4 md:flex-row items-center justify-between  capitalize",
        className
      )}
    >
      <div className="w-[153px] text-black font-semibold">
        <Select
          defaultValue="token"
          onValueChange={(val) => {
            switch (val) {
              case "token":
                router.push("/launch/token-creator?active=1");
                break;
              case "token_manager":
                router.push("/launch/token-creator?active=2");
                break;
              case "shop":
                router.push("/launch/lock");
                break;

              default:
                break;
            }
          }}
        >
          <SelectTrigger className="rounded-lg h-[30px] flex flex-2 gap-2 launch-bg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="token">Token Creator</SelectItem>
            <SelectItem value="token_manager">Token Manager </SelectItem>
            <SelectItem value="lock">Liquidity Lockers</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Link href={tutorialLink} target="_blank" rel="noopener noreferrer">
        <Button
          className={`text-sm font-medium capitalize py-[6px] h-[32px] launch-bg`}
          size="sm"
        >
          View tutorial
        </Button>
      </Link>
    </header>
  );
};

export default LaunchHeader;
