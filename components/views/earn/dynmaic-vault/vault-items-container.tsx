"use client";
import Container from "@/components/common/container";
import { cn } from "@/lib/utils";
import DynmaicVaultItem, { DynmaicVaultItemProps } from "./dynmaic-vault-item";
import useVaultInfo from "@/hooks/use-vault-info";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const VaultItemsContainer = () => {
  const { data, isLoading, error } = useVaultInfo();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Container className="flex flex-col gap-4">
      <div className="w-full h-[40px] flex rounded-lg justify-center items-center bg-[#0F0F0F] border-[1px] border-[rgba(168, 168, 168, 0.10)]">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogTitle>
              <span className="text-[#FCFCFC] text-[16px] font-medium">
                Proceed To MarginFi
              </span>
            </DialogTitle>
            <Container className=" p-2 flex gap-3 flex-col min-h-[50px] my-1">
              <p className="text-sm text-muted-foreground">
                You can currently lend and borrow GUAC on platforms like
                MarginFi! We love seeing new third-party integrations and use
                cases for our native token.
              </p>
              <p className="text-sm text-muted-foreground">
                Please note that MarginFi is a third-party platform and has
                their own terms and conditions, programs, and systems. You will
                solely be interacting with MarginFi and Guacamole is not
                responsible for any “detrimental actions.”
              </p>
              <p className="text-sm text-muted-foreground">
                In transparency, by pressing “Open MarginFi” below you will
                access MarginFi using a referral code that benefits our DAO and
                community growth wallets!
              </p>
            </Container>
            <DialogFooter className="border-t-2 py-3 justify-start items-start flex w-full border-[#FFFFF] sm:justify-start md:justify-start">
              <Button
                className="w-[160px] guac-bg"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.open(
                      "https://www.mfi.gg/refer/44ad3297-9ee0-4879-bd05-a7d7e7e333a3",
                      "blank"
                    );
                  }
                }}
              >
                Open MarginFi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>{" "}
        <div className="text-[#A8A8A8] w-full flex items-center justify-center gap-1 text-[16px] pt-0">
          You can now lend and borrow GUAC on MarginFi!{" "}
          <Button
            variant="link"
            className="p-0 text-[#8BD796]"
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            Click Here
          </Button>{" "}
          To Get Started.
        </div>
      </div>
      <Container
        className={cn(
          "grid grid-cols-1 bg-foreground md:grid-cols-2  lg:grid-cols-3 gap-4  !pt-[-10px] "
        )}
      >
        {!isLoading
          ? data &&
            data.length > 0 &&
            data
              .sort((a, b) => {
                return a.long_apy > b.long_apy ? -1 : 1;
              })
              .map((item, index) => (
                <DynmaicVaultItem key={index} item={item} index={index} />
              ))
          : Array.from({ length: 7 }).map((_, index) => (
              <Skeleton
                key={index}
                className="py-4 px-5 border border-transparent bg-background rounded-lg hover:border-primary transition-colors duration-500 ease-in-out text-center w-full min-w-[300px] h-[400px]"
              />
            ))}
      </Container>
    </Container>
  );
};

export default VaultItemsContainer;
