import React from "react";
import { formatLargeNumber } from "../api/utils";
import Subscript from "./Subscript";

export default ({
  label,
  amount,
  prefix,
  suffix,
  showUSD,
  bnbPrice,
  className,
  link,
  decimals,
  s
}) => {
  const elem = (
    <h3 className={`page-title ${className || ""}`}>
      <div className={`price-data-label`}>{label}</div>
      {amount < 0.0001 ?  <Subscript value={amount} decimals={7} className="price-data-value"/> : (
        <div className={`price-data-value ${s}`}>
          {prefix}
          {formatLargeNumber(amount, decimals)}
          {suffix}
        </div>
      )}
      {showUSD && bnbPrice && (
        <div className="price-data-label">
          (${formatLargeNumber(amount * bnbPrice, decimals)})
        </div>
      )}
    </h3>
  );

  if (link)
    return (
      <a href={link} target="_blank" rel="noreferrer">
        {elem}
      </a>
    );
  
  
  return elem;
};
