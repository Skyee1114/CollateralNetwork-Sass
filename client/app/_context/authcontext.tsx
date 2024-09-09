'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useActiveAccount } from 'thirdweb/react';
import { register, verify, login, logout, loadUser, verifyTwofa, verifyTwofaCode } from '../_actions/auth';
import setAuthToken from '../_utils/setauthtoken';

interface AuthContextProps {
    user: any;
    signin: (email: string, password: string) => Promise<void>;
    signup: (email: string, name: string, password: string) => Promise<void>;
    verifytoken: (token: string) => Promise<void>;
    verifyUser: () => void;
    sendVerifyTwofaCode: (code: string) => Promise<void>;
    signout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
    isAdmin: boolean;
    isAdminLoading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

const adminWallets = [
    "0x9948DAD58034646EC7f4D73Fbc7dBfD2F0077512", 
    "0xd2897F7145D3BDc033Bf50c19b17Fb4D79F571f3", 
    "0x0ECEE76BF2e99C18f2d77aA35a93fC3235aac293", 
    "0x805B8e3C5Db9049Df85ED1D2fD70Dc71a94EF5a2", 
    "0x140c2a0a3adc246f9fa42f8eccd144711b24ade9"
];

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<any>(null);
    const [isAuthenticated, setAuthenticate] = useState<boolean>(false);
    const [isTwofaVerified, setTwofaVerified] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);    
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isAdminLoading, setAdminLoading] = useState<boolean>(true);
    const router = useRouter();
    const wallet = useActiveAccount();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                setAuthToken({ token });
                verifyUser();
            } else {
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        if (wallet?.address) {                        
            setIsAdmin(adminWallets.includes(wallet.address));
        } else {
            setIsAdmin(false);
        }
        setAdminLoading(false);
    }, [wallet]);

    const sendVerifyTwofa = async () => {
        try {
            await verifyTwofa();
        } catch (error: any) {
            console.error('SMS verification failed:', error);
        }
    };

    const sendVerifyTwofaCode = async (code: string) => {
        try {
            await verifyTwofaCode({twofaCode: code});
            setTwofaVerified(true);
            setAuthenticate(true);
        } catch (error: any) {
            console.error('SMS verification failed:', error);
        }
    };

    const verifyUser = async () => {
        try {
            const res = await loadUser();
            setUser(res.user);
            if(res.user.twofa) {           
                if(isTwofaVerified){
                    setAuthenticate(true);  
                } else {
                    try {
                        await sendVerifyTwofa();                    
                    } catch (error: any) {
                        console.error('SMS verification failed:', error);
                    }
                }                  
            } else {
                setAuthenticate(true);  
            }            
        } catch (error: any) {                
            console.error('Failed to load user:', error);
        } finally {
            setLoading(false);
        }
    }

    const verifytoken = async (token: string) => {
        try {
            const res = await verify({ token });
            localStorage.setItem('token', res.token);
            setAuthToken({token: res.token});  
            await verifyUser();
        } catch (error: any) {
            console.error('Token verification failed:', error);
        }
    };

    const signin = async (email: string, password: string) => {
        try {
            const res = await login({ email, password });
            localStorage.setItem('token', res.token);
            setAuthToken({token: res.token});
            await verifyUser();   
        } catch (error: any) {
            throw { msg: error.msg };
        }
    };

    const signup = async (email: string, name: string, password: string) => {
        try {
            await register({ email, name, password });                       
        } catch (error: any) {
            throw { msg: error.msg };
        }
    };

    const signout = async () => {
        if(user.password)
        {
            localStorage.removeItem('token');
            setAuthToken({token: ''});
            setUser(null);
            setAuthenticate(false);
            router.push('/');
            
        } else {            
            try {                
                await logout();  
                localStorage.removeItem('token');
                setAuthToken({token: ''});
                setUser(null);
                setAuthenticate(false);  
                router.push('/');            
            } catch (error: any) {
                throw { msg: error.msg };
            }      
        }   
    };

    return (
        <AuthContext.Provider value={{ user, signin, signup, verifytoken, verifyUser, sendVerifyTwofaCode, signout, isAuthenticated, isLoading, isAdmin, isAdminLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
