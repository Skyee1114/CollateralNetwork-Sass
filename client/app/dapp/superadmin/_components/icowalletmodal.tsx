import { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import setAuthToken from "@/app/_utils/setauthtoken";
import { updateICO } from "@/app/_actions/admin";
import { Ico } from "@/app/_utils/type";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    updateIco: () => void;
    ico: Ico;
}

export default function ICOWalletModal({ isOpen, onClose, updateIco, ico }: ModalProps) {  

    const [walletAddress, setWalletAddress] = useState(ico.walletaddress || "");
    const [purchasedTokens, setPurchasedTokens] = useState(ico.purchasedtoken || 0);
    const [bonusTokens, setBonusTokens] = useState(ico.bonustoken || 0);
    const totalTokens = purchasedTokens + bonusTokens;

    useEffect(() => {
        if (ico) {
            setWalletAddress(ico.walletaddress || "");
            setPurchasedTokens(ico.purchasedtoken || 0);
            setBonusTokens(ico.bonustoken || 0);
        }
    }, [ico]);

    const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleUpdateICO = async () => {    
        setAuthToken({ token: localStorage.token });
        try {
            const res = await updateICO({ previouswalletaddress: ico.walletaddress, newwalletaddress: walletAddress, purchasedtoken: purchasedTokens, bonustoken: bonusTokens });    
            toast.success("Successfully updated.");
            updateIco();
        } catch (err: any) {
          console.error(err);
          toast.error("Failed to update."); // Show error toast
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
                        <p className='font-medium text-2xl text-center text-white'>Update User ICO</p>
                        <div className="pt-8">
                            <div>
                                <p className="text-white pb-2">Wallet Address:</p>
                                <input 
                                    type="text" 
                                    value={walletAddress}
                                    onChange={(e) => setWalletAddress(e.target.value)}
                                    className="w-full text-white outline-none border-2 border-[#3f15e9] bg-transparent rounded-md p-2"                 
                                />
                            </div> 
                            <div className="pt-4">
                                <p className="text-white pb-2">Purchased Token:</p>
                                <input 
                                    type="number" 
                                    value={purchasedTokens}
                                    onChange={(e) => setPurchasedTokens(parseInt(e.target.value))}
                                    className="w-full text-white outline-none border-2 border-[#3f15e9] bg-transparent rounded-md p-2"                 
                                />
                            </div>      
                            <div className="pt-4">
                                <p className="text-white pb-2">Bonus Token:</p>
                                <input 
                                    type="number" 
                                    value={bonusTokens}
                                    onChange={(e) => setBonusTokens(parseInt(e.target.value))}
                                    className="w-full text-white outline-none border-2 border-[#3f15e9] bg-transparent rounded-md p-2"                 
                                />
                            </div> 
                            <div className="pt-4">
                                <p className="text-white pb-2">Total Token:</p>
                                <input 
                                    type="number"
                                    value={totalTokens}
                                    disabled
                                    className="w-full text-white outline-none border-2 border-[#3f15e9] bg-transparent rounded-md p-2"                 
                                />
                            </div>    
                            <div className="pt-4">
                                <p className="text-white pb-2">Email:</p>
                                <input 
                                    type="text"
                                    value={ico.email}
                                    disabled
                                    className="w-full text-white outline-none border-2 border-[#3f15e9] bg-transparent rounded-md p-2"                 
                                />
                            </div>    
                        </div>
                                               
                        <div className="flex justify-center pt-8">
                            <div 
                                className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md px-4 py-2 cursor-pointer"
                                onClick={handleUpdateICO}
                            >
                                <p className="font-medium text-sm text-center text-white">Save</p>            
                            </div>
                        </div>
                    </div>
                </div>
            )}    
        </>          
    );
}
