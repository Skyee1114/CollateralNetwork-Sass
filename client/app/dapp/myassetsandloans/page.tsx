'use client'

import { useState, useEffect } from "react";
import { Notepad2 } from "iconsax-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserAssetsList, stageAsset, updateAsset } from "@/app/_actions/nft";
import setAuthToken from "@/app/_utils/setauthtoken";
import { getEthValue } from "@/app/_actions/eth";
import NFTCard from "./_components/nftcard";
import { Nft } from "@/app/_utils/type";

export default function MyAssetsandLoans() {
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [awaitingApprovalNfts, setAwaitingApprovalNfts] = useState<Nft[]>([]);
  const [approvedNfts, setApprovedNfts] = useState<Nft[]>([]);
  const [amendedNfts, setAmendedNfts] = useState<Nft[]>([]);
  const [paidNfts, setPaidNfts] = useState<Nft[]>([]);
  const [selectedNfts, setSelectedNfts] = useState<Nft[]>([]);
  const [selectedStage, setSelectedStage] = useState<number>(1);
  const [ethValue, setEthValue] = useState<number>(0);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {       
        const res = await getUserAssetsList();    
        setNfts(res.nfts);   
        updateNftSections(res.nfts);
        setSelectedNfts(res.nfts.filter((nft: Nft) => nft.stage === 1));
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

  const handleStageAsset = async (nft: Nft, stage: number, amendContent: string) => {
    setAuthToken({token:localStorage.token});
    try {
      const res = await stageAsset({ tokenaddress: nft.tokenaddress, tokenid: nft.tokenid, stage, amend: amendContent });
      const updatedNfts = nfts.map(item => item._id === nft._id ? { ...item, stage: res.nfts.stage, amend: res.nfts.amend } : item);
      setNfts(updatedNfts);
      updateNftSections(updatedNfts);
      if (res.nfts.stage === selectedStage) {
        setSelectedNfts(updatedNfts.filter((item: Nft) => item.stage === selectedStage));
      } else {
        setSelectedNfts(selectedNfts.filter((item: Nft) => item._id !== nft._id));
      }
      toast.success(`Asset ${res.nfts.metadata.name} paid and listed on marketplace successfully.`);      
    } catch (err: any) {
      console.error(err);
      toast.error(err.msg);
    }
  };

  const handleUpdateAsset = async (nft: Nft) => {
    setAuthToken({token:localStorage.token});
    try {
      const res = await updateAsset({ tokenaddress: nft.tokenaddress, tokenid: nft.tokenid, estimatedAssetValue: nft.estimatedassetvalue, loanAmount: nft.loanamount, loanRate: nft.loanrate, loanTermMonths: nft.loantermmonth });
      const updatedNfts = nfts.map(item => item._id === nft._id ? { ...item, stage: 1, estimatedassetvalue: res.nfts.estimatedassetvalue, loanamount: res.nfts.loanamount, loanrate: res.nfts.loanrate, loantermmonth: res.nfts.loantermmonth } : item);
      setNfts(updatedNfts);
      updateNftSections(updatedNfts);
      if (res.nfts.stage === selectedStage) {
        setSelectedNfts(updatedNfts.filter((item: Nft) => item.stage === selectedStage));
      } else {
        setSelectedNfts(selectedNfts.filter((item: Nft) => item._id !== nft._id));
      }
      toast.success(`Asset ${res.nfts.metadata.name} updated successfully.`);      
    } catch (err: any) {
      console.error(err);
      toast.error(err.msg);
    }
  };

  const updateNftSections = (nfts: Nft[]) => {
    setAwaitingApprovalNfts(nfts.filter((nft: Nft) => nft.stage === 1));
    setApprovedNfts(nfts.filter((nft: Nft) => nft.stage === 2));
    setAmendedNfts(nfts.filter((nft: Nft) => nft.stage === 3));
    setPaidNfts(nfts.filter((nft: Nft) => nft.stage === 4));
  };

  const handleSelectedNFTs = (stage: number, nfts: Nft[]) => {
    setSelectedStage(stage);
    setSelectedNfts(nfts);
  };

  return (
    <div>
      <ToastContainer />
      <div className="w-full px-8 mx-auto">
        <div className="flex justify-center items-center gap-2">
          <Notepad2 size="36" color="#ffffff"/>
          <p className="text-4xl text-white">My Assets/Loans</p>
        </div>
        <p className="text-center text-white pt-8">The My Assets section gives you an overview of all your holdings within the Collateral platform. Whether it’s crypto assets or physical valuables used as collateral, this feature lets you monitor and manage them with ease. With clear visuals and detailed information, you can track the performance and status of your assets, making informed decisions and navigating your financial landscape confidently.</p>
        <div className="grid grid-cols-4 gap-8 pt-12">
          <div
            className={`border border-[#3612C4] py-4 transition-colors duration-300 ease-in-out ${selectedStage === 1 ? 'bg-[#3612C4]' : 'bg-transparent'} cursor-pointer`}
            onClick={() => handleSelectedNFTs(1, awaitingApprovalNfts)}
          >
            <p className="text-xl text-center text-white">AWAITING APPROVAL: {awaitingApprovalNfts.length}</p>
          </div>
          <div
            className={`border border-[#3612C4] py-4 transition-colors duration-300 ease-in-out ${selectedStage === 2 ? 'bg-[#3612C4]' : 'bg-transparent'} cursor-pointer`}
            onClick={() => handleSelectedNFTs(2, approvedNfts)}
          >
            <p className="text-xl text-center text-white">APPROVED: {approvedNfts.length}</p>
          </div>          
          <div
            className={`border border-[#3612C4] py-4 transition-colors duration-300 ease-in-out ${selectedStage === 3 ? 'bg-[#3612C4]' : 'bg-transparent'} cursor-pointer`}
            onClick={() => handleSelectedNFTs(3, amendedNfts)}
          >
            <p className="text-xl text-center text-white">AMENDED: {amendedNfts.length}</p>
          </div>
          <div
            className={`border border-[#3612C4] py-4 transition-colors duration-300 ease-in-out ${selectedStage === 4 ? 'bg-[#3612C4]' : 'bg-transparent'} cursor-pointer`}
            onClick={() => handleSelectedNFTs(4, paidNfts)}
          >
            <p className="text-xl text-center text-white">Listed: {paidNfts.length}</p>
          </div>
        </div>

        {selectedNfts.length > 0 ? (
          <div className="grid grid-cols-3 gap-8 pt-12">
            {selectedNfts.map((nft: Nft) => (
              <NFTCard key={nft._id} nft={nft} ethValue={ethValue} handleStageAsset={handleStageAsset} handleUpdateAsset={handleUpdateAsset} />
            ))}
          </div>
        ) : (
          <div className="pt-20 text-3xl text-center text-white">No NFTs to display.</div>
        )}
      </div>
    </div>    
  );
}
