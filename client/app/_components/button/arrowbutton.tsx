import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

interface IProps {
    arrow: string;
}

const icons: { [key: string]: React.ElementType } = {
    "back": IoIosArrowBack,
    "forward": IoIosArrowForward,
  };

export function ArrowButton({ arrow }: IProps) {      

    const Icon = icons[arrow];

    return (        
        <div
            className={`transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4]  flex justify-center ${arrow == "back" ? "rounded-l-full" : "rounded-r-full"} py-1 xs:py-1.5 xl:py-2 px-1.5 xs:px-2 xl:px-3 cursor-pointer`}
        >
            <Icon className="text-base xs:text-lg xl:text-xl text-white"/>
        </div>
    )
}
