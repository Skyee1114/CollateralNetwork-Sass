import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { Assets1, Assets2, Assets3, Assets4, Assets5, Assets6 } from "@/assets/img";

interface IProps {
    title: string;
    fractionNo: string;
    value: string;
    roi: string;
    category: string;
    assetStatus: string;
    term: string;
    bid: string;
    action: string;
}

interface ItemImages {
    [key: string]: StaticImageData;
}

export function AssetsCard({ title, fractionNo, value, roi, category, assetStatus, term, bid, action }: IProps) {      

    const assetsImages: ItemImages = {
        'Holiday Home #0001': Assets1,
        'Watch #0002': Assets2,
        'NFT #0003': Assets3,
        'Yacht #0004': Assets4,
        'Chair #0005': Assets5,
        'Statue #0006': Assets6
    };

    return (        
        <div className="flex flex-col bg-[#14172E] rounded-md">  
            <div className='p-4'>
                <Image src={assetsImages[title]} alt="" className="rounded-md"/>
                <div>
                    <p className="font-bold text-2xl text-white py-2">{title}</p>
                    <div className="flex justify-between">
                        <p className="text-white">Fraction No</p>
                        <p className="text-[#00c853]">{fractionNo}</p>                                     
                    </div>
                    <div className="flex justify-between">
                        <p className="text-white">Value</p>
                        <p className="text-[#00c853]">{value} ETH</p>                                     
                    </div>
                    <div className="flex justify-between">
                        <p className="text-white">ROI</p>
                        <p className="text-[#00c853]">{roi} %</p>                                     
                    </div>
                    <div className="flex justify-between">
                        <p className="text-white">Category</p>
                        <p className="text-[#00c853]">{category}</p>                                     
                    </div>
                    {assetStatus && 
                        <div className="flex justify-between">
                            <p className="text-white">Asset Status</p>
                            <p className="text-[#00c853]">{assetStatus}</p>                                     
                        </div>
                    }
                    {term && 
                        <div className="flex justify-between">
                            <p className="text-white">Term</p>
                            <p className="text-[#00c853]">{term} Months</p>                                     
                        </div>
                    }  
                    {bid &&                         
                        <div className="flex justify-between">
                            <p className="text-white">Current Bid</p>
                            <p className="text-[#00c853]">{bid} ETH</p>                                     
                        </div>              
                    }                
                </div>
            </div>            
            <div className='transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md py-2 cursor-pointer'>
                <p className='text-sm text-center text-white'>{action}</p>
            </div>
        </div>
    )
}
