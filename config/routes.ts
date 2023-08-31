const routes = {
  home: '/',
  trade: {
    root: '/trade',
    swap: '/trade/swap',
    dca: '/trade/dca',
    limit: '/trade/limit',
    liquidity: '/trade/liquidity',
    bridge: '/trade/bridge',
  },
  earn: {
    root: '/earn',
    explore: '/earn/explore',
    dynamicVault: '/earn/dynamic-vault',
    statistics: '/earn/statistics',
  },
  play: {
    root: '/play',
    explore: '/play/explore',
    guacamole: '/play/guac-a-mole',
    coinFlip: '/play/flip',
    roulette: '/play/roulette',
    slots: '/play/slots',
    hilo: '/play/hilo',
    mines: '/play/mines',
  },

  tools: {
    root: '/tools',
    explore: '/tools/explore',

    burnNftToken: '/tools/burn-nft-token',
    burnSplToken: '/tools/burn-spl-token',
    tokenMultiSender: '/tools/token-multi-sender',
    emergencySend: '/tools/emergency-send',
    closeTokenAccounts: '/tools/close-token-accounts',
  },

  launch: {
    root: '/launch',
    explore: '/launch/explore',
    createSplToken: '/launch/create-spl-token',
  },
  info: {
    root: '/info',
  },

  inPageLinks: {
    tokenMultiSender: {
      root: '/tools/token-multi-sender',
      csv: '/tools/token-multi-sender-csv',
      tokenToManyWallets: '/tools/token-to-many-wallets',
      emergencySend: '/tools/emergency-send',
    },
  },

  others: {
    discord: 'https://discord.com/invite/guac',
    docs: 'https://docs.guacamole.gg/',
  },
};

export default routes;
