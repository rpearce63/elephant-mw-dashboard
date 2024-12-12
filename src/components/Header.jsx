import { useState, useEffect } from "react";
import {
  
  getLPBalances,
  getBtcPrice,
  getSVNNPrice,
  getGNMEPrice,
  getPriceData,
  getSolanaTokenPrices
} from "../api/elephant";
import { formatLargeNumber } from "../api/utils";
import Subscript from "./Subscript";
import SEO from "../seo.json";
import { Link, useLocation } from "wouter";
import PriceData from "./PriceData";

// const BERTHA = "0xAF0980A0f52954777C491166E7F40DB2B6fBb4Fc";

const Header = () => {
  const [emPrice, setEmPrice] = useState(0);
  const [emPriceBusd, setEmPriceBusd] = useState(0);
  const [emPriceBnb, setEmPriceBnb] = useState(0);
  const [trunkPrice, setTrunkPrice] = useState(0);
  const [trumpetPrice, setTrumpetPrice] = useState(0);
  const [berthaBalance, setBerthaBalance] = useState(0);
  const [marketSupply, setMarketSupply] = useState(0);
  const [bnbPrice, setBnbPrice] = useState(0);
  const [lpsBal, setLpsBal] = useState({});
  const [location] = useLocation();
  const [futuresStats, setFuturesStats] = useState({});
  const [trunkTurbineBalance, setTrunkTurbineBalance] = useState(0);
  const [btcTurbineBalance, setBtcTurbineBalance] = useState(0);
  const [rdfBalance, setRdfBalance] = useState(0);
  const [hideData, setHideData] = useState(false);
  const [btcPrice, setBtcPrice] = useState(0);
  const [svnnPrice, setSvnnPrice] = useState(0);
  const [gnmePrice, setGnmePrice] = useState(0);
  const [solanaPrices, setSolanaPrices] = useState({});
  const [trunkTreasuryBalance, setTrunkTreasuryBalance] = useState(0);
  const [trunkSuperchargerBalance, setTrunkSuperchargerBalance] = useState(0);

  const getUpdatedEMPrice = async () => {
    const [
      prices,
      lps,
      btcPrice,
      solanaPrices
    ] = await Promise.all([
      getPriceData(),
      getLPBalances(),
      getBtcPrice(),
      //getSVNNPrice(),
      //getGNMEPrice(),
      getSolanaTokenPrices()
    ]);

    setEmPrice(prices.elephantPriceBNB * prices.bnbPrice);
    setEmPriceBusd(prices.elephantPriceBUSD);
    setEmPriceBnb(prices.elephantPriceBNB);
    setTrunkPrice(prices.trunkPrice);
    setTrumpetPrice(lps.trumpetPrice);
    setBerthaBalance(lps.berthaBalance);
    setMarketSupply(lps.marketSupply);
    setBnbPrice(prices.bnbPrice);
    setLpsBal(lps);
    setFuturesStats(lps.futuresInfo);
    setTrunkTurbineBalance(lps.trunkTurbineBalance);
    setBtcTurbineBalance(lps.btcTurbineBalance);
    setRdfBalance(lps.rdfBalance);
    setBtcPrice(btcPrice);
    // setSvnnPrice(svnnPrice);
    // setGnmePrice(gnmePrice);
    setTrunkSuperchargerBalance(lps.trunkSuperchargerBalance);
    setSolanaPrices(solanaPrices);
  };

  const setNftAlert = () => {
    if (marketSupply > 0) {
      document.title = marketSupply + "✅";
    } else {
      document.title = SEO.title;
    }
  };

  useEffect(() => {
    getUpdatedEMPrice();
    const priceInterval = setInterval(() => {
      getUpdatedEMPrice();
    }, 30000);
    return () => clearInterval(priceInterval);
  }, []);

  const herd =
    1e15 -
    (Number(lpsBal.graveyardBalance) +
      Number(berthaBalance) +
      Number(lpsBal.totalLP_EM));
  const graveyardPct = lpsBal.graveyardBalance / 1e15;

  const formatPct = (decimal) => Number(decimal * 100).toFixed(3);

  return (
    <>
      <header className="App-header">
        <div
          className="white-text data-toggle"
          onClick={() => setHideData(!hideData)}
        >
          {hideData ? "+" : "-"}
        </div>
        <div className="em-prices title-group">
          <h1 className="page-title">
            Elephant Multi-Wallet Dashboard
            {false && setNftAlert()}
          </h1>

          <h1 className="page-title">
            Elephant Price:{" "}
            <span className="white-text small-text">(PCS&nbsp;Pools)</span>
            <div className="price-pair">
              <div>
                <label style={{ fontSize: "smaller" }}>BNB-</label>
                <Subscript value={emPrice} />{" "}
              </div>
              <div>
                <label style={{ fontSize: "smaller" }}>BUSD-</label>
                <Subscript value={emPriceBusd} />
              </div>
            </div>
          </h1>
        </div>

        <div className={`em-data ${hideData && "hide-data"}`}>
          <div className="price-group">
            <PriceData
              label="Trunk"
              amount={trunkPrice}
              decimals={4}
              prefix="$"
              link="https://www.dextools.io/app/en/bnb/pair-explorer/0xf15a72b15fc4caed6fadb1ba7347f6ccd1e0aede?t=1713473206346"
              s={trunkPrice >= 1.0 ? "peg" : ""} 
              />

            <PriceData label="Trumpet" amount={trumpetPrice} suffix="(Trunk)" />

            <PriceData label="BNB" amount={bnbPrice} prefix="$" />
          </div>
          <div className="price-group">
          {true && (
              <PriceData label="SVNN" amount={solanaPrices.svnn} prefix="$" decimals={6} />
          )}
          {true && (
              <PriceData label="GNME" amount={solanaPrices.gnme} prefix="$" decimals={4} link="https://www.dextools.io/app/en/solana/pair-explorer/21BS22VKVDqx8iFW9uqVCByLSDSsrwMJ8Nxp4sjQYCb6?t=1730132013489"/>
          )}
          {true && (
              <PriceData label="DOGAI" amount={solanaPrices.dogai} prefix="$" decimals={5} link="https://www.dextools.io/app/en/token/dogai?t=1730132013489"/>
          )}
          {true && (
              <PriceData label="BTC" amount={btcPrice} prefix="$"  />
          )}
          </div>
          <div className="price-group lp-data">
            <PriceData
              label="LP Elephant"
              amount={lpsBal.totalLP_EM}
              link="https://dune.com/elephantmoney/treasuries-and-liquidity"
            />

            <PriceData
              label="LP BNB"
              amount={lpsBal.totalLP_Bnb}
              link="https://bscscan.com/token/0xe283d0e3b8c102badf5e8166b73e02d96d92f688?a=0x1cea83ec5e48d9157fcae27a19807bef79195ce1#tokenAnalytics"
            />

            <PriceData
              label="LP BUSD"
              amount={lpsBal.totalLP_BUSD}
              link="https://bscscan.com/token/0xe283d0e3b8c102badf5e8166b73e02d96d92f688?a=0x647bc907d520c3f63be38d01dbd979f5606bec48#tokenAnalytics"
            />
          </div>

          <div className="price-group lp-data">
            <PriceData
              label={"Bertha (" + formatPct(berthaBalance / 1e15) + "%)"}
              amount={berthaBalance}
              showUSD
              bnbPrice={emPrice}
              className={berthaBalance / 1e12 >= 200 && "big-bertha"}
              link="https://bscscan.com/token/0xe283d0e3b8c102badf5e8166b73e02d96d92f688?a=0xAF0980A0f52954777C491166E7F40DB2B6fBb4Fc#tokenAnalytics"
            />

            <PriceData
              label={"Herd (" + formatPct(herd / 1e15) + "%)"}
              amount={herd}
              link="https://bscscan.com/token/0xe283d0e3b8c102badf5e8166b73e02d96d92f688#balances"
            />
            <PriceData
              label={"Graveyard (" + formatPct(graveyardPct) + "%)"}
              amount={lpsBal.graveyardBalance}
            />
          </div>
          <div className="price-group lp-data">
            {false && (
              <PriceData
                label="BUSD Treasury"
                amount={lpsBal.busdTreasuryBalance}
                prefix="$"
                link="https://bscscan.com/address/0xCb5a02BB3a38e92E591d323d6824586608cE8cE4"
              />
            )}

            <PriceData
              label="NFTs Minted"
              amount={lpsBal.nftSupply}
              link="https://bscscan.com/address/0x029A8915CB63cBB28dCD1195cE6a00596Bfb606a"
            />

            <PriceData
              label="Trunk Supply"
              amount={lpsBal.trunkSupply}
              link="https://bscscan.com/advanced-filter?tkn=0xdd325C38b12903B727D16961e61333f4871A70E0&txntype=2&fadd=0x0000000000000000000000000000000000000000"
            />
            <PriceData
              label="Trunk Burned"
              amount={lpsBal.trunkBurned}
              link="https://bscscan.com/advanced-filter?tkn=0xdd325C38b12903B727D16961e61333f4871A70E0&txntype=2&tadd=0x0000000000000000000000000000000000000001"
            />
          </div>
          <div className="price-group lp-data">
            {false && (
              <PriceData
                label="NFT Funds (BNB)"
                amount={lpsBal.emDeployerBnbBalance}
                link="https://bscscan.com/address/0x16E76819aC1f0dfBECc48dFE93B198830e0C85EB"
              />
            )}
            {lpsBal.bnbBufferPoolBalance > 0 && (
              <PriceData
                label="Buffer Pool (BNB)"
                amount={lpsBal.bnbBufferPoolBalance}
              />
            )}

            {false && <PriceData
              label="BNB Reserve"
              amount={lpsBal.bnbTreasuryBalance}
              showUSD
              bnbPrice={bnbPrice}
              link="https://bscscan.com/address/0x98F6c7c953Cf4cef0fd632b2509c9e349687FC92#analytics"
            />}

            {false && lpsBal.emOwnedNfts && (
              <PriceData
                label="EM Owned NFTs"
                amount={
                  Number(lpsBal.emOwnedNfts.nftWalletBalance) +
                  Number(lpsBal.emOwnedNfts.nftStakingBalance)
                }
              />
            )}
            {false && (
              <PriceData
                label="Futures Daily Liabilities"
                amount={(futuresStats.current_balance / 1e18) * 0.005}
                prefix="$"
              />
            )}
            {false && (
              <PriceData
                label="Futures Base Daily Yield"
                amount={formatPct(futuresStats.dailyYield / 1e18 / 100)}
                suffix="%"
              />
            )}
          
            {false && <PriceData
              label="Trunk Treasury"
              amount={trunkTreasuryBalance}
              showUSD
              bnbPrice={trunkPrice}
              link="https://bscscan.com/address/0xaCEf13009D7E5701798a0D2c7cc7E07f6937bfDd"
              />}
            
            
            <PriceData
              label="Trunk Turbine"
              amount={trunkTurbineBalance}
              showUSD
              bnbPrice={trunkPrice}
              link="https://bscscan.com/token/0xdd325c38b12903b727d16961e61333f4871a70e0?a=0x6De7dEe23b27a6ABD1b3a1a4C0C40B128620a51d#tokenAnalytics"
            />
            <PriceData
              label="BTC Turbine"
              amount={btcTurbineBalance}
              showUSD
              bnbPrice={btcPrice}
              link="https://bscscan.com/token/0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c?a=0x69C714f868855eC3F24dfff0fd5F1805642F2D86#tokenAnalytics"
            />

            {false && <PriceData
              label="Rainy Day Fund"
              amount={rdfBalance}
              suffix=" BNB"
              showUSD
              bnbPrice={bnbPrice}
              link="https://bscscan.com/address/0xc6a42b74867D1F7049192FfB6d0A9D77696d18bb#analytics"
            />}
          </div>
          <div className="price-group lp-data">

            
            <PriceData
              label="Trunk Supercharger"
              amount={trunkSuperchargerBalance}
              showUSD
              bnbPrice={trunkPrice}
              link="https://bscscan.com/address/0xec8c93d29418b4d3e13edb18cc6dbc24606d7305#code"
              />
          </div>
        </div>
      </header>

      <div className="nav-links">
        {location === "/" || (
          <Link className="nav-link" to="/">
            Dashboard
          </Link>
        )}
        {location === "/emhChart" || (
          <Link className="nav-link" to="/emhChart">
            EMH Chart
          </Link>
        )}

        {location === "/priceChart" || (
          <Link className="nav-link" to="/priceChart">
            Price Charts
          </Link>
        )}

        {marketSupply > 0 && (
          <Link
            className="nav-link"
            to={`/nfts/0xb6C05cfE10c5DaE4Fa8D97F14f0161e978AE42eA/${marketSupply} `}
          >
            NFT Marketplace ({marketSupply})
          </Link>
        )}
      </div>

      <hr />
    </>
  );
};

export default Header;
