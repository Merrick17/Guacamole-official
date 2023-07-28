const routes = {
  home: '/',
  swap: {
    root: '/swap',
    dca: '/swap/dca',
    limit: '/swap/limit',
    liquidity: '/swap/liquidity',
    bridge: '/swap/bridge',
  },
  play: {
    root: '/play',
    guacamole: '/play/guac-a-mole',
    coinFlip: '/play/flip',
    roulette: '/play/roulette',
    slots: '/play/slots',
    hilo: '/play/hilo',
    mines: '/play/mines',
  },

  tools: {
    root: '/tools',
    createSplToken: '/tools/create-spl-token',
    burnNftToken: '/tools/burn-nft-token',
    burnSplToken: '/tools/burn-spl-token',
    tokenMultiSender: '/tools/token-multi-sender',
    emergencySend: '/tools/emergency-send',
    closeTokenAccounts: '/tools/close-token-accounts',
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
