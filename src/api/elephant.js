import Web3 from "web3";
import axios from "axios";
import {
  buildFunctionCall,
  getMulticallResult,
  decodeReturnData,
  // decodeAllReturnDataRaw,
  multicallBatch
} from "./multicall";
import { MULTI_CALL_ABI, MULTI_CALL_ADDR } from "./contracts/multicall.js";
import { EM_TOKEN_ADDRESS, EM_TOKEN_ABI } from "./contracts/elephantToken.js";
import { FUTURES_ADDRESS, FUTURES_ABI } from "./contracts/futuresEngine.js";
import { TRUNK_ADDRESS, TRUNK_ABI } from "./contracts/trunk.js";
import { TRUMPET_ADDRESS, TRUMPET_ABI } from "./contracts/trumpet.js";
import { NFT_ADDRESS, NFT_ABI } from "./contracts/unlimitedNft.js";
import {
  NFT_STAKING_ADDRESS,
  NFT_STAKING_ABI,
} from "./contracts/nftStaking.js";
import {
  REDEEM_DATA_ADDRESS,
  REDEEM_DATA_ABI,
} from "./contracts/redeemData.js";
import {
  FLOW_ENGINE_ADDRESS,
  FLOW_ENGINE_ABI,
} from "./contracts/flowEngine.js";
import { STAMPEDE_ADDRESS, STAMPEDE_ABI } from "./contracts/stampede.js";
import { UNIROUTER_ADDRESS, ABI_UNIROUTER } from "./contracts/uniRouter.js";
import {
  ABI_SPONSOR_READER,
  SPONSOR_READER_ADDRESS,
} from "./contracts/sponsor.js";
import { ABI_FLOW_REFERRAL, FLOW_REFERRAL } from "./contracts/referral.js";
import {
  ABI_NFT_MARKETPLACE,
  NFT_MARKETPLACE_ADDR,
} from "./contracts/nftMarketplace.js";
import { ABI_Raffle, CA_Raffle } from "./contracts/raffle.js";
import {
  ABI_CHAINLINK_FEED,
  BNB_EACAggregatorProxy,
  BigMath,
} from "./contracts/chainLinkFeed";
import { ABI_NFT_TRAITS, CA_NFT_TRAITS } from "./contracts/nftTraitTracker";
import {
  ABI_FUTURES_ACTION,
  CA_FUTURES_ACTION,
} from "./contracts/futuresAction";

import ERC20 from "./contracts/erc20ABI.json";
import { ABI_TRUNK_TURBINE, CA_TRUNK_TURBINE } from "./contracts/trunkTurbine";
import { ABI_BTC_TURBINE, CA_BTC_TURBINE } from "./contracts/btcTurbine";
import { ABI_RDF, CA_RDF } from "./contracts/rainyDayFund";

const WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
const BUSD = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
const EM_BNB = "0x1CEa83EC5E48D9157fCAe27a19807BeF79195Ce1";
const EM_BUSD = "0x647bc907d520C3f63bE38d01DBd979f5606beC48";
const BUSD_TREASURY = "0xCb5a02BB3a38e92E591d323d6824586608cE8cE4";
const BUSD_BUFFER_POOL = "0xd9dE89efB084FfF7900Eac23F2A991894500Ec3E";
const BNB_TREASURY = "0x98F6c7c953Cf4cef0fd632b2509c9e349687FC92";
const ELEPHANT_DEPLOYER = "0x16E76819aC1f0dfBECc48dFE93B198830e0C85EB";
const BTCB = "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c";
const USDC = "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d";
const TRUNK_TREASURY = "0xaCEf13009D7E5701798a0D2c7cc7E07f6937bfDd";
const TRUNK_SUPERCHARGER = "0xec8c93d29418b4D3E13EdB18cc6dBc24606D7305";
const BERTHA = "0xAF0980A0f52954777C491166E7F40DB2B6fBb4Fc";
const TRUNK_BURN = "0x0000000000000000000000000000000000000001";
const EM_GRAVEYARD = "0xF7cC784BD260eafC1193D337fFcEA4D6ddA0dd71";
//New Bertha with BNB when BT switches to BNB
//const BNB_TREASURY = "0x98F6c7c953Cf4cef0fd632b2509c9e349687FC92"
import { contractBscBUSD } from "./vars";
import { hslToColorName } from "./utils";
const rpc_node = "https://bsc-dataseed1.binance.org/";
//const rpc_node =
//"https://bsc-mainnet.core.chainstack.com/04e5204e2463ad9f5a0296f04d72c7bf";
const web3 = new Web3(rpc_node);

