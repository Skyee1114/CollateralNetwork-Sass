'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { SignInModal } from "./authmodal/signinmodal";
import { SignUpModal } from "./authmodal/signupmodal";
import { useAuth } from "../_context/authcontext";
import { ColtLogo } from "@/assets/img";


export function TopNavbar() {    

    const {isAuthenticated} = useAuth();
    const [modalType, setModalType] = useState<'signin' | 'signup' | null>(null); // State to manage modal type
    const openSignInModal = () => setModalType('signin');
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

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="sticky bg-black top-0 z-[999] w-full mx-auto">
            <div className="flex justify-between items-center px-5 py-4">
                <div className="flex items-center">
                    <Link href="/">
                        <Image src={ColtLogo} alt="" className="w-[24px] mr-3"/>
                    </Link>                        
                    <p className="hidden xs:block font-medium text-white text-2xl">Collateral Network</p>
                </div>
                <div className="hidden xl:block">
                    <div className="flex items-center gap-8">
                        {isAuthenticated && <Link href="/dapp/dashboard">
                            <p className="text-white text-lg">App</p>
                        </Link>
                        }                        
                        <Link href="/howitworks">
                            <p className="text-white text-lg">How it Works</p>
                        </Link>
                        <Link href="/becomeaninvestor">
                            <p className="text-white text-lg">Become an Investor</p>
                        </Link>
                        <Link href="/becomeaborrower">
                            <p className="text-white text-lg">Become a Borrower</p>
                        </Link>     
                        <Link href="https://whitepaper.collateralnetwork.io/" target="_blank">
                            <p className="text-white text-lg">Whitepaper</p>
                        </Link>     
                        <p className="text-white text-lg cursor-pointer" onClick={openSignUpModal}>Register</p>   
                        <p className="text-white text-lg cursor-pointer" onClick={openSignInModal}>Sign in</p>                     
                    </div> 
                </div>  
                <div className="block xl:hidden">
                    <GiHamburgerMenu className="text-2xl text-white cursor-pointer" onClick={toggleMobileMenu}/>
                </div>                        
            </div>   
            {isMobileMenuOpen && (
                <div className="bg-[#14172E] w-full absolute xl:hidden border-t shadow-md">
                    <div className='flex flex-col gap-4 px-4 py-3 text-white'>
                        {isAuthenticated && <Link href="/dapp/dashboard">
                            <p className="">App</p>
                        </Link>
                        }
                        <Link href="/howitworks">
                            <p className="">How it Works</p>
                        </Link>
                        <Link href="/becomeaninvestor">
                            <p className="">Become an Investor</p>
                        </Link>
                        <Link href="/becomeaborrower">
                            <p className="">Become a Borrower</p>
                        </Link> 
                        <Link href="https://whitepaper.collateralnetwork.io/" target="_blank">
                            <p className="">Whitepaper</p>
                        </Link>    
                        <p className="cursor-pointer" onClick={openSignUpModal}>Register</p>       
                        <p className="cursor-pointer" onClick={openSignInModal}>Sign in</p>                                                
                    </div>
                </div>
            )}
            <SignInModal isOpen={modalType === 'signin'} onClose={closeModal} onSignUpClick={handleSignUpClick} setModalType={setModalType} />
            <SignUpModal isOpen={modalType === 'signup'} onClose={closeModal} onSignInClick={handleSignInClick} setModalType={setModalType} />
        </div>
    );
}
