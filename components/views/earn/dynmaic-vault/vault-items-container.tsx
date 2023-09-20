"use client";
import Container from "@/components/common/container";
import { cn } from "@/lib/utils";
import DynmaicVaultItem, { DynmaicVaultItemProps } from "./dynmaic-vault-item";
import useVaultInfo from "@/hooks/use-vault-info";
import { useEffect } from "react";

const VaultItemsContainer = () => {
  const { data, isLoading, error } = useVaultInfo();
  console.log("Data", {
    isLoading,
    error,
    data,
  });
  useEffect(() => {}, [isLoading]);
  return (
    <Container
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  p-0"
      )}
    >
      {!isLoading &&
        data &&
        data.length > 0 &&
        data.map((item, index) => <DynmaicVaultItem key={index} item={item} />)}
    </Container>
  );
};

export default VaultItemsContainer;

const dynamicVaultsData: DynmaicVaultItemProps[] = [
  {
    title: "SOL Vault",
    image: "/icons/earn/sol.svg",
    walletBalance: "313 SOL",
    yourDeposit: "1.45 SOL",
    VirtualPrice: "1.04203564",
    TVL: "$755.07k",
    estimatedAPY: "3.13",
  },
  {
    title: "SOL Vault",
    image: "/icons/earn/sol.svg",
    walletBalance: "313 SOL",
    yourDeposit: "1.45 SOL",
    VirtualPrice: "1.04203564",
    TVL: "$755.07k",
    estimatedAPY: "3.13",
  },
  {
    title: "SOL Vault",
    image: "/icons/earn/sol.svg",
    walletBalance: "313 SOL",
    yourDeposit: "1.45 SOL",
    VirtualPrice: "1.04203564",
    TVL: "$755.07k",
    estimatedAPY: "3.13",
  },
  {
    title: "SOL Vault",
    image: "/icons/earn/sol.svg",
    walletBalance: "313 SOL",
    yourDeposit: "1.45 SOL",
    VirtualPrice: "1.04203564",
    TVL: "$755.07k",
    estimatedAPY: "3.13",
  },
  {
    title: "SOL Vault",
    image: "/icons/earn/sol.svg",
    walletBalance: "313 SOL",
    yourDeposit: "1.45 SOL",
    VirtualPrice: "1.04203564",
    TVL: "$755.07k",
    estimatedAPY: "3.13",
  },
  {
    title: "SOL Vault",
    image: "/icons/earn/sol.svg",
    walletBalance: "313 SOL",
    yourDeposit: "1.45 SOL",
    VirtualPrice: "1.04203564",
    TVL: "$755.07k",
    estimatedAPY: "3.13",
  },
];