const emContract = new web3.eth.Contract(EM_TOKEN_ABI, EM_TOKEN_ADDRESS);
const futuresContract = new web3.eth.Contract(FUTURES_ABI, FUTURES_ADDRESS);
const futuresAction = new web3.eth.Contract(
  ABI_FUTURES_ACTION,
  CA_FUTURES_ACTION
);

const trunkContract = new web3.eth.Contract(TRUNK_ABI, TRUNK_ADDRESS);
const trumpetContract = new web3.eth.Contract(TRUMPET_ABI, TRUMPET_ADDRESS);
const nftContract = new web3.eth.Contract(NFT_ABI, NFT_ADDRESS);
const nftStakingContract = new web3.eth.Contract(
  NFT_STAKING_ABI,
  NFT_STAKING_ADDRESS
);
const redeemDataContract = new web3.eth.Contract(
  REDEEM_DATA_ABI,
  REDEEM_DATA_ADDRESS
);
const flowEngineContract = new web3.eth.Contract(
  FLOW_ENGINE_ABI,
  FLOW_ENGINE_ADDRESS
);
const stampedeContract = new web3.eth.Contract(STAMPEDE_ABI, STAMPEDE_ADDRESS);
const routerContract = new web3.eth.Contract(ABI_UNIROUTER, UNIROUTER_ADDRESS);
const sponsorReader = new web3.eth.Contract(
  ABI_SPONSOR_READER,
  SPONSOR_READER_ADDRESS
);
const referrals = new web3.eth.Contract(ABI_FLOW_REFERRAL, FLOW_REFERRAL);
const nftMarketplace = new web3.eth.Contract(
  ABI_NFT_MARKETPLACE,
  NFT_MARKETPLACE_ADDR
);
const wbnbContract = new web3.eth.Contract(ERC20, WBNB);
const busdContract = new web3.eth.Contract(ERC20, BUSD);
const usdcContract = new web3.eth.Contract(ERC20, USDC);
const raffleContract = new web3.eth.Contract(ABI_Raffle, CA_Raffle);
const chainlinkFeedBNB = new web3.eth.Contract(
  ABI_CHAINLINK_FEED,
  BNB_EACAggregatorProxy
);
const nftTracker = new web3.eth.Contract(ABI_NFT_TRAITS, CA_NFT_TRAITS);
const trunkTurbine = new web3.eth.Contract(ABI_TRUNK_TURBINE, CA_TRUNK_TURBINE);
const btcTurbine = new web3.eth.Contract(ABI_BTC_TURBINE, CA_BTC_TURBINE);

const multicall = new web3.eth.Contract(MULTI_CALL_ABI, MULTI_CALL_ADDR);

const getFunctionCall = (contract, address, functionName) => ({
  target: contract.options.address,
  allowFailure: true,
  callData: address
    ? contract.methods[functionName](address).encodeABI()
    : contract.methods[functionName]().encodeABI(),
});

const toBN = web3.utils.toBN;
const fromWei = web3.utils.fromWei;
export const getRaffleStats = async (address) => {
  const participants = await raffleContract.methods
    .participants(address)
    .call();
  const currentRound = await raffleContract.methods.round().call();
  return { round: participants.round, currentRound };
};

