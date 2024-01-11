import FallbackImage from "@/components/FallBackImage";
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiLinkExternal } from "react-icons/bi";

const page = () => {
  const checkRemainder = (nb: number) => {
    return nb % 2;
  };
  return (
    // <main
    //   className={cn(
    //     "container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-160px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] "
    //   )}
    // >
    //   <section className="max-w-[833px]">
    //     <Container
    //       className={cn(
    //         "flex lg:w-full flex-col gap-10 rounded-lg bg-foreground p-6 max-sm:w-[100%] font-medium sm:col-span-1 lg:col-span-4 "
    //       )}
    //     >
    //       <div className="w-full flex items-center  justify-between text-black">
    //         <Select defaultValue="pools">
    //           <SelectTrigger className="lg:w-[280px] game-btn h-[30px] max-sm:w-full max-sm:mx-1">
    //             <SelectValue />
    //           </SelectTrigger>
    //           <SelectContent>
    //             <SelectItem value="pools">Gaming Pools </SelectItem>
    //             <SelectItem value="vatr">Token Activity Tracking</SelectItem>
    //             <SelectItem value="vw">View Watchlist</SelectItem>
    //           </SelectContent>
    //         </Select>
    //         <div   className="max-w-[320px]">
    //           <SearchInput
    //             placeholder="Search For Gaming Pool By Token"

    //           />
    //         </div>

    //         <Button className="game-btn">Create Pool</Button>
    //       </div>
    //       <Table className="max-sm:w-96 max-sm:overflow-x-auto">
    //         <TableHeader>
    //           <TableRow>
    //             <TableHead className="uppercase">Token Pool</TableHead>
    //             <TableHead className="uppercase">liquidity</TableHead>
    //             <TableHead className="uppercase">LP RATIO</TableHead>
    //             <TableHead className="text-right uppercase">Action</TableHead>
    //           </TableRow>
    //         </TableHeader>

    //         <TableBody></TableBody>
    //       </Table>
    //     </Container>
    //   </section>
    // </main>
    <main
      className={cn(
        "container mx-auto  flex flex-col justify-center  min-h-[calc(100vh-160px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] "
      )}
    >
      <section className="flex flex-1  items-center flex-col my-3 gap-5">
        <Container className="bg-foreground rounded-md lg:max-w-5xl">
          <div className="w-full flex items-center  justify-between text-black py-5">
            <Select defaultValue="pools">
              <SelectTrigger className="lg:w-[150px] game-btn h-[30px] max-sm:w-full max-sm:mx-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pools">Gaming Pools </SelectItem>
                <SelectItem value="vatr">Token Activity Tracking</SelectItem>
                <SelectItem value="vw">View Watchlist</SelectItem>
              </SelectContent>
            </Select>
            <div className="max-w-[360px]">
              <SearchInput placeholder="Search For Gaming Pool By Token" />
            </div>

            <Button className="game-btn">Create Pool</Button>
          </div>
          <Table className="max-sm:w-96 max-sm:overflow-x-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="uppercase">Token Pool</TableHead>
                <TableHead className="uppercase">liquidity</TableHead>
                <TableHead className="uppercase">LP RATIO</TableHead>
                <TableHead className="text-right uppercase">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Array.from({ length: 10 }).map((elm, ind: number) => (
                <TableRow
                  key={ind.toString()}
                  className={`${
                    checkRemainder(ind) == 1 ? "bg-[#0F0F0F]" : ""
                  }`}
                >
                  <TableCell className="font-medium">
                    <div className="flex flex-row items-center  gap-2 lg:gap-5">
                      <Image
                        src={"/images/play/gamba.png"}
                        className="w-[20px] h-[20px]  cursor-pointer "
                        width={20}
                        height={20}
                        alt=""
                      />
                      <FallbackImage
                        width={20}
                        height={20}
                        src={"/images/tokens/SOL.png"}
                        className="w-5 h-5 lg:w-10 lg:h-10 rounded-full "
                      />

                      <div className="flex flex-col gap-1 ">
                        <div className="flex items-start gap-1 lg:gap-2">
                          <div className="flex flex-col items-start w-full">
                            <p className="uppercase text-xs lg:text-sm">
                              Solana
                            </p>
                            <p className="uppercase text-[14px] text-muted-foreground lg:text-sm">
                              SOL
                            </p>
                          </div>
                          {/* <div className="text-xs flex items-center bg-foreground text-primary  rounded-sm px-2 py-1 ">
                            <Link
                              href={`https://explorer.solana.com/address/`}
                              rel="noopener noreferrer"
                              target="_blank"
                              className="text-xs flex items-center text-primary  rounded-[4px] px-2 py-[2px] "
                            >
                              <span className=" max-w-[22px]  lg:max-w-[44px] text-ellipsis overflow-hidden">
                              
                              </span>
                              <BiLinkExternal />
                            </Link>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <p
                      className={cn(
                        ` text-xs lg:text-base max-w-[80px]  lg:max-w-full text-muted-foreground text-ellipsis overflow-hidden text-[#FFEF60]`
                      )}
                    >
                      4014.23 SOL
                    </p>
                    <p className="text-[#A8A8A8] text-[14px]"> $301,050.00</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-start gap-1 items-center ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                      >
                        <path
                          d="M7.64014 0C3.77614 0 0.640137 3.136 0.640137 7C0.640137 10.864 3.77614 14 7.64014 14C11.5041 14 14.6401 10.864 14.6401 7C14.6401 3.136 11.5041 0 7.64014 0ZM13.1911 6.3H8.34014V1.449C10.8671 1.764 12.8761 3.773 13.1911 6.3ZM2.04014 7C2.04014 4.151 4.18214 1.792 6.94014 1.449V12.551C4.18214 12.208 2.04014 9.849 2.04014 7ZM8.34014 12.551V7.7H13.1911C12.8761 10.227 10.8671 12.236 8.34014 12.551Z"
                          fill="#FFEF60"
                        />
                      </svg>
                      <p
                        className={cn(
                          ` text-xs lg:text-base max-w-[80px]  lg:max-w-full text-muted-foreground text-ellipsis overflow-hidden text-[#A8A8A8]`
                        )}
                      >
                        1.023
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Link
                        href={`/terminal/coin`}
                        target="_blank"
                        className=" text-primary "
                      >
                        View
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>
      </section>
    </main>
  );
};

export default page;
