"use client";

const GameProvider = dynamic(
  () => import("gamba/react-ui").then((mod) => mod.GameUi.Provider),
  { ssr: false } // Disable SSR for GameProvider
);

import { GAMES } from "@/components/games";
import { Modal } from "@/components/views/play/Modal";
import UserModal from "@/components/views/play/user-modal";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useGamba, useGambaError } from "gamba/react";
import { GameUi, formatLamports, } from "gamba/react-ui";
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
          <div className="max-w-[512px]  w-full z-10  bg-foreground rounded-lg min-h-[60px]">
            <GameUi.ControlView className="w-full p-5 flex flex-wrap items-center gap-1 justify-evenly rounded-lg backdrop:blur-[50px]" />
            {wallet.connected ? (
              <button onClick={() => setModal(true)}>
                {formatLamports(gamba.balances.total)}
              </button>
            ) : (
              <button onClick={() => walletModal.setVisible(true)}>
                Connect!
              </button>
            )}
          </div>
        </GameProvider>
      </div>
    </>
  );
}
