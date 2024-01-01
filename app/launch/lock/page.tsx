"use client";

import TerminalLayout from "@/app/terminal/terminal";
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import LockerList from "@/components/views/launch/locker-list";
import { LockerProvider } from "@/context/locker.context";
import { PoolProvider } from "@/hooks/use-pool-list";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Lock() {
  return (
    <TerminalLayout>
      <PoolProvider>
        <LockerProvider>
          <main
            className={cn(
              "container mx-auto  flex flex-col justify-center  min-h-[calc(100vh-80px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] "
            )}
          >
            <section className="flex flex-1  items-center flex-col my-3 gap-5">
              <Container className="lg:max-w-5xl justify-center items-center   max-sm:w-full bg-cover  bg-[url('/images/launch/Liquidity_Locker_Banner_Guacamole_Simple_1.png')] border border-transparent min-h-[200px] ">
                <div className="flex w-full h-full flex-col items-start justify-center gap-4 text-center mt-3">
                  <h5 className=" text-2xl font-medium tracking-tight text-center ">
                    Introducing Liquidity Lockers
                  </h5>
                  <p className="text-muted-foreground ">
                    Explore other locks or verifiably lock your liquidity tokens
                    in time-vested contracts or forever!
                  </p>
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
              <LockerList />
            </section>
          </main>
        </LockerProvider>
      </PoolProvider>
    </TerminalLayout>
  );
}
