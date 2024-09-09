'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { listAsset } from "@/app/_actions/nft";
import setAuthToken from "@/app/_utils/setauthtoken";
import { DollarIcon, EtherIcon, PercentageIcon, TermIcon } from "@/assets/img";
import { Nft } from "@/app/_utils/type";

interface RawNFT {
    token_id: string;
    token_address: string;
    metadata: string;
}
  
interface Metadata {
    name: string;
    description: string;
    animation_url: string;
    attributes: { trait_type: string; value: string }[];
}
  
interface NFTCardProps {
    nft: RawNFT;
    eth: number;
    uploadedNfts: Nft[];
}

export default function NFTCard({ nft, eth, uploadedNfts }: NFTCardProps) {

    const [estimatedAssetValue, setEstimatedAssetValue] = useState<string>("");
    const [estimatedAssetValueEth, setEstimatedAssetValueEth] = useState<string>("");
    const [loanAmount, setLoanAmount] = useState<string>("");
    const [loanAmountEth, setLoanAmountEth] = useState<string>("");
    const [loanTermMonths, setLoanTermMonths] = useState<string>("");
    const [loanRate, setLoanRate] = useState<string>("");

    const [uploadedNft, setUploadedNfts] = useState<Nft | null>(null);

    const [errors, setErrors] = useState<{ [key: string]: string }>({
        estimatedAssetValue: '',
        loanAmount: '',
        loanTermMonths: '',
        loanRate: '',
    });

    useEffect(() => {
        const foundNft = uploadedNfts.find(
            (uploadedNft) => uploadedNft.tokenid === nft.token_id && uploadedNft.tokenaddress === nft.token_address
        );
        if (foundNft) {
            setUploadedNfts(foundNft);
        }
    }, [nft, uploadedNfts]);

    const validateFields = () => {
        const newErrors: { [key: string]: string } = {};
        if (!estimatedAssetValue) {
            newErrors.estimatedAssetValue = 'Estimated Asset Value is required';
        }
        if (!loanAmount) {
            newErrors.loanAmount = 'Loan Amount is required';
        } else if (Number(loanAmount) > 0.7 * Number(estimatedAssetValue)) {
            newErrors.loanAmount = 'Loan Amount cannot exceed 70% of Estimated Asset Value';
        }
        if (!loanTermMonths) {
            newErrors.loanTermMonths = 'Loan Term (Months) is required';
        } else if (Number(loanTermMonths) < 1 || Number(loanTermMonths) > 12) {
            newErrors.loanTermMonths = 'Loan Term (Months) must be between 1 and 12';
        }
        if (!loanRate) {
            newErrors.loanRate = 'Loan Rate is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleListAsset = async () => {
        if (!validateFields()) {
            return; // Don't proceed if validation fails
        }
        setAuthToken({ token: localStorage.token });
        try {
            await listAsset({ nft, estimatedAssetValue, loanAmount, loanTermMonths, loanRate });    
            toast.success("NFT Successfully Uploaded. We will either Approve or Amend the NFT loan for funding within 24 hours. Please keep an eye on your dashboard for latest updates.");
        } catch (err: any) {
          console.error(err);
          toast.error(err.msg); // Show error toast
        }            
    };

    const handleEstimatedAssetValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setEstimatedAssetValue(value);
        if (value !== "") {
            setEstimatedAssetValueEth(String((Number(value) * eth).toFixed(3)));
        } else {
            setEstimatedAssetValueEth("");
        }
        
        setErrors({ ...errors, estimatedAssetValue: '' });
    };

    const handleEstimatedAssetValueEthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setEstimatedAssetValueEth(value);
        if(value !== "") {
            setEstimatedAssetValue(String((Number(value) * (1.0 / eth)).toFixed(3)));
        } else {
            setEstimatedAssetValue("");
        }
        
        setErrors({ ...errors, estimatedAssetValue: '' });
    };
    
    const handleLoanAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (Number(value) <= 0.7 * Number(estimatedAssetValue)) {
            setLoanAmount(value);
            if(value !== "") {
                setLoanAmountEth(String((Number(value) * eth).toFixed(3)));
            } else {
                setLoanAmountEth("");
            }
            setErrors({ ...errors, loanAmount: '' });
        } else {
            setErrors({ ...errors, loanAmount: 'Loan Amount cannot exceed 70% of Estimated Asset Value' });
        }
    };

    const handleLoanAmountEthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (Number(value) <= 0.7 * Number(estimatedAssetValueEth)) {
            setLoanAmountEth(value);
            if(value !== "") {
                setLoanAmount(String((Number(value) * (1.0 / eth)).toFixed(3)));
            } else {
                setLoanAmount("");
            }
            setErrors({ ...errors, loanAmount: '' });
        } else {
            setErrors({ ...errors, loanAmount: 'Loan Amount cannot exceed 70% of Estimated Asset Value' });
        }
    };
    
    const handleMonthsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (Number(value) >= 1 && Number(value) <= 12 || value == "") {
            setLoanTermMonths(value);
            setErrors({ ...errors, loanTermMonths: '' });
        } else {
            setErrors({ ...errors, loanTermMonths: 'Loan Term (Months) must be between 1 and 12' });
        }

    };
    
    // const handleLoanRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setLoanRate(event.target.value);
    //     setErrors({ ...errors, loanRate: '' });
    // };

    const handleLoanRateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLoanRate(event.target.value);
        setErrors({ ...errors, loanRate: '' });
    };

    const metadataObject = JSON.parse(nft.metadata) as Metadata;

    const isUploadedNft = !!uploadedNft;

    return (
        <div className="bg-[#14172E] rounded-md p-4 text-white h-fit">
            <div className="w-full flex">
                <video className="w-full" controls>
                    <source src={metadataObject.animation_url} type="video/mp4" />
                </video>
            </div>
            <div className="pt-4">
                <div className="border-2 border-[#3f15e9] rounded-md py-2"> 
                    <p className="text-xl text-center">{metadataObject.name}</p>                                
                </div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <p>Estimated Asset Value:</p>
                <div className="w-[240px] flex justify-between">    
                    <div className="flex gap-2">
                        <Image src={DollarIcon} alt="" className="w-3"/>
                        <div className="border-2 border-[#3f15e9] rounded-md px-2 py-1">
                        <input 
                            type="text" 
                            value={isUploadedNft ? uploadedNft?.estimatedassetvalue : estimatedAssetValue}
                            onChange={handleEstimatedAssetValueChange}
                            className="w-[70px] outline-none bg-transparent text-center"
                            readOnly={isUploadedNft}
                        />
                        </div>    
                    </div>    
                    <div className="flex gap-2">
                        <Image src={EtherIcon} alt="" className="w-3"/>
                        <div className="border-2 border-[#3f15e9] rounded-md px-2 py-1">
                        <input 
                            type="text"             
                            value={isUploadedNft ? (Number(uploadedNft?.estimatedassetvalue)* eth).toFixed(3) : estimatedAssetValueEth}
                            onChange={handleEstimatedAssetValueEthChange}                    
                            className="w-[70px] outline-none bg-transparent text-center"
                            readOnly={isUploadedNft}
                        />
                        </div> 
                    </div>   
                </div>
            </div>      
            {errors.estimatedAssetValue && <p className="text-red-500 text-sm">{errors.estimatedAssetValue}</p>}
            <div className="flex items-center justify-between pt-4">
                <p>Loan Required:</p>
                <div className="w-[240px] flex justify-between">    
                <div className="flex gap-2">
                    <Image src={DollarIcon} alt="" className="w-3"/>
                    <div className="border-2 border-[#3f15e9] rounded-md px-2 py-1">
                    <input 
                        type="text" 
                        value={isUploadedNft ? uploadedNft?.loanamount : loanAmount}
                        onChange={handleLoanAmountChange}
                        className="w-[70px] outline-none bg-transparent text-center"
                        readOnly={isUploadedNft}
                    />
                    </div>    
                </div>    
                <div className="flex gap-2">
                    <Image src={EtherIcon} alt="" className="w-3"/>
                    <div className="border-2 border-[#3f15e9] rounded-md px-2 py-1">
                    <input 
                        type="text" 
                        value={isUploadedNft ? (Number(uploadedNft?.loanamount)* eth).toFixed(3) : loanAmountEth}
                        onChange={handleLoanAmountEthChange}
                        className="w-[70px] outline-none bg-transparent text-center"
                        readOnly={isUploadedNft}
                    />
                    </div> 
                </div>   
                </div>
            </div>       
            {errors.loanAmount && <p className="text-red-500 text-sm">{errors.loanAmount}</p>}
            {/* <div className="flex items-center justify-between pt-4">
                <p>Loan Rate (Per Month):</p>  
                <div className="w-[240px] flex gap-2">
                    <Image src={PercentageIcon} alt="" className="w-3"/>
                    <div className="border-2 border-[#3f15e9] rounded-md px-2 py-1">
                        <input 
                            type="text" 
                            value={isUploadedNft ? uploadedNft?.loanrate : loanRate}
                            onChange={handleLoanRateChange}
                            className="w-[70px] outline-none bg-transparent text-center"
                            readOnly={isUploadedNft}
                        />
                    </div>    
                </div>    
            </div>    */}
            <div className="flex items-center justify-between pt-4">
                <p>Loan Rate (Per Month):</p>  
                <div className="w-[240px] flex gap-2">
                    <Image src={PercentageIcon} alt="" className="w-3"/>
                    <div className="border-2 border-[#3f15e9] rounded-md px-2 py-1">
                        <select 
                            value={isUploadedNft ? uploadedNft?.loanrate : loanRate}
                            onChange={handleLoanRateChange}
                            className="w-[70px] outline-none bg-transparent text-center cursor-pointer"
                            disabled={isUploadedNft}
                        >
                            {Array.from({ length: 20 }, (_, i) => (i + 1) * 0.5).map((rate) => (
                                <option className="bg-black text-left" key={rate} value={rate}>{rate}</option>
                            ))}
                        </select>
                    </div>    
                </div>    
            </div>   
            {errors.loanRate && <p className="text-red-500 text-sm">{errors.loanRate}</p>}
            <div className="flex items-center justify-between py-4">
                <p>Loan Term:</p>  
                <div className="w-[240px] flex items-center gap-2">
                    <Image src={TermIcon} alt="" className="w-3"/>
                    <div className="flex gap-2 border-2 border-[#3f15e9] rounded-md px-2 py-1">
                        <input 
                            type="text" 
                            value={isUploadedNft ? uploadedNft?.loantermmonth : loanTermMonths}
                            onChange={handleMonthsChange}
                            className="w-[70px] outline-none bg-transparent text-center"
                            readOnly={isUploadedNft}
                        />                        
                    </div>
                    <p>Months</p>    
                </div>    
            </div>        
            {errors.loanTermMonths && <p className="text-red-500 text-sm">{errors.loanTermMonths}</p>}   
            {isUploadedNft ? <Link href="/dapp/myassetsandloans">
                <div className='transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md py-2 cursor-pointer'>
                    <p className='text-sm text-center text-white'>View Asset</p>
                </div>
            </Link> : <div 
                className='transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md py-2 cursor-pointer'
                onClick={handleListAsset}
            >
                <p className='text-sm text-center text-white'>List Asset</p>
            </div>
            }           
           
    </div>
    );
}
