'use client'
import { useState } from "react";

interface NameModalProps {
    tempName: string;
    setTempName: (value: string) => void;
    handleSaveName: () => void;
    errorMessage: string;
  }

export default function NameModal({ tempName, setTempName, handleSaveName, errorMessage }: NameModalProps) {  
    const [validationError, setValidationError] = useState<string>('');

    const validateName = () => {
        const isValid = /^[a-zA-Z0-9]+$/.test(tempName);
        if (!isValid) {
        setValidationError('Username must only include letters and numbers.');
        } else {
        setValidationError('');
        handleSaveName();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999]">
            <div className="bg-white w-full xs:w-[480px] h-full xs:h-auto p-16 rounded-none xs:rounded-md relative z-10">
                <p className='font-medium text-2xl text-center text-black'>Please enter your username</p>
                <p className='text-sm text-center text-black'>Only letters and numbers allowed.</p>
                <div className='pt-8'>
                <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder="Username"
                    className="w-full outline-none border rounded-md px-4 py-2 text-black"
                />
                </div>
                {errorMessage && <div className="text-red-500 text-sm pt-2">{errorMessage}</div>}
                {validationError && <div className="text-red-500 text-sm pt-2">{validationError}</div>}
                <div
                className='bg-black py-2 rounded-md cursor-pointer mt-4'
                onClick={validateName}
                >
                <p className='text-white text-center'>Save</p>
                </div>
            </div>
        </div>        
    );
}