export const getProtocolData = async () => {
  const allCalls = [
    [emContract, emContract.methods.balanceOf(EM_BNB)],
    [wbnbContract, wbnbContract.methods.balanceOf(EM_BNB)],
    [emContract, emContract.methods.balanceOf(EM_BUSD)],
    [busdContract, busdContract.methods.balanceOf(EM_BUSD)],
    [multicall, multicall.methods.getEthBalance(BNB_TREASURY)],
    [trunkContract, trunkContract.methods.totalSupply()],
    [nftContract, nftContract.methods.totalSupply()],
    [emContract, emContract.methods.balanceOf(EM_GRAVEYARD)],
    [trunkContract, trunkContract.methods.balanceOf(TRUNK_BURN)],
    [emContract, emContract.methods.balanceOf(BERTHA)],
    [trunkTurbine, trunkTurbine.methods.balanceUnderlying()],
    [btcTurbine, btcTurbine.methods.balanceUnderlying()],
    [multicall, multicall.methods.getEthBalance(CA_RDF)],
    [trunkContract, trunkContract.methods.balanceOf(TRUNK_SUPERCHARGER)],
    [futuresContract, futuresContract.methods.getInfo()],
    [futuresContract, futuresContract.methods.scaleByPeg(toBN(0.5e18))],
    [trumpetContract, trumpetContract.methods.calculatePrice()],
    [nftMarketplace, nftMarketplace.methods.totalSupply()],
  ];
  //const callData = allCalls.map((call) => buildFunctionCall(call));
  //const results = await getMulticallResult(callData);
  const [
    pcsBnb_em,
    pcsBnb_bnb,
    pcsBusd_em,
    pcsBusd_Busd,
    bnbTreasuryBalance,
    trunkSupply,
    nftSupply,
    graveyardBalance,
    trunkBalance,
    berthaBalance,
    trunkTurbineBalance,
    btcTurbineBalance,
    rdfBalance,
    trunkSuperchargerBalance,
    futuresInfo,
    dailyYield,
    trumpetPrice,
    marketSupply,
  ] = await multicallBatch(allCalls)

  const totalEM = toBN(pcsBnb_em).add(toBN(pcsBusd_em)).toString();
  return {
    totalLP_EM: web3.utils.fromWei(totalEM, "gwei"),
    totalLP_Bnb: fromWei(pcsBnb_bnb),
    totalLP_BUSD: fromWei(pcsBusd_Busd),
    pcsBnb_em: fromWei(pcsBnb_em, "gwei"),
    pcsBusd_em: fromWei(pcsBusd_em, "gwei"),
    graveyardBalance: fromWei(toBN(graveyardBalance), "gwei"),
    bnbTreasuryBalance: fromWei(toBN(bnbTreasuryBalance)),
    trunkSupply: fromWei(trunkSupply),
    nftSupply,
    trunkBurned: fromWei(toBN(trunkBalance)),
    berthaBalance: fromWei(berthaBalance, "gwei"),
    trunkTurbineBalance: fromWei(trunkTurbineBalance),
    btcTurbineBalance: fromWei(btcTurbineBalance),
    rdfBalance: fromWei(rdfBalance),
    trunkSuperchargerBalance: fromWei(trunkSuperchargerBalance),
    futuresInfo: { ...futuresInfo, dailyYield },
    trumpetPrice: fromWei(trumpetPrice),
    marketSupply,
  };
};

export const getLPBalances = async () => {
  const data = await getProtocolData();
  return data;
};

export const getEMBalance = async (address) => {
  const _balance = await emContract.methods.balanceOf(address).call();
  const elephantBalance = web3.utils.fromWei(_balance, "gwei");
  //console.log("Elephant: ", Number(balance / 10e8).toLocaleString() + "B");
  //const elephantPrice = await getElephantPrice();
  return { elephantBalance };
};

