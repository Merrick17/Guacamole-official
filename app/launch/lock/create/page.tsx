"use client";
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LockerInput from "@/components/views/launch/locker-input";
import LockerInputDetails from "@/components/views/launch/locker-input-details";
import { JupiterApiProvider } from "@/components/views/trade/src/contexts";
import { PoolProvider } from "@/hooks/use-pool-list";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const [step, setStep] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<number>(1);
  const changeStep = (newStep: number) => {
    setStep(newStep);
  };
  const router = useRouter();
  return (
    <PoolProvider>
      <JupiterApiProvider>
        <main className="container mx-auto  items-center flex flex-col  gap-14 px-8 py-6 md:px-16 md:py-12  max-w-2xl ">
          <div className=" mx-auto flex w-full  flex-col gap-6 rounded-lg bg-foreground px-6 py-5  shadow-md ">
            <div className="flex justify-between items-center">
              <Button
                className="rounded-lg h-[30px] flex flex-2 gap-2"
                onClick={() => {
                  router.back();
                }}
              >
                <svg
                  width="7"
                  height="11"
                  viewBox="0 0 7 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.1633 10.6633C5.85499 10.9717 5.35513 10.9717 5.04682 10.6633L0.836287 6.45277C0.527977 6.14446 0.527977 5.64459 0.836287 5.33628L5.04682 1.12576C5.35513 0.817454 5.85499 0.817454 6.1633 1.12576C6.47161 1.43407 6.47161 1.93393 6.1633 2.24224L2.51102 5.89453L6.1633 9.54681C6.47161 9.85512 6.47161 10.355 6.1633 10.6633Z"
                    fill="black"
                  />
                </svg>
                <span> Back To Lockers</span>
              </Button>
              <Button className="rounded-lg h-[30px]">Lock liquidity</Button>
            </div>
            <hr className="border-dashed border-background" />
            <div className="flex justify-between items-center gap-3">
              <Button
                className={`${
                  activeTab == 1
                    ? "bg-primary"
                    : "bg-[#0F0F0F] text-muted-foreground"
                } w-full rounded-lg `}
                onClick={() => {
                  setActiveTab(1);
                }}
              >
                Create New Lock
              </Button>
              <Button
                className={`${
                  activeTab == 2
                    ? "bg-primary"
                    : "bg-[#0F0F0F] text-muted-foreground"
                } w-full rounded-lg`}
                onClick={() => {
                  setActiveTab(2);
                }}
              >
                Manage / Withdraw
              </Button>
            </div>
            {activeTab == 1 ? (
              <div className="w-full h-full flex flex-col gap-3">
                <Container className="bg-[#0F0F0F] p-2 flex gap-3">
                  <img
                    src="/images/launch/raydium.png"
                    className="h-[40px] w-[40px]"
                  />
                  <span className="text-[#FAFAFA] text-[24px]">
                    Create Raydium Liquidity Locker
                  </span>
                </Container>
                {step == 1 ? (
                  <LockerInput handleStepChange={changeStep} />
                ) : (
                  <LockerInputDetails />
                )}
              </div>
            ) : (
              <div className=" w-full h-full flex flex-col gap-3">
                <Container className="bg-[#0F0F0F] p-2 flex gap-3 flex-col">
                  <span className="text-muted-foreground text-xs uppercase">
                    Enter the Raydium pair address you would like to ACCESS:
                  </span>
                  <Input
                    placeholder="Raydium pair address"
                    className="w-full"
                  />
                </Container>
                <p className="text-muted-foreground text-xs">
                  The following lockers are associated with this account:
                </p>
                <Container className="bg-[#0F0F0F] p-2 flex gap-3 justify-between">
                  <div className="flex justify-start items-center">
                    <img
                      src="/images/launch/guac.png"
                      className="h-[30px] w-[30px] rounded-full object-contain"
                    />
                    <img
                      src="/images/launch/sol.png"
                      className="h-[30px] w-[30px] rounded-full object-contain"
                    />
                    <span className="text-[#FFFF] ml-2">GUAC/SOL</span>
                  </div>
                  <span>0</span>
                </Container>
                <Container className="bg-[#0F0F0F] p-3 flex gap-3 justify-between">
                  <div className="flex justify-start items-center">
                    <img
                      src="/images/launch/guac.png"
                      className="h-[30px] w-[30px] rounded-full object-contain"
                    />
                    <img
                      src="/images/launch/sol.png"
                      className="h-[30px] w-[30px] rounded-full object-contain"
                    />
                    <span className="text-[#FFFF] ml-2">GUAC/SOL</span>
                  </div>
                  <span>0</span>
                </Container>
              </div>
            )}
          </div>
        </main>
      </JupiterApiProvider>
    </PoolProvider>
  );
};

export default Page;
