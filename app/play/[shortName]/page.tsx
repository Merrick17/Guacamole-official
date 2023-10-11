"use client";

const GameProvider = dynamic(
  () => import("gamba/react-ui").then((mod) => mod.GameUi.Provider),
  { ssr: false } // Disable SSR for GameProvider
);
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

import { GAMES } from "@/components/games";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/views/play/Modal";
import UserModal from "@/components/views/play/user-modal";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useGamba, useGambaError } from "gamba/react";
import { GameUi, formatLamports } from "gamba/react-ui";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

export default function Page({ params }: { params: { shortName: string } }) {
  const gamba = useGamba();
  const walletModal = useWalletModal();
  const wallet = useWallet();
  const [modal, setModal] = useState(false);
  const { shortName } = params;
  const game = useMemo(
    () => GAMES.find((x) => x.short_name === shortName)!,
    [shortName]
  );

  useGambaError((error) => {
    console.log({ error });
    setModal(true);
  });

  return (
    <>
      {modal && (
        <Modal onClose={() => setModal(false)}>
          <UserModal />
        </Modal>
      )}
      <div className="w-full flex flex-col items-center gap-4">
        <GameProvider game={game}>
          <div className="relative max-w-[512px] min-h-[400px] w-full z-10  bg-foreground rounded-lg ">
            <game.app />
          </div>
          <div className="max-w-[512px]  w-full z-10  bg-foreground rounded-lg min-h-[60px] flex items-center justify-center p-5  flex-wrap  gap-2  backdrop:blur-[50px]">
            <GameUi.ControlView className="w-max  " />
            {wallet.connected ? (
              <Button onClick={() => setModal(true)} className="h-11">
                {formatLamports(gamba.balances.total)}
              </Button>
            ) : (
              <WalletMultiButtonDynamic className="!rounded-lg  h-11 px-3 py-1 font-normal text-sm flex bg-primary text-primary-foreground hover:!bg-primary" />
            )}
            {gamba.balances.user > 1000 && (
              <Button
                className="h-11"
                onClick={() => {
                  gamba.methods.withdraw(gamba.balances.user);
                }}
              >
                Claim
              </Button>
            )}
          </div>
        </GameProvider>
      </div>
    </>
  );
}
