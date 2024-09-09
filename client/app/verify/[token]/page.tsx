'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_context/authcontext";

export default function Verify({ params }: { params: { token: string } }) {

  const token = decodeURIComponent(params.token)
  const router = useRouter();

  const {verifytoken} = useAuth();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await verifytoken(token); 
        router.push('/dapp/dashboard');
      } catch (err) {
      }
    };
    verifyToken();
  }, [token]);
    
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <p className="text-white">Loading...</p>
    </div>
  );
}
