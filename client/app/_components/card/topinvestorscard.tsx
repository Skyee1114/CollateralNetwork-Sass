import Image, { StaticImageData } from 'next/image';
import { Heart } from "iconsax-react";
import { Check } from "./check";
import { Seller1, Seller2, Seller3, Seller4, Seller5, Seller6, Seller7, Seller8, Seller9, Seller10, Seller11, Seller12, Seller13, Seller14, Seller15 } from "@/assets/img";

interface IProps {
    number: string;
    name: string;
    amount: string;
}

interface ItemImages {
    [key: string]: StaticImageData;
}

export function TopInvestorsCard({ number, name, amount }: IProps) {      

    const investorImages: ItemImages = {
        'Astaroth Alvin': Seller12,
        'Harri Maślanka': Seller14,
        'Melchior Acquarone': Seller7,
        'Cory Andreas': Seller9,
        'Bontu Jankovic': Seller11,
        'Rochus Capello': Seller13,
        'Tércio Sokół': Seller4,
        'Ove Kempf': Seller2,
        'Jens Lesauvage': Seller3,
        'Indrani Waller': Seller10,
        'Katy Larue': Seller6,
        'Christian Colón': Seller5,
        'Tiitus Ashworth': Seller15,
        'Tacitus Adebayo': Seller1,
        'Lenz De Jong': Seller8,
    };

    return (        
        <div className="flex gap-8 bg-[#14172E] rounded-md p-4">
            <p className='text-[#00c853] text-sm'>{number}</p>
            <div className='flex'>
                {/* <div className="flex items-center relative">
                    <Image src={investorImages[name]} alt="" className="w-10 rounded-full bg-[#bdbdbd]"/>
                    <div className='pl-5'>
                        <p className='font-bold text-xl text-white'>{name}</p>
                        <p className='text-[#00c853]'>{amount} ETH</p>
                    </div>
                    <div className="absolute left-6 top-8">
                        <Check />
                    </div>
                </div>                 */}
                <p className='text-base lg:text-lg xl:text-xl text-white text-center'>Launching Soon...</p>
            </div>
        </div>
    )
}
