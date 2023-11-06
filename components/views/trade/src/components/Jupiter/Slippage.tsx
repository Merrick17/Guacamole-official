import { useMemo, useState } from "react";
import { HiAdjustments, HiOutlineInformationCircle } from "react-icons/hi";

import clsx from "clsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GrFormClose } from "react-icons/gr";
import SwapSettingButton from "../SwapRoute/SwapSettingButton";
import { formatNumber } from "../../misc/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
const OPTIONS = [1, 5, 10];

export const Slippage = ({
  slippage,
  setSlippage,
}: {
  slippage: number;
  setSlippage: (arg: number) => void;
}) => {
  const [input, setInput] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const custom = !OPTIONS.includes(input || -1);

  const canSubmit = !custom || (custom && input && input > 0 && input < 500);
  const handleSave = () => {
    input && setSlippage(input);
    setVisible(false);
  };
  return (
    <Dialog open={visible} onOpenChange={() => setVisible(false)}>
      <div
        className={`flex flex-row items-center whitespace-nowrap w-max cursor-pointer ${
          pathname.includes("trade") ? "text-primary" : "text-[#BBB0DB]"
        } bg-background rounded-xl px-2 py-1 h-full`}
        onClick={() => setVisible(true)}
      >
        <HiAdjustments className="mr-2 w-3 rotate-90" />
        <span className="text-xs"> {slippage / 10} %</span>
      </div>
      <DialogContent closeBtn={false} className="overflow-auto">
        <DialogHeader>
          <DialogTitle className=" flex flex-row items-center justify-between">
            <h2 className="text-base capitalize font-medium ">
              Slippage Settings
            </h2>
            <GrFormClose
              className=" w-4 h-4  cursor-pointer"
              onClick={() => setVisible(false)}
            />
          </DialogTitle>
          <DialogDescription>
            <>
              <div className="">
                <div className="mt-5 grid w-full grid-cols-3 gap-2">
                  {OPTIONS.map((item, idx) => {
                    const displayText =
                      formatNumber.format(Number(item / 10)) + "%";

                    return (
                      <SwapSettingButton
                        key={idx}
                        idx={idx}
                        itemsCount={OPTIONS.length}
                        className="h-full"
                        roundBorder={
                          idx === 0
                            ? "left"
                            : idx === OPTIONS.length - 1
                            ? "right"
                            : undefined
                        }
                        highlighted={item === slippage}
                        onClick={() => {
                          setSlippage(item);
                          setInput(item);
                        }}
                      >
                        {displayText}
                      </SwapSettingButton>
                    );
                  })}
                </div>
                <div className="mt-5">
                  <p className="text-muted-foreground text-xs">
                    or set manually:
                  </p>
                  <div
                    className={cn(
                      " relative   bg-background",
                      "h-[50px] rounded-[6px] p-[2px]"
                    )}
                  >
                    <Input
                      onChange={(e) =>
                        setInput(10 * parseFloat(e.target.value.trim()))
                      }
                      placeholder="0.00 %"
                      value={(input || 0) / 10}
                      max={100}
                      min={0}
                      className="bg-transparent h-full w-full rounded-[5px] pr-10 text-right text-lg font-bold focus:outline-none"
                    />
                    <span className="absolute right-5 top-3 text-lg font-bold">
                      %
                    </span>
                  </div>
                </div>

                {!canSubmit && (
                  <div className="mt-5 flex flex-col items-center">
                    <div className="flex flex-row items-center">
                      <HiOutlineInformationCircle className="mr-2 h-[15px] text-orange-300" />
                      <span className="text-sm text-muted-foreground">
                        Slippage must be between 0 and 50
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <Button
                onClick={handleSave}
                disabled={!canSubmit}
                className="mt-5 h-[50px] w-full  p-2 font-bold uppercase rounded-xl"
                color="primary"
              >
                Save Custom
              </Button>
            </>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
