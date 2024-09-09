'use client'

import { useState, useRef } from "react";
import Image from "next/image";
import { I24Support } from "iconsax-react";
import { MdPlayCircle, MdPauseCircle } from "react-icons/md";
import { SupportIcon } from "@/assets/img";

interface VideoLink {
  [key: string]: string;
}

interface Time {
  [key: string]: string;
}

export default function SupportCenter() {

  const videoLinks: VideoLink = {
    "How Do I Request A New Collection, Ready for Launch?": "https://storage.cloud.google.com/collateralnetworkvideos/COLT-SaaS-Tutorial-01.mov",
    "What Is The Connect Wallet Feature Used For?": 'https://storage.cloud.google.com/collateralnetworkvideos/COLT-SaaS-Tutorial-02.mov',
    "Why Can't I See My Tokens On The Dashboard?": 'https://storage.cloud.google.com/collateralnetworkvideos/COLT-SaaS-Tutorial-03.mov',
    "What Is The Dashboard For?": "https://storage.cloud.google.com/collateralnetworkvideos/COLT-SaaS-Tutorial-04.mov",
    "Why Are Some Of The Buttons Disabled On The Navbar?": "https://storage.cloud.google.com/collateralnetworkvideos/COLT-SaaS-Tutorial-05.mov",    
    "How Do I Claim My ICO Tokens?": "https://storage.cloud.google.com/collateralnetworkvideos/COLT-SaaS-Tutorial-06.mov",
    "How Do I Connect My Wallet?": "https://storage.cloud.google.com/collateralnetworkvideos/COLT-SaaS-Tutorial-07.mov",
    "Why Is The ICO Claim Button Disabled?": "https://storage.cloud.google.com/collateralnetworkvideos/COLT-SaaS-Tutorial-08.mov",
    "Why Aren’t My ICO Tokens Showing?": "https://storage.cloud.google.com/collateralnetworkvideos/COLT-SaaS-Tutorial-09.mov",
    "Why Do I Need To Request an NFT Collection?": "https://storage.cloud.google.com/collateralnetworkvideos/COLT-SaaS-Tutorial-10.mov",
  };

  const times: Time = {
    "How Do I Request A New Collection, Ready for Launch?": "1:52",
    "What Is The Connect Wallet Feature Used For?": '1:43',
    "Why Can't I See My Tokens On The Dashboard?": '1:18',
    "What Is The Dashboard For?": "1:54",
    "Why Are Some Of The Buttons Disabled On The Navbar?": "1:54",    
    "How Do I Claim My ICO Tokens?": "1:48",
    "How Do I Connect My Wallet?": "2:05",
    "Why Is The ICO Claim Button Disabled?": "1:16",
    "Why Aren’t My ICO Tokens Showing?": "1:37",
    "Why Do I Need To Request an NFT Collection?": "1:34",
  };

  const [selectedVideo, setSelectedVideo] = useState<string>(videoLinks["How Do I Request A New Collection, Ready for Launch?"]);

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoSelect = (videoTitle: string) => {
    setSelectedVideo(videoLinks[videoTitle]);
    if (videoRef.current) {
      videoRef.current.load(); // Reloads the video whenever a new video is selected
    }
  };


  return (
    <div className="w-full max-w-[1280px] mx-auto px-5">
      <div className="flex justify-center items-center gap-2">
        <div className="hidden xs:block">
          <I24Support size="36" color="#ffffff"/>
        </div>
        <div className="block xs:hidden">
          <I24Support size="24" color="#ffffff"/>
        </div>
        <p className="text-3xl xs:text-4xl text-white">Support Center</p>
      </div>
      <p className="text-sm xs:text-base text-center text-white pt-8">Welcome to the Collateral Network Support Center! This is your go-to resource for all the information you need to navigate and make the most of our platform. Whether you’re looking for step-by-step guides on how to claim your ICO tokens, connect your wallet, or request an NFT collection, you’ll find all the answers here. Our comprehensive tutorials are designed to help you every step of the way, ensuring a seamless and smooth experience as we gear up for the full launch. If you have any additional questions or need further assistance, our support team is just a click away. Thank you for being a part of the Collateral Network community!</p>
      
      <div className="flex flex-col-reverse lg:flex-row justify-between gap-8 pt-12">
        <div className="flex-1">
          <video className="w-full" controls autoPlay muted ref={videoRef}>
            <source src={selectedVideo} type="video/mp4" />
          </video> 
          
          <div className="xs:flex pt-4">
            <div className="bg-[#14172E] rounded-md px-4 py-4">
              <div className="flex justify-between">
                <p className="font-bold text-xl xs:text-2xl text-white">Need Help?</p>
                <Image src={SupportIcon} alt="" className="w-6 h-6 xs:w-8 xs:h-8"/>
              </div>
              <p className="text-sm text-white pt-4">Email us at support@collateralnetwork.io</p>          
            </div>
          </div>          
        </div>   
        
        <div className="w-full lg:w-[500px] xl:w-[600px]">
          <div className="bg-[#14172E] rounded-md px-4 py-4 text-white max-h-[480px] overflow-y-auto custom-scrollbar custom-scrollbar-width">          
            <p className="font-bold text-xl xs:text-2xl text-center">FAQ Guides</p>        
            <div className="flex flex-col gap-4 pt-4">
              {Object.keys(videoLinks).map((title, index) => (
                <div 
                  key={index} 
                  onClick={() => handleVideoSelect(title)} 
                  className="flex justify-between gap-2 items-center bg-[#060A1E] px-4 py-4 cursor-pointer hover:bg-[#1a1e38]"
                >
                  <p className="text-sm">{title}</p>
                  <div className="flex items-center gap-2 xs:gap-4">
                    <p className="bg-white text-sm text-black px-1 xs:px-2 py-0 xs:py-1">{times[title]}</p>
                    {selectedVideo === videoLinks[title] ? (
                      <MdPauseCircle className="text-3xl xs:text-4xl"/>
                    ) : (
                      <MdPlayCircle className="text-3xl xs:text-4xl"/>
                    )}
                  </div>                
                </div>  
              ))}
            </div>                 
          </div>
        </div>
        
      </div>
    </div>    
  );  
}

