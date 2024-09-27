export const SPONSOR_READER_ADDRESS = "0x708115E21b72eab22De31458b7B3A791c45813D2";
export const ABI_SPONSOR_READER = [{
    "inputs": [{
        "internalType": "address",
        "name": "_user",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
    }],
    "name": "add",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_user",
        "type": "address"
    }],
    "name": "settle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "total_sponsored",
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
    "name": "users",
    "outputs": [{
        "internalType": "uint256",
        "name": "_pending",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_total",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}]
