"use client"
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";



const Page = () => {
  const router = useRouter(); 
  return (
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
        <div className="w-full h-[40px] flex rounded-lg justify-center items-center bg-[#0F0F0F]">
          <div className="text-[#A8A8A8] w-full flex items-center justify-center gap-1 text-[14px]">
            Raydium Pool Address:{" "}
            <Link href={"#"} className="text-[#8BD796] ">
              <div className="flex items-center justify-center gap-1 flex-nowrap">
                <span>FSKH...nYck</span>
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
        <Container className="bg-[#0F0F0F] flex-col items-center flex">
          <h5 className="text-muted-foreground text-[12px] uppercase">
            Locked Liquidity
          </h5>
          <p className="text-primary">81.2%</p>
        </Container>
        <div className=" flex flex-1 justify-evenly gap-2">
          <div className=" w-[267.609px] h-[256px] p-5  overflow-hidden rounded-lg relative">
            <img
              src="/images/launch/guac.png"
              className="w-full h-full object-cover transform scale-[2] opacity-25 absolute top-0 bottom-0 left-0 right-0 z-0"
              alt="Guac Image"
            />
            <div className="w-[232px] h-[216px] rounded-lg bg-[#0F0F0F] z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
              <img
                src="/images/launch/guac.png"
                className="h-[40px] w-[40px] rounded-full"
              />
              <p className="text-[#FFFF] font-semibold">GUAC</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_2538_7685)">
                    <path
                      d="M6.51172 13.2617C6.08984 13.2617 5.73242 13.1152 5.43945 12.8223C5.14648 12.5293 5 12.1719 5 11.75C5 11.3281 5.14648 10.9707 5.43945 10.6777C5.73242 10.3848 6.08984 10.2383 6.51172 10.2383C6.93359 10.2383 7.29102 10.3848 7.58398 10.6777C7.87695 10.9707 8.02344 11.3281 8.02344 11.75C8.02344 12.1719 7.87695 12.5293 7.58398 12.8223C7.29102 13.1152 6.93359 13.2617 6.51172 13.2617ZM11.0117 15.5117V7.98828H2.01172V15.5117H11.0117ZM11.0117 6.51172C11.4336 6.51172 11.791 6.6582 12.084 6.95117C12.377 7.24414 12.5234 7.58984 12.5234 7.98828V15.5117C12.5234 15.9102 12.377 16.2559 12.084 16.5488C11.791 16.8418 11.4336 16.9883 11.0117 16.9883H2.01172C1.58984 16.9883 1.23242 16.8418 0.939453 16.5488C0.646484 16.2559 0.5 15.9102 0.5 15.5117V7.98828C0.5 7.58984 0.646484 7.24414 0.939453 6.95117C1.23242 6.6582 1.58984 6.51172 2.01172 6.51172H2.75V5C2.75 4.32031 2.91992 3.69336 3.25977 3.11914C3.59961 2.54492 4.05664 2.08789 4.63086 1.74805C5.20508 1.4082 5.83203 1.23828 6.51172 1.23828C7.19141 1.23828 7.81836 1.4082 8.39258 1.74805C8.9668 2.08789 9.42383 2.54492 9.76367 3.11914C10.1035 3.69336 10.2734 4.32031 10.2734 5V6.51172H11.0117ZM6.51172 2.75C5.87891 2.75 5.3457 2.9668 4.91211 3.40039C4.47852 3.83398 4.26172 4.36719 4.26172 5V6.51172H8.76172V5C8.76172 4.36719 8.54492 3.83398 8.11133 3.40039C7.67773 2.9668 7.14453 2.75 6.51172 2.75Z"
                      fill="#D6776A"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2538_7685">
                      <rect
                        width="18"
                        height="18"
                        fill="white"
                        transform="matrix(1 0 0 -1 0.5 18.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <img
                  src="/images/launch/guac.png"
                  className="h-[20px] w-[20px] rounded-full"
                />
                <span className="text-primary">500B</span>
              </div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.63965 2.5C4.77565 2.5 1.63965 5.636 1.63965 9.5C1.63965 13.364 4.77565 16.5 8.63965 16.5C12.5036 16.5 15.6396 13.364 15.6396 9.5C15.6396 5.636 12.5036 2.5 8.63965 2.5ZM14.1906 8.8H9.33965V3.949C11.8666 4.264 13.8756 6.273 14.1906 8.8ZM3.03965 9.5C3.03965 6.651 5.18165 4.292 7.93965 3.949V15.051C5.18165 14.708 3.03965 12.349 3.03965 9.5ZM9.33965 15.051V10.2H14.1906C13.8756 12.727 11.8666 14.736 9.33965 15.051Z"
                    fill="#A8A8A8"
                  />
                </svg>

                <img
                  src="/images/launch/guac.png"
                  className="h-[20px] w-[20px] rounded-full"
                />
                <span className="text-muted-foreground">600B (0.6%)</span>
              </div>
            </div>
          </div>
          <div className=" w-[267.609px] h-[256px] p-5  overflow-hidden rounded-lg relative">
            <img
              src="/images/launch/guac.png"
              className="w-full h-full object-cover transform scale-[2] opacity-25 absolute top-0 bottom-0 left-0 right-0 z-0"
              alt="Guac Image"
            />
            <div className="w-[232px] h-[216px] rounded-lg bg-[#0F0F0F] z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
              <img
                src="/images/launch/guac.png"
                className="h-[40px] w-[40px] rounded-full"
              />
              <p className="text-[#FFFF] font-semibold">GUAC</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_2538_7685)">
                    <path
                      d="M6.51172 13.2617C6.08984 13.2617 5.73242 13.1152 5.43945 12.8223C5.14648 12.5293 5 12.1719 5 11.75C5 11.3281 5.14648 10.9707 5.43945 10.6777C5.73242 10.3848 6.08984 10.2383 6.51172 10.2383C6.93359 10.2383 7.29102 10.3848 7.58398 10.6777C7.87695 10.9707 8.02344 11.3281 8.02344 11.75C8.02344 12.1719 7.87695 12.5293 7.58398 12.8223C7.29102 13.1152 6.93359 13.2617 6.51172 13.2617ZM11.0117 15.5117V7.98828H2.01172V15.5117H11.0117ZM11.0117 6.51172C11.4336 6.51172 11.791 6.6582 12.084 6.95117C12.377 7.24414 12.5234 7.58984 12.5234 7.98828V15.5117C12.5234 15.9102 12.377 16.2559 12.084 16.5488C11.791 16.8418 11.4336 16.9883 11.0117 16.9883H2.01172C1.58984 16.9883 1.23242 16.8418 0.939453 16.5488C0.646484 16.2559 0.5 15.9102 0.5 15.5117V7.98828C0.5 7.58984 0.646484 7.24414 0.939453 6.95117C1.23242 6.6582 1.58984 6.51172 2.01172 6.51172H2.75V5C2.75 4.32031 2.91992 3.69336 3.25977 3.11914C3.59961 2.54492 4.05664 2.08789 4.63086 1.74805C5.20508 1.4082 5.83203 1.23828 6.51172 1.23828C7.19141 1.23828 7.81836 1.4082 8.39258 1.74805C8.9668 2.08789 9.42383 2.54492 9.76367 3.11914C10.1035 3.69336 10.2734 4.32031 10.2734 5V6.51172H11.0117ZM6.51172 2.75C5.87891 2.75 5.3457 2.9668 4.91211 3.40039C4.47852 3.83398 4.26172 4.36719 4.26172 5V6.51172H8.76172V5C8.76172 4.36719 8.54492 3.83398 8.11133 3.40039C7.67773 2.9668 7.14453 2.75 6.51172 2.75Z"
                      fill="#D6776A"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2538_7685">
                      <rect
                        width="18"
                        height="18"
                        fill="white"
                        transform="matrix(1 0 0 -1 0.5 18.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <img
                  src="/images/launch/guac.png"
                  className="h-[20px] w-[20px] rounded-full"
                />
                <span className="text-primary">500B</span>
              </div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.63965 2.5C4.77565 2.5 1.63965 5.636 1.63965 9.5C1.63965 13.364 4.77565 16.5 8.63965 16.5C12.5036 16.5 15.6396 13.364 15.6396 9.5C15.6396 5.636 12.5036 2.5 8.63965 2.5ZM14.1906 8.8H9.33965V3.949C11.8666 4.264 13.8756 6.273 14.1906 8.8ZM3.03965 9.5C3.03965 6.651 5.18165 4.292 7.93965 3.949V15.051C5.18165 14.708 3.03965 12.349 3.03965 9.5ZM9.33965 15.051V10.2H14.1906C13.8756 12.727 11.8666 14.736 9.33965 15.051Z"
                    fill="#A8A8A8"
                  />
                </svg>

                <img
                  src="/images/launch/guac.png"
                  className="h-[20px] w-[20px] rounded-full"
                />
                <span className="text-muted-foreground">600B (0.6%)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[40px] flex rounded-lg  justify-evenly items-center  bg-[#0F0F0F] ">
          <Button className="bg-transparent">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.6875 6.32812C12.9375 5.60938 12.0781 5.03906 11.1094 4.61719C10.1406 4.19531 9.10938 3.98438 8.01562 3.98438C6.57812 3.98438 5.24219 4.34375 4.00781 5.0625C2.77344 5.78125 1.79688 6.75781 1.07812 7.99219C0.359375 9.22656 0 10.5625 0 12C0 13.4375 0.359375 14.7734 1.07812 16.0078C1.79688 17.2422 2.77344 18.2188 4.00781 18.9375C5.24219 19.6562 6.57812 20.0156 8.01562 20.0156C9.85938 20.0156 11.4922 19.4531 12.9141 18.3281C14.3359 17.2031 15.2812 15.7656 15.75 14.0156H13.6875C13.25 15.1719 12.5156 16.125 11.4844 16.875C10.4531 17.625 9.29688 18 8.01562 18C6.92188 18 5.91406 17.7344 4.99219 17.2031C4.07031 16.6719 3.34375 15.9453 2.8125 15.0234C2.28125 14.1016 2.01562 13.0938 2.01562 12C2.01562 10.9062 2.28125 9.89844 2.8125 8.97656C3.34375 8.05469 4.07031 7.32812 4.99219 6.79688C5.91406 6.26562 6.92188 6 8.01562 6C8.82812 6 9.59375 6.15625 10.3125 6.46875C11.0312 6.78125 11.6719 7.21875 12.2344 7.78125L9 11.0156H16.0312V3.98438L13.6875 6.32812Z"
                fill="#D6776A"
              />
            </svg>
          </Button>
          <Link href={"#"} className="text-[#BBB0DB]">
            Swap
          </Link>
          <Link
            href={"#"}
            className="text-muted-foreground flex items-center justify-center gap-3"
          >
            Raydium{" "}
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2538_7835)">
                <path
                  d="M0.646484 9.28906L5.94336 3.99219H2.63867V3.00781H7.63086V8H6.64648V4.69531L1.34961 9.99219L0.646484 9.28906Z"
                  fill="#B9BABB"
                />
              </g>
              <defs>
                <clipPath id="clip0_2538_7835">
                  <rect
                    width="12"
                    height="12"
                    fill="white"
                    transform="matrix(1 0 0 -1 0.646484 12.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </Link>
          <Link
            href={"#"}
            className="text-muted-foreground flex items-center justify-center gap-3"
          >
            Solscan{" "}
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2538_7835)">
                <path
                  d="M0.646484 9.28906L5.94336 3.99219H2.63867V3.00781H7.63086V8H6.64648V4.69531L1.34961 9.99219L0.646484 9.28906Z"
                  fill="#B9BABB"
                />
              </g>
              <defs>
                <clipPath id="clip0_2538_7835">
                  <rect
                    width="12"
                    height="12"
                    fill="white"
                    transform="matrix(1 0 0 -1 0.646484 12.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>
        <Container className="border-2 flex-col items-start flex mt-2 space-y-4 ">
          <div className="flex items-center justify-between text-xs w-full ">
            <div className="text-muted-foreground">
              <span>Conversion Rate</span>
            </div>
            <div className="text-muted-foreground">
              <span>1 USDC ≈ 47,502,598.5433853 GUAC </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs w-full ">
            <div className="text-muted-foreground">
              <span>Total LP Tokens</span>
            </div>
            <div className="text-muted-foreground">
              <span>1,000,041.04</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs w-full ">
            <div className="text-muted-foreground">
              <span>Total Locked LP</span>
            </div>
            <div className="text-muted-foreground">
              <span>810,042.02</span>
            </div>
          </div>
        </Container>
        <Container className="bg-[#0F0F0F] flex-col items-center gap-2 flex justify-center">
          <h5 className="text-muted-foreground font-semibold  uppercase text-[#FFF]">
            Liquidity Locks
          </h5>
          <p className="text-muted-foreground text-center text-[12px]">
            Please note that only the Raydium Liquidity Provider (LP) tokens are
            locked, not the corresponding dollar value of these positions, which
            fluctuates with market changes. Additionally, as more participants
            contribute liquidity to the pool, new LP tokens are minted.
          </p>
        </Container>
        <Container className="bg-[#0F0F0F]  gap-2 flex justify-between items-center mt-2">
          <div className="flex flex-col items-start">
            <p className="text-primary text-[16px] ">$32,042.44</p>
            <p className="text-muted-foreground text-[14px]">
              805,043 LP Tokens
            </p>
          </div>
          <div className="flex justify-end items-center gap-2">
            <div className="flex flex-col items-end">
              <p className=" text-[16px] ">in 5 years</p>
              <p className="text-muted-foreground text-[14px]">
                805,043 LP Tokens
              </p>
            </div>
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2538_7886)">
                <path
                  d="M8.76562 17.0156C8.20312 17.0156 7.72656 16.8203 7.33594 16.4297C6.94531 16.0391 6.75 15.5625 6.75 15C6.75 14.4375 6.94531 13.9609 7.33594 13.5703C7.72656 13.1797 8.20312 12.9844 8.76562 12.9844C9.32812 12.9844 9.80469 13.1797 10.1953 13.5703C10.5859 13.9609 10.7812 14.4375 10.7812 15C10.7812 15.5625 10.5859 16.0391 10.1953 16.4297C9.80469 16.8203 9.32812 17.0156 8.76562 17.0156ZM14.7656 20.0156V9.98438H2.76562V20.0156H14.7656ZM14.7656 8.01562C15.3281 8.01562 15.8047 8.21094 16.1953 8.60156C16.5859 8.99219 16.7812 9.45312 16.7812 9.98438V20.0156C16.7812 20.5469 16.5859 21.0078 16.1953 21.3984C15.8047 21.7891 15.3281 21.9844 14.7656 21.9844H2.76562C2.20312 21.9844 1.72656 21.7891 1.33594 21.3984C0.945313 21.0078 0.75 20.5469 0.75 20.0156V9.98438C0.75 9.45312 0.945313 8.99219 1.33594 8.60156C1.72656 8.21094 2.20312 8.01562 2.76562 8.01562H3.75V6C3.75 5.09375 3.97656 4.25781 4.42969 3.49219C4.88281 2.72656 5.49219 2.11719 6.25781 1.66406C7.02344 1.21094 7.85938 0.984375 8.76562 0.984375C9.67188 0.984375 10.5078 1.21094 11.2734 1.66406C12.0391 2.11719 12.6484 2.72656 13.1016 3.49219C13.5547 4.25781 13.7812 5.09375 13.7812 6V8.01562H14.7656ZM8.76562 3C7.92188 3 7.21094 3.28906 6.63281 3.86719C6.05469 4.44531 5.76562 5.15625 5.76562 6V8.01562H11.7656V6C11.7656 5.15625 11.4766 4.44531 10.8984 3.86719C10.3203 3.28906 9.60938 3 8.76562 3Z"
                  fill="#D6776A"
                />
              </g>
              <defs>
                <clipPath id="clip0_2538_7886">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="matrix(1 0 0 -1 0.75 24)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </Container>
      </div>
    </main>
  );
};

export default Page;
