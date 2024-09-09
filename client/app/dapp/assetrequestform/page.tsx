'use client'

import { useState, useEffect } from "react";
import { GalleryImport } from "iconsax-react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Collection } from "@/app/_utils/type";
import { getUserCollectionList } from "@/app/_actions/collection";
import CollectionFormModal from "./_components/collectionformmodal";

export default function AssetRequestForm() {
  
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchCollections = async () => {
      try {       
        const res = await getUserCollectionList();    
        setCollections(res.collections);    
        
      } catch (err: any) {
        console.error(err);      
      }
    };
    fetchCollections();
  }, []);

  const addNewCollection = (newCollection: Collection) => {
    setCollections(prevCollections => [...prevCollections, newCollection]);
  };

  return (
    <div>
      <ToastContainer className='text-sm'/>
      <div className="w-full max-w-[1280px] mx-auto px-5">
        <div className="flex justify-center items-center gap-2">
          <div className="hidden xs:block">
            <GalleryImport size="36" color="#ffffff"/>
          </div>
          <div className="block xs:hidden">
            <GalleryImport size="24" color="#ffffff"/>
          </div>
          <p className="text-3xl xs:text-4xl text-white">Asset Request Form</p>
        </div>
        <p className="text-sm xs:text-base text-center text-white pt-8">To ensure we’re aligning with your needs and preferences, we’re introducing an Asset Request Form. This is your chance to let us know which NFT assets you’d like to see accepted on the platform. Your input is crucial as we prepare the NFT metadata for the collections you’ll want to use as collateral for loans at lunch.</p>
        
        <div className="pt-12">
          <div className="bg-[#14172E] rounded-md p-4 overflow-auto lg:overflow-hidden">
            <div className='flex justify-between items-center pb-4'>
              <p className='font-bold text-xl xs:text-2xl text-white'>Collection Requested</p>              
              <div className="hidden xs:block">
                <GalleryImport size="36" color="#ffffff"/>
              </div>
              <div className="block xs:hidden">
                <GalleryImport size="24" color="#ffffff"/>
              </div>
            </div>
            <table className="w-full table-fixed text-white min-w-[1024px]">
              <thead className="text-sm bg-[#3f15e9]">
                <tr>
                  <th className="font-normal text-left p-4 w-1/6">Date - Time</th>
                  <th className="font-normal text-left p-4 w-1/6">Collection Name</th>
                  <th className="font-normal text-left p-4 w-1/6">Marketplace Link</th>
                  <th className="font-normal text-left p-4 w-1/6">Social Link</th>
                  <th className="font-normal text-left p-4 w-1/6">Asset Link</th>
                  <th className="font-normal text-left p-4 w-1/6">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {collections.map((collection, index) => (
                  <tr key={collection._id} className={index % 2 === 1 ? '' : 'bg-[#060A1E]'}>
                    <td className="p-4 w-1/6 break-words whitespace-normal">{new Date(collection.date).toLocaleString()}</td>
                    <td className="p-4 w-1/6 break-words whitespace-normal">{collection.collectionname}</td>
                    <td className="p-4 w-1/6 break-words whitespace-normal"><a href={collection.marketplacelink} target="_blank" rel="noopener noreferrer" className="text-blue-400">{collection.marketplacelink}</a></td>
                    <td className="p-4 w-1/6 break-words whitespace-normal"><a href={collection.sociallink} target="_blank" rel="noopener noreferrer" className="text-blue-400">{collection.sociallink}</a></td>
                    <td className="p-4 w-1/6 break-words whitespace-normal"><a href={collection.assetlink} target="_blank" rel="noopener noreferrer" className="text-blue-400">{collection.assetlink}</a></td>
                    <td className="p-4 w-1/6 break-words whitespace-normal">{collection.allowed == 0 ? 'Pending' : collection.allowed == 1 ? 'Accepted' : 'Declined'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {collections.length > 0 ? <></> : <div className="pt-4 text-white">
              <p className="text-center text-sm">No Asset Request Forms Submitted</p>
            </div>
            }            
            <div className="flex justify-center pt-4">
              <div 
                className="w-[160px] transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md py-2 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <p className="text-sm text-center text-white">Add New Submission</p>            
              </div>
            </div>            
          </div>
        </div>
        <CollectionFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} addNewCollection={addNewCollection}/>
      </div>
    </div>    
  );
}
