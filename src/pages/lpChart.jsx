import React, { useState, useEffect } from "react";
import { getLPBalances, getBnbPrice } from "../api/elephant";
import { formatLargeNumber } from "../api/utils";
import PoolData from "../components/LPTable";

export default () => {
  const [emPrice, setEmPrice] = useState(0);
  const [bnbPooledEm, setBnbPooledEm] = useState(0);
  const [bnbPooled, setBnbPooled] = useState(0);
  const [busdPooledEm, setBusdPooledEm] = useState(0);
  const [busdPooled, setBusdPooled] = useState(0);

  const [bnbPrice, setBnbPrice] = useState(0);

  const getPoolInfo = async () => {
    const lpData = await getLPBalances();
    const bnbPrice = await getBnbPrice();
    const { totalLP_Bnb, totalLP_BUSD, pcsBnb_em, pcsBusd_em } = lpData;
    setBnbPooledEm(Number(pcsBnb_em));
    setBnbPooled(Number(totalLP_Bnb));
    setBusdPooledEm(Number(pcsBusd_em));
    setBusdPooled(Number(totalLP_BUSD));
    setBnbPrice(Number(bnbPrice));
  };

  useEffect(() => {
    getPoolInfo();
    const interval = setInterval(() => getPoolInfo(), 60000);
    return () => clearInterval(interval);
  }, []);
  
  const bnbRatio = bnbPooledEm / (bnbPooledEm + busdPooledEm);
  const busdRatio = busdPooledEm / (bnbPooledEm + busdPooledEm);
  const totalPooledEm = busdPooledEm + bnbPooledEm;
  return (
    <div className="lpCharts">
      <div>
        <div className="chartImages">
        <img  src="https://cdn.glitch.global/10ad345d-6a8c-4191-91aa-f96c3635a8d2/83e7282e-d109-4fee-ac6c-a58d799ea73a.image.png?v=1727454249022" />
        <img src="https://cdn.glitch.global/10ad345d-6a8c-4191-91aa-f96c3635a8d2/651c0f40-2f8c-4d6c-823d-6c2c0aea4eb5.image.png?v=1727454279183"/>
       
        </div>
         <PoolData
          lpData={{
            pool: "BNB",
            pooledElephant: bnbPooledEm,
            pooledAmount: bnbPooled,
          }}
        />
        <PoolData
          lpData={{
            pool: "BUSD",
            pooledElephant: busdPooledEm,
            pooledAmount: busdPooled,
          }}
        />

        <RatioTable bnbRatio={bnbRatio} busdRatio={busdRatio} />

        <div className="lpTable">
          <table>
            <thead>
              <tr>
              <th colSpan="2">Current BNB Price</th>
              </tr>
              
            </thead>
            <tbody>
              <tr>
                <td>BNB</td>
                <td>{Number(bnbPrice).toFixed(3)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="lpTable">
        <table>
          <thead>
            <tr>
            <th>Bailey's Partner Network Address</th>
            </tr>
            
          </thead>
          <tbody>
            <tr>
              <td>
                <a className="white-link" style={{fontSize: "smaller"}} href="https://elephant.money/partner.html?ref=0xdAe463BfF90e9eeC2ECf2A8194A3bEC682762c98" target="_blank" rel="noreferer">https://elephant.money/partner.html?ref=0xdAe463BfF90e9eeC2ECf2A8194A3bEC682762c98</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
      
      

      <div className="priceChart">
        <h2 className="page-title">
          Estimated Future Elephant Token Values By LP Totals
        </h2>
        <table>
          <thead>
            <tr>
              <th>Elephant Tokens in the LPs (Trillions)</th>
              <th>Elephant Tokens in WBNB LP (Trillions)</th>
              <th>Elephant Tokens in BUSD LP (Trillions)</th>
              <th>Price Per Million Elephant Tokens ($)</th>
              <th>Total Elephant PCS Liquidity (Millions $)</th>
            </tr>
          </thead>
          <tbody>
            
            <>
              {(() => {
                const arr = [];
                for (let i = Math.ceil(totalPooledEm / 1e12 / 5) * 5; i >= 5; i -= 5) {
                  arr.push(
                    <TableRow
                      key={i}
                      totalPooledEm={i * 1e12}
                      bnbRatio={bnbRatio}
                      busdRatio={busdRatio}
                      k_bnb={bnbPooledEm * bnbPooled}
                      bnbPrice={bnbPrice}
                    />
                  );
                }
                return arr;
              })()}
            </>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TableRow = (props) => {
  const { totalPooledEm, bnbRatio, busdRatio, k_bnb, bnbPrice } = props;
  const pooledBnbEm = totalPooledEm * bnbRatio;
  const pooledBusdEm = totalPooledEm - pooledBnbEm;
  

  const emPrice =
    (Math.pow((k_bnb / pooledBnbEm) * bnbPrice, 2) / (k_bnb * bnbPrice)) * 1e6;

  const liquidity = (totalPooledEm / 1e6) * emPrice / 1e6 * 2;
  return (
    <tr>
      <td>{Number(totalPooledEm / 1e12).toFixed(0)}</td>
      <td>{Number(pooledBnbEm / 1e12).toFixed(3)}</td>
      <td>{Number(pooledBusdEm / 1e12).toFixed(3)}</td>
      <td>{Number(emPrice).toFixed(4)}</td>
      <td>{Number(liquidity).toFixed(3)}</td>
    </tr>
  );
};

const RatioTable = (props) => {
  return (
    <div className="lpTable">
    <table>
      <thead>
        <tr>
          <th colSpan="2">Pooled Elephant Ratio</th>
        </tr>
        <tr>
          <td>WBNB LP</td>
          <td>BUSD LP</td>
        </tr>
        <tr>
          <td>{Number(props.bnbRatio).toFixed(4)}</td>
          <td>{Number(props.busdRatio).toFixed(4)}</td>
        </tr>
      </thead>
    </table>
    </div>
    
  );
};