export const processFuturesData = (_user, _available, _uncapped, _depositAPR, futuresActions) => {
  
  const user = _user;
  const futuresAvailable = web3.utils.fromWei(_available._adjustedAmount);
  const futuresRemainingCooldown = _available._remainingCooldown;
  const futuresAvailableUncapped = web3.utils.fromWei(
    _uncapped._adjustedAmount
  );
  const limiterRate = _available._limiterRate;
  const futuresCurrentBalance = web3.utils.fromWei(user.current_balance);
  const futuresDeposits = web3.utils.fromWei(user.deposits);
  const futuresCompoundDeposits = web3.utils.fromWei(user.compound_deposits);
  const futuresPayouts = web3.utils.fromWei(user.payouts);
  const futuresLastTx = user.last_time * 1000;
  const futuresElapsed =
    (new Date().getTime() - Number(futuresLastTx)) / 1000 / 60 / 60 / 24;
  const futuresLastAction = user.exists
    ? futuresActions.last_deposit === user.last_time
      ? "D"
      : futuresActions.last_claim === user.last_time
      ? "X"
      : "?"
    : "";
  const futuresLastActionLong = futuresLastAction === "D" ? "Deposit" : "Claim";
  const depositAPR = web3.utils.fromWei(_depositAPR);

  return {
    futuresCurrentBalance,
    futuresAvailable,
    futuresAvailableUncapped,
    futuresDeposits,
    futuresCompoundDeposits,
    futuresPayouts,
    futuresRemainingCooldown,
    futuresLastTx,
    futuresElapsed,
    futuresLastAction,
    futuresLastActionLong,
    depositAPR,
    futuresUser: _user.exists,
    limiterRate,
  };
};

export const getFuturesStats = async () => {
  // const stats = await futuresContract.methods.getInfo().call();
  const dailyYield = await futuresContract.methods
    .scaleByPeg(toBN(0.5e18))
    .call();
  // const {
  //   total_users,
  //   total_deposited,
  //   total_compound_deposited,
  //   total_claimed,
  //   total_rewards,
  //   total_txs,
  //   current_balance,
  // } = stats;
  return { dailyYield };
};

export const getTrunkTurbineBalance = async () => {
  const balance = await trunkTurbine.methods.balanceUnderlying().call();
  return web3.utils.fromWei(balance);
};

export const getBtcTurbineBalance = async () => {
  const balance = await btcTurbine.methods.balanceUnderlying().call();
  return web3.utils.fromWei(balance);
};

export const getRainyDayFundBalance = async () => {
  const balance = await getBnbBalance(CA_RDF);
  return balance;
};

export const getTrunkTreasuryBalance = async () => {
  const balance = await getTrunkBalance(TRUNK_TREASURY);
  return balance.trunkBalance;
};

export const getTrunkSuperchargerBalance = async () => {
  const balance = await getTrunkBalance(TRUNK_SUPERCHARGER);
  return balance.trunkBalance;
};
export const getUserRdfData = async (address) => {
  const { _userAvailable, _eligible_claim, _remainingCooldown, _last_claim } =
    await futuresContract.methods.maxUserAvailableRDF(address).call();
  return web3.utils.fromWei(_userAvailable) * 0.95;
};

export const nftMarketSupply = async () => {
  const marketSupply = await nftMarketplace.methods.totalSupply().call();
  return Number(marketSupply);
};

export const getTrunkBalance = async (address) => {
  const _balance = await trunkContract.methods.balanceOf(address).call();
  const trunkBalance = web3.utils.fromWei(_balance);
  //console.log("Trunk: ", Number(balance).toLocaleString());
  return { trunkBalance };
};

export const getTrumpetBalance = async (address) => {
  const [_balance, _value] = await Promise.all([
    trumpetContract.methods.balanceOf(address).call(),
    trumpetContract.methods.getValueOfHoldings(address).call(),
  ]);
  const trumpetBalance = web3.utils.fromWei(_balance);
  const trumpetValue = web3.utils.fromWei(_value);
  //console.log("Trumpet: ", Number(balance).toLocaleString());
  //console.log("Trumpet value: ", Number(value).toLocaleString(), " Trunk");
  return { trumpetBalance, trumpetValue };
};

export const getNFTPrice = async () => {
  const price = await nftContract.methods.price().call();
  return price / 1e18;
};

