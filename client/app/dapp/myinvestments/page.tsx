'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { StatusUp, Judge, HomeHashtag, Setting4 } from "iconsax-react";

export default function MyInvestments() {

 
  return (
    <div className="w-full px-8 mx-auto">
      <div className="flex justify-center items-center gap-2">
        <StatusUp size="36" color="#ffffff"/>
        <p className="text-4xl text-white">My Investments</p>
      </div>
      <p className="text-center text-white pt-8">Explore your investment portfolio in the My Investments section. It’s where you can view, analyze, and manage your lending or borrowing transactions. Each investment is presented with relevant details and status updates, allowing you to track performance, manage risks, and make strategic decisions that align with your financial goals.</p>
      <div className="grid grid-cols-4 gap-8 pt-12">
        <div className="flex flex-col justify-between bg-[#14172E] rounded-md px-4 py-4">
          <div className="flex justify-between">
            <p className="font-bold text-2xl text-white">Active Bids</p>
            <Judge size="32" color="#ffffff"/>
          </div>
          <p className="text-xl text-white pt-4">52</p>
          <div className="flex pt-8">
            <div className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md p-2 cursor-pointer">
              <p className="text-sm text-center text-white">View Active Bids</p>            
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between bg-[#14172E] rounded-md px-4 py-4">
          <div className="flex justify-between">
            <p className="font-bold text-2xl text-white">Active Investments</p>
            <StatusUp size="32" color="#ffffff"/>
          </div>
          <p className="text-xl text-white pt-4">24</p>
          <div className="flex pt-8">
            <div className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md p-2 cursor-pointer">
              <p className="text-sm text-center text-white">View Active Investments</p>            
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between bg-[#14172E] rounded-md px-4 py-4">
          <div className="flex justify-between">
            <p className="font-bold text-2xl text-white">Current ROI</p>
            <StatusUp size="32" color="#ffffff"/>
          </div>
          <p className="text-xl text-white pt-4">$4200 / 1.2ETH</p>
          <div className="flex pt-8">
            <div className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md p-2 cursor-pointer">
              <p className="text-sm text-center text-white">View Current ROI</p>            
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between bg-[#14172E] rounded-md px-4 py-4">
          <div className="flex justify-between">
            <p className="font-bold text-2xl text-white">Marketplace</p>
            <HomeHashtag size="32" color="#ffffff"/>
          </div>
          <p className="text-xl text-white pt-4">Assets Listed: 230</p>
          <div className="flex pt-8">
            <div className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md p-2 cursor-pointer">
              <p className="text-sm text-center text-white">Open Marketplace</p>            
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-12">
        <div>
          <p className="text-xl text-white">Sort By:</p>
          <div className="flex gap-4 pt-4">
            <div className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md p-2 cursor-pointer">
              <p className="text-sm text-center text-white">Value High {">"} Low</p>            
            </div>
            <div className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md p-2 cursor-pointer">
              <p className="text-sm text-center text-white">Value Low {">"} High</p>            
            </div>
            <div className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md p-2 cursor-pointer">
              <p className="text-sm text-center text-white">Loan Amount Low {">"} High</p>            
            </div>
            <div className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md p-2 cursor-pointer">
              <p className="text-sm text-center text-white">Loan Amount High {">"} Low</p>            
            </div>
            <div className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md p-2 cursor-pointer">
              <p className="text-sm text-center text-white">Term High {">"} Low</p>            
            </div>
            <div className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md p-2 cursor-pointer">
              <p className="text-sm text-center text-white">Term Low {">"} High</p>            
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8">

          </div>
        </div>
        <div className="bg-[#14172E] p-4">
          <div className="flex gap-8 justify-between">
            <p className="font-bold text-2xl text-white">Filter By Collection</p>
            <Setting4 size="32" color="#ffffff"/>
          </div>
          <div className="flex flex-col gap-4 pt-4">
            <div className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md p-2 cursor-pointer">
              <p className="text-sm text-center text-white">COLT - Genesis Gold Cards</p>            
            </div>
            <div className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md p-2 cursor-pointer">
              <p className="text-sm text-center text-white">OTHER NFT COLLECTION</p>            
            </div>
            <div className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md p-2 cursor-pointer">
              <p className="text-sm text-center text-white">OTHER NFT COLLECTION</p>            
            </div>
            <div className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md p-2 cursor-pointer">
              <p className="text-sm text-center text-white">OTHER NFT COLLECTION</p>            
            </div>
            <div className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md p-2 cursor-pointer">
              <p className="text-sm text-center text-white">OTHER NFT COLLECTION</p>            
            </div>
            <div className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md p-2 cursor-pointer">
              <p className="text-sm text-center text-white">OTHER NFT COLLECTION</p>            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
