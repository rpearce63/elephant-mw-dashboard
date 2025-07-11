export const STAMPEDE_ADDRESS = "0xF16CD6dE037c65F27Ecac92EdEaF1B37958555C5";
export const STAMPEDE_ABI = [{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "Claim",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "CompoundDeposit",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "Deposit",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "current_balance",
        "type": "uint256"
    }],
    "name": "Migrate",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "NewSponsorship",
    "type": "event"
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
        "indexed": false,
        "internalType": "address",
        "name": "referrer",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "referrer_reward",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "user_reward",
        "type": "uint256"
    }],
    "name": "RewardDistribution",
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
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "new_user",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "current_balance",
        "type": "uint256"
    }],
    "name": "Transfer",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "bool",
        "name": "prev_value",
        "type": "bool"
    }, {
        "indexed": false,
        "internalType": "bool",
        "name": "value",
        "type": "bool"
    }],
    "name": "UpdateEnforceMinimum",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "addr",
        "type": "address"
    }],
    "name": "UpdateFlowData",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "addr",
        "type": "address"
    }],
    "name": "UpdateOracle",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "addr",
        "type": "address"
    }],
    "name": "UpdateRaffle",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "addr",
        "type": "address"
    }],
    "name": "UpdateReferralData",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "addr",
        "type": "address"
    }],
    "name": "UpdateReserve",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "addr",
        "type": "address"
    }],
    "name": "UpdateSponsorData",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "prev_vault",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "address",
        "name": "vault",
        "type": "address"
    }],
    "name": "UpdateVault",
    "type": "event"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_user",
        "type": "address"
    }],
    "name": "available",
    "outputs": [{
        "internalType": "uint256",
        "name": "_limiterRate",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_adjustedAmount",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "backedToken",
    "outputs": [{
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "backedTreasury",
    "outputs": [{
        "internalType": "contract ITreasury",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "claim",
    "outputs": [{
        "internalType": "bool",
        "name": "success",
        "type": "bool"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
    }],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_user",
        "type": "address"
    }],
    "name": "eligibleForMigration",
    "outputs": [{
        "internalType": "bool",
        "name": "eligible",
        "type": "bool"
    }, {
        "internalType": "uint256",
        "name": "deposits",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "payouts",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "last_time",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "enforceMinimum",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getInfo",
    "outputs": [{
        "components": [{
            "internalType": "uint256",
            "name": "total_users",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "total_deposited",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "total_compound_deposited",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "total_claimed",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "total_rewards",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "total_txs",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "current_balance",
            "type": "uint256"
        }],
        "internalType": "struct StampedeGlobals",
        "name": "",
        "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_user",
        "type": "address"
    }],
    "name": "getUser",
    "outputs": [{
        "components": [{
            "internalType": "bool",
            "name": "exists",
            "type": "bool"
        }, {
            "internalType": "uint256",
            "name": "deposits",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "compound_deposits",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "current_balance",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "payouts",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "rewards",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "last_time",
            "type": "uint256"
        }],
        "internalType": "struct StampedeUser",
        "name": "",
        "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "legacyData",
    "outputs": [{
        "internalType": "contract IFlowData",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "maxAvailable",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "maxBalance",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "maxPayouts",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "migrate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "minimumDeposit",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "oracle",
    "outputs": [{
        "internalType": "contract IPcsPeriodicTwapOracle",
        "name": "",
        "type": "address"
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
    "name": "raffle",
    "outputs": [{
        "internalType": "contract IRaffle",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "referenceApr",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "referralData",
    "outputs": [{
        "internalType": "contract IReferralData",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "reserve",
    "outputs": [{
        "internalType": "contract IElephantReserve",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "scaleByPeg",
    "outputs": [{
        "internalType": "uint256",
        "name": "scaledAmount",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_addr",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
    }],
    "name": "sponsor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "sponsorData",
    "outputs": [{
        "internalType": "contract ISponsorData",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_newUser",
        "type": "address"
    }],
    "name": "transfer",
    "outputs": [],
    "stateMutability": "nonpayable",
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
        "name": "_enforceMinimum",
        "type": "bool"
    }],
    "name": "updateEnforceMinimum",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "flowDataAddress",
        "type": "address"
    }],
    "name": "updateFlowData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "oracleAddress",
        "type": "address"
    }],
    "name": "updateOracle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "raffleAddress",
        "type": "address"
    }],
    "name": "updateRaffle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "referralDataAddress",
        "type": "address"
    }],
    "name": "updateReferralData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "reserveAddress",
        "type": "address"
    }],
    "name": "updateReserve",
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
        "name": "sponsorDataAddress",
        "type": "address"
    }],
    "name": "updateSponsorData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_vault",
        "type": "address"
    }],
    "name": "updateStampedeVault",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "vault",
    "outputs": [{
        "internalType": "contract StampedeVault",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}]