export const processNftDataForUser = (nftWalletBalance, nftStakingBalance, _rewards, totalRewards) => {
  
  const nftRewards = web3.utils.fromWei(_rewards, "gwei");
  const nftTotalRewards = web3.utils.fromWei(totalRewards, "gwei");

  return {
    nftWalletBalance: nftWalletBalance,
    nftStakingBalance: nftStakingBalance,
    nftRewards,
    nftTotalRewards,
  };
};

export const getNFTsOfOwner = async (address) => {
  const [walletNFTs, stakedNFTs] = await Promise.allSettled([
    nftContract.methods.tokensOfOwner(address).call(),
    nftStakingContract.methods.tokensOfOwner(address).call(),
  ]);
  const held = walletNFTs.value || [];
  const staked = stakedNFTs.value || [];
  const tokenIds = [...held, ...staked];

  const calls = [];
  tokenIds.forEach((tokenId) =>
    calls.push(
      [nftContract, nftContract.methods.tokenURI(tokenId)],
      [nftTracker, nftTracker.methods.getInfo(tokenId)]
    )
  );

  const callData = calls.map((data) => buildFunctionCall(data));
  const results = await getMulticallResult(callData);
  const pairs = [];
  const chunkSize = 2;
  const returnData = results.returnData;
  for (let i = 0; i < returnData.length; i += chunkSize) {
    const chunk = returnData.slice(i, i + chunkSize);
    pairs.push(chunk);
  }

  const uris = pairs.map((pair, index) => getNftData(pair, tokenIds[index]));
  // const uriReq = tokenIds.map(
  //   (tokenId) => getNftData(tokenId)
  //   //nftContract.methods.tokenURI(tokenId).call()
  // );

  //const uris = await Promise.all(uriReq);
  // const tokenUris = uris.map((uri) => {
  //   let tokenJSON = atob(uri.split(",")[1]);
  //   let tokenObj = JSON.parse(tokenJSON);
  //   //console.log(tokenObj.attributes.find(a => a.trait_type === "id").value)
  //   return tokenObj;
  // });

  //getNftData(tokenIds[0])
  return uris;
};

const getNftData = ([uriData, traitsData], tokenId) => {
  // const [uri, traits] = await Promise.all([
  //   nftContract.methods.tokenURI(tokenId).call(),
  //   nftTracker.methods.getInfo(tokenId).call(),
  // ]);
  const uri = decodeReturnData(
    nftContract.methods.tokenURI(tokenId),
    uriData
  );
  const traits = decodeReturnData(
    nftTracker.methods.getInfo(tokenId),
    traitsData
  );
  let tokenJSON = atob(uri.split(",")[1]);
  let tokenObj = JSON.parse(tokenJSON);
  tokenObj.traits = traits;
  tokenObj.colorName = hslToColorName(traits.hue, traits.sat, traits.lum);
  tokenObj.tokenId = tokenId;
  return tokenObj;
};

export const getNftTraits = async (tokenId) => {
  const traits = await nftTracker.methods.getInfo(tokenId).call();
  console.log(traits);
};

// export const getRedemptionQueue = async (address) => {
//   const [_pending, redeemLength, redeemPos] = await Promise.all([
//     redeemDataContract.methods.pending(address).call(),
//     redeemDataContract.methods.length().call(),
//     redeemDataContract.methods.position(address).call(),
//     //redeemDataContract.methods.currentRedemptions().call()
//   ]);
//   const redeemPending = web3.utils.fromWei(_pending);
//   //console.log("current redemptions: ", currentRedemptions / 1e18);
//   return { redeemPending, redeemLength, redeemPos: redeemPos.wait };
// };

// export const getStampedeStats = async (address) => {
//   const [user, _available] = await Promise.all([
//     stampedeContract.methods.getUser(address).call(),
//     stampedeContract.methods.available(address).call(),
//   ]);
//   const stampedeBalance = web3.utils.fromWei(user.current_balance);
//   const stampedeAvailable = web3.utils.fromWei(_available._adjustedAmount);
//   const stampedeRewards = web3.utils.fromWei(user.rewards);
//   // console.log(
//   //   `Stampede - Balance: ${Number(
//   //     balance
//   //   ).toLocaleString()} Available: ${Number(available).toLocaleString()}`
//   // );
//   return { stampedeBalance, stampedeAvailable, stampedeRewards };
// };

