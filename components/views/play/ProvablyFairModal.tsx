import { useGamba, useGambaProgram, useSendTransaction } from "gamba-react-v2";
import { GambaPlatformContext, GambaUi } from "gamba-react-ui-v2";
import React from "react";
import { Modal } from "./Modal";

export function ProvablyFairModal(props: { onClose: () => void }) {
  const gamba = useGamba();
  const platform = React.useContext(GambaPlatformContext);
  const program = useGambaProgram();
  const sendTransaction = useSendTransaction();

  const initialize = async () => {
    sendTransaction(
      program.methods.playerInitialize().accounts({}).instruction()
    );
  };

  return (
    <Modal onClose={() => props.onClose()}>
      <h1 className="text-[17px] font-semibold text-white">Provably Fair</h1>
      {!gamba.userCreated && (
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground">
            Provably Fair allows you to verify that the result of each game was
            randomly generated. Since you are playing from this wallet for the
            first time, you can request the initial hashed seed ahead of time.
            After this it will be done automatically for each play.
          </p>
          <GambaUi.Button main onClick={initialize}>
            Get hashed seed
          </GambaUi.Button>
        </div>
      )}
      {gamba.userCreated && (
        <>
          <p>
            Your client seed will affect the result of the next game you play.
          </p>
          <div
            style={{
              display: "grid",
              gap: "10px",
              width: "100%",
              padding: "20px",
            }}
          >
            <div>Next RNG Seed (sha256)</div>
            <GambaUi.TextInput value={gamba.nextRngSeedHashed} disabled />
            <div>Client Seed</div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <GambaUi.TextInput
                style={{ flexGrow: "1" }}
                value={platform.clientSeed}
                disabled={gamba.isPlaying}
                maxLength={32}
                onChange={platform.setClientSeed}
              />
              <GambaUi.Button
                disabled={gamba.isPlaying}
                onClick={() =>
                  platform.setClientSeed(String((Math.random() * 1e9) | 0))
                }
              >
                Shuffle
              </GambaUi.Button>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}
