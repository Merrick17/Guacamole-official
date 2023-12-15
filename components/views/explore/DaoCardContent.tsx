import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { FaCheck } from "react-icons/fa6";

interface DaoCardContentProps extends React.HTMLAttributes<any> {}

const DaoCardContent: FunctionComponent<DaoCardContentProps> = ({
  className,

  ...props
}) => {
  return (
    <Link
      href={"/explore/guac-token"}
      className={cn(
        "flex flex-col p-4 bg-[#141414] md:p-8 transition-all duration-300 ease-in-out  border border-transparen hover:border-primary rounded-xl shadow-md gap-12 relative overflow-hidden",
        className
      )}
      {...props}
    >
      {/* <Button className="guac-btn w-[131px]  absolute z-50 top-5 right-3 p-3">
        Indepth Insights
      </Button> */}
      <Image
        src="/images/explore/bg/dao.png"
        width={582}
        height={582}
        alt="guac background"
        className="-z-0 absolute sm:translate-x-1/2 bottom-[-100px] opacity-30  "
      />
      <header className="flex flex-col  gap-3 z-10">
        <div className="bg-background h-12 w-12 p-1 rounded-md flex items-center justify-center">
          {/* <Image
            src="/images/themes/green.png"
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
              d="M14.4686 19.7943C14.64 19.7943 14.8 19.7829 14.96 19.76C15.4971 21.0743 16.7886 22 18.2857 22C19.7829 22 21.0743 21.0743 21.6114 19.76C21.7714 19.7829 21.9429 19.7943 22.1029 19.7943C24.08 19.7943 25.6914 18.1829 25.6914 16.2057C25.6914 15.3943 25.4057 14.6171 24.9257 14C25.4171 13.3829 25.6914 12.6057 25.6914 11.7943C25.6914 9.81714 24.08 8.20571 22.1029 8.20571C21.9314 8.20571 21.7714 8.21714 21.6114 8.24C21.0743 6.92571 19.7829 6 18.2857 6C16.7886 6 15.4971 6.92571 14.96 8.24C14.8 8.21714 14.6286 8.20571 14.4686 8.20571C12.4914 8.20571 10.88 9.81714 10.88 11.7943C10.88 12.6057 11.1657 13.3829 11.6457 14C11.1543 14.6171 10.8686 15.3943 10.8686 16.2057C10.8686 18.1829 12.48 19.7943 14.4686 19.7943ZM18.2857 19.7143C17.5771 19.7143 17.0057 19.1543 16.9829 18.4571L17.12 17.2114C17.4857 17.3486 17.8743 17.4286 18.2857 17.4286C18.6971 17.4286 19.0971 17.3486 19.4629 17.2114L19.5886 18.4571C19.5657 19.1543 18.9943 19.7143 18.2857 19.7143ZM22.1029 17.5086C21.8286 17.5086 21.5771 17.4286 21.3714 17.28L20.4457 16.6286C21.0743 16.1143 21.52 15.3829 21.6571 14.5371L22.6629 15.0171C23.12 15.2343 23.4171 15.6914 23.4171 16.1943C23.4171 16.9257 22.8229 17.5086 22.1029 17.5086ZM21.36 10.72C21.5886 10.5714 21.84 10.4914 22.1029 10.4914C22.8229 10.4914 23.4057 11.0743 23.4057 11.7943C23.4057 12.2971 23.12 12.7429 22.6514 12.9714L21.6457 13.4514C21.5086 12.6057 21.0629 11.8743 20.4229 11.36L21.36 10.72ZM18.2857 8.28571C18.9943 8.28571 19.5657 8.84571 19.5886 9.54286L19.4629 10.7886C19.0971 10.6514 18.6971 10.5714 18.2857 10.5714C17.8743 10.5714 17.4857 10.6514 17.12 10.7886L16.9829 9.54286C17.0057 8.84571 17.5771 8.28571 18.2857 8.28571ZM14.4686 10.4914C14.7429 10.4914 14.9943 10.5714 15.2 10.72L16.1257 11.36C15.4971 11.8743 15.0514 12.6057 14.9143 13.4514L13.9086 12.9714C13.4514 12.7429 13.1543 12.2971 13.1543 11.7943C13.1543 11.0743 13.7486 10.4914 14.4686 10.4914ZM13.9086 15.0286L14.9143 14.5486C15.0514 15.3943 15.4971 16.1257 16.1371 16.64L15.2114 17.2686C14.9829 17.4171 14.7314 17.4971 14.4686 17.4971C13.7486 17.4971 13.1657 16.9143 13.1657 16.1943C13.1543 15.7029 13.4514 15.2571 13.9086 15.0286ZM18.2857 30C23.9657 30 28.5714 25.3943 28.5714 19.7143C22.8914 19.7143 18.2857 24.32 18.2857 30ZM21.0743 27.2114C21.8857 25.04 23.6114 23.3029 25.7829 22.5029C24.9714 24.6743 23.2457 26.4 21.0743 27.2114ZM8 19.7143C8 25.3943 12.6057 30 18.2857 30C18.2857 24.32 13.68 19.7143 8 19.7143ZM10.7886 22.5029C12.96 23.3143 14.6971 25.04 15.4971 27.2114C13.3257 26.4 11.6 24.6743 10.7886 22.5029Z"
              fill="url(#paint0_linear_3124_316)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_3124_316"
                x1="18.2857"
                y1="6"
                x2="18.2857"
                y2="30"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FF8D8D" />
                <stop offset="1" stop-color="#FF6161" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 className=" text-lg md:text-2xl lg:text-[32px] font-medium">
          GUAC Token & DAO
        </h1>
      </header>
      <p className="max-w-xs text-muted-foreground text-sm z-10">
        Explore the dynamics of the GUAC token ecosystem and learn more about
        integrations, usage, our DAO, and the freshest “Guacenomics” around.
      </p>
      <ul className="flex flex-col gap-2 z-10 text-sm text-[#fcfcfc]">
        <li className="flex items-center gap-1">
          <FaCheck color="#ACD8AF" />
          <p>Explore The Tokenomics</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#ACD8AF" />
          <p>Learn Where To Use GUAC</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#ACD8AF" />
          <p>Join The AvocaDAO Initiatives</p>
        </li>
      </ul>
    </Link>
  );
};

export default DaoCardContent;
