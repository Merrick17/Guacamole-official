"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Link from "next/link";
import Container from "./container";
import { Button } from "../ui/button";

const StakingDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full">
        <Link
          className="flex items-start  gap-2"
          href={""}
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          <span className="text-[#FF6565] text-[16px]">Get Started</span>
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
                stroke="#FF6565"
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
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>
          <span className="text-[#FCFCFC] text-[16px] font-medium">
            {" "}
            Proceed To Dual Finance
          </span>
        </DialogTitle>
        <Container className="bg-[#0F0F0F] p-2 flex gap-3 flex-col min-h-[50px] my-1 ">
          <span className="text-muted-foreground text-xs uppercase">
            LGUAC Staking Options are currently available via the Dual Finance
            interface. Please note that this is a third-party interface and
            program which is not Guacamole.
          </span>
          <span className="text-muted-foreground text-xs uppercase">
            Staking option availability depends on many factors. Pools are
            funded via DAO proposals and the subscription period often fills up
            within the first few minutes.
          </span>
          <span className="text-muted-foreground text-xs uppercase">
            We recommend checking the official Guacamole Discord server for
            information and pool availability schedules. You can also check out
            our official documentation regarding how Staking Options work and
            how they are beneficial to loyal community members and the AvocaDAO.
          </span>
          <div className="flex w-full justify-start items-start mt-3">
            <Button className="guac-bg">
              <Link
                rel="noopener noreferrer"
                href={
                  "https://docs.guacamole.gg/products-and-features/earn/staking-options"
                }
                target="_blank"
              >
                Open Dual Finance
              </Link>
            </Button>
          </div>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default StakingDialog;
