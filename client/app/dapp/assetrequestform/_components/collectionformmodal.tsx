import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import setAuthToken from "@/app/_utils/setauthtoken";
import { uploadCollection } from "@/app/_actions/collection";
import { Collection } from "@/app/_utils/type";

interface CollectionFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    addNewCollection: (newCollection: Collection) => void;
}

export default function CollectionFormModal({ isOpen, onClose, addNewCollection }: CollectionFormModalProps) {  

    const [collectionName, setCollectionName] = useState<string>("");
    const [marketplaceLink, setMarketplaceLink] = useState<string>("");
    const [socialLink, setSocialLink] = useState<string>("");
    const [assetLink, setAssetLink] = useState<string>("");

    const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleUploadCollection = async () => {    
        setAuthToken({ token: localStorage.token });
        try {
            const res = await uploadCollection({ collectionName, marketplaceLink, socialLink, assetLink });    
            toast.success("Your Collection successfully requested.");
            addNewCollection(res.newcollection); // Add new collection to the list
        } catch (err: any) {
          console.error(err);
          toast.error(err.msg); // Show error toast
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
                            <p className="text-white pb-2">NFT Collection Name:</p>
                            <input 
                                type="text" 
                                value={collectionName}
                                onChange={(e) => setCollectionName(e.target.value)}
                                className="w-full text-white outline-none border-2 border-[#3f15e9] bg-transparent rounded-md p-2"                 
                            />
                        </div>      
                        <div className="pt-6">
                            <p className="text-white pb-2">Collection Marketplace Link:</p>
                            <input 
                                type="text" 
                                value={marketplaceLink}
                                onChange={(e) => setMarketplaceLink(e.target.value)}
                                className="w-full text-white outline-none border-2 border-[#3f15e9] bg-transparent rounded-md p-2" 
                            />
                        </div> 
                        <div className="pt-6">
                            <p className="text-white pb-2">Collection Social Link:</p>
                            <input 
                                type="text" 
                                value={socialLink}
                                onChange={(e) => setSocialLink(e.target.value)}
                                className="w-full text-white outline-none border-2 border-[#3f15e9] bg-transparent rounded-md p-2" 
                            />
                        </div>   
                        <div className="pt-6">
                            <p className="text-white pb-2">Your Asset Link:</p>
                            <input 
                                type="text" 
                                value={assetLink}
                                onChange={(e) => setAssetLink(e.target.value)}
                                className="w-full text-white outline-none border-2 border-[#3f15e9] bg-transparent rounded-md p-2" 
                            />
                        </div> 
                        <div className="flex justify-center pt-8">
                            <div 
                                className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md px-4 py-2 cursor-pointer"
                                onClick={handleUploadCollection}
                            >
                                <p className="font-medium text-sm text-center text-white">Submit Collection Request</p>            
                            </div>
                        </div>
                    </div>
                </div>
            )}    
        </>          
    );
}
