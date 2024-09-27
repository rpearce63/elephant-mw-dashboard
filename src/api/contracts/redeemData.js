export const REDEEM_DATA_ADDRESS = "0x7C7990F9049a079d19e31B65Df2A3FCF385A5569";
export const REDEEM_DATA_ABI  = [{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
    }],
    "name": "OwnershipTransferred",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "bool",
        "name": "paused",
        "type": "bool"
    }],
    "name": "RunStatusUpdated",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "addr",
        "type": "address"
    }],
    "name": "WhitelistedAddressAdded",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "addr",
        "type": "address"
    }],
    "name": "WhitelistedAddressRemoved",
    "type": "event"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "addr",
        "type": "address"
    }],
    "name": "addAddressToWhitelist",
    "outputs": [{
        "internalType": "bool",
        "name": "success",
        "type": "bool"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address[]",
        "name": "addrs",
        "type": "address[]"
    }],
    "name": "addAddressesToWhitelist",
    "outputs": [{
        "internalType": "bool",
        "name": "success",
        "type": "bool"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_user",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
    }],
    "name": "addRedeem",
    "outputs": [{
        "internalType": "uint256",
        "name": "jobId",
        "type": "uint256"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "currentRedemptions",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "dequeueJob",
    "outputs": [{
        "internalType": "uint256",
        "name": "jobId",
        "type": "uint256"
    }, {
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "isPaused",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "jobQueue",
    "outputs": [{
        "internalType": "contract Queue",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "name": "jobs",
    "outputs": [{
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "blockNum",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_user",
        "type": "address"
    }],
    "name": "lastRedeem",
    "outputs": [{
        "internalType": "uint256",
        "name": "lastBlock",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "lastTimestamp",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "length",
    "outputs": [{
        "internalType": "uint256",
        "name": "count",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "owner",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "peekJob",
    "outputs": [{
        "internalType": "bool",
        "name": "active",
        "type": "bool"
    }, {
        "internalType": "uint256",
        "name": "jobId",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_user",
        "type": "address"
    }],
    "name": "pending",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_user",
        "type": "address"
    }],
    "name": "position",
    "outputs": [{
        "internalType": "uint256",
        "name": "first",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "pos",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "wait",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_user",
        "type": "address"
    }],
    "name": "ready",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "addr",
        "type": "address"
    }],
    "name": "removeAddressFromWhitelist",
    "outputs": [{
        "internalType": "bool",
        "name": "success",
        "type": "bool"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address[]",
        "name": "addrs",
        "type": "address[]"
    }],
    "name": "removeAddressesFromWhitelist",
    "outputs": [{
        "internalType": "bool",
        "name": "success",
        "type": "bool"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "totalRedeemed",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "bool",
        "name": "paused",
        "type": "bool"
    }],
    "name": "updateRunStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "name": "users",
    "outputs": [{
        "internalType": "uint256",
        "name": "pending",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "total",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "lastBlock",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "lastTimestamp",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "currentJob",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "jobs",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "name": "whitelist",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}]