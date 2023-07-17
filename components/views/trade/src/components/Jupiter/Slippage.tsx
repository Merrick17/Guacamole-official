import { useState } from 'react';
import { HiAdjustments, HiOutlineInformationCircle } from 'react-icons/hi';

import clsx from 'clsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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

  const custom = !OPTIONS.includes(input || -1);

  const canSubmit = !custom || (custom && input && input > 0 && input < 500);

  const handleSave = () => {
    input && setSlippage(input);
    setVisible(false);
  };

  return (
    <Dialog open={visible} onOpenChange={() => setVisible(false)}>
      <div
        className="flex flex-row items-center w-max cursor-pointer"
        onClick={() => setVisible(true)}
      >
        <HiAdjustments className="mr-2 w-3 rotate-90" />
        <span className="text-xs"> {slippage / 10} %</span>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h2 className="mb-2 text-lg font-bold text-black">
              Slippage settings
            </h2>
          </DialogTitle>
          <DialogDescription>
            <>
              <div className="bg-white">
                <div className="mt-5 grid w-full grid-cols-3 gap-2">
                  {OPTIONS.map((e) => {
                    return (
                      <Button
                        key={`slippage-option-${e}`}
                        onClick={() => setInput(e)}
                        className=" h-[50px] w-full border border-[#E5E7EB] bg-[#E5E7EB] p-2 font-bold  uppercase rounded-xl"
                        color="primary"
                      >
                        {e / 10}%
                      </Button>
                    );
                  })}
                </div>
                <div className="mt-5">
                  <div
                    className={clsx(
                      'relative',
                      custom && 'bg-gradient-to-r from-green-400 to-blue-500',
                      'h-[50px] rounded-[6px] p-[2px]'
                    )}
                  >
                    <input
                      onChange={(e) =>
                        setInput(10 * parseFloat(e.target.value.trim()))
                      }
                      placeholder="0.00 %"
                      value={(input || 0) / 10}
                      type="number"
                      max={100}
                      min={0}
                      className="bg-neutral h-full w-full rounded-[5px] pr-10 text-right text-lg font-bold focus:outline-none"
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
                      <span className="text-sm text-white">
                        Slippage must be between 0 and 50
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <Button
                onClick={handleSave}
                disabled={!canSubmit}
                className="mt-5 h-[50px] w-full bg-[#E5E7EB] p-2 font-bold uppercase rounded-xl"
                color="primary"
              >
                Save settings
              </Button>
            </>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
