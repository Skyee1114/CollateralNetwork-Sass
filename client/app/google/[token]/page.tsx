'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_context/authcontext";
import setAuthToken from "@/app/_utils/setauthtoken";
import { loadUser } from "@/app/_actions/auth";

export default function Google({ params }: { params: { token: string } }) {

  const token = decodeURIComponent(params.token)
  const router = useRouter();

  const {verifyUser} = useAuth();

  useEffect(() => {
    localStorage.setItem('token', token);       
    setAuthToken({token: localStorage.token});      
    const verifyuser = async () => {
      try {
        verifyUser(); 
        const res = await loadUser();
        if(res.user.name) {
          router.push('/dapp/dashboard');
        } else {
          router.push('/dapp/profile')
        }
        
      } catch (err) {
      }
    };
    verifyuser();
  }, [token]);
    
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <p className="text-white">Loading...</p>
    </div>
  );
}
