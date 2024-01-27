"use client";
import LaunchHeader from "@/components/common/LaunchHeader";
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import TokenManagementForm from "@/components/views/launch/TokenManagementForm";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
dayjs.extend(relativeTime);
const Page = () => {
  const searchParams = useSearchParams();
  const params = searchParams.get("active");
  const [selectedScreen, setSelectedScreen] = useState<number>(1);
  useEffect(() => {
    const selected = Number(params);
    setSelectedScreen(selected);
    console.log("Selected Screen", selectedScreen);
  }, [params]);

  return (
    <main className="container mx-auto  items-center flex flex-col  gap-14 px-8 py-6 md:px-16 md:py-12  max-w-2xl ">
      <div className=" mx-auto flex w-full  flex-col gap-6 rounded-lg bg-foreground px-6 py-5  shadow-md ">
        <LaunchHeader tutorialLink="" />
        <hr className="border border-[rgba(168, 168, 168, 0.10)] " />
        <div className="flex items-center gap-4 w-full">
          <Button
            className={`${selectedScreen == 1 ? "launch-bg" : ""} w-full`}
            size="sm"
            type="button"
            onClick={() => {
              setSelectedScreen(1);
            }}
            variant={selectedScreen == 1 ? "default" : "secondary"}
          >
            Create New Token
          </Button>

          <Button
            className={`${selectedScreen == 2 ? "launch-bg" : ""} w-full`}
            size="sm"
            type="button"
            onClick={() => {
              setSelectedScreen(2);
            }}
            variant={selectedScreen == 2 ? "default" : "secondary"}
          >
            Manage Tokens
          </Button>
        </div>
        {selectedScreen == 1 ? (
          <>
            {" "}
            <div className="w-full h-[40px] flex rounded-lg justify-center items-center bg-[#0F0F0F] border-[1px] border-[rgba(168, 168, 168, 0.10)]">
              <div className="text-[#FFF] w-full flex items-center justify-center gap-1 text-[24px]">
                No-Code Token Creator
              </div>
            </div>
            <Container className="bg-[#0F0F0F] hover:border-[#D77668]  relative flex-col gap-[17px] flex p-[25px] overflow-hidden border-[1px] border-[rgba(168, 168, 168, 0.10)] ">
              <Image
                src="/images/launch/bg/nocode.gif"
                width={300}
                height={302}
                alt="guac background"
                className="-z-0 absolute rotate-[30deg] top-[-30px]  sm:translate-x-[60%]  opacity-30  "
              />
              <div className="flex flex-col gap-4 z-30">
                <h1>Token Creation Guide</h1>
                <p className="text-[#A8A8A8] text-[14px] w-[349px]">
                  Excited to create your own token and need some guidance? We
                  have you covered.
                </p>
                <Link href={""} className="flex items-start  gap-2">
                  <span className="text-[#D77668] text-[16px]">
                    Open Documentation
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="mt-1"
                  >
                    <g clip-path="url(#clip0_3130_506)">
                      <path
                        d="M10.0003 7.33317V10.5552C10.0004 10.6574 9.98035 10.7586 9.94128 10.853C9.90222 10.9474 9.84491 11.0332 9.77265 11.1055C9.70039 11.1778 9.61459 11.2351 9.52016 11.2741C9.42573 11.3132 9.32452 11.3333 9.22233 11.3332H1.44499C1.23865 11.3332 1.04077 11.2512 0.894863 11.1053C0.74896 10.9594 0.666992 10.7615 0.666992 10.5552V2.77784C0.666905 2.67564 0.686969 2.57444 0.726036 2.48001C0.765103 2.38557 0.822406 2.29977 0.894668 2.22751C0.966929 2.15525 1.05273 2.09795 1.14716 2.05888C1.24159 2.01981 1.3428 1.99975 1.44499 1.99984H4.52366M7.48833 0.666504H11.3337V4.51184M6.07433 5.92584L11.2597 0.740504"
                        stroke="#D77668"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3130_506">
                        <rect width="12" height="12" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
              </div>
            </Container>
            <Container className="bg-[#0F0F0F] hover:border-[#D77668]  relative flex-col gap-[17px] flex p-[25px] overflow-hidden border-[1px] border-[rgba(168, 168, 168, 0.10)]">
              <h1>Create Standard Solana SPL Token</h1>
              <p className="text-[#A8A8A8] text-[14px] w-[369px]">
                Easily create your own SPL token on Solana in just two minutes
                with our no-code creator!
              </p>
              <Link href={"/launch/create-spl-token"} className="flex items-start  gap-2">
                <span className="text-[#D77668] text-[16px]">Get Started</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="mt-1"
                >
                  <g clip-path="url(#clip0_3130_506)">
                    <path
                      d="M10.0003 7.33317V10.5552C10.0004 10.6574 9.98035 10.7586 9.94128 10.853C9.90222 10.9474 9.84491 11.0332 9.77265 11.1055C9.70039 11.1778 9.61459 11.2351 9.52016 11.2741C9.42573 11.3132 9.32452 11.3333 9.22233 11.3332H1.44499C1.23865 11.3332 1.04077 11.2512 0.894863 11.1053C0.74896 10.9594 0.666992 10.7615 0.666992 10.5552V2.77784C0.666905 2.67564 0.686969 2.57444 0.726036 2.48001C0.765103 2.38557 0.822406 2.29977 0.894668 2.22751C0.966929 2.15525 1.05273 2.09795 1.14716 2.05888C1.24159 2.01981 1.3428 1.99975 1.44499 1.99984H4.52366M7.48833 0.666504H11.3337V4.51184M6.07433 5.92584L11.2597 0.740504"
                      stroke="#D77668"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3130_506">
                      <rect width="12" height="12" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </Container>
            <Container className="bg-[#0F0F0F] hover:border-[#D77668]  relative flex-col gap-[17px] flex p-[25px] overflow-hidden border-[1px] border-[rgba(168, 168, 168, 0.10)]">
              <h1>Create Token2022 (SuperToken)</h1>
              <p className="text-[#A8A8A8] text-[14px] w-[369px]">
                Create your very own SuperToken on Solana with various
                extensions like transaction tax and more.
              </p>
              <Link href={""} className="flex items-start  gap-2 opacity-50">
                <span className="text-[#D77668] text-[16px]">Coming Soon</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="mt-1"
                >
                  <g clip-path="url(#clip0_3130_506)">
                    <path
                      d="M10.0003 7.33317V10.5552C10.0004 10.6574 9.98035 10.7586 9.94128 10.853C9.90222 10.9474 9.84491 11.0332 9.77265 11.1055C9.70039 11.1778 9.61459 11.2351 9.52016 11.2741C9.42573 11.3132 9.32452 11.3333 9.22233 11.3332H1.44499C1.23865 11.3332 1.04077 11.2512 0.894863 11.1053C0.74896 10.9594 0.666992 10.7615 0.666992 10.5552V2.77784C0.666905 2.67564 0.686969 2.57444 0.726036 2.48001C0.765103 2.38557 0.822406 2.29977 0.894668 2.22751C0.966929 2.15525 1.05273 2.09795 1.14716 2.05888C1.24159 2.01981 1.3428 1.99975 1.44499 1.99984H4.52366M7.48833 0.666504H11.3337V4.51184M6.07433 5.92584L11.2597 0.740504"
                      stroke="#D77668"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3130_506">
                      <rect width="12" height="12" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </Container>
          </>
        ) : (
          <TokenManagementForm />
        )}
      </div>
    </main>
  );
};

export default Page;
