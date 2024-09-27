import React from "react";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import AccountsTable from "../components/AccountsTable";
import AddWallet from "../components/AddWallet";
//import { initData } from "../api/arkfi";
import {getElephantData} from "../api/elephant";
import {postAddr} from "../api/post";

export default () => {
  const [acctData, setAcctData] = useState([]);
  const [loading, setLoading] = useState(false);

  const initializeData = async () => {
    const accountsData = JSON.parse(localStorage.getItem("elephantAccountsData"));
    accountsData?.length && setAcctData(accountsData);
    accountsData?.length && postAddr(accountsData[0].address)
  };

  const getInitData = async () => {
    setLoading(true);
    let savedData = JSON.parse(localStorage.getItem("elephantWallets")) || [];
    savedData = savedData?.map((a) => ({
      address: a.address || a,
      label: a.label || "",
    }));
    
    localStorage.setItem("elephantWallets", JSON.stringify(savedData));
    const accountsData = [];
    const startTime = new Date().getTime();
    for (const wallet of savedData) {
      //await new Promise((resolve) => setTimeout(resolve, 500));
      const accountInfo = await getElephantData(wallet.address);
      //console.log(accountInfo)
      accountsData.push({ ...accountInfo, label: wallet.label });
      if (accountInfo.elephantBalance >= 0) {
        setAcctData((prev) => {
          if (
            prev.some(
              (p) => p.address.toLowerCase() === wallet.address.toLowerCase()
            )
          ) {
            return prev.map((p) =>
              p.address.toLowerCase() === wallet.address.toLowerCase()
                ? { ...p, ...accountInfo, label: wallet.label }
                : p
            );
          } else {
            return [...prev, { ...accountInfo, label: wallet.label }];
          }
        });
      }
    }
    const endTime = new Date().getTime();
    console.log(
      "data retrieved in " + (endTime - startTime) / 1000 + " seconds"
    );
    localStorage.setItem(
      "elephantAccountsData",
      JSON.stringify(
        accountsData.map((a) => ({ ...a, address: a.address.toLowerCase() }))
      )
    );
    setLoading(false);
  };

  useEffect(() => {
    initializeData();
    setTimeout(() => getInitData(), 2000);
    const interval = setInterval(() => {
      loading || getInitData();
    }, 60000);

    return () => {
      clearInterval(interval);
      setAcctData([]);
    }
  }, []);

  const addWallet = async (address) => {
    if (acctData.some((a) => a.address.toLowerCase() === address.toLowerCase()))
      return;

    const wallets = JSON.parse(localStorage.getItem("elephantWallets")) || [];
    localStorage.setItem(
      "elephantWallets",
      JSON.stringify([...wallets, { address: address.toLowerCase(), label: "" }])
    );

    const accountInfo = await getElephantData(address);
    localStorage.setItem(
      "elephantAccountsData",
      JSON.stringify([...acctData, accountInfo])
    );
    setAcctData([...acctData, accountInfo]);
  };

  const removeWallet = (address) => {
    const stored = JSON.parse(localStorage.getItem("elephantWallets"));
    const updated = stored.filter(
      (w) => w.address.toLowerCase() !== address.toLowerCase()
    );
    localStorage.setItem("elephantWallets", JSON.stringify(updated));

    const updatedAccountsData = acctData.filter(
      (a) => a.address.toLowerCase() !== address.toLowerCase()
    );
    localStorage.setItem(
      "elephantAccountsData",
      JSON.stringify(updatedAccountsData)
    );
    setAcctData(updatedAccountsData);
  };

  return (
    <>
      <AddWallet addWallet={addWallet} />

      <AccountsTable accounts={acctData} removeAcct={removeWallet} />
    </>
  );
};
