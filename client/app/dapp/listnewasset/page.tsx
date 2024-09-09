'use client'

import { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import Moralis from "moralis";
import { Additem } from "iconsax-react";
import { FiSearch } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NFTCard from "./_components/nftcard";
import { getUserAssetsList } from "@/app/_actions/nft";
import { getEthValue } from "@/app/_actions/eth";
import { Nft } from "@/app/_utils/type";

interface RawNFT {
  token_id: string;
  token_address: string;
  metadata: string;
  name: string;
}

interface Collection {
  token_address: string;
  name: string;
  collection_logo: string;
}

export default function ListNewAsset() {
  
  const wallet = useActiveAccount();
  const owner = wallet?.address;

  const [nfts, setNfts] = useState<RawNFT[]>([]);
  const [uploadedNfts, setUploadedNfts] = useState<Nft[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isWallet, setIsWallet] = useState<boolean>(false);
  const [selectedCollection, setSelectedCollection] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [ethValue, setEthValue] = useState<number>(0);
  
  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        if (!owner) {
          setCollections([]);
          setNfts([]);
          setIsWallet(false);
          return
        };

        if (!Moralis.Core.isStarted) {
          await Moralis.start({
            apiKey: process.env.NEXT_PUBLIC_MORALIS_API
          });
        }       

        const walletNFTs = await Moralis.EvmApi.nft.getWalletNFTs({
          chain: "0x1",
          format: "decimal",
          mediaItems: false,
          address: owner
        });

        const walletCollections = await Moralis.EvmApi.nft.getWalletNFTCollections({
          chain: "0x1",
          address: owner
        });

        setCollections(walletCollections.raw.result as Collection[]);
        setNfts(walletNFTs.raw.result as RawNFT[]);
        setIsWallet(true);
      } catch (e) {
        console.error(e);
        toast.error('An error occurred while fetching NFTs.');
      }
    };

    fetchNFTs();
  }, [owner]);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {       
        const res = await getUserAssetsList();    
        setUploadedNfts(res.nfts);   
      } catch (err: any) {
        console.error(err);        
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

  const handleCollectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCollection(event.target.value);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <ToastContainer className='text-sm' />
      <div className="w-full px-8 mx-auto">
        <div className="flex justify-center items-center gap-2">
          <Additem size="36" color="#ffffff"/>
          <p className="text-4xl text-white">List New Asset</p>
        </div>
        <p className="text-center text-white pt-8">Welcome to the Collateral Network Platform! If you own an NFT and want to unlock its value through borrowing, our platform provides a seamless and secure way to do so. Simply submit your asset by filling in the estimated value, desired loan amount (up to 70% of the NFT’s value), loan term (1 to 12 months), and proposed monthly interest rate. You will receive loan offers from lenders, which can be combined to meet your total loan requirement. Our team will review and verify your NFT’s value, notify you of any discrepancies, and, upon approval, you will need to pay a $50.00 USDT listing fee. Success fees will be deducted from the loan advance upon completion. For detailed fee information, refer to the ‘Platform Fee’ section. For more detailed information on listing your asset, please click here. Thank you for choosing the Collateral Network Platform. We look forward to helping you achieve your financial goals.</p>
        {nfts.length > 0 ? (
          <div>
            <div className="pt-12">
              <div className="bg-[#14172E] rounded-md p-4 flex gap-4">
                <div className="w-full flex items-center rounded-md border-2 border-[#3f15e9] pl-2">
                  <FiSearch className="text-2xl text-white "/>
                  <input
                    type="text"
                    className="w-full text-white outline-none p-2 bg-transparent"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                </div>
                <select
                  className="w-[500px] outline-none rounded-md bg-transparent border-2 border-[#3f15e9] text-white cursor-pointer"
                  value={selectedCollection}
                  onChange={handleCollectionChange}
                >
                  <option value="all" className="text-black">All Collections</option>
                  {collections.map((collection, index) => (
                    <option key={index} value={collection.token_address} className="text-black">
                      <p>{collection.name}</p>
                    </option>
                  ))}
                </select>      
              </div> 
            </div>                   
            <div className="grid grid-cols-3 gap-8 pt-12">
              {nfts
                .filter(nft =>
                  (selectedCollection === "all" || nft.token_address === selectedCollection) &&
                  (searchQuery === "" || JSON.parse(nft.metadata).name.toLowerCase().includes(searchQuery.toLowerCase()))
                )
                .map((nft, index) => (
                  <NFTCard key={`${nft.token_address}-${nft.token_id}`} nft={nft} eth={ethValue} uploadedNfts={uploadedNfts}/>
              ))}
            </div>
          </div>
        ) : (
          <div className="pt-20 text-3xl text-center text-white"> {isWallet ? "There are no NFTs in your wallet to display here." : "Connect your wallet to display NFTs here."}</div>
        )}
      </div>
    </div>
    
  );
}
