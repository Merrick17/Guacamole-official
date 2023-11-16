const routes = {
  home: "/",

  trade: {
    root: "/trade",
    bridge: "/trade/bridge",
    perpetuals: "/trade/perpetuals",
    swap: "/trade/swap",
    dca: "/trade/dca",
    limit: "/trade/limit",
    liquidity: "/trade/liquidity",
  },
  earn: {
    root: "/earn",
    explore: "/earn/explore",
    dynamicVault: "/earn/dynamic-vault",
    statistics: "/earn/statistics",
    guacStaking: "/earn/guac-staking",
    liquidityStaking: "/earn/liquidity-staking",
    stakingFarms: "/earn/tokenized-nft-farm",
  },
  play: {
    root: "/play",
    explore: "/play/explore",
    guacamole: "/play/guac-a-mole",
    coinFlip: "/play/flip",
    roulette: "/play/roulette",
    slots: "/play/slots",
    hilo: "/play/hilo",
    mines: "/play/mines",
    dice: "/play/dice",
  },

  tools: {
    root: "/tools",
    explore: "/tools/explore",

    burnNftToken: "/tools/burn-nft-token",
    burnSplToken: "/tools/burn-spl-token",
    tokenMultiSender: "/tools/token-multi-sender",
    emergencySend: "/tools/emergency-send",
    closeTokenAccounts: "/tools/close-token-accounts",
  },

  launch: {
    root: "/launch",
    explore: "/launch/explore",
    createSplToken: "/launch/create-spl-token",
  },
  ecosystem: {
    root: "/ecosystem",
    explore: "/ecosystem/explore",
    createSplToken: "/ecosystem/create-spl-token",
  },
  info: {
    root: "/info",
  },

  inPageLinks: {
    tokenMultiSender: {
      root: "/tools/token-multi-sender",
      csv: "/tools/token-multi-sender-csv",
      tokenToManyWallets: "/tools/token-to-many-wallets",
      emergencySend: "/tools/emergency-send",
    },
  },

  shop: {
    root: "/shop",
  },
  explore: {
    root: "/terminal",
  },
  others: {
    discord: "https://discord.com/invite/guac",
    docs: "https://docs.guacamole.gg/",
  },
};

export default routes;
