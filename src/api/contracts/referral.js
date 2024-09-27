export const FLOW_REFERRAL = "0x6248d9a3DFF17DcdA92141AA1e8F1E9d6fE1eA4A"
export const ABI_FLOW_REFERRAL = [{
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "participant",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "referrer",
        "type": "address"
    }],
    "name": "onReferralUpdate",
    "type": "event"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_user",
        "type": "address"
    }],
    "name": "hasReferrer",
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
        "name": "_user",
        "type": "address"
    }],
    "name": "isMyReferral",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "myReferrer",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_user",
        "type": "address"
    }],
    "name": "referralCountOf",
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
        "name": "participant",
        "type": "address"
    }],
    "name": "referrerOf",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "referrer",
        "type": "address"
    }],
    "name": "updateReferral",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}]