export const getPriceData = async () => {
  const calls = [
    [chainlinkFeedBNB, chainlinkFeedBNB.methods.latestRoundData()], //round
    [chainlinkFeedBNB, chainlinkFeedBNB.methods.decimals()], //decimals
    [
      routerContract,
      routerContract.methods.getAmountsOut(web3.utils.toBN(1e9), [
        EM_TOKEN_ADDRESS,
        WBNB,
      ]),
    ], // elephantPriceBNB
    [
      routerContract,
      routerContract.methods.getAmountsOut(web3.utils.toBN(1e9), [
        EM_TOKEN_ADDRESS,
        BUSD,
      ]),
    ], // elephantPriceBUSD
    [
      routerContract,
      routerContract.methods.getAmountsOut(web3.utils.toBN(1e18), [
        TRUNK_ADDRESS,
        BUSD,
      ]),
    ], //trunkPrice
    //[routerContract, routerContract.methods.getAmountsOut(web3.utils.toBN(1e18), [BTCB, BUSD])], //btcPrice
    [trumpetContract, trumpetContract.methods.calculatePrice()], //trumpetPrice
    [nftContract, nftContract.methods.price()],
    [futuresContract, futuresContract.methods.scaleByPeg(toBN(0.5e18))],
    [emContract, emContract.methods.balanceOf(BERTHA)]
  ];
  // const callData = calls.map((call) => buildFunctionCall(call));
  // const results = await getMulticallResult(callData);
  const [
    round,
    decimals,
    elephantPriceBNB,
    elephantPriceBUSD,
    trunkPrice,
    trumpetPrice,
    nftPrice,
     dailyYield ,
    berthaBalance
  ] = await multicallBatch(calls);
  const wbnbPrice = Number(
    (BigInt(round["answer"]) * BigInt(1e18)) / 10n ** BigInt(decimals)
  ).toFixed(0);

  const prices = {
    bnbPrice: fromWei(wbnbPrice),
    elephantPriceBNB: fromWei(elephantPriceBNB[1]),
    elephantPriceBUSD: fromWei(elephantPriceBUSD[1]),
    trunkPrice: fromWei(trunkPrice[1]),
    //btcPrice: fromWei(btcPrice.amounts[1]),
    trumpetPrice: fromWei(trumpetPrice),
    nftPrice: fromWei(nftPrice),
    dailyYield: dailyYield,
    berthaBalance: fromWei(berthaBalance, "gwei")
  };
  return prices;
};

const getWBNBPrice = async (amount) => {
  let round = await chainlinkFeedBNB.methods.latestRoundData().call();
  let decimals = BigInt(await chainlinkFeedBNB.methods.decimals().call());
  return Number(
    (BigInt(round["answer"]) * BigInt(amount)) / 10n ** decimals
  ).toFixed(0);
};

export const getElephantPrice = async (amount = 1e9) => {
  let result = await routerContract.methods
    .getAmountsOut(web3.utils.toBN(amount), [EM_TOKEN_ADDRESS, WBNB])
    .call();
  const _price = await getWBNBPrice(result[1]);

  const price = web3.utils.fromWei(_price);
  //console.log("em price in bnb: ", price)
  //console.log("Price: ", Number(price * 10e5).toLocaleString() + "/M");
  return price;
};

