'use client'

import { useState, useEffect } from "react";
import { HomeHashtag } from "iconsax-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getMarketplaceAssets } from "@/app/_actions/nft";
import NFTCard from "./_components/nftcard";
import { getEthValue } from "@/app/_actions/eth";
import { Nft } from "@/app/_utils/type";

export default function Marketplace() {

  const [nfts, setNfts] = useState<Nft[]>([]);
  const [ethValue, setEthValue] = useState<number>(0);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {       
        const res = await getMarketplaceAssets();    
        setNfts(res.nfts); 
      } catch (err: any) {
        console.error(err);
        toast.error(err.msg || 'An unexpected error occurred.'); // Show error toast       
      }
    };
    fetchNFTs();

    const fetchEthValue = async () => {
      try {       
          const res = await getEthValue();    
          setEthValue(res[0].ConversionUsdEth);
      } catch (err: any) {
          console.error(err);
          toast.error(err.msg || 'An unexpected error occurred.'); // Show error toast       
      }
    };
    fetchEthValue();    
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="w-full px-8 mx-auto">
        <div className="flex justify-center items-center gap-2">
          <HomeHashtag size="36" color="#ffffff"/>
          <p className="text-4xl text-white">Marketplace</p>
        </div>
        <p className="text-center text-white pt-8">The Marketplace is a dynamic environment where lenders and borrowers can discover opportunities, negotiate terms, and transact deals. From offering assets to browsing potential investments, the Marketplace connects you to a world of possibilities within the Collateral community, fostering efficient and secure Peer-to-Peer interactions.</p>
                   
        {nfts.length > 0 ? (
          <div className="grid grid-cols-3 gap-8 pt-12">
            {nfts.map((nft: Nft) => (
              <NFTCard key={nft._id} nft={nft} ethValue={ethValue}/>             
            ))}
          </div>
        ) : (
          <div className="pt-20 text-3xl text-center text-white">No NFTs to display.</div>
        )}
      </div>
    </div>
  );
}
