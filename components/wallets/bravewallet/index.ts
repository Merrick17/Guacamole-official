/* tslint:disable-next-line */
import type {
  EventEmitter,
  SendTransactionOptions,
  WalletName,
} from "@solana/wallet-adapter-base";
import {
  BaseMessageSignerWalletAdapter,
  isVersionedTransaction,
  scopePollingDetectionStrategy,
  WalletAccountError,
  WalletConnectionError,
  WalletDisconnectedError,
  WalletDisconnectionError,
  WalletError,
  WalletNotConnectedError,
  WalletNotReadyError,
  WalletPublicKeyError,
  WalletReadyState,
  WalletSendTransactionError,
  WalletSignMessageError,
  WalletSignTransactionError,
} from "@solana/wallet-adapter-base";
import type {
  Connection,
  SendOptions,
  Transaction,
  TransactionSignature,
  VersionedTransaction,
} from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";

interface BraveWalletEvents {
  connect(...args: unknown[]): unknown;
  disconnect(...args: unknown[]): unknown;
  accountChanged(newPublicKey: PublicKey): unknown;
}

interface BraveWallet extends EventEmitter<BraveWalletEvents> {
  isBraveWallet?: boolean;
  publicKey?: { toBytes(): Uint8Array };
  isConnected: boolean;
  signTransaction<T extends Transaction | VersionedTransaction>(
    transaction: T
  ): Promise<T>;
  signAllTransactions<T extends Transaction | VersionedTransaction>(
    transactions: T[]
  ): Promise<T[]>;
  signAndSendTransaction<T extends Transaction | VersionedTransaction>(
    transaction: T,
    options?: SendOptions
  ): Promise<{ signature: TransactionSignature }>;
  signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

interface BraveWalletWindow extends Window {
  braveSolana?: BraveWallet;
}

declare const window: BraveWalletWindow;

export interface BraveWalletAdapterConfig {}

export const BraveWalletName = "Brave Wallet" as WalletName<"Brave Wallet">;

export class BraveWalletAdapter extends BaseMessageSignerWalletAdapter {
  name = BraveWalletName;
  url = "https://brave.com/";
  icon =
    "data:image/webp;base64,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";
  readonly supportedTransactionVersions = null;

  private _connecting: boolean;
  private _wallet: BraveWallet | null;
  private _publicKey: PublicKey | null;
  private _readyState: WalletReadyState =
    typeof window === "undefined" || typeof document === "undefined"
      ? WalletReadyState.Unsupported
      : WalletReadyState.NotDetected;

  constructor(config: BraveWalletAdapterConfig = {}) {
    super();
    this._connecting = false;
    this._wallet = null;
    this._publicKey = null;

    if (this._readyState !== WalletReadyState.Unsupported) {
      scopePollingDetectionStrategy(() => {
        if (window.braveSolana?.isBraveWallet) {
          this._readyState = WalletReadyState.Installed;
          this.emit("readyStateChange", this._readyState);
          return true;
        }
        return false;
      });
    }
  }

  get publicKey() {
    return this._publicKey;
  }

  get connecting() {
    return this._connecting;
  }

  get connected() {
    return !!this._wallet?.isConnected;
  }

  get readyState() {
    return this._readyState;
  }

  async autoConnect(): Promise<void> {
    // Skip autoconnect in the Loadable state
    // We can't redirect to a universal link without user input
    if (this.readyState === WalletReadyState.Installed) {
      await this.connect();
    }
  }

  async connect(): Promise<void> {
    try {
      if (this.connected || this.connecting) return;

      if (this.readyState !== WalletReadyState.Installed)
        throw new WalletNotReadyError();

      this._connecting = true;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const wallet = window.braveSolana;

      if (!wallet.isConnected) {
        try {
          await wallet.connect();
        } catch (error: any) {
          throw new WalletConnectionError(error?.message, error);
        }
      }

      if (!wallet.publicKey) throw new WalletAccountError();

      let publicKey: PublicKey;
      try {
        publicKey = new PublicKey(wallet.publicKey.toBytes());
      } catch (error: any) {
        throw new WalletPublicKeyError(error?.message, error);
      }

      wallet.on("disconnect", this._disconnected);
      wallet.on("accountChanged", this._accountChanged);

      this._wallet = wallet;
      this._publicKey = publicKey;

      this.emit("connect", publicKey);
    } catch (error: any) {
      this.emit("error", error);
      throw error;
    } finally {
      this._connecting = false;
    }
  }