export const getElephantPrices = async (amount = 1e9) => {
  const prices = await getPriceData();
  return {
    price: prices.elephantPriceBNB * prices.bnbPrice,
    priceBusd: prices.elephantPriceBUSD,
    priceBnb: prices.elephantPriceBNB,
  };
  //   let result = await routerContract.methods
  //     .getAmountsOut(web3.utils.toBN(amount), [EM_TOKEN_ADDRESS, WBNB, BUSD])
  //     .call();
  //   //console.log(result)
  //   const _price = await getWBNBPrice(result[1]);
  //   const price = web3.utils.fromWei(_price);

  //   const _priceBnb = result[1];
  //   const priceBnb = web3.utils.fromWei(_priceBnb);

  //   let resultBusd = await routerContract.methods
  //     .getAmountsOut(web3.utils.toBN(amount), [EM_TOKEN_ADDRESS, BUSD])
  //     .call();
  //   //console.log(resultBusd)
  //   const _priceBusd = resultBusd[1];
  //   const priceBusd = web3.utils.fromWei(_priceBusd);
  //   //console.log(price, priceBusd, priceBnb)
  //   return { price, priceBusd, priceBnb };
};

export const getTrunkPrice = async (amount = 1e18) => {
  let result = await routerContract.methods
    .getAmountsOut(web3.utils.toBN(amount), [TRUNK_ADDRESS, BUSD])
    .call();

  const _price = result[1];
  const price = web3.utils.fromWei(_price);

  return price;
};

export const getBtcPrice = async (amount = 1e9) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
      { retry: 2, retryDelay: 1000 }
    );
    //.then((response) => response.json())
    const btcPrice = response.data.bitcoin.usd;
    return btcPrice;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export const getTrumpetPrice = async () => {
  const price = await trumpetContract.methods.calculatePrice().call();
  return web3.utils.fromWei(price);
};

export const getBnbPrice = async (amount = 1e18) => {
  // let result = await routerContract.methods
  //   .getAmountsOut(web3.utils.toBN(amount), [WBNB, BUSD])
  //   .call();

  const _price = await getWBNBPrice(amount);
  const price = web3.utils.fromWei(_price);

  return price;
};

const getBnbBalance = async (address) => {
  try {
    var _val = await web3.eth.getBalance(address);
    _val = web3.utils.fromWei(_val);
    return Number(_val).toFixed(2);
  } catch (error) {
    console.log(error);
    return 0;
  }
};

const getBusdBalance = async (address) => {
  try {
    var _val = await contractBscBUSD.methods.balanceOf(address).call();
    _val = web3.utils.fromWei(_val);
    // const busdBalance = Number(_val);
    return Number(_val).toFixed(2);
  } catch (error) {
    console.log(error);
    return 0;
  }
};

const getUsdcBalance = async (address) => {
  try {
    var _val = await usdcContract.methods.balanceOf(address).call();
    _val = web3.utils.fromWei(_val);
    // const busdBalance = Number(_val);
    return Number(_val).toFixed(2);
  } catch (error) {
    console.log(error);
    return 0;
  }
};

const getAirdrops = async (address) => {
  const airdropStats = await sponsorReader.methods.users(address).call();
  const pendingAirdrops = web3.utils.fromWei(airdropStats._pending);
  const totalAirdrops = web3.utils.fromWei(airdropStats._total);
  return { pendingAirdrops, totalAirdrops };
};

const getReferrer = async (address) => {
  const referrer = await referrals.methods.referrerOf(address).call();
  return referrer;
};

export const getSVNNPrice = async () => {
  const options = {
    method: "GET",
    headers: { "X-API-KEY": "9fef66ede66c4bd7afb4c02b80ce769a" },
  };
  try {
    const response = await axios.get(
      "https://api.dexscreener.com/latest/dex/tokens/DbM7mcJM9zitHanzKmFf7NH4SaEZZDCf5TPEgzwTmuh4"
    );
    const price = response.data.pairs[0].priceUsd;

    
    return price;
  } catch (err) {
    console.log(err);
        const response = await axios.get('https://public-api.birdeye.so/defi/price?address=DbM7mcJM9zitHanzKmFf7NH4SaEZZDCf5TPEgzwTmuh4', options);
    const price = response.data.data.value;
    return price;
  }
};

