import React, {useEffect, useState} from "react";
import {useParams} from "wouter";
import {getNFTsOfOwner} from "../api/elephant";
import Button from "@mui/material/Button";

export default () => {
  
  const [nfts, setNfts] = useState([]);
  const [filtered, setFiltered] = useState([])
  const {account, count} = useParams();
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState("all");
  
  
  useEffect(() => {
  
    const getNfts = async (address) => {
      setLoading(true)
      const nfts = await getNFTsOfOwner(address);
      
      setNfts(nfts.sort((a,b) => b.traits.score - a.traits.score));
      setFiltered(nfts);
      setLoading(false)
    }
    getNfts(account);
    
    return () => { 
      setNfts([]);
    }
    
  },[account]);
  
  
  useEffect(() => {
    source === "marketplace" && setFiltered(nfts.filter(nft => nft.price > 0));
    source === "all" && setFiltered(nfts);
  }, [source])
  
  
 return <div className="nfts">
   <h3 className="page-title" style={{width: "100%"}}>Total NFTs: {nfts.length || count}
     
     <Button variant={source === "marketplace" ? "contained" : "outlined"}
            size="small"
            sx={{marginRight: "1em", marginLeft: "1em"}} 
       onClick={e => setSource("marketplace")}>Marketplace</Button>
     <Button 
       variant={source === "all" ? "contained" : "outlined"}
            size="small"
            sx={{marginRight: "1em"}} 
       onClick={e => setSource("all")}>All</Button>
   </h3>
   
  
   {loading ? <h3 className="page-title">...Loading NFTs</h3> : filtered.map((nft, index) => 
             <div key={index} className="nft">
               <a href={`https://bnb.nftscan.com/0xb92afeDC8f8618BE4198fbE5d97adB7C60aB3198/${nft.tokenId}`} target="_blank" rel="noreferrer">
             <img  src={nft.image} width="200" /></a>
               <div>color: {nft.colorName}</div>
               <div>hsl: {nft.traits.hue}, {nft.traits.sat}, {nft.traits.lum}</div>
               <div>rarity: {Number(nft.traits.score / 1e18 * 100000).toFixed(3)}</div>
               {nft.price > 0 && <div>price: {nft.price / 1e18} BNB</div>}
               </div>
            )}
 
 </div>
}