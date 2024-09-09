import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import setAuthToken from "@/app/_utils/setauthtoken";
import { distributeICO } from "@/app/_actions/admin";
import { Ico } from "@/app/_utils/type";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    updateClaimedIco: (updatedIco: Ico) => void;
    walletaddress: string;
}

export default function DistributionTransactionModal({ isOpen, onClose, updateClaimedIco, walletaddress }: ModalProps) {  

    const [distributionTransaction, setDistributionTransaction] = useState<string>("");

    const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleDistributeICO = async () => {    
        setAuthToken({ token: localStorage.token });
        try {
            const res = await distributeICO({ walletaddress, distributionTransaction });    
            toast.success("Distribution Transaction Hash successfully added.");
            updateClaimedIco(res.ico);
        } catch (err: any) {
          console.error(err);
          toast.error("Failed to add Distribution Transaction Hash."); // Show error toast
        }            
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999]" onClick={handleOutsideClick}>
                    <div className="bg-[#14172E] w-full sm:w-[600px] h-full sm:h-auto p-8 rounded-none sm:rounded-md relative" onClick={(e) => e.stopPropagation()}>
                        <div 
                            className='absolute top-4 right-4 cursor-pointer'
                            onClick={onClose}
                        >
                            <IoCloseOutline className='text-2xl text-white hover:text-gray-500 transition-colors duration-300 ease-in-out'/>
                        </div> 
                        <div>
                            <p className="text-white pb-2">Distribution Transaction Hash:</p>
                            <input 
                                type="text" 
                                value={distributionTransaction}
                                onChange={(e) => setDistributionTransaction(e.target.value)}
                                className="w-full text-white outline-none border-2 border-[#3f15e9] bg-transparent rounded-md p-2"                 
                            />
                        </div>                              
                        <div className="flex justify-center pt-8">
                            <div 
                                className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md px-4 py-2 cursor-pointer"
                                onClick={handleDistributeICO}
                            >
                                <p className="font-medium text-sm text-center text-white">Add Distribution Transaction Hash</p>            
                            </div>
                        </div>
                    </div>
                </div>
            )}    
        </>          
    );
}