export const calculateStrategy = (
  emPrice,
  emHeld,
  futuresBal,
  nfts,
  nftPrice,
  trumpetValue,
  trumpetPrice,
  trunkPrice
) => {
  const emValue = emHeld * emPrice;
  const nftValue = nftPrice * nfts;
  const trunkValue = trumpetValue * trunkPrice;
  const totalInvested =
    Number(emValue) +
    Number(nftValue) +
    Number(futuresBal) +
    Number(trunkValue);
  const emPct = emValue / totalInvested;
  const futuresPct = futuresBal / totalInvested;
  const nftPct = nftValue / totalInvested;
  const trunkPct = trunkValue / totalInvested;

  //return (`E: ${Number(emPct * 100).toFixed(1)}%, F: ${Number(futuresPct * 100).toFixed(1)}%, N: ${Number(nftPct * 100).toFixed(1)}%`)
  return `${Math.round(emPct * 100)}/${Math.round(
    futuresPct * 100
  )}/${Math.round(nftPct * 100)}/${Math.round(trunkPct * 100)}`;
};

export const calculateTotalValue = (
  emPrice,
  emHeld,
  futuresBal,
  nfts,
  nftPrice,
  trumpetValue,
  trumpetPrice,
  trunkPrice,
  trunkBalance
) => {
  const emValue = emHeld * emPrice;
  const nftValue = nftPrice * nfts;
  const trunkValue =
    Number(trumpetValue * trunkPrice) + Number(trunkBalance * trunkPrice);
  const totalInvested =
    Number(emValue) +
    Number(nftValue) +
    Number(futuresBal) +
    Number(trunkValue);

  return Number(totalInvested);
};

export const getElephantData = async (address) => {
  const calls = [
    [emContract, emContract.methods.balanceOf(address)],
    [trunkContract, trunkContract.methods.balanceOf(address)],
    [trumpetContract, trumpetContract.methods.balanceOf(address)],
    [trumpetContract, trumpetContract.methods.getValueOfHoldings(address)],
    [multicall, multicall.methods.getEthBalance(address)],
    [busdContract, busdContract.methods.balanceOf(address)],
    [usdcContract, usdcContract.methods.balanceOf(address)],
    [futuresContract, futuresContract.methods.maxUserAvailableRDF(address)],
    [futuresContract, futuresContract.methods.getUser(address)],
    [futuresContract, futuresContract.methods.available(address)],
    [futuresContract, futuresContract.methods.availableUncapped(address)],
    [futuresContract, futuresContract.methods.depositAPR(address)],
    [futuresAction, futuresAction.methods.getUser(address)],
    [nftContract, nftContract.methods.balanceOf(address)],
    [nftStakingContract, nftStakingContract.methods.balanceOf(address)],
    [nftStakingContract, nftStakingContract.methods.rewardsOf(address)],
    [nftStakingContract, nftStakingContract.methods.totalRewardsOf(address)],
  ];
  //const callData = calls.map((call) => buildFunctionCall(call));
  //const results = await getMulticallResult(callData);
  const [
    elephant,
    trunk,
    trumpet,
    trumpetValue,
    bnbBalance,
    busdBalance,
    usdcBalance,
    rdf,
    _user, _available, _uncapped, _depositAPR, futuresActions,
    nftWalletBalance, nftStakingBalance, _rewards, totalRewards
  ] = await multicallBatch(calls);
  
  const futures = processFuturesData(_user, _available, _uncapped, _depositAPR, futuresActions);
  const nft = processNftDataForUser(nftWalletBalance, nftStakingBalance, _rewards, totalRewards);

  const userStats = {
    address,
    elephantBalance: fromWei(elephant, "gwei"),
    ...futures,
    trunkBalance: fromWei(trunk),
    trumpetBalance: fromWei(trumpet),
    trumpetValue: fromWei(trumpetValue),
    ...nft,
    bnbBalance: fromWei(bnbBalance),
    busdBalance: fromWei(busdBalance),
    rdfAvailable: fromWei(rdf._userAvailable) * 0.95,
    rdfRemainingCooldown: rdf._remainingCooldown,
    usdcBalance: fromWei(usdcBalance),
    
    
  };
  return userStats;
};
