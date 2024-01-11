"use client";
import routes from "@/config/routes";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

const ColorBlocks: FC<Partial<HTMLDivElement>> = ({ className }) => {
  const pathname = usePathname();
  return (
    <div className={cn("flex w-max flex-row gap-1 items-center", className)}>
      <Link href={routes.explore.root}>
        <Image
          src="/images/themes/green.png"
          width={16}
          height={16}
          alt="green"
          className={cn(
            pathname === routes.explore.root ? "opacity-100" : "opacity-50"
          )}
        />
      </Link>
      <Link href={routes.trade.root}>
        <Image
          src="/images/themes/violet.png"
          width={16}
          height={16}
          alt="violet"
          className={cn(
            pathname.includes(routes.trade.root) ? "opacity-100" : "opacity-50"
          )}
        />
      </Link>
      <Link href={routes.earn.root}>
        <Image
          src="/images/themes/orange.png"
          width={16}
          height={16}
          alt="orange"
          className={cn(
            pathname.includes(routes.earn.root) ? "opacity-100" : "opacity-50"
          )}
        />
      </Link>

      <Link href={routes.play.root}>
        <Image
          src="/images/themes/yellow.png"
          width={16}
          height={16}
          alt="yellow"
          className={cn(
            pathname.includes(routes.play.root) ? "opacity-100" : "opacity-50"
          )}
        />
      </Link>

      <Link href={routes.tools.root}>
        <Image
          src="/images/themes/white.png"
          width={16}
          height={16}
          alt="white"
          className={cn(
            pathname.includes(routes.tools.root) ? "opacity-100" : "opacity-50"
          )}
        />
      </Link>
      <Link href={routes.launch.root}>
        <Image
          src="/images/themes/red.png"
          width={16}
          height={16}
          alt="red"
          className={cn(
            pathname.includes(routes.launch.root) ? "opacity-100" : "opacity-50"
          )}
        />
      </Link>
    </div>
  );
};

export default ColorBlocks;
