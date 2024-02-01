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
import { abbreviate } from "@bonfida/hooks";
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
    <main className="container mx-auto  items-center flex flex-col  gap-14 px-3 lg:px-8 py-6 md:px-16 md:py-12  max-w-2xl ">
      <div className=" mx-auto flex w-full  flex-col gap-6 rounded-lg bg-foreground px-6 py-5  shadow-md border border-[rgba(168, 168, 168, 0.10)] ">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <div className="w-[153px] text-black font-semibold">
            <Select
              defaultValue="token"
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
              <SelectTrigger className="rounded-lg h-[30px] flex flex-2 gap-2 guac-btn" >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="token">The GUAC Token </SelectItem>
                <SelectItem value="avotars">The Avotars </SelectItem>
                <SelectItem value="shop">Earn & Shop</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            className="rounded-lg h-[30px] guac-btn"
            onClick={() => {
              router.push("/launch/lock/create");
            }}
          >
            Scoop The Dip
          </Button>
        </div>
        <hr className="border border-[rgba(168, 168, 168, 0.10)] " />
        <div className="w-full h-[40px] flex rounded-lg justify-center items-center bg-[#0F0F0F] border-[1px] border-[rgba(168, 168, 168, 0.10)]">
          <div className="text-[#FFF] w-full flex items-center justify-center gap-1 text-[24px]">
            GUAC & The AvocaDAO
          </div>
        </div>
        <div className="w-full h-[40px] flex rounded-lg justify-center items-center bg-[#0F0F0F] border-[1px] border-[rgba(168, 168, 168, 0.10)]">
          <div className="text-[#A8A8A8] w-full flex items-center justify-center gap-1 text-[14px]">
            Official Token Address:{" "}
            <Link
              href={`https://solscan.io/account/AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR`}
              className="text-[#8BD796] "
              target="_blank"
            >
              <div className="flex items-center justify-center gap-1 flex-nowrap">
                <span>
                  {abbreviate(
                    "AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR",
                    4
                  )}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <path
                    d="M4.26465 2V3H1.76465V8.5H7.26465V6H8.26465V9C8.26465 9.13261 8.21197 9.25979 8.1182 9.35355C8.02444 9.44732 7.89726 9.5 7.76465 9.5H1.26465C1.13204 9.5 1.00486 9.44732 0.911095 9.35355C0.817326 9.25979 0.764648 9.13261 0.764648 9V2.5C0.764648 2.36739 0.817326 2.24021 0.911095 2.14645C1.00486 2.05268 1.13204 2 1.26465 2H4.26465ZM9.76465 0.5V4.5H8.76465V2.2065L4.86815 6.1035L4.16115 5.3965L8.05715 1.5H5.76465V0.5H9.76465Z"
                    fill="#8BD796"
                  />
                </svg>
              </div>
            </Link>{" "}
          </div>
        </div>
        <Container className="bg-[#0F0F0F] hover:border-[#70D87D] relative flex-col gap-[17px] flex p-[25px] overflow-hidden border-[1px] border-[rgba(168, 168, 168, 0.10)] ">
          <Image
            src="/images/explore/bg/dao.png"
            width={360}
            height={362}
            alt="guac background"
            className="-z-0 absolute rotate-[30deg] sm:translate-x-1/2  opacity-30  "
          />
          <div className="flex flex-col gap-4 z-10">
            <h1>Learn About Guacamole</h1>
            <p className="text-[#A8A8A8] text-[14px] w-[369px]">
              Interested in exploring the Guacamole token ecosystem and economy?
              Explore our documentation for official links, tokenomics, and
              everything else you need to know!
            </p>
            <Link
              href={"https://docs.guacamole.gg/guacamole-guac/guac-token"}
              className="flex items-start  gap-2"
              target="_blank"
            >
              <span className="text-[#70D87D] text-[16px]">
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
        <Container className="bg-[#0F0F0F] hover:border-[#70D87D]  relative flex-col gap-[17px] flex p-[25px] overflow-hidden border-[1px] border-[rgba(168, 168, 168, 0.10)] ">
          <h1>Explore Uses And Integrations</h1>
          <p className="text-[#A8A8A8] text-[14px] w-[369px]">
            Excited about using that GUAC? We created a complete catalog of
            native and third-party integrations to make it simpler.
          </p>
          <Link
            href={
              "https://docs.guacamole.gg/guacamole-guac/guac-token/native-integrations"
            }
            target="_blank"
            className="flex items-start  gap-2"
          >
            <span className="text-[#70D87D] text-[16px]">
              View Complete List
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
        <Container className="bg-[#0F0F0F] hover:border-[#70D87D]   relative flex-col gap-[17px] flex p-[25px] overflow-hidden border-[1px] border-[rgba(168, 168, 168, 0.10)] ">
          <h1>Participate In The AvocaDAO</h1>
          <p className="text-[#A8A8A8] text-[14px] w-[369px]">
            Guacamole is decentralized and funds objectives through governance
            proposals and community votes. Come participate and help out!
          </p>
          <Link
            href={
              "https://app.realms.today/dao/Ha56K8MGrJuiJSyK2UaYRpAf7Hu2BZw2XALEmW9EQemu"
            }
            className="flex items-start  gap-2"
            target="_blank"
          >
            <span className="text-[#70D87D] text-[16px]">
              Open AvocaDAO On Realms
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
