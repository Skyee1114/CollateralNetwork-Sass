import { Notepad2 } from "iconsax-react";
import { ArrowButton } from "./button/arrowbutton";
import { AvailableLoansCard } from "./card/availableloanscard";

export function AvailableLoans() {      

    return (        
        <div className="bg-[#050a1f] p-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="hidden xs:block">
                        <Notepad2 size="36" color="#ffffff"/>
                    </div>
                    <div className="block xs:hidden">
                        <Notepad2 size="24" color="#ffffff"/>
                    </div>
                    <p className="text-lg xs:text-xl lg:text-2xl xl:text-3xl text-white ml-4">Available Loans</p>
                </div>
                <div className="flex gap-2 xs:gap-4">
                    <ArrowButton arrow="back"/>
                    <ArrowButton arrow="forward"/>
                </div>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-8">
                <AvailableLoansCard name="1"/>
                <AvailableLoansCard name="2"/>
                <AvailableLoansCard name="3"/>
                <AvailableLoansCard name="4"/>
            </div>
        </div>
    )
}
