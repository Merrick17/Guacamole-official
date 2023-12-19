"use client";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect } from "react";
import Container from "./container";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

interface InfoCardProps {
  image: string;
  name: string;
  description: string;
  href?: string;
  openNewTab?: boolean;
  disabled?: boolean;
  buttonTxt?: string;
  target?: string;
}

const InfoCard: FC<InfoCardProps> = ({
  image,
  name,
  description,
  href,
  openNewTab = false,
  buttonTxt = "Explore",
  disabled = false,
  target,
}) => {
  //console.log("Border",name)
  return (
    <Container
      className={`p-6 rounded-lg max-w-xs bg-foreground  border border-transparent  ${
        name.includes("Lock") ? "border-primary" : ""
      } hover:border-primary transition-all duration-500 ease-in-out`}
    >
      <div className="relative aspect-square w-7 h-7 mb-3">
        {image !== "" ? (
          <Image src={image} alt={name} fill />
        ) : (
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.8889 24.8889H3.11111V3.11111H14V0H3.11111C1.38444 0 0 1.4 0 3.11111V24.8889C0 26.6 1.38444 28 3.11111 28H24.8889C26.6 28 28 26.6 28 24.8889V14H24.8889V24.8889ZM17.1111 0V3.11111H22.6956L7.40444 18.4022L9.59778 20.5956L24.8889 5.30444V10.8889H28V0H17.1111Z"
              fill="#FCFCFC"
            />
          </svg>
        )}
      </div>
      <a href="#">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight capitalize">
          {name}
        </h5>
      </a>
      <p className="mb-3 font-normal text-muted-foreground">{description}</p>
      <Link
        href={href}
        target={target}
        className={cn(
          "inline-flex items-center text-primary hover:underline mt-auto",
          disabled && "cursor-not-allowed pointer-events-none opacity-50"
        )}
      >
        {disabled ? "Coming Soon" : buttonTxt}

        <svg
          className="w-3 h-3 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
          />
        </svg>
      </Link>
    </Container>
  );
};

export default InfoCard;
