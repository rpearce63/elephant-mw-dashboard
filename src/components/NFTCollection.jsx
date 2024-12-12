import React, {useEffect, useState} from "react";
import {useParams} from "wouter";
import {getNFTsOfOwner} from "../api/elephant";

export default () => {
  
  const [nfts, setNfts] = useState([])
  const {account, count} = useParams();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
  
    const getNfts = async (address) => {
      setLoading(true)
      const nfts = await getNFTsOfOwner(address);
      
      setNfts(nfts.sort((a,b) => b.traits.score - a.traits.score));
      setLoading(false)
    }
    getNfts(account);
    
    return () => { 
      setNfts([]);
    }
    
  },[account]);
  
  
  
 return <div className="nfts">
   <h3 className="page-title" style={{width: "100%"}}>Total NFTs: {nfts.length || count}</h3>
   
   {loading ? <h3 className="page-title">...Loading NFTs</h3> : nfts.map((nft, index) => 
             <div key={index} className="nft">
               <a href={`https://bnb.nftscan.com/0xb92afeDC8f8618BE4198fbE5d97adB7C60aB3198/${nft.tokenId}`} target="_blank" rel="noreferrer">
             <img  src={nft.image} width="200" /></a>
               <div>color: {nft.colorName}</div>
               <div>hsl: {nft.traits.hue}, {nft.traits.sat}, {nft.traits.lum}</div>
               <div>rarity: {Number(nft.traits.score / 1e18 * 100000).toFixed(3)}</div>
               {nft.price} && <div>price: {nft.price}</div>
               </div>
            )}
 
 </div>
}