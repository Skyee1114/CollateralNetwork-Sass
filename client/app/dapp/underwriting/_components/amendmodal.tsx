'use client'

import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface AmendModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleStageAsset: (amendContent: string) => void;
}

export default function AmendModal({ isOpen, onClose, handleStageAsset }: AmendModalProps) {

  const [amendContent, setAmendContent] = useState('');

  const handleSave = () => {
    handleStageAsset(amendContent);
    setAmendContent('');
    onClose();
  };

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
        onClose();
    }
  };

    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={handleOutsideClick}>
            <div className="bg-white w-[680px] p-8 rounded-md relative" onClick={(e) => e.stopPropagation()}>
              <div 
                className='absolute top-4 right-4 cursor-pointer'
                onClick={onClose}
              >
                <IoCloseOutline className='text-2xl text-gray-500 hover:text-black transition-colors duration-300 ease-in-out'/>
              </div>   
              <div className="flex flex-col gap-4">
                <p className="font-bold text-2xl text-center text-[#3f15e9]">Amend Asset</p>
                <textarea 
                  rows={6}
                  className="w-full text-black outline-none border-2 border-[#3f15e9] rounded-md p-4"
                  placeholder="Enter amendment details..."
                  value={amendContent}
                  onChange={(e) => setAmendContent(e.target.value)}
                />
                <div
                  className='transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md py-2 cursor-pointer'
                  onClick={handleSave}
                >
                  <p className='text-center text-white'>Save</p>
                </div>
              </div>              
            </div>
          </div>
        )}
      </>
    );
}
