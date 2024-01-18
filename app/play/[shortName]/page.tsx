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

import { GAMES } from "@/components/games-v2";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/views/play/Modal";
import { ProvablyFairModal } from "@/components/views/play/ProvablyFairModal";
import TokenSelect from "@/components/views/play/TokenSelect";
import { useWallet } from "@solana/wallet-adapter-react";
import { GambaUi, useGambaAudioStore, useUserBalance } from "gamba-react-ui-v2";
import { useGamba } from "gamba-react-v2";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import React, { useState } from "react";
function CustomError() {
  return (
    <>
      <GambaUi.Portal target="error">
        <GambaUi.Responsive>
          <h1>😭 Oh no!</h1>
          <p>Something went wrong</p>
        </GambaUi.Responsive>
      </GambaUi.Portal>
    </>
  );
}
function CustomRenderer() {
  const gamba = useGamba();
  const { game } = GambaUi.useGame();
  const [info, setInfo] = React.useState(false);
  const balance = useUserBalance();
  const [provablyFair, setProvablyFair] = React.useState(false);
  const audioStore = useGambaAudioStore();
  const { connected } = useWallet();
  const [modal, setModal] = useState(false);

  return (
    <>
      {info && (
        <Modal onClose={() => setInfo(false)}>
          <div className=" flex justify-center flex-col items-center">
            <h1 className="h-[17px]">{game.meta.name}</h1>
            <p className="text-muted-foreground">{game.meta.description}</p>
          </div>
        </Modal>
      )}
      {provablyFair && (
        <ProvablyFairModal onClose={() => setProvablyFair(false)} />
      )}
      <div className="w-full flex flex-col items-center gap-4">
        <div className="relative max-w-[512px] min-h-[400px] w-full z-10 flex items-center justify-center bg-foreground rounded-lg shadow-md border-[1px] border-[rgba(168, 168, 168, 0.10)] ">
          <GambaUi.PortalTarget target="error" />
          <GambaUi.PortalTarget target="screen" />
          {/* <SettingControls>
            <button onClick={() => audioStore.set((audioStore.masterGain + .25) % 1.25)}>
              Volume: {audioStore.masterGain * 100}%
            </button>
          </SettingControls> */}
        </div>

        {/* <LoadingIndicator key={Number(gamba.isPlaying)} $active={gamba.isPlaying} /> */}
        <div
          className="max-w-[512px]  w-full z-10  bg-foreground rounded-lg min-h-[60px] flex items-center justify-center p-5   gap-2  backdrop:blur-[50px] shadow-md border-[1px] border-[rgba(168, 168, 168, 0.10)]"
          id="gamba-controls"
        >
          <div className="flex items-center justify-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setInfo(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <path
                  d="M8.00064 15.1663C11.6825 15.1663 14.6673 12.1816 14.6673 8.49967C14.6673 4.81777 11.6825 1.83301 8.00064 1.83301C4.31874 1.83301 1.33398 4.81777 1.33398 8.49967C1.33398 12.1816 4.31874 15.1663 8.00064 15.1663Z"
                  stroke="white"
                />
                <path
                  d="M6.75 6.41699C6.75 5.72663 7.30966 5.16699 8 5.16699C8.69034 5.16699 9.25 5.72663 9.25 6.41699C9.25 6.87529 9.00334 7.27599 8.6356 7.49359C8.31866 7.68105 8 7.96545 8 8.33365V9.16699"
                  stroke="white"
                  stroke-linecap="round"
                />
                <path
                  d="M7.99967 11.8333C8.36787 11.8333 8.66635 11.5349 8.66635 11.1667C8.66635 10.7985 8.36787 10.5 7.99967 10.5C7.63149 10.5 7.33301 10.7985 7.33301 11.1667C7.33301 11.5349 7.63149 11.8333 7.99967 11.8333Z"
                  fill="white"
                />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setProvablyFair(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <path
                  d="M14.7598 6.74367L13.2768 3.53263C13.385 3.43459 13.4716 3.31519 13.5311 3.18197C13.5907 3.04873 13.6219 2.90461 13.6229 2.75869C13.6219 2.52187 13.5404 2.2924 13.3917 2.10804C13.243 1.92368 13.0359 1.7954 12.8045 1.7443C12.5731 1.6932 12.3313 1.72231 12.1186 1.82687C11.906 1.93142 11.7353 2.10518 11.6346 2.31956L4.13771 4.22423C3.95279 4.06525 3.71707 3.97763 3.47315 3.97723C3.26153 3.97579 3.05453 4.03905 2.87987 4.15849C2.70523 4.27795 2.57131 4.44789 2.49601 4.64555C2.42073 4.84319 2.40769 5.05917 2.45865 5.26443C2.50961 5.46971 2.62211 5.65453 2.78113 5.79407L1.25977 9.08745L5.68105 9.07097L4.16517 5.77761C4.32671 5.63287 4.43821 5.44071 4.48375 5.22871L7.19143 4.54261V12.9736H7.13649L3.47867 14.1099C3.36165 14.1469 3.25937 14.2199 3.18639 14.3184C3.11339 14.417 3.07345 14.5361 3.07221 14.6587V14.6972C3.06747 14.7743 3.07909 14.8516 3.10633 14.924C3.13355 14.9964 3.17577 15.0622 3.23021 15.1171C3.28463 15.1721 3.35009 15.2149 3.42223 15.2428C3.49443 15.2706 3.57165 15.283 3.64891 15.279H12.3761C12.4529 15.2829 12.5296 15.2707 12.6014 15.2432C12.6731 15.2156 12.7383 15.1733 12.7927 15.119C12.847 15.0646 12.8893 14.9995 12.9169 14.9278C12.9445 14.8561 12.9567 14.7794 12.9528 14.7026V14.6587C12.952 14.5368 12.9128 14.4182 12.8409 14.3197C12.7689 14.2212 12.6678 14.1478 12.5519 14.1099L8.89951 12.9736H8.83909V4.19133L11.761 3.41737L11.8708 3.53263L10.3824 6.75465C10.7111 6.75465 14.4585 6.74367 14.7598 6.74367ZM2.16599 9.08745L3.47315 6.25515L4.76217 9.07483L2.16599 9.08745ZM12.6013 3.99371L13.8755 6.73817H11.3106L12.6013 3.99371Z"
                  fill="white"
                />
                <path
                  d="M6.46047 8.98047C6.46047 10.6373 5.12183 11.9805 3.47047 11.9805C1.81914 11.9805 0.480469 10.6373 0.480469 8.98047C3.77715 8.98055 3.08715 8.98047 6.46047 8.98047Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.47047 11.1805C4.40015 11.1805 5.19471 10.5999 5.51367 9.78047C4.75123 9.78047 4.26441 9.78047 3.85059 9.78047C3.15651 9.78051 2.66755 9.78051 1.42729 9.78047C1.74626 10.5999 2.54081 11.1805 3.47047 11.1805ZM0.587957 9.78047C0.517899 9.52579 0.480469 9.25751 0.480469 8.98047C0.776439 8.98047 1.04028 8.98047 1.2778 8.98047C2.63247 8.98051 3.13143 8.98051 3.85529 8.98047C4.29459 8.98047 4.81669 8.98047 5.66313 8.98047C5.90141 8.98047 6.16541 8.98047 6.46047 8.98047V8.98155C6.46039 9.25819 6.42295 9.52611 6.35299 9.78047C6.00407 11.0489 4.84571 11.9805 3.47047 11.9805C2.09527 11.9805 0.936891 11.0489 0.587957 9.78047Z"
                  fill="white"
                />
                <path
                  d="M15.3999 6.71973C15.3999 8.36557 14.0612 9.69973 12.4099 9.69973C10.7586 9.69973 9.41992 8.36557 9.41992 6.71973C12.7166 6.71981 12.0266 6.71973 15.3999 6.71973Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.4099 8.90507C13.3396 8.90507 14.1342 8.32841 14.4531 7.51439C13.6906 7.51439 13.2039 7.51443 12.79 7.51443C12.0959 7.51443 11.607 7.51443 10.3667 7.51443C10.6857 8.32841 11.4802 8.90507 12.4099 8.90507ZM9.5274 7.51439C9.45736 7.26141 9.41992 6.99493 9.41992 6.71973C9.7159 6.71973 9.97972 6.71977 10.2173 6.71977C11.5719 6.71977 12.0709 6.71977 12.7948 6.71977C13.234 6.71977 13.7561 6.71973 14.6026 6.71973C14.8409 6.71973 15.1048 6.71973 15.3999 6.71973V6.72081C15.3998 6.99563 15.3624 7.26173 15.2924 7.51439C14.9435 8.77443 13.7851 9.69973 12.4099 9.69973C11.0347 9.69973 9.87632 8.77443 9.5274 7.51439Z"
                  fill="white"
                />
              </svg>
            </Button>
          
          </div>
          <GambaUi.PortalTarget target="controls" />

          {balance.bonusBalance > 1000 && (
            <Button
              className="h-11"
              onClick={() => {
                // gamba.methods.withdraw(gamba.balances.user);
              }}
            >
              Claim
            </Button>
          )}

          <GambaUi.PortalTarget target="play" />
        </div>
        <TokenSelect />
      </div>
    </>
  );
}

export default function Page({ params }: { params: { shortName: string } }) {
  const { shortName } = useParams();
  const game = GAMES.find((x) => x.id === shortName);

  return (
    <>
      {game ? (
        <GambaUi.Game
          game={game}
          errorFallback={<CustomError />}
          children={<CustomRenderer />}
        />
      ) : (
        <h1>Game not found! 👎</h1>
      )}
    </>
  );
  // const gamba = useGamba();
  // const walletModal = useWalletModal();
  // const wallet = useWallet();
  // const [modal, setModal] = useState(false);
  // const { shortName } = params;
  // const game = useMemo(
  //   () => GAMES.find((x) => x.id === shortName)!,
  //   [shortName]
  // );

  // useGambaError((error) => {
  //   console.log({ error });
  //   setModal(true);
  // });

  // return (
  //   <>
  //     {modal && (
  //       <Modal onClose={() => setModal(false)}>
  //         <UserModal />
  //       </Modal>
  //     )}
  //     <div className="w-full flex flex-col items-center gap-4">
  //       <GameProvider game={game}>
  //         <div className="relative max-w-[512px] min-h-[400px] w-full z-10  bg-foreground rounded-lg shadow-md border-[1px] border-[rgba(168, 168, 168, 0.10)] ">
  //           <game.app />
  //         </div>
  //         <div className="max-w-[512px]  w-full z-10  bg-foreground rounded-lg min-h-[60px] flex items-center justify-center p-5  flex-wrap  gap-2  backdrop:blur-[50px] shadow-md border-[1px] border-[rgba(168, 168, 168, 0.10)]">
  //           <GameUi.ControlView className="w-max  shadow-md border-[1px] border-[rgba(168, 168, 168, 0.10)]" />
  //           {wallet.connected ? (
  //             <Button onClick={() => setModal(true)} className="h-11">
  //               {formatLamports(gamba.balances.total)}
  //             </Button>
  //           ) : (
  //             <WalletMultiButtonDynamic className="!rounded-lg  h-11 px-3 py-1 font-normal text-sm flex bg-primary text-primary-foreground hover:!bg-primary" />
  //           )}
  //           {gamba.balances.user > 1000 && (
  //             <Button
  //               className="h-11"
  //               onClick={() => {
  //                 gamba.methods.withdraw(gamba.balances.user);
  //               }}
  //             >
  //               Claim
  //             </Button>
  //           )}
  //         </div>
  //       </GameProvider>
  //     </div>
  //   </>
  // );
}
