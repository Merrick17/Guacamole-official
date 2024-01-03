"use client";

import { useLockerTools } from "@/context/locker.context";
import { useWallet } from "@solana/wallet-adapter-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

const withAuth = (WrappedComponent) => {
  const { publicKey, connected } = useWallet();
  const { getLockerByAdr } = useLockerTools();
  return (props) => {
    const router = useRouter();
    const params = useParams();
    const fetchPoolData = useCallback(async () => {
      const adr = params["address"] as string;
      const locker = await getLockerByAdr(adr);
      if (locker) {
        if (locker.owner.toBase58() !== publicKey.toBase58()) {
          router.push("/launch/lock");
        }
      }
    }, [connected]);
    useEffect(() => {
      fetchPoolData();
    }, [fetchPoolData]); // Empty dependency array means this effect runs once on mount

    // Pass the props to the wrapped component
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
