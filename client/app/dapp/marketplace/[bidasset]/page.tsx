'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { HomeHashtag, ArrangeHorizontal } from 'iconsax-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getMarketplaceBidAsset, bid, getBidofAsset } from '@/app/_actions/nft';
import { getEthValue } from '@/app/_actions/eth';
import { DollarIcon, EtherIcon, PercentageIcon, Seller1, TermIcon } from "@/assets/img";
import { Nft, Bid } from '@/app/_utils/type';
import setAuthToken from '@/app/_utils/setauthtoken';

export default function BidAsset({ params }: { params: { bidasset: string } }) {    

    const decodedParam = decodeURIComponent(params.bidasset);

    const [nft, setNft] = useState<Nft | null>(null);
    const [bids, setBids] = useState<Bid[]>([]);
    const [ethValue, setEthValue] = useState<number>(0);

    const [bidAmount, setBidAmount] = useState<string>("");
    const [bidAmountEth, setBidAmountEth] = useState<string>("");
   
    const [errors, setErrors] = useState<{ [key: string]: string }>({
        bidAmount: '',
    });

    const validateFields = () => {
        const newErrors: { [key: string]: string } = {};        
        if (!bidAmount) {
            newErrors.bidAmount = 'Bid Amount is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        const fetchNFTs = async () => {
        try {       
            const res = await getMarketplaceBidAsset({id: decodedParam});  
            
            setNft(res.nfts); 
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
        }
        };
        fetchEthValue();   

        const fetchBids = async () => {
            try {
                const res = await getBidofAsset({id: decodedParam});
                setBids(res.bids);
            } catch (err: any) {
                console.error(err);
            }
        };
        fetchBids();
    }, []);
    
    const handleBidAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setBidAmount(value);
        if(value !== "") {
            setBidAmountEth(String((Number(value) * ethValue).toFixed(3)));
        } else {
            setBidAmountEth("");
        }
        
        setErrors({ ...errors, bidAmount: '' });
    };

    const handleBidAmountEthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setBidAmountEth(value);
        if(value !== "") {
            setBidAmount(String((Number(value) * (1.0 / ethValue)).toFixed(3)));
        } else {
            setBidAmount("");
        }
        
        setErrors({ ...errors, bidAmount: '' });
    };
    
    const handleBidAsset = async (nft: Nft) => {
        if (!validateFields()) {
            return; // Don't proceed if validation fails
        }
        setAuthToken({token: localStorage.token})
        try {
            const res = await bid({ tokenid: nft.tokenid, tokenaddress: nft.tokenaddress, bidamount: bidAmount});
           
            toast.success(`The bid uploaded successfully.`);      
        } catch (err: any) {
            console.error(err);
            toast.error(err.msg);
        }
    };

    return ( 
        <div>
            <ToastContainer />
            <div className="w-full max-w-[1280px] mx-auto">
                <div className="flex justify-center items-center gap-2">
                    <HomeHashtag size="36" color="#ffffff"/>
                    <p className="text-4xl text-white">Marketplace Asset</p>
                </div>
                <p className="text-center text-white pt-8">The Marketplace is a dynamic environment where lenders and borrowers can discover opportunities, negotiate terms, and transact deals. From offering assets to browsing potential investments, the Marketplace connects you to a world of possibilities within the Collateral community, fostering efficient and secure Peer-to-Peer interactions.</p>
                
                {nft && (
                    <div>
                        <div className='flex justify-between gap-8 pt-12'>
                            <div className="w-3/5">
                                <div className='bg-[#14172E] p-4 rounded-md'>
                                    <video className="w-full" controls>
                                        <source src={nft.metadata.animation_url} type="video/mp4" />
                                    </video>
                                </div>               
                            </div>
                            <div className='flex flex-col justify-between w-2/5'>
                                <div className='bg-[#14172E] text-white rounded-md px-8 py-4'>
                                    <div className='border-2 border-[#3f15e9] rounded-md py-2'>
                                        <p className='text-center'>{nft.metadata.name}</p>
                                    </div>
                                    <div className='flex justify-between pt-4'>
                                        <div>
                                            <p className='text-sm'>Asset Collection:</p>
                                            <p className='text-sm pt-2'>Owned By:</p>
                                        </div>
                                        <div>
                                            <p className='text-sm'>{nft.collectionname}</p>
                                            <p className='text-sm pt-2'>{nft.name}</p>
                                        </div>     
                                    </div>
                                </div>
                                <div className='bg-[#14172E] text-white rounded-md px-8 py-4'>
                                    <div className='border-2 border-[#3f15e9] rounded-md py-2'>
                                        <p className='text-center'>Loan Requested</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-4">
                                        <p className='text-sm'>Estimated Asset Value:</p>
                                        <div className="w-[220px] flex justify-between">
                                            <div className="flex gap-2">
                                                <Image src={DollarIcon} alt="" className="w-[10px]" />
                                                <div className="border-2 border-[#3f15e9] rounded-md px-2 py-1">
                                                    <input
                                                        type="text"
                                                        value={nft.estimatedassetvalue}
                                                        className="w-[60px] outline-none bg-transparent text-sm text-center"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Image src={EtherIcon} alt="" className="w-[10px]" />
                                                <div className="border-2 border-[#3f15e9] rounded-md px-2 py-1">
                                                    <input
                                                        type="text"
                                                        value={(Number(nft.estimatedassetvalue) * ethValue).toFixed(3)}
                                                        className="w-[60px] outline-none bg-transparent text-sm text-center"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>  
                                    <div className="flex items-center justify-between pt-4 text-white">
                                        <p className='text-sm'>Loan Required:</p>
                                        <div className="w-[220px] flex justify-between">
                                            <div className="flex gap-2">
                                                <Image src={DollarIcon} alt="" className="w-[10px]" />
                                                <div className="border-2 border-[#3f15e9] rounded-md px-2 py-1">
                                                    <input
                                                        type="text"
                                                        value={nft.loanamount}
                                                        className="w-[60px] outline-none bg-transparent text-sm text-center"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Image src={EtherIcon} alt="" className="w-[10px]" />
                                                <div className="border-2 border-[#3f15e9] rounded-md px-2 py-1">
                                                    <input
                                                        type="text"
                                                        value={(Number(nft.loanamount) * ethValue).toFixed(3)}
                                                        className="w-[60px] outline-none bg-transparent text-sm text-center"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>  
                                    <div className="flex items-center justify-between pt-4 text-white">
                                        <p className='text-sm'>Loan Rate (Per Month):</p>
                                        <div className="w-[220px] flex gap-2">
                                            <Image src={PercentageIcon} alt="" className="w-[10px]" />
                                            <div className="border-2 border-[#3f15e9] rounded-md px-2 py-1">
                                                <input
                                                    type="text"
                                                    value={nft.loanrate}
                                                    className="w-[60px] outline-none bg-transparent text-sm text-center"
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 text-white">
                                        <p className='text-sm'>Loan Term:</p>
                                        <div className="w-[220px] flex items-center gap-2">
                                            <Image src={TermIcon} alt="" className="w-[10px]" />
                                            <div className="flex gap-2 border-2 border-[#3f15e9] rounded-md px-2 py-1">
                                                <input
                                                    type="text"
                                                    value={nft.loantermmonth}
                                                    className="w-[60px] outline-none bg-transparent text-sm text-center"
                                                    readOnly
                                                />                                        
                                            </div>
                                            <p className='text-sm'>Months</p>
                                        </div>
                                    </div>  
                                </div>
                                <div className='bg-[#14172E] text-white rounded-md px-8 py-4'>
                                    <div className='border-2 border-[#3f15e9] rounded-md py-2'>
                                        <p className='text-center'>Amount You Want To Loan</p>
                                    </div>
                                    <p className='text-sm text-center pt-4 px-2'>Please note all bids are in USD, upon acceptance by the borrower payments can be made via ETH from your Collateral Network wallet.</p>
                                    <div className="flex items-center justify-between pt-4 text-white">
                                        <p className='text-sm'>Loan Amount Fulfilled:</p>
                                        <div className="w-[220px] flex justify-between">
                                            <div className="flex gap-2">
                                                <Image src={DollarIcon} alt="" className="w-[10px]" />
                                                <div className="border-2 border-[#3f15e9] rounded-md px-2 py-1">
                                                    <input
                                                        type="text"
                                                        value={bidAmount}
                                                        onChange={handleBidAmountChange}
                                                        className="w-[60px] outline-none bg-transparent text-center"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Image src={EtherIcon} alt="" className="w-[10px]" />
                                                <div className="border-2 border-[#3f15e9] rounded-md px-2 py-1">
                                                    <input
                                                        type="text"
                                                        value={bidAmountEth}
                                                        onChange={handleBidAmountEthChange}
                                                        className="w-[60px] outline-none bg-transparent text-center"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>  
                                    <div className="flex items-center justify-between pt-4 text-white">
                                        <p className='text-sm'>Your Offer Amount:</p>
                                        <div className="w-[220px] flex justify-between">
                                            <div className="flex gap-2">
                                                <Image src={DollarIcon} alt="" className="w-[10px]" />
                                                <div className="border-2 border-[#3f15e9] rounded-md px-2 py-1">
                                                    <input
                                                        type="text"
                                                        value={bidAmount}
                                                        onChange={handleBidAmountChange}
                                                        className="w-[60px] outline-none bg-transparent text-center"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Image src={EtherIcon} alt="" className="w-[10px]" />
                                                <div className="border-2 border-[#3f15e9] rounded-md px-2 py-1">
                                                    <input
                                                        type="text"
                                                        value={bidAmountEth}
                                                        onChange={handleBidAmountEthChange}
                                                        className="w-[60px] outline-none bg-transparent text-center"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>  
                                    {errors.bidAmount && <p className="text-red-500 text-sm">{errors.bidAmount}</p>}      
                                    <div className='flex justify-center pt-4'>
                                        <div 
                                            className='transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md px-4 py-2 cursor-pointer'
                                            onClick={() => handleBidAsset(nft)}
                                        >
                                            <p className='text-sm text-center text-white'>MAKE OFFER</p>
                                        </div>
                                    </div>                          
                                </div>
                                
                            </div>
                        </div>
                        <div className='flex justify-between gap-8 pt-8'>
                            <div className='w-3/5'>                                
                                <div className='bg-[#14172E] text-white rounded-md px-8 py-4'>
                                    <div className='flex'>
                                        <div className='border-2 border-[#3f15e9] rounded-md w-[240px] py-2'>
                                            <p className='text-center'>Asset Description</p>
                                        </div>
                                    </div>                                    
                                    <p className='text-sm pt-4'>{nft.metadata.description}</p>
                                    <div className='flex pt-4'>
                                        <div className='border-2 border-[#3f15e9] rounded-md w-[240px] py-2'>
                                            <p className='text-center'>Asset Traits</p>
                                        </div>
                                    </div>      
                                    {nft.metadata.attributes.length > 0 ? (
                                        <div className='grid grid-cols-4 gap-2 pt-4'>
                                            {nft.metadata.attributes.map((attribute: any, index) => (
                                                <div key={attribute.trait_type || index} className='border-2 border-[#3f15e9] rounded-md py-1'>
                                                    <p className='text-sm text-center'>{attribute.trait_type}</p> 
                                                    <p className='text-sm text-center'>{attribute.value}</p> 
                                                </div>                                                     
                                            ))}
                                        </div>
                                        ) : (
                                        <div className="pt-4">No Traits to display.</div>
                                    )}
                                </div>
                            </div>
                            <div className='w-2/5'>
                                <div className='bg-[#14172E] rounded-md p-4'>
                                    <div className='flex justify-between items-center pb-4'>
                                        <p className='text-white'>Bid History</p>
                                        <ArrangeHorizontal size="24" color="#ffffff"/>
                                    </div>
                                    <table className="w-full table-auto text-white">
                                        <thead className="text-sm bg-[#3f15e9]">
                                            <tr>
                                            <th className="font-normal text-left p-4">Date - Time</th>
                                            <th className="font-normal text-left p-4">Username</th>
                                            <th className="font-normal text-left p-4">Bid Amount</th>
                                            <th className="font-normal text-left p-4">Accepted</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            {bids.map((bid, index) => (
                                                <tr key={bid._id} className={index % 2 === 1 ? '' : 'bg-[#060A1E]'}>
                                                    <td className="p-4">{new Date(bid.date).toLocaleString()}</td>
                                                    <td className="p-4">{bid.bidname}</td>
                                                    <td className="p-4">{bid.bidamount}</td>
                                                    <td className="p-4">{bid.bidrate}</td>
                                                    <td className="p-4">{bid.bidtermmonth}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>     
                )}  
            </div>    
        </div>          
    );
}
