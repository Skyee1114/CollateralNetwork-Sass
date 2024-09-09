'use client'

import { useState } from "react";
import { SignInModal } from "../authmodal/signinmodal";
import { SignUpModal } from "../authmodal/signupmodal";

export function RegisterNowButton() {      

    const [modalType, setModalType] = useState<'signin' | 'signup' | null>(null); // State to manage modal type
    const openSignUpModal = () => setModalType('signup');
    const closeModal = () => setModalType(null);

    const handleSignUpClick = () => {
        closeModal();
        setModalType('signup');
    };

    const handleSignInClick = () => {
        closeModal();
        setModalType('signin');
    };

    return (    
        <>
            <div
                onClick={openSignUpModal}
                className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] flex justify-center rounded-full py-2 px-6 cursor-pointer"
            >
                <p className="text-white font-medium text-sm">Register Now</p>
            </div>
            <SignInModal isOpen={modalType === 'signin'} onClose={closeModal} onSignUpClick={handleSignUpClick} setModalType={setModalType} />
            <SignUpModal isOpen={modalType === 'signup'} onClose={closeModal} onSignInClick={handleSignInClick} setModalType={setModalType} />
        </>    
        
    )
}
