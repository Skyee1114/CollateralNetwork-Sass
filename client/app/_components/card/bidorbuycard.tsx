import Image, { StaticImageData } from 'next/image';
import { Heart } from "iconsax-react";
import { Check } from "./check";
import { Seller4, Seller2, Seller3, Seller10, Seller7, Seller15, Seller8, Seller12, BidorBuy1, BidorBuy2, BidorBuy3, BidorBuy4, BidorBuy5, BidorBuy6, BidorBuy7, BidorBuy8 } from "@/assets/img";

interface IProps {
    name: string;
    love: string;
    assetName: string;
    loanRate: string;
    totalLoan: string;
}

interface ItemImages {
    [key: string]: StaticImageData;
}

export function BidorBuyCard({ name, love, assetName, loanRate, totalLoan }: IProps) {      

    const sellerImages: ItemImages = {
        'Aodh Apeldoorn': Seller4,
        'Funmilayo Mullane': Seller2,
        'Vladan Bernard': Seller3,
        'Kenaniah Dunkel': Seller10,
        'Kōki Smolak': Seller7,
        'Gasto Etxebarria': Seller15,
        'Hodel Jean': Seller8,
        'Haumea Costa': Seller12,
    };

    const bidorbuyImages: ItemImages = {
        'Aodh Apeldoorn': BidorBuy1,
        'Funmilayo Mullane': BidorBuy2,
        'Vladan Bernard': BidorBuy3,
        'Kenaniah Dunkel': BidorBuy4,
        'Kōki Smolak': BidorBuy5,
        'Gasto Etxebarria': BidorBuy6,
        'Hodel Jean': BidorBuy7,
        'Haumea Costa': BidorBuy8,
    };

    return (        
        <div className="flex flex-col gap-4 bg-[#14172E] rounded-md p-4">
            <div className="flex items-center relative">
                <Image src={sellerImages[name]} alt="" className="w-10 rounded-full bg-[#bdbdbd]"/>
                <p className="font-medium text-xl text-white pl-5">{name}</p>
                <div className="absolute left-6 top-6">
                    <Check />
                </div>
            </div>
            <div className="relative">
                <Image src={bidorbuyImages[name]} alt="" className="rounded-md"/>
                <div className="flex justify-center items-center absolute bottom-0 w-full h-12 transition-colors duration-300 ease-in-out bg-[#a9a9a9] bg-opacity-0 hover:bg-opacity-70 rounded-md text-white cursor-pointer">
                    <div className="relative pr-4">
                        <Heart size="24" color="#F44336" variant="Bold"/>
                        <div className="absolute top-0 right-4 transform translate-x-1/2 -translate-y-1/2 flex items-center text-xs text-white bg-[#2196f3] rounded-full py-0.5 px-1">
                            {love}
                        </div>
                    </div>   
                </div>
            </div>
            <div>
                <p className="font-bold text-xl text-white">{assetName}</p>
                <div className="flex justify-between">
                    <p className="text-white">Loan Rate On Offer</p>
                    <p className="text-[#00c853]">{loanRate} %</p>                                     
                </div>
                <div className="flex justify-between">
                    <p className="text-white">Total Loan Required</p>
                    <p className="text-[#00c853]">{totalLoan} ETH</p>                                     
                </div>
            </div>
        </div>
    )
}
