export const CA_NFT_TRAITS = "0x4D8c5882110909505fAA8407d168A7B7A0eb9EfF";
export const ABI_NFT_TRAITS = [
  {
    inputs: [{ internalType: "address", name: "_nft", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "estimatedSupply",
        type: "uint256",
      },
    ],
    name: "ProcessedSupply",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rare",
        type: "uint256",
      },
      { indexed: false, internalType: "uint256", name: "hue", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "sat", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "lum", type: "uint256" },
    ],
    name: "TokenAddition",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "enum ElephantNFTTraitTracker.Trait",
        name: "trait",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
    ],
    name: "TraitCountUpdate",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "batchSize", type: "uint256" }],
    name: "add",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getInfo",
    outputs: [
      { internalType: "uint256", name: "rare", type: "uint256" },
      { internalType: "uint256", name: "hue", type: "uint256" },
      { internalType: "uint256", name: "sat", type: "uint256" },
      { internalType: "uint256", name: "lum", type: "uint256" },
      { internalType: "uint256", name: "score", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "start", type: "uint256" },
      { internalType: "uint256", name: "end", type: "uint256" },
    ],
    name: "getScores",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "score", type: "uint256" },
        ],
        internalType: "struct ElephantNFTRarityScore[]",
        name: "scores",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "isAdded",
    outputs: [{ internalType: "bool", name: "added", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nft",
    outputs: [
      { internalType: "contract IERC721Enumerable", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

