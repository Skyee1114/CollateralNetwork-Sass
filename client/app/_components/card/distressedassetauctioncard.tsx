import Image, { StaticImageData } from 'next/image';
import { Heart } from "iconsax-react";
import { Check } from "./check";
import { Seller4, Seller1, Seller6, Seller7, NFT5, NFT6, NFT7, NFT8 } from "@/assets/img";

interface IProps {
    assetName: string;
    amount: string;
}

interface ItemImages {
    [key: string]: StaticImageData;
}

export function DistressedAssetAuctionCard({ assetName, amount }: IProps) {      

    const sellerImages: ItemImages = {
        'Yacht': Seller4,
        'Holiday Home': Seller1,
        'Watch': Seller6,
        'Fine Art': Seller7,
    };

    const distressedassetauctionImages: ItemImages = {
        'Yacht': NFT5,
        'Holiday Home': NFT6,
        'Watch': NFT7,
        'Fine Art': NFT8,
    };

    return (        
        <div className="bg-[#14172E] rounded-md p-4">
            
            <div className="relative">
                <Image src={distressedassetauctionImages[assetName]} alt="" className="rounded-md"/>
            </div>
            <div className='pt-4'>
                <p className='text-base lg:text-lg xl:text-xl text-white'>Launching Soon...</p>
            </div>
        </div>
    )
}
