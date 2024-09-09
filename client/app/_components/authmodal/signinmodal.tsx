'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";
import { IoCloseOutline } from "react-icons/io5";
import { useAuth, } from '@/app/_context/authcontext';
import { loadUser } from '@/app/_actions/auth';

interface SignInModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSignUpClick: () => void;
    setModalType: (type: 'signin' | 'signup' | null) => void;
}

export function SignInModal({isOpen, onClose, onSignUpClick, setModalType}: SignInModalProps) {      

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [twofaCode, setTwofaCode] = useState('');
    const [isTwofaModalOpen, setIsTwofaModalOpen] = useState(false);
    const router = useRouter();
    const { signin, sendVerifyTwofaCode } = useAuth();    

    useEffect(() => {
        if (!isOpen) {
            setEmail('');
            setPassword('');
            setErrorMessage('');
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    // Close modal if user clicks outside of it
    const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignIn = async () => {
        if (!email || !password) {
            setErrorMessage('All fields are required.');
            return;
        }
        if (!validateEmail(email)) {
            setErrorMessage('Invalid email format.');
            return;
        }
        setErrorMessage('');

        try {
            await signin(email, password);
            const res = await loadUser();
            
            if (res.user.twofa) {
                setIsTwofaModalOpen(true);
                onClose();
            } else {
                router.push('/dapp/dashboard');
            }
            
        } catch (err: any) {
            if (err.msg) {
                setErrorMessage(err.msg);
            } else {
                setErrorMessage('An unexpected error occurred.');
            }
        }
    };

    const handleTwofaVerification = async () => {
        try {
            await sendVerifyTwofaCode(twofaCode);
            
            router.push('/dapp/dashboard');
        } catch (err: any) {
            if (err.msg) {
                setErrorMessage(err.msg);
            } else {
                setErrorMessage('Invalid verification code.');
            }
        }
    };

    return (      
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={handleOutsideClick}>
                    <div className="bg-white w-full xs:w-[480px] h-full xs:h-auto p-16 rounded-none xs:rounded-md relative" onClick={(e) => e.stopPropagation()}>
                        <div 
                            className='absolute top-4 right-4 cursor-pointer'
                            onClick={onClose}
                        >
                            <IoCloseOutline className='text-2xl text-gray-500 hover:text-black transition-colors duration-300 ease-in-out'/>
                        </div>                        
                        <p className='font-medium text-2xl text-center text-black'>Login to your account</p>
                        <p className='text-sm text-center text-black pb-8'>You must be logged in to perform this action.</p>
                        <div className='flex justify-center items-center gap-4 border rounded-md py-2 cursor-pointer'>
                            <FcGoogle className='text-xl'/>
                            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/api/google/`}>
                                <p className='text-black'>Continue with Google</p>            
                            </Link>                                            
                        </div>

                        <div className='flex justify-between items-center gap-4 pt-8'>
                            <div className='border-b w-full'></div>
                            <p className='text-black'>OR</p>
                            <div className='border-b w-full'></div>
                        </div>

                        <div className='flex flex-col gap-2 pt-8'>
                            <input 
                                type="text" 
                                placeholder='Email Address' 
                                className='outline-none border rounded-md px-4 py-2 text-black'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input 
                                type="password" 
                                placeholder='Password' 
                                className='outline-none border rounded-md px-4 py-2 text-black'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {errorMessage && (
                            <div className="text-red-500 text-sm pt-2">{errorMessage}</div>
                        )}

                        <div className='pt-2 pb-4'>
                            <p className='text-sm cursor-pointer text-black'>Forgot your Password?</p>
                        </div>                        

                        <div 
                            className='bg-black py-2 rounded-md cursor-pointer'
                            onClick={handleSignIn}
                        >
                            <p className='text-white text-center'>Continue</p>
                        </div>

                        <div className='flex justify-center items-end gap-2 pt-4'>
                            <p className='text-sm text-black'>Don’t have an account?</p>
                            <p className='text-sm font-medium transition-colors duration-300 ease-in-out text-[#3f15e9] hover:text-[#3612C4] cursor-pointer' onClick={() => {
                                setModalType('signup');
                            }}>Sign up</p>
                        </div>
                       
                    </div>
                </div>
            )}

            {isTwofaModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white w-full xs:w-[480px] h-full xs:h-auto p-16 rounded-none xs:rounded-md relative">
                        <div
                            className='absolute top-4 right-4 cursor-pointer'
                            onClick={() => setIsTwofaModalOpen(false)}
                        >
                            <IoCloseOutline className='text-2xl text-gray-500 hover:text-black transition-colors duration-300 ease-in-out' />
                        </div>
                        <p className='font-medium text-2xl text-center text-black'>Enter Verification Code</p>
                        <p className='text-sm text-center text-black pb-8'>A verification code was sent to your phone. Please enter the 6-digit code to continue.</p>
                        <div className='flex flex-col gap-2 pt-8'>
                            <input
                                type="text"
                                maxLength={6}
                                placeholder='Verification Code'
                                className='outline-none border rounded-md px-4 py-2 text-center text-black'
                                value={twofaCode}
                                onChange={(e) => setTwofaCode(e.target.value)}
                            />
                        </div>

                        {errorMessage && (
                            <div className="text-red-500 text-sm pt-2">{errorMessage}</div>
                        )}

                        <div
                            className='bg-black py-2 rounded-md cursor-pointer mt-4'
                            onClick={handleTwofaVerification}
                        >
                            <p className='text-white text-center'>Verify Code</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
