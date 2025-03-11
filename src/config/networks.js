// src/config/networks.js
export const gravityAlphaMainnet = {
  id: 1625,
  name: 'Gravity Alpha Mainnet',
  network: 'gravity-mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'G',
    symbol: 'G',
  },
  rpcUrls: {
    public: { http: ['https://rpc.gravity.xyz'] },
    default: { http: ['https://rpc.gravity.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.gravity.xyz' },
  },
  contracts: {
    multiSender: {
      address: '0xc96928ECcC15D4Af06f4277D8D291384fB47133a',
      abi: [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor"
        },
        {
          inputs: [],
          name: "InsufficientBalance",
          type: "error"
        },
        {
          inputs: [],
          name: "InvalidAddress",
          type: "error"
        },
        {
          inputs: [],
          name: "InvalidArraySize",
          type: "error"
        },
        {
          inputs: [],
          name: "LengthMismatch",
          type: "error"
        },
        {
          inputs: [],
          name: "NothingToRecover",
          type: "error"
        },
        {
          inputs: [],
          name: "NotOwner",
          type: "error"
        },
        {
          inputs: [],
          name: "TaxTransferFailed",
          type: "error"
        },
        {
          inputs: [],
          name: "TransferFailed",
          type: "error"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256"
            }
          ],
          name: "NativeRecovery",
          type: "event"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256"
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "tax",
              type: "uint256"
            }
          ],
          name: "NativeTransfer",
          type: "event"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "token",
              type: "address"
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256"
            }
          ],
          name: "TokenRecovery",
          type: "event"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "token",
              type: "address"
            },
            {
              indexed: true,
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256"
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "tax",
              type: "uint256"
            }
          ],
          name: "TokenTransfer",
          type: "event"
        },
        {
          inputs: [],
          name: "MAX_BATCH_SIZE",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256"
            }
          ],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [],
          name: "TAX_PERCENTAGE",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256"
            }
          ],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256"
            }
          ],
          name: "calculateTax",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256"
            }
          ],
          stateMutability: "pure",
          type: "function"
        },
        {
          inputs: [
            {
              internalType: "address[]",
              name: "recipients",
              type: "address[]"
            },
            {
              internalType: "uint256[]",
              name: "amounts",
              type: "uint256[]"
            }
          ],
          name: "multiSendNative",
          outputs: [],
          stateMutability: "payable",
          type: "function"
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "token",
              type: "address"
            },
            {
              internalType: "address[]",
              name: "recipients",
              type: "address[]"
            },
            {
              internalType: "uint256[]",
              name: "amounts",
              type: "uint256[]"
            }
          ],
          name: "multiSendToken",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address"
            }
          ],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [],
          name: "recoverEth",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "token",
              type: "address"
            }
          ],
          name: "recoverTokens",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function"
        }
      ]
    }
  },
};