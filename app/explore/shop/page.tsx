"use client";
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
dayjs.extend(relativeTime);
const Page = () => {
  const router = useRouter();
  const poolAdr = "";

  return (
    <main className="container mx-auto  items-center flex flex-col  gap-14 px-3 lg:px-8 py-6 md:px-16 md:py-12   max-w-2xl ">
      <div className=" mx-auto flex w-full  flex-col gap-6 rounded-lg bg-foreground px-6 py-5  shadow-md  border border-[rgba(168, 168, 168, 0.10)]">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <div className="w-[153px] text-black font-semibold">
            <Select
              defaultValue="shop"
              onValueChange={(val) => {
               
                switch (val) {
                  case "token":
                    router.push("/explore/guac-token");
                    break;
                  case "avotars":
                    router.push("/explore/avotars");
                    break;
                  case "shop":
                    router.push("/explore/shop");
                    break;
                  default:
                    break;
                }
              }}
            >
              <SelectTrigger className="rounded-lg h-[30px] flex flex-2 gap-2 guac-btn">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="token">The GUAC Token </SelectItem>
                <SelectItem value="avotars">The Avotars </SelectItem>
                <SelectItem value="shop">Earn & Shop</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="rounded-lg h-[30px] guac-btn">
            <Link href={"/trade/swap"}>Scoop The Dip</Link>
          </Button>
        </div>
        <hr className="border border-[rgba(168, 168, 168, 0.10)] " />
        <div className="w-full h-[40px] flex rounded-lg justify-center items-center bg-[#0F0F0F] border-[1px] border-[rgba(168, 168, 168, 0.10)]">
          <div className="text-[#FFF] w-full flex items-center justify-center gap-1 text-[24px]">
            Our “Other” Application -{" "}
            <span className="text-[#70D87D]">GUAC.GG</span>
          </div>
        </div>
        <div className="w-full h-[40px] flex rounded-lg justify-center items-center ">
          <div className="text-[#A8A8A8] text-[14px] w-full flex items-center text-center justify-center gap-1 ">
            That’s right! Guacamole has more than one application. Here’s some
            quick links to some of the amazing things you can do on our “other”
            app.
          </div>
        </div>
        <Container className="bg-[#0F0F0F] hover:border-[#70D87D] relative flex-col gap-[17px] flex p-[25px] overflow-hidden border-[1px] border-[rgba(168, 168, 168, 0.10)]">
          <Image
            src="/images/explore/bg/shop.png"
            width={600}
            height={502}
            alt="guac background"
            className="-z-0 absolute top-0 left-10   "
          />
          <div className="z-10 flex gap-[17px] flex-col">
            <h1>Buy Games, Software, & More!</h1>
            <p className="text-[#A8A8A8] text-[14px] w-[349px]">
              Looking to do something fun with your crypto? You can easily
              purchase 100’s of games or other items in one-click!
            </p>
            <Link
              href={"https://guac.gg/shop"}
              className="flex items-start  gap-2"
              target="_blank"
            >
              <span className="text-[#70D87D] text-[16px]">
                Explore The Shop
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
                    stroke="#70D87D"
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
        <Container className="bg-[#0F0F0F] hover:border-[#70D87D] relative flex-col gap-[17px] flex p-[25px] overflow-hidden border-[1px] border-[rgba(168, 168, 168, 0.10)] ">
          <h1>Follow Friends And Track Portfolios</h1>
          <p className="text-[#A8A8A8] text-[14px] w-[349px]">
            Your network is your net worth. Track your portfolio and build an
            army of followers with friends in our social tracking features!
          </p>
          <Link
            href={"https://guac.gg/pitfolio"}
            className="flex items-start  gap-2"
          >
            <span className="text-[#70D87D] text-[16px]">Visit Website</span>
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
                  stroke="#70D87D"
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
        {/* <Container className="bg-[#0F0F0F] hover:border-[#70D87D] relative flex-col gap-[17px] flex p-[25px] overflow-hidden border-[1px] border-[rgba(168, 168, 168, 0.10)] ">
          <h1>Trade On Magic Eden</h1>

          <Link href={""} className="flex items-start  gap-2">
            <span className="text-[#70D87D] text-[16px]">Visit Website</span>
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
                  stroke="#70D87D"
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
        </Container> */}
        <Container className="bg-[#0F0F0F] hover:border-[#70D87D] relative flex-col gap-[17px] flex p-[25px] overflow-hidden border-[1px] border-[rgba(168, 168, 168, 0.10)]">
          <h1>Earn And Redeem Points</h1>
          <p className="text-[#A8A8A8] text-[14px] w-[369px]">
            Almost everything you do on GUAC.GG earns you redeemable points!
            We’ve even partnered with platforms like
            <span className="text-[#70D87D]">Bybit</span> and{" "}
            <span className="text-[#70D87D]">OKX</span>!
          </p>
          <Link
            href={"https://guac.gg/rewards"}
            target="_blank"
            className="flex items-start  gap-2"
          >
            <span className="text-[#70D87D] text-[16px]">
              Learn More About Points
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
                  stroke="#70D87D"
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
      </div>
    </main>
  );
};

export default Page;
