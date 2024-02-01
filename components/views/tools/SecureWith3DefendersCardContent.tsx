import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { FaCheck } from "react-icons/fa6";

interface SecureWith3DefendersCardContentProps
  extends React.HTMLAttributes<any> {}

const SecureWith3DefendersCardContent: FunctionComponent<
  SecureWith3DefendersCardContentProps
> = ({
  className,

  ...props
}) => {
  return (
    <Link
      href={"https://d3fenders.com/"}
      target="_blank"
      className={cn(
        "flex flex-col p-4 bg-[#141414] md:p-8 transition-all duration-300 ease-in-out  border border-transparen hover:border-primary rounded-xl shadow-md gap-12 relative overflow-hidden",
        className
      )}
      {...props}
    >
      <Button className="max-w-[134.75px] absolute right-2 z-30 tools-bg ">
        All-In-One
      </Button>
      <Image
        src="/images/tools/bg/d3fenders.png"
        width={582}
        height={582}
        alt="guac background"
        className="-z-0 absolute sm:translate-x-1/2  opacity-30  "
      />
      <header className="flex flex-col  gap-3 z-10">
        <div className="bg-background h-12 w-12  rounded-md flex items-center justify-center">
          {/* <Image
            src="/images/trade/swap.svg"
            width={24}
            height={24}
            alt="guac logo"
          /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
          >
            <path
              d="M25.2171 19.0743L21.5143 17.2229C22.9886 16.08 23.9371 14.2971 23.9371 12.2857C23.9371 8.82286 21.1143 6 17.6514 6C14.1886 6 11.3657 8.82286 11.3657 12.2857C11.3657 14.72 12.76 16.8343 14.7943 17.8743V21.6C12.3371 21.0743 12.4857 21.0971 12.2114 21.0971C11.6057 21.0971 11.0343 21.3371 10.6 21.7714L9 23.3943L14.8171 29.2114C15.3086 29.7143 15.9943 30 16.7029 30H23.9029C25.0229 30 25.9714 29.2 26.1543 28.0914L27.0686 22.7086C27.32 21.2229 26.5771 19.76 25.2171 19.0743ZM24.8171 22.3314L23.9029 27.7143H16.7029C16.6 27.7143 16.5086 27.6686 16.4286 27.6L12.2229 23.3943L17.08 24.4114V12.2857C17.08 11.9657 17.3314 11.7143 17.6514 11.7143C17.9714 11.7143 18.2229 11.9657 18.2229 12.2857V19.1429H20.2343L24.1886 21.12C24.6457 21.3486 24.8971 21.84 24.8171 22.3314ZM13.6514 12.2857C13.6514 10.08 15.4457 8.28571 17.6514 8.28571C19.8571 8.28571 21.6514 10.08 21.6514 12.2857C21.6514 13.3714 21.2171 14.3543 20.5086 15.0743V12.2857C20.5086 10.7086 19.2286 9.42857 17.6514 9.42857C16.0743 9.42857 14.7943 10.7086 14.7943 12.2857V15.0743C14.0857 14.3543 13.6514 13.3714 13.6514 12.2857Z"
              fill="url(#paint0_linear_3293_7829)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_3293_7829"
                x1="18.0585"
                y1="6"
                x2="18.0585"
                y2="30"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FFEDD8" />
                <stop offset="1" stop-color="#FFC785" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 className="tools-text-color  text-lg md:text-2xl lg:text-[32px] font-medium">
          Secure With D3fenders
        </h1>
      </header>
      <p className="max-w-xs text-muted-foreground text-sm z-10">
        Guacamole has partnered with the D3fenders protocol to offer their
        decentralized vault system for an additional layer of asset protection.
        Keep your NFTs and assets safe and secure!
      </p>
      <ul className="flex flex-col gap-2 z-10 text-sm text-[#fcfcfc]">
        <li className="flex items-center gap-1">
          <FaCheck color="#FFEFDC" />
          <p>Protect Your NFTs With 2FA</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#FFEFDC" />
          <p>Works When Wallet Is Compromised</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#FFEFDC" />
          <p>Avotar NFTs Are Protected For Free</p>
        </li>
      </ul>
    </Link>
  );
};

export default SecureWith3DefendersCardContent;
