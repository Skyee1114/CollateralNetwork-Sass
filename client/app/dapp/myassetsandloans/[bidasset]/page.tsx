'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Notepad2, ArrangeHorizontal } from 'iconsax-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getMarketplaceBidAsset, getBidofAsset } from '@/app/_actions/nft';
import { getEthValue } from '@/app/_actions/eth';
import { DollarIcon, EtherIcon, PercentageIcon, TermIcon } from "@/assets/img";
import { Nft, Bid } from '@/app/_utils/type';

export default function BidAsset({ params }: { params: { bidasset: string } }) {    

    const decodedParam = decodeURIComponent(params.bidasset);

    const [nft, setNft] = useState<Nft | null>(null);
    const [bids, setBids] = useState<Bid[]>([]);
    const [ethValue, setEthValue] = useState<number>(0);
     
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
    

    return ( 
        <div>
            <ToastContainer />
            <div className="w-full max-w-[1280px] mx-auto">
                <div className="flex justify-center items-center gap-2">
                    <Notepad2 size="36" color="#ffffff"/>
                    <p className="text-4xl text-white">My Assets/Loans</p>
                </div>
                <p className="text-center text-white pt-8">The My Assets section gives you an overview of all your holdings within the Collateral platform. Whether it’s crypto assets or physical valuables used as collateral, this feature lets you monitor and manage them with ease. With clear visuals and detailed information, you can track the performance and status of your assets, making informed decisions and navigating your financial landscape confidently.</p>
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
                                        <p className='text-center'>Loan Offer Fulfillment</p>
                                    </div>
                                    <div className='flex items-center justify-between pt-4'>
                                        <p className='text-sm'>Loan Fulfillment:</p>
                                        <div className="flex justify-between">
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
                                            <div className="flex gap-2">
                                                <Image src={PercentageIcon} alt="" className="w-[10px]" />
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
                                                         
                                </div>
                            </div>
                        </div>
                    </div>
                )}  
                <div className='pt-12'>
                    <div className='bg-[#14172E] rounded-md p-4'>
                        <div className='flex justify-between items-center pb-4'>
                            <p className='font-bold text-2xl text-white'>All Bids</p>
                            <ArrangeHorizontal size="36" color="#ffffff"/>
                        </div>
                        <table className="w-full table-auto text-white">
                            <thead className="text-sm bg-[#3f15e9]">
                                <tr>
                                <th className="font-normal text-left p-4">Date - Time</th>
                                <th className="font-normal text-left p-4">User</th>
                                <th className="font-normal text-left p-4">Bid Amount</th>
                                <th className="font-normal text-left p-4">Bid Rate</th>
                                <th className="font-normal text-left p-4">Bid Term - Month</th>
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
    );
}
