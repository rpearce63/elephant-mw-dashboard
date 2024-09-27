import Web3 from "web3";

import { MULTI_CALL_ABI, MULTI_CALL_ADDR } from "./contracts/multicall.js";

const rpc_node =
  "https://bsc-dataseed1.binance.org/";
const web3 = new Web3(rpc_node);

const multicall = new web3.eth.Contract(MULTI_CALL_ABI, MULTI_CALL_ADDR);

// const getSimpleFunctionCall = (contract, address, functionName) => ({
//   target: contract.options.address,
//   allowFailure: true,
//   callData: contract.methods[functionName](address).encodeABI(),
// });

export const buildFunctionCall = ([contract, functionData]) => ({
  target: contract.options.address,
  allowFailure: true,
  callData: functionData.encodeABI(),
});

export const getMulticallResult = async (callData) => await multicall.methods.aggregate(callData).call();


export const decodeReturnData = (functionData, returnData) =>{

 const data =  Object.fromEntries(
    Object.entries(
      web3.eth.abi.decodeParameters(functionData._method.outputs, returnData)
    )
  );
  
  return data.__length__ === 1 ? data[0] : data;
}

export const decodeAllReturnDataRaw = (calls, returnData) => returnData.map((data, index) => decodeReturnData(calls[index][1], data))

export const multicallBatch = async calls => {
  const callData = calls.map((call) => buildFunctionCall(call));
  const results = await getMulticallResult(callData);
  return decodeAllReturnDataRaw(calls, results.returnData);
}