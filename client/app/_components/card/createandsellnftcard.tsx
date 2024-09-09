import Image, { StaticImageData } from 'next/image';
import { CreateandSellNFT1, CreateandSellNFT2, CreateandSellNFT3, CreateandSellNFT4 } from "@/assets/img";

interface IProps {
    title: string;
    content: string;
}

interface ItemImages {
    [key: string]: StaticImageData;
}

export function CreateandSellNFTCard({ title, content }: IProps) {      

    const titleImages: ItemImages = {
        'Set Up Your Wallet': CreateandSellNFT1,
        'Borrowing': CreateandSellNFT2,
        'Investing': CreateandSellNFT3,
        'Buy Distressed Assets': CreateandSellNFT4,
    };

    return (        
        <div className="flex flex-col items-center gap-4 h-auto lg:h-fit bg-[#14172E] rounded-md px-4 py-8">
            <Image src={titleImages[title]} alt=''/>
            <p className='font-bold text-lg md:text-xl text-white text-center'>{title}</p>
            <p className='text-sm md:text-base text-center text-white'>{content}</p>
        </div>
    )
}
