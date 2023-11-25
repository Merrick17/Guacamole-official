export type GuacLock = {
  version: "0.1.0";
  name: "guac_lock";
  instructions: [
    {
      name: "initialize";
      accounts: [
        {
          name: "lockAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "lockAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signerAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "depositAmount";
      accounts: [
        {
          name: "lockAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "lockInfo";
          isMut: true;
          isSigner: false;
        },
        {
          name: "lockAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "creator";
          isMut: true;
          isSigner: false;
          docs: ["CHECK"];
        },
        {
          name: "signerAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signerGuacAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeGuacAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        },
        {
          name: "unlockTime";
          type: "i64";
        }
      ];
    },
    {
      name: "extendAmount";
      accounts: [
        {
          name: "lockAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "lockInfo";
          isMut: true;
          isSigner: false;
        },
        {
          name: "lockAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "creator";
          isMut: true;
          isSigner: false;
          docs: ["CHECK"];
        },
        {
          name: "signerAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signerGuacAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeGuacAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        },
        {
          name: "unlockTime";
          type: "i64";
        },
        {
          name: "guacAmount";
          type: "u64";
        }
      ];
    },
    {
      name: "closePool";
      accounts: [
        {
          name: "lockAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "lockAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signerAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "closeAndWithdraw";
      accounts: [
        {
          name: "lockAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "lockAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signerAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "lockInfo";
          isMut: true;
          isSigner: false;
        },
        {
          name: "creator";
          isMut: true;
          isSigner: false;
          docs: ["CHECK"];
        },
        {
          name: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "extendUnlockTime";
      accounts: [
        {
          name: "lockInfo";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signerGuacAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeGuacAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "unlockTime";
          type: "i64";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "lockerAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "lockedAmount";
            type: "u64";
          },
          {
            name: "mint";
            type: "publicKey";
          },
          {
            name: "creator";
            type: "publicKey";
          }
        ];
      };
    },
    {
      name: "deposit";
      type: {
        kind: "struct";
        fields: [
          {
            name: "lockedAmount";
            type: "u64";
          },
          {
            name: "mint";
            type: "publicKey";
          },
          {
            name: "pool";
            type: "publicKey";
          },
          {
            name: "unlockTime";
            type: "i64";
          },
          {
            name: "owner";
            type: "publicKey";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "AmountIsLessThanMin";
      msg: "Amount is less than minimum";
    },
    {
      code: 6001;
      name: "WrongTimeToUnlock";
      msg: "Too early to withdraw";
    },
    {
      code: 6002;
      name: "CalculationError";
      msg: "Calculation error occurred";
    },
    {
      code: 6003;
      name: "WrongLockTime";
      msg: "Unlock time should be greater than privious time ";
    },
    {
      code: 6004;
      name: "WrongUser";
      msg: "Only the owner of lock can extend or close it";
    }
  ];
};

export const IDL: GuacLock = {
  version: "0.1.0",
  name: "guac_lock",
  instructions: [
    {
      name: "initialize",
      accounts: [
        {
          name: "lockAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lockAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signerAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "depositAmount",
      accounts: [
        {
          name: "lockAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lockInfo",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lockAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "creator",
          isMut: true,
          isSigner: false,
          docs: ["CHECK"],
        },
        {
          name: "signerAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signerGuacAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeGuacAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "unlockTime",
          type: "i64",
        },
      ],
    },
    {
      name: "extendAmount",
      accounts: [
        {
          name: "lockAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lockInfo",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lockAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "creator",
          isMut: true,
          isSigner: false,
          docs: ["CHECK"],
        },
        {
          name: "signerAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signerGuacAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeGuacAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "unlockTime",
          type: "i64",
        },
        {
          name: "guacAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "closePool",
      accounts: [
        {
          name: "lockAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lockAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signerAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "closeAndWithdraw",
      accounts: [
        {
          name: "lockAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lockAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signerAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lockInfo",
          isMut: true,
          isSigner: false,
        },
        {
          name: "creator",
          isMut: true,
          isSigner: false,
          docs: ["CHECK"],
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "extendUnlockTime",
      accounts: [
        {
          name: "lockInfo",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signerGuacAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeGuacAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "unlockTime",
          type: "i64",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "lockerAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "lockedAmount",
            type: "u64",
          },
          {
            name: "mint",
            type: "publicKey",
          },
          {
            name: "creator",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "deposit",
      type: {
        kind: "struct",
        fields: [
          {
            name: "lockedAmount",
            type: "u64",
          },
          {
            name: "mint",
            type: "publicKey",
          },
          {
            name: "pool",
            type: "publicKey",
          },
          {
            name: "unlockTime",
            type: "i64",
          },
          {
            name: "owner",
            type: "publicKey",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "AmountIsLessThanMin",
      msg: "Amount is less than minimum",
    },
    {
      code: 6001,
      name: "WrongTimeToUnlock",
      msg: "Too early to withdraw",
    },
    {
      code: 6002,
      name: "CalculationError",
      msg: "Calculation error occurred",
    },
    {
      code: 6003,
      name: "WrongLockTime",
      msg: "Unlock time should be greater than privious time ",
    },
    {
      code: 6004,
      name: "WrongUser",
      msg: "Only the owner of lock can extend or close it",
    },
  ],
};
