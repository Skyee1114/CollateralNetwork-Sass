import Link from "next/link";
import Image from "next/image";
import { DollarIcon, EtherIcon, PercentageIcon, Seller1, TermIcon } from "@/assets/img";
import { Nft } from "@/app/_utils/type";

interface NFTCardProps {
    nft: Nft;
    ethValue: number;
}

export default function NFTCard({ nft, ethValue }: NFTCardProps) {

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
                  value={nft.estimatedassetvalue}
                  className="w-[70px] outline-none bg-transparent text-center"
                  readOnly
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Image src={EtherIcon} alt="" className="w-3" />
              <div className="border-2 border-[#3f15e9] rounded-md px-2 py-1">
                <input
                  type="text"
                  value={(Number(nft.estimatedassetvalue) * ethValue).toFixed(3)}
                  className="w-[70px] outline-none bg-transparent text-center"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>  
        <div className="flex items-center justify-between pt-4">
          <p>Loan Amount:</p>
          <div className="w-[240px] flex justify-between">
            <div className="flex gap-2">
              <Image src={DollarIcon} alt="" className="w-3" />
              <div className="border-2 border-[#3f15e9] rounded-md px-2 py-1">
                <input
                  type="text"
                  value={nft.loanamount}
                  className="w-[70px] outline-none bg-transparent text-center"
                  readOnly
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Image src={EtherIcon} alt="" className="w-3" />
              <div className="border-2 border-[#3f15e9] rounded-md px-2 py-1">
                <input
                  type="text"
                  value={(Number(nft.loanamount) * ethValue).toFixed(3)}
                  className="w-[70px] outline-none bg-transparent text-center"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>  
        <div className="flex items-center justify-between pt-4">
          <p>Loan Rate:</p>
          <div className="w-[240px] flex gap-2">
            <Image src={PercentageIcon} alt="" className="w-3" />
            <div className="border-2 border-[#3f15e9] rounded-md px-2 py-1">
              <input
                type="text"
                value={nft.loanrate}
                className="w-[70px] outline-none bg-transparent text-center"
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between py-4">
          <p>Loan Term:</p>
          <div className="w-[240px] flex items-center gap-2">
            <Image src={TermIcon} alt="" className="w-3" />
            <div className="flex gap-2 border-2 border-[#3f15e9] rounded-md px-2 py-1">
              <input
                type="text"
                value={nft.loantermmonth}
                className="w-[70px] outline-none bg-transparent text-center"
                readOnly
              />              
            </div>
            <p>Months</p>
          </div>
        </div>        
        <Link href={`/dapp/marketplace/${nft._id}`} >
          <div className='transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md py-2 cursor-pointer'>
            <p className='text-sm text-center text-white'>MAKE BID</p>
          </div>          
        </Link>
      </div>
  );
}
