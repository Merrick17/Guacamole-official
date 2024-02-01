"use client";

import TerminalLayout from "@/app/terminal/terminal";
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LockerList from "@/components/views/launch/locker-list";
import { LockerProvider, useLockerTools } from "@/context/locker.context";
import { PoolProvider } from "@/hooks/use-pool-list";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect } from "react";
import numeral from "numeral";
const LockerHeader = () => {
  const { totalValueLocked, vaultsData } = useLockerTools();
  useEffect(() => {
    console.log("Total", totalValueLocked);
  }, [vaultsData]);
  return (
    <Container className="lg:max-w-5xl justify-center items-center   max-sm:w-full bg-cover  bg-[url('/images/launch/Liquidity_Locker_Banner_Guacamole_Simple_1.png')]  min-h-[200px] border border-[rgba(168, 168, 168, 0.10)] ">
      <div className="flex w-full h-full flex-col items-start justify-center gap-4 text-center mt-3">
        <h5 className=" text-2xl font-medium tracking-tight text-center ">
          Introducing Liquidity Lockers
        </h5>
        <p className="text-muted-foreground ">
          Explore other locks or verifiably lock your liquidity tokens in
          time-vested contracts or forever!
        </p>
        {totalValueLocked !== 0 ? (
          <p className="text-[18px] text-muted-foreground">
            Total Program TVL: $ {numeral(totalValueLocked).format("0,0.000")}
          </p>
        ) : (
          <Skeleton className="w-full min-h-[50px] my-3" />
        )}
        <Button variant="link" className="px-0">
          <Link
            href={
              "https://docs.guacamole.gg/products-and-features/launch/liquidity-lockers"
            }
            className="flex justify-center items-center"
            target="_blank"
          >
            Click Here To Learn More
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>{" "}
        </Button>
      </div>
    </Container>
  );
};
export default function Lock() {
  return (
    <TerminalLayout>
      <PoolProvider>
        <LockerProvider>
          <main
            className={cn(
              "container mx-auto  flex flex-col justify-center  min-h-[calc(100vh-160px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] "
            )}
          >
            <section className="flex flex-1  items-center flex-col my-3 gap-5">
              <LockerHeader />
              <LockerList />
              {/* {vaultsData.length != 0 ? (
                
              ) : (
                <Table className="max-sm:w-96 max-sm:overflow-x-auto">
                  <TableHeader>
                    <TableRow className="w-full">
                      <TableHead className="uppercase"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        {Array.from({ length: 7 }).map((_, i) => (
                          <Skeleton
                            key={i}
                            className="w-full min-h-[50px] my-3"
                          />
                        ))}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )} */}
            </section>
          </main>
        </LockerProvider>
      </PoolProvider>
    </TerminalLayout>
  );
}
