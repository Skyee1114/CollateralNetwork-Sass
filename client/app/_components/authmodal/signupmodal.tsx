'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";
import { IoCloseOutline } from "react-icons/io5";
import { useAuth } from '@/app/_context/authcontext';
import LoadingSpinner from '../loadingspinner';

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSignInClick: () => void;
    setModalType: (type: 'signin' | 'signup' | null) => void;
}

export function SignUpModal({isOpen, onClose, onSignInClick, setModalType}: SignUpModalProps) {     
    
    const {signup} = useAuth();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setEmail('');
            setName('');
            setPassword('');
            setConfirmPassword('');
            setErrorMessage('');
            setSuccessMessage('');
            setIsLoading(false);
            setIsDisabled(false);
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

    const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        return passwordRegex.test(password);
    };

    const validateName = (name: string) => {
        const nameRegex = /^[a-zA-Z0-9]+$/;
        return nameRegex.test(name);
    };

    const handleSignUp = async () => {
        if (!email || !name || !password || !confirmPassword) {
            setErrorMessage('All fields are required.');
            return;
        }
        if (!validateEmail(email)) {
            setErrorMessage('Invalid email format.');
            return;
        }
        if (!validateName(name)) {
            setErrorMessage('Username must only include letters and numbers.');
            return;
        }
        if (!validatePassword(password)) {
            setErrorMessage('Password must be at least 8 characters long and include one uppercase letter, one number, and one special character.');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }
        setErrorMessage('');
        setIsLoading(true);

        try {
            await signup(email, name, password);
            setSuccessMessage('Verification email sent. Please check your email.');
            setIsDisabled(true);
        } catch (err: any) {
            if (err.msg) {
                setErrorMessage(err.msg);
            } else {
                setErrorMessage('An unexpected error occurred.');
            }
        } finally {
            setIsLoading(false);
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
                        <p className='font-medium text-2xl text-center text-black'>Create an account</p>
                        <p className='text-sm text-center text-black pb-8'>Join us to start your journey.</p>
                        <div className='flex justify-center items-center gap-4 border rounded-md py-2 cursor-pointer'>
                            <FcGoogle className='text-xl'/>
                            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/api/google/`}>
                                <p className='text-black'>Sign up with Google</p>  
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
                                placeholder='User Name' 
                                className='outline-none border rounded-md px-4 py-2 w-full text-black'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />                        
                            <input 
                                type="email" 
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
                            <input 
                                type="password" 
                                placeholder='Confirm Password' 
                                className='outline-none border rounded-md px-4 py-2 text-black'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        {errorMessage && (
                            <div className="text-red-500 text-sm pt-2">{errorMessage}</div>
                        )}
                         {successMessage && (
                            <div className="text-green-500 text-sm pt-2">{successMessage}</div>
                        )}
                        <div 
                            className={`flex justify-center bg-black py-2 rounded-md cursor-pointer mt-4 ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                            onClick={!isDisabled ? handleSignUp : undefined}
                        >
                            {/* <p className='text-white text-center'>{isLoading ? 'Loading...' : 'Sign Up'}</p> */}
                            {isLoading ? <LoadingSpinner /> : <p className="text-center text-white">Sign Up</p>}
                        </div>

                        <div className='flex justify-center items-end gap-2 pt-4'>
                            <p className='text-sm text-black'>Already have an account?</p>
                            <p className='text-sm font-medium transition-colors duration-300 ease-in-out text-[#3f15e9] hover:text-[#3612C4] cursor-pointer' onClick={() => {
                                setModalType('signin');
                            }}>Sign in</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
