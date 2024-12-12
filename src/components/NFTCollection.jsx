import React, {useEffect, useState} from "react";
import {useParams} from "wouter";
import {getNFTsOfOwner} from "../api/elephant";
import Button from "@mui/material/Button";

export default () => {
  
  const [nfts, setNfts] = useState([]);
  const [filtered, setFiltered] = useState([])
  const {account, count, location} = useParams();
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState();
  
  
  useEffect(() => {
  
    const getNfts = async (address) => {
      setLoading(true);
      
      const nfts = await getNFTsOfOwner(address);
      
      setNfts(nfts.sort((a,b) => b.traits.score - a.traits.score));
      setSource(location);
      filterNFTs();
      
      setLoading(false)
    }
    getNfts(account);
    
    return () => { 
      setNfts([]);
    }
    
  },[account]);
  
  
  useEffect(() => {
   filterNFTs();
  }, [source])
  
  const filterNFTs = () => {
     source === "marketplace" && setFiltered(nfts.filter(nft => nft.owner === "marketplace"));
    source === "wallet" && setFiltered(nfts.filter(nft => nft.owner === "wallet"));
    source === "staked" && setFiltered(nfts.filter(nft => nft.owner === "staked"));
    source === "all" && setFiltered(nfts);
  }
  
 return <div className="nfts">
   <h3 className="page-title" style={{width: "100%"}}>Total NFTs: {nfts.length || count}
     <Button 
       variant={source === "all" ? "contained" : "outlined"}
            size="small"
            sx={{marginRight: "1em", marginLeft: "1em"}} 
       onClick={e => setSource("all")}>All</Button>
     <Button variant={source === "marketplace" ? "contained" : "outlined"}
            size="small"
            sx={{marginRight: "1em", marginLeft: "1em"}} 
       onClick={e => setSource("marketplace")}>Marketplace</Button>
     <Button variant={source === "staked" ? "contained" : "outlined"}
            size="small"
            sx={{marginRight: "1em", marginLeft: "1em"}} 
       onClick={e => setSource("staked")}>Staked</Button>
     <Button variant={source === "wallet" ? "contained" : "outlined"}
            size="small"
            sx={{marginRight: "1em", marginLeft: "1em"}} 
       onClick={e => setSource("wallet")}>Wallet</Button>
     
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