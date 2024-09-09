'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useActiveAccount } from "thirdweb/react";
import { prepareTransaction, toWei, sendAndConfirmTransaction } from "thirdweb";
import { ethereum, sepolia } from "thirdweb/chains";
import { client } from "@/app/_utils/thirdwebclient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Coin1, ArrangeHorizontal, ArrowRight } from "iconsax-react";
import LoadingSpinner from "@/app/_components/loadingspinner";
import { ColtLogo, SupportIcon } from "@/assets/img";
import { getICO, claimICO } from "@/app/_actions/ico";
import { Ico } from "@/app/_utils/type";

export default function ICOClaim() {

  const account = useActiveAccount();
  const owner = account?.address;
  const fee = "0.0093";
  const [loading, setLoading] = useState(false);

  const [ico, setIco] = useState<Ico | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true); // New state for disabled button

  const transaction = prepareTransaction({
    to: "0xd2897F7145D3BDc033Bf50c19b17Fb4D79F571f3",
    // to: "0x29a8D32F98C438Da430B6361Af6542ba7700575D",
    chain: ethereum,
    client: client,
    value: toWei(fee),
  });  

  useEffect(() => {   
    if(owner) {
      const fetchICOs = async () => {
        try {       
          const res = await getICO({walletaddress: owner});    
          setIco(res.ico);    
          if (res.ico?.bonustx || res.ico?.claimedtx || !res.ico?.totaltoken) {
            setIsButtonDisabled(true);
          } else {
            setIsButtonDisabled(false);
          }
        } catch (err: any) {
          console.error(err);
        }
      };
      fetchICOs();
    }
    
  }, [owner]);

  const handleTransfer = async () => {
    if(account) {
      setLoading(true);
      try {
        const receipt = await sendAndConfirmTransaction({
          transaction,
          account
        });        
        if(receipt.status == "success") {
          setLoading(false);
          try {
           const res = await claimICO({from:receipt.from, to:receipt.to ?? "", transactionHash:receipt.transactionHash})
           setIco(res.ico);
           toast.success('Your COLT token claim has been successfully submitted.');    
           setIsButtonDisabled(true);
         } catch (err) {
           console.error(err);
         }        
       }
      } catch (err: any) {
        if(err.code == 3){
          toast.error('Insufficient ETH please check and try again.');    
        }        
      }     
      setLoading(false);
    }    
  };

  return (
    <div>
      <ToastContainer className='text-sm'/>
      <div className="w-full max-w-[1280px] mx-auto px-5">
        <div className="flex justify-center items-center gap-2">
          <div className="hidden xs:block">
            <Coin1 size="36" color="#ffffff"/>
          </div>
          <div className="block xs:hidden">
            <Coin1 size="24" color="#ffffff"/>
          </div>
          <p className="text-3xl xs:text-4xl text-white">ICO Claim</p>
        </div>
        <p className="text-sm xs:text-base text-center text-white pt-8">If you were a buyer during out ICO presale and connected with your registered wallet address you’ll find you total token balance available to claim here. To facilitate this airdrop, a fee of 0.0093 ETH is required to cover operational costs, ensuring a smooth and efficient process for everyone. Tokens will be transferred to your wallet within 48 hours of confirmation.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-12">
          <div className="flex flex-col justify-between bg-[#14172E] rounded-md px-4 py-4">
            <div className="flex justify-between">
              <p className="font-bold text-xl xs:text-2xl text-white">Purchased Tokens</p>
              <Image src={ColtLogo} alt="" className="w-6 h-6 xs:w-8 xs:h-8"/>
            </div>
            <p className="text-xl text-white pt-4"> {ico?.purchasedtoken ? ico.purchasedtoken.toLocaleString() : 0} COLT</p>          
          </div>
          <div className="flex flex-col justify-between bg-[#14172E] rounded-md px-4 py-4">
            <div className="flex justify-between">
              <p className="font-bold text-xl xs:text-2xl text-white">Bonus Tokens</p>
              <Image src={ColtLogo} alt="" className="w-6 h-6 xs:w-8 xs:h-8"/>
            </div>
            <p className="text-xl text-white pt-4">{ico?.bonustoken ? ico.bonustoken.toLocaleString() : 0} COLT</p>          
          </div>
          <div className="flex flex-col justify-between bg-[#14172E] rounded-md px-4 py-4">
            <div className="flex justify-between">
              <p className="font-bold text-xl xs:text-2xl text-white">Total Tokens</p>
              <Image src={ColtLogo} alt="" className="w-6 h-6 xs:w-8 xs:h-8"/>
            </div>
            <p className="text-xl text-white pt-4">{ico?.bonustoken ? ico.totaltoken.toLocaleString() : 0} COLT</p>          
          </div>
        </div>

        <div className="pt-12">
          <div className="bg-[#14172E] rounded-md p-4 overflow-auto lg:overflow-hidden">
            <div className='flex justify-between items-center pb-4'>
              <div className="flex gap-4 xs:gap-16">
                <p className='font-bold text-xl xs:text-2xl text-white'>Claim History</p>        
                <div className="flex items-center gap-4 text-white">
                  <p className="text-sm xs:text-base hidden xs:block">Claimed</p>
                  <p className="text-sm xs:text-base border border-[#3f15e9] bg-[#060A1E] px-2 xs:px-4 py-1">{ico?.distributiontoken.toLocaleString()} COLT</p>
                </div>   
              </div>                 
              <div className="hidden xs:block">
                <ArrangeHorizontal size="36" color="#ffffff"/>
              </div>
              <div className="block xs:hidden">
                <ArrangeHorizontal size="24" color="#ffffff"/>
              </div>
            </div>
            <table className="w-full table-auto text-white min-w-[1024px]">
              <thead className="text-sm bg-[#3f15e9]">
                <tr>
                  <th className="font-normal text-left p-4">Amount</th>
                  <th className="font-normal text-left p-4">Transaction Hash</th>
                  <th className="font-normal p-4">Block Explorer</th>
                </tr>
              </thead>
              <tbody className="text-sm">              
                {ico?.purchasedtx1 && <tr className='bg-[#060A1E] border-l border-r border-b border-l-[#3f15e9] border-r-[#3f15e9] border-b-[#3f15e9]'>
                  <td className="p-4">{ico.purchasedtoken.toLocaleString()} COLT</td>
                  <td className="p-4">{ico.purchasedtx1}</td>
                  <td className="p-4 flex justify-center"><Link href={`https://etherscan.io/tx/${ico.purchasedtx1}`} target="_blank"><ArrowRight size="24" color="#ffffff" /></Link></td>                 
                </tr>}
                {ico?.purchasedtx2 && <tr className='bg-[#060A1E] border-l border-r border-b border-l-[#3f15e9] border-r-[#3f15e9] border-b-[#3f15e9]'>
                  <td className="p-4"></td>
                  <td className="p-4">{ico.purchasedtx2}</td>
                  <td className="p-4 flex justify-center"><Link href={`https://etherscan.io/tx/${ico.purchasedtx2}`} target="_blank"><ArrowRight size="24" color="#ffffff" /></Link></td>                 
                </tr>}
                {ico?.bonustx && <tr className='bg-[#060A1E] border-l border-r border-b border-l-[#3f15e9] border-r-[#3f15e9] border-b-[#3f15e9]'>
                  <td className="p-4">{ico.purchasedtx1 || ico.purchasedtx2 ? ico.bonustoken.toLocaleString() : ico.totaltoken.toLocaleString()} COLT</td>
                  <td className="p-4">{ico.bonustx}</td>
                  <td className="p-4 flex justify-center"><Link href={`https://etherscan.io/tx/${ico.bonustx}`} target="_blank"><ArrowRight size="24" color="#ffffff" /></Link></td>                 
                </tr>}
                {ico?.distributiontx ? <tr className='bg-[#060A1E] border-l border-r border-b border-l-[#3f15e9] border-r-[#3f15e9] border-b-[#3f15e9]'>
                  <td className="p-4">{ico.distributiontoken.toLocaleString()} COLT</td>
                  <td className="p-4">{ico.distributiontx}</td>
                  <td className="p-4 flex justify-center"><Link href={`https://etherscan.io/tx/${ico.distributiontx}`} target="_blank"><ArrowRight size="24" color="#ffffff" /></Link></td>                 
                </tr> : ico?.distributiontoken ? <tr className='bg-[#060A1E] border-l border-r border-b border-l-[#3f15e9] border-r-[#3f15e9] border-b-[#3f15e9]'>
                  <td className="p-4">{ico.distributiontoken.toLocaleString()} COLT</td>
                  <td className="p-4">Pending</td>
                  <td className="p-4 flex justify-center">Pending</td>                 
                </tr> : <></>}
              </tbody>
            </table>
            <div className="pt-4 text-white">
              <p className="text-center text-sm">Don’t see your claim history</p>
              <p className="text-center text-sm">Click the Claim Tokens button below to initiate your claim.</p>
            </div>
            <div className="flex justify-center pt-4">
              <button
                onClick={isButtonDisabled ? undefined : handleTransfer}
                disabled={isButtonDisabled}
                className={`w-[160px] flex justify-center transition-colors duration-300 ease-in-out ${isButtonDisabled ? 'opacity-50' : 'hover:bg-[#3612C4]'} bg-[#3f15e9] rounded-md py-2 cursor-pointer`}
              >
                {loading ? <LoadingSpinner /> : <p className="text-sm text-white">Claim Tokens</p>}
              </button>
            </div>            
          </div>
        </div>

        <div className="pt-12 xs:flex">
          <div className="bg-[#14172E] rounded-md px-4 py-4">
            <div className="flex justify-between">
              <p className="font-bold text-xl xs:text-2xl text-white">Need Help?</p>
              <Image src={SupportIcon} alt="" className="w-6 h-6 xs:w-8 xs:h-8"/>
            </div>
            <p className="text-sm text-white pt-4">Email us at support@collateralnetwork.io</p>          
          </div>
        </div>    
      
      </div>   
    </div>
     
  );  
}

