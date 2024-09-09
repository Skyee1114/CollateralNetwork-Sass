'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { DollarIcon, EtherIcon, PercentageIcon, Seller1, TermIcon } from "@/assets/img";
import { Nft } from "@/app/_utils/type";

interface NFTCardProps {
    nft: Nft;
    ethValue: number;
    handleStageAsset: (nft: Nft, stage: number, amendContent: string) => void;
    handleUpdateAsset: (nft: Nft) => void;
}

export default function NFTCard({ nft, ethValue, handleStageAsset, handleUpdateAsset }: NFTCardProps) {

  const [updatedAssetValue, setUpdatedAssetValue] = useState<string>("");
  const [updatedAssetValueEth, setUpdatedAssetValueEth] = useState<string>("");
  const [updatedLoanAmount, setUpdatedLoanAmount] = useState<string>("");
  const [updatedLoanAmountEth, setUpdatedLoanAmountEth] = useState<string>("");
  const [updatedLoanRate, setUpdatedLoanRate] = useState<string>(nft.loanrate);
  const [updatedLoanTermMonth, setUpdatedLoanTermMonth] = useState<string>(nft.loantermmonth);

  const [errors, setErrors] = useState<{ [key: string]: string }>({
    updatedAssetValue: '',
    updatedLoanAmount: '',
    updatedLoanRate: '',
    updatedLoanTermMonth: '',
  });

  useEffect(() => {
    setUpdatedAssetValue(nft.estimatedassetvalue);
    setUpdatedAssetValueEth((Number(nft.estimatedassetvalue) * ethValue).toFixed(3));
    setUpdatedLoanAmount(nft.loanamount);
    setUpdatedLoanAmountEth((Number(nft.loanamount) * ethValue).toFixed(3));
  }, [nft, ethValue]);

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    if (!updatedAssetValue) {
        newErrors.updatedAssetValue = 'Estimated Asset Value is required';
    }
    if (!updatedLoanAmount) {
        newErrors.updatedLoanAmount = 'Loan Amount is required';
    }
    if (!updatedLoanTermMonth) {
        newErrors.updatedLoanTermMonth = 'Loan Term (Months) is required';
    } else if (Number(updatedLoanTermMonth) < 1 || Number(updatedLoanTermMonth) > 12) {
        newErrors.updatedLoanTermMonth = 'Loan Term (Months) must be between 1 and 12';
    }
    if (!updatedLoanRate) {
        newErrors.updatedLoanRate = 'Loan Rate is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = () => {
    if (!validateFields()) {
      return; // Don't proceed if validation fails
    }
    nft.estimatedassetvalue = updatedAssetValue;
    nft.loanamount = updatedLoanAmount;
    nft.loanrate = updatedLoanRate;
    nft.loantermmonth = updatedLoanTermMonth;
    handleUpdateAsset(nft);
  };

  const handleEstimatedAssetValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUpdatedAssetValue(value);
    if (value !== "") {
        setUpdatedAssetValueEth(String((Number(value) * ethValue).toFixed(3)));
    } else {
      setUpdatedAssetValueEth("");
    }
    
    setErrors({ ...errors, updatedAssetValue: '' });
  };

  const handleEstimatedAssetValueEthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setUpdatedAssetValueEth(value);
      if(value !== "") {
          setUpdatedAssetValue(String((Number(value) * (1.0 / ethValue)).toFixed(3)));
      } else {
        setUpdatedAssetValue("");
      }
      
      setErrors({ ...errors, updatedAssetValue: '' });
  };

  const handleLoanAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setUpdatedLoanAmount(value);
      if(value !== "") {
          setUpdatedLoanAmountEth(String((Number(value) * ethValue).toFixed(3)));
      } else {
        setUpdatedLoanAmountEth("");
      }
      
      setErrors({ ...errors, updatedLoanAmount: '' });
  };

  const handleLoanAmountEthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setUpdatedLoanAmountEth(value);
      if(value !== "") {
          setUpdatedLoanAmount(String((Number(value) * (1.0 / ethValue)).toFixed(3)));
      } else {
        setUpdatedLoanAmount("");
      }
      
      setErrors({ ...errors, updatedLoanAmountEth: '' });
  };

  const handleMonthsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (Number(value) >= 1 && Number(value) <= 12 || value == "") {
          setUpdatedLoanTermMonth(value);
          setErrors({ ...errors, updatedLoanTermMonth: '' });
      } else {
          setErrors({ ...errors, updatedLoanTermMonth: 'Loan Term (Months) must be between 1 and 12' });
      }

  };

  const handleLoanRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUpdatedLoanRate(event.target.value);
      setErrors({ ...errors, updatedLoanRate: '' });
  };

  return (
      <div key={nft._id} className="bg-[#14172E] rounded-md p-4 text-white">
        <div className="flex items-center relative">
          <Image src={Seller1} alt="" className="w-10 rounded-full bg-[#bdbdbd]" />
          <p className="text-xl text-white pl-5">{nft.name}</p>
        </div>
        <div className="w-full flex pt-4">
          <video className="w-full" controls>
            <source src={nft.metadata.animation_url} type="video/mp4" />
          </video>
        </div>
        <div className="pt-4">
          <div className="border-2 border-[#3f15e9] rounded-md py-2">
            <p className="text-xl text-center">{nft.metadata.name}</p>
          </div>
        </div>
  
        <div className="flex items-center justify-between pt-4">
          <p>Estimated Asset Value:</p>
          <div className="w-[240px] flex justify-between">
            <div className="flex gap-2">
              <Image src={DollarIcon} alt="" className="w-3" />
              <div className="border-2 border-[#3f15e9] rounded-md px-2 py-1">
                <input
                  type="text"
                  value={updatedAssetValue}
                  onChange={handleEstimatedAssetValueChange}
                  className="w-[70px] outline-none bg-transparent text-center"
                  readOnly={nft.stage !== 3}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Image src={EtherIcon} alt="" className="w-3" />
              <div className="border-2 border-[#3f15e9] rounded-md px-2 py-1">
                <input
                  type="text"
                  value={updatedAssetValueEth}
                  onChange={handleEstimatedAssetValueEthChange}
                  className="w-[70px] outline-none bg-transparent text-center"
                  readOnly={nft.stage !== 3}
                />
              </div>
            </div>
          </div>
        </div>
        {errors.updatedAssetValue && <p className="text-red-500 text-sm">{errors.updatedAssetValue}</p>}
  
        <div className="flex items-center justify-between pt-4">
          <p>Loan Amount:</p>
          <div className="w-[240px] flex justify-between">
            <div className="flex gap-2">
              <Image src={DollarIcon} alt="" className="w-3" />
              <div className="border-2 border-[#3f15e9] rounded-md px-2 py-1">
                <input
                  type="text"
                  value={updatedLoanAmount}
                  onChange={handleLoanAmountChange}
                  className="w-[70px] outline-none bg-transparent text-center"
                  readOnly={nft.stage !== 3}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Image src={EtherIcon} alt="" className="w-3" />
              <div className="border-2 border-[#3f15e9] rounded-md px-2 py-1">
                <input
                  type="text"
                  value={updatedLoanAmountEth}
                  onChange={handleLoanAmountEthChange}
                  className="w-[70px] outline-none bg-transparent text-center"
                  readOnly={nft.stage !== 3}
                />
              </div>
            </div>
          </div>
        </div>
        {errors.updatedLoanAmount && <p className="text-red-500 text-sm">{errors.updatedLoanAmount}</p>}
  
        <div className="flex items-center justify-between pt-4">
          <p>Loan Rate:</p>
          <div className="w-[240px] flex gap-2">
            <Image src={PercentageIcon} alt="" className="w-3" />
            <div className="border-2 border-[#3f15e9] rounded-md px-2 py-1">
              <input
                type="text"
                value={updatedLoanRate}
                onChange={handleLoanRateChange}
                className="w-[70px] outline-none bg-transparent text-center"
                readOnly={nft.stage !== 3}
              />
            </div>
          </div>
        </div>
        {errors.updatedLoanRate && <p className="text-red-500 text-sm">{errors.updatedLoanRate}</p>}
        <div className="flex items-center justify-between pt-4">
          <p>Loan Term:</p>
          <div className="w-[240px] flex items-center gap-2">
            <Image src={TermIcon} alt="" className="w-3" />
            <div className="flex gap-2 border-2 border-[#3f15e9] rounded-md px-2 py-1">
              <input
                type="text"
                value={updatedLoanTermMonth}
                onChange={handleMonthsChange}
                className="w-[70px] outline-none bg-transparent text-center"
                readOnly={nft.stage !== 3}
              />              
            </div>
            <p>Months</p>
          </div>
        </div>
        {errors.updatedLoanTermMonth && <p className="text-red-500 text-sm">{errors.updatedLoanTermMonth}</p>}     
        {nft.stage == 3 && <div className="pt-4">
          <p className="pb-2">Amend:</p>
          <div className="border-2 border-[#3f15e9] rounded-md px-2 py-1">
            <textarea
              rows={4}
              value={nft.amend}
              className="w-full text-sm text-white outline-none bg-transparent"
              readOnly
            />
          </div>
        </div>
        }
        {nft.stage == 2 && <div className="pt-4">
          <div
            className='transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md py-2 cursor-pointer'
            onClick={() => handleStageAsset(nft, 4, '')}
          >
            <p className='text-sm text-center text-white'>Pay To List</p>
          </div>
        </div>
        }        
        {nft.stage == 3 && <div className="pt-4">
            <div
              className='w-full transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md py-2 cursor-pointer'
              onClick={handleUpdate}
            >
              <p className='text-sm text-center text-white'>Update and List again</p>
            </div>
          </div>
        }
        {nft.stage == 4 && <div className="pt-4">
            <Link href={`/dapp/myassetsandloans/${nft._id}`}>
              <div className='w-full transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md py-2 cursor-pointer'>
                  <p className='text-sm text-center text-white'>View Asset</p>
                </div>
            </Link>            
          </div>
        }
      </div>
  );
}