  async disconnect(): Promise<void> {
    const wallet = this._wallet;
    if (wallet) {
      wallet.off("disconnect", this._disconnected);
      wallet.off("accountChanged", this._accountChanged);

      this._wallet = null;
      this._publicKey = null;

      try {
        await wallet.disconnect();
      } catch (error: any) {
        this.emit("error", new WalletDisconnectionError(error?.message, error));
      }
    }

    this.emit("disconnect");
  }

  async sendTransaction<T extends Transaction | VersionedTransaction>(
    transaction: T,
    connection: Connection,
    options: SendTransactionOptions = {}
  ): Promise<TransactionSignature> {
    try {
      const wallet = this._wallet;
      if (!wallet) throw new WalletNotConnectedError();

      try {
        const { signers, ...sendOptions } = options;

        if (isVersionedTransaction(transaction)) {
          signers?.length && transaction.sign(signers);
        } else {
          transaction = (await this.prepareTransaction(
            transaction,
            connection,
            sendOptions
          )) as T;
          signers?.length &&
            (transaction as Transaction).partialSign(...signers);
        }

        sendOptions.preflightCommitment =
          sendOptions.preflightCommitment || connection.commitment;

        const { signature } = await wallet.signAndSendTransaction(
          transaction,
          sendOptions
        );
        return signature;
      } catch (error: any) {
        if (error instanceof WalletError) throw error;
        throw new WalletSendTransactionError(error?.message, error);
      }
    } catch (error: any) {
      this.emit("error", error);
      throw error;
    }
  }

  async signTransaction<T extends Transaction | VersionedTransaction>(
    transaction: T
  ): Promise<T> {
    try {
      const wallet = this._wallet;
      if (!wallet) throw new WalletNotConnectedError();

      try {
        return (await wallet.signTransaction(transaction)) || transaction;
      } catch (error: any) {
        throw new WalletSignTransactionError(error?.message, error);
      }
    } catch (error: any) {
      this.emit("error", error);
      throw error;
    }
  }

  async signAllTransactions<T extends Transaction | VersionedTransaction>(
    transactions: T[]
  ): Promise<T[]> {
    try {
      const wallet = this._wallet;
      if (!wallet) throw new WalletNotConnectedError();

      try {
        return (await wallet.signAllTransactions(transactions)) || transactions;
      } catch (error: any) {
        throw new WalletSignTransactionError(error?.message, error);
      }
    } catch (error: any) {
      this.emit("error", error);
      throw error;
    }
  }

  async signMessage(message: Uint8Array): Promise<Uint8Array> {
    try {
      const wallet = this._wallet;
      if (!wallet) throw new WalletNotConnectedError();

      try {
        const { signature } = await wallet.signMessage(message);
        return signature;
      } catch (error: any) {
        throw new WalletSignMessageError(error?.message, error);
      }
    } catch (error: any) {
      this.emit("error", error);
      throw error;
    }
  }

  private _disconnected = () => {
    const wallet = this._wallet;
    if (wallet) {
      wallet.off("disconnect", this._disconnected);
      wallet.off("accountChanged", this._accountChanged);

      this._wallet = null;
      this._publicKey = null;

      this.emit("error", new WalletDisconnectedError());
      this.emit("disconnect");
    }
  };

  private _accountChanged = (newPublicKey: PublicKey) => {
    const publicKey = this._publicKey;
    if (!publicKey) return;

    try {
      newPublicKey = new PublicKey(newPublicKey.toBytes());
    } catch (error: any) {
      this.emit("error", new WalletPublicKeyError(error?.message, error));
      return;
    }

    if (publicKey.equals(newPublicKey)) return;

    this._publicKey = newPublicKey;
    this.emit("connect", newPublicKey);
  };
}
