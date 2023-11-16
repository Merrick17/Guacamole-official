import DateInput from "@/components/common/DateInput";
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const LockerInputDetails = () => {
  const [lockDate, setLockDate] = useState<Date>(new Date(Date.now()));
  return (
    <div className="flex flex-col items-start w-full gap-4">
      <Container className="bg-[#0F0F0F] p-2 flex gap-3 flex-col">
        <span className="text-[#FFFF] uppercase text-sm">
          selected liquidity pool tokens
        </span>
        <div className="flex items-center gap-2">
          <img
            src="/images/launch/guac.png"
            className="h-[30px] w-[30px] rounded-full"
          />
          <img
            src="/images/launch/sol.png"
            className="h-[30px] w-[30px] rounded-full"
          />
          <span className="text-[#FFF] text-sm">GUAC / SOL </span>
        </div>
      </Container>
      <Container className="bg-[#0F0F0F] p-2 flex gap-3 flex-col">
        <div className="flex justify-between">
          <span className="text-[#FFFF] uppercase text-sm">
            Choose Lock Amount
          </span>
          <div className="flex items-center justify-center gap-3">
            <div className="flex gap-1 items-center">
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.27539 10H9.77539V2.5H8.21289V0H2.27539C1.23963 0 0.400391 0.839235 0.400391 1.875V8.125C0.400391 9.16073 1.23963 10 2.27539 10ZM8.52539 3.75V8.75H2.27539C1.92994 8.75 1.65039 8.47046 1.65039 8.125V3.64078C1.8512 3.7128 2.06237 3.74943 2.27539 3.75004L8.52539 3.75ZM2.27539 1.25H6.96289V2.5H2.27539C1.92994 2.5 1.65039 2.22045 1.65039 1.875C1.65039 1.52955 1.92994 1.25 2.27539 1.25Z"
                  fill="#A8A8A8"
                  fill-opacity="0.5"
                />
              </svg>
              <span className="text-xs text-muted-foreground">
                1,042,042.0421
              </span>
            </div>
            <Button className="bg-[#141414] text-primary w-10 h-7 p-2 rounded-lg">
              50%
            </Button>
            <Button className="bg-[#141414] text-primary w-10 h-7 p-2 rounded-lg">
              100%
            </Button>
          </div>
        </div>
        <Input className="w-full h-[20px] " placeholder="00000" />
      </Container>
      <Container className="bg-[#0F0F0F] p-2 flex gap-3 flex-col">
        <span className="text-[#FFFF] uppercase text-sm">
          CHOOSE UNLOCK DATE
        </span>
        <DateInput selectedDate={lockDate} handleSelectDate={setLockDate} />
      </Container>
      <Container className="bg-[#0F0F0F] p-2 flex gap-3 flex-col">
        <div className="flex justify-between">
          <span className="text-[#FFFF] uppercase text-sm">
            LOCKER CREATION FEES
          </span>
          <div className="flex items-center justify-center gap-3">
            <div className="flex gap-1 items-center">
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.27539 10H9.77539V2.5H8.21289V0H2.27539C1.23963 0 0.400391 0.839235 0.400391 1.875V8.125C0.400391 9.16073 1.23963 10 2.27539 10ZM8.52539 3.75V8.75H2.27539C1.92994 8.75 1.65039 8.47046 1.65039 8.125V3.64078C1.8512 3.7128 2.06237 3.74943 2.27539 3.75004L8.52539 3.75ZM2.27539 1.25H6.96289V2.5H2.27539C1.92994 2.5 1.65039 2.22045 1.65039 1.875C1.65039 1.52955 1.92994 1.25 2.27539 1.25Z"
                  fill="#A8A8A8"
                  fill-opacity="0.5"
                />
              </svg>
              <span className="text-xs text-muted-foreground">
                1,042,042.0421
              </span>
            </div>

            <Button className="bg-[#141414] text-[#8BD796] w-full h-7 p-2 rounded-lg text-xs">
              BUY GUAC
            </Button>
          </div>
        </div>
        <span className="text-muted-foreground font-semibold text-sm mt-[-10px]">
          500,000,000 GUAC + 0.5% of locked GUAC/SOL LP
        </span>
      </Container>
      <Container className="bg-[#0F0F0F] justify-center items-center text-center">
        <span className="text-primary text-center text-sm">
          Liquidity pool tokens cannot be withdrawn under any circumstances
          until the timer has expired. Please ensure all parameters are correct
          before initializing the new locker.
        </span>
      </Container>
      <Button className="bg-primary rounded-lg w-full h-[50px] ">Create Liquidity Locker</Button>
    </div>
  );
};

export default LockerInputDetails;
