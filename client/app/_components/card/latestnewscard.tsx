import Image, { StaticImageData } from 'next/image';
import { LatestNews1, LatestNews2, LatestNews3 } from "@/assets/img";

interface IProps {
    date: string;
}

interface ItemImages {
    [key: string]: StaticImageData;
}

export function LatestNewsCard({ date }: IProps) {      

    const newsImages: ItemImages = {
        'August 14, 2023': LatestNews1,
        'August 16, 2023': LatestNews2,
        'August 21, 2023': LatestNews3,
    };

    return (        
        <div className="flex flex-col gap-2 bg-[#14172E] rounded-md p-4">
            <Image src={newsImages[date]} alt=''/>
            <p className='text-xs text-end text-white'>{date}</p>
        </div>
    )
}
