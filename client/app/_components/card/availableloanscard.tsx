import Image, { StaticImageData } from 'next/image';
import { Check } from "./check";
import { Seller1, Seller2, Seller3, Seller4, NFT1, NFT2, NFT3, NFT4 } from "@/assets/img";

interface IProps {
    name: string;
}

interface ItemImages {
    [key: string]: StaticImageData;
}

export function AvailableLoansCard({ name, }: IProps) {      

    const sellerImages: ItemImages = {
        '1': Seller1,
        '2': Seller2,
        '3': Seller3,
        '4': Seller4,
    };

    const availableloansImages: ItemImages = {
        '1': NFT1,
        '2': NFT2,
        '3': NFT3,
        '4': NFT4,
    };

    return (        
        <div className="flex flex-col gap-4 bg-[#14172E] rounded-md p-4">
            <div className="flex items-center relative">
                <Image src={sellerImages[name]} alt="" className="w-10 rounded-full bg-[#bdbdbd]"/>
                <p className="text-lg xl:text-xl text-white pl-5">Launching Soon...</p>
                <div className="absolute left-6 top-6">
                    <Check />
                </div>
            </div>
            <div className="relative">
                <Image src={availableloansImages[name]} alt="" className="rounded-md"/>               
            </div>
            <div>
                <p className="font-bold text-lg xl:text-xl text-white">Total Loan Required</p>
                <div className="flex gap-4">
                    <p className="text-sm xl:text-base text-white">Value</p>
                    <p className="text-sm xl:text-base text-white">Launching Soon</p>                    
                </div>
            </div>
        </div>
    )
}
