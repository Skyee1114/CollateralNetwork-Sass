'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Category, Notepad2, StatusUp, HomeHashtag, ArrowRight, ArrangeHorizontal } from "iconsax-react";
import { User, Message} from "@/app/_utils/type";
import { loadUser } from "@/app/_actions/auth";
import { getDashboardMarketplaceInformation } from "@/app/_actions/nft";
import { getNotifications } from "@/app/_actions/notification";
import { ROIGraph } from "../_components/roigraph";
import { ColtLogo, Notification } from "@/assets/img";

export default function Dashboard() {

  const [marketplaceAssets, setMarketplaceAssets] = useState();
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {   
    const fetchUser = async () => {
      try {       
          const res = await loadUser();    
          setUser(res.user);
      } catch (err: any) {
          console.error(err);    
      }
    };
    fetchUser(); 
    
    const fetchMarketplaceInformation = async () => {
      try {       
          const res = await getDashboardMarketplaceInformation();    
          setMarketplaceAssets(res.marketplace);
      } catch (err: any) {
          console.error(err);    
      }
    };
    fetchMarketplaceInformation(); 

    const fetchNotifications = async () => {
      try {       
          const res = await getNotifications();    
          setMessages(res.notifications);
      } catch (err: any) {
          console.error(err);    
      }
    };
    fetchNotifications(); 

  }, []);

  return (
    <div className="w-full max-w-[1280px] mx-auto px-5">
      <div className="flex justify-center items-center gap-2">
        <div className="hidden xs:block">
          <Category size="36" color="#ffffff"/>
        </div>
        <div className="block xs:hidden">
          <Category size="24" color="#ffffff"/>
        </div>
        <p className="text-3xl xs:text-4xl text-white">Dashboard</p>
      </div>
      <p className="text-sm xs:text-base text-center text-white pt-8">Your dashboard is the command center of your Collateral experience, a hub where you can view your COLT Token Balance, staked tokens, and engage with various features like My Assets, My Investments, Marketplace, Trade, Transactions, Vested Tokens, and Support. It’s designed for your convenience and control, providing you with a unified and seamless environment tailored to empower your financial journey with Collateral Network.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 pt-12">
        <div className="flex flex-col justify-between bg-[#14172E] rounded-md px-4 py-4">
          <div className="flex justify-between">
            <p className="font-bold text-xl xs:text-2xl text-white">Token Balance</p>
            <Image src={ColtLogo} alt="" className="w-6 h-6 xs:w-8 xs:h-8"/>
          </div>
          <p className="text-xl text-white pt-4">{user?.colttoken ? user.colttoken : 0} COLT</p>    
          <div className="pt-8">
            <Link href="https://www.mexc.com/exchange/COLT_USDT" target="_blank">
              <div className="w-[160px] transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md py-2 cursor-pointer">
                <p className="text-sm text-center text-white">Buy Tokens Now</p>            
              </div>
            </Link>            
          </div>      
        </div>
        <div className="bg-[#14172E] rounded-md px-4 py-4">
          <div className="flex justify-between">
            <p className="font-bold text-xl xs:text-2xl text-white">My Assets</p>
            <div className="hidden xs:block">
              <Notepad2 size="36" color="#ffffff"/>
            </div>
            <div className="block xs:hidden">
              <Notepad2 size="24" color="#ffffff"/>
            </div>
          </div>
          <div className="pt-2">
            <p className="text-white">Awaiting Approval: {user?.nft.awaiting ? user?.nft.awaiting : 0}</p>
            <p className="text-white">Approved: {user?.nft.approved ? user?.nft.approved : 0}</p>            
            <p className="text-white">Listed: {user?.nft.listed ? user?.nft.listed : 0}</p>
          </div>
          <div className="pt-4">
            {/* <Link href="/dapp/myassetsandloans"> */}
              <div className="w-[160px] transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md py-2 cursor-pointer">
                <p className="text-sm text-center text-white">View Assets</p>            
              </div>
            {/* </Link>             */}
          </div>
        </div>
        <div className="bg-[#14172E] rounded-md px-4 py-4">
          <div className="flex justify-between">
            <p className="font-bold text-xl xs:text-2xl text-white">My Investments</p>
            <div className="hidden xs:block">
              <StatusUp size="36" color="#ffffff"/>
            </div>
            <div className="block xs:hidden">
              <StatusUp size="24" color="#ffffff"/>
            </div>
          </div>
          <div className="pt-2">
            <p className="text-white">Accepted: {user?.bid.accepted ? user?.bid.accepted : 0}</p>
            <p className="text-white">Active Bids: {user?.bid.active ? user?.bid.active : 0}</p>
            <p className="text-white">Current ROI: {user?.roi ? user?.roi : 0} ETH</p>
          </div>
          <div className="pt-4">
            {/* <Link href="/dapp/myinvestments"> */}
              <div className="w-[160px] transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md py-2 cursor-pointer">
                <p className="text-sm text-center text-white">View Investments</p>            
              </div>
            {/* </Link>             */}
          </div>
        </div>
        <div className="flex flex-col justify-between bg-[#14172E] rounded-md px-4 py-4">
          <div className="flex justify-between">
            <p className="font-bold text-xl xs:text-2xl text-white">Marketplace</p>
            <div className="hidden xs:block">
              <HomeHashtag size="36" color="#ffffff"/>
            </div>
            <div className="block xs:hidden">
              <HomeHashtag size="24" color="#ffffff"/>
            </div>
          </div>
          <p className="text-xl text-white pt-4">Assets Listed: {marketplaceAssets}</p>
          <div className="pt-8">
            {/* <Link href="/dapp/marketplace"> */}
              <div className="w-[160px] transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md py-2 cursor-pointer">
                <p className="text-sm text-center text-white">Open Marketplace</p>            
              </div>
            {/* </Link>             */}
          </div>
        </div>        
      </div>

      <div className="flex flex-col lg:flex-row gap-8 pt-12">
        <div className="bg-[#14172E] rounded-md px-4 py-4 w-full lg:w-2/3 xl:w-3/4">
          <div className="flex justify-between">
            <div className="flex">
              <p className="font-bold text-xl xs:text-2xl text-white">Progressive ETH ROI</p>              
            </div>
            <div className="hidden xs:block">
              <StatusUp size="36" color="#ffffff"/>
            </div>
            <div className="block xs:hidden">
              <StatusUp size="24" color="#ffffff"/>
            </div>
          </div>
          <ROIGraph />
        </div>
        <div className="bg-[#14172E] rounded-md px-4 py-4 w-full lg:w-1/3 xl:w-1/4">
          <div className="flex justify-between pb-4">
            <p className="font-bold text-xl xs:text-2xl text-white">Notifications</p>
            <Image src={Notification} alt="" className="w-6 h-6 xs:w-8 xs:h-8"/>
          </div>
          {messages.length > 0 ? (
          <div className="max-h-[400px] overflow-y-auto custom-scrollbar custom-scrollbar-width ">
            {messages
              .slice()
              .reverse() 
              .map((message: Message, index) => (
                <Link 
                  key={message._id}
                  href={`/dapp/${message.title == 'Asset Request Update' ? 'assetrequestform' : 'icoclaim'}`}
                >
                  <div className={`pr-2 ${index > 0 ? 'pt-2' : ''}`} key={index}>
                    <div className="flex justify-between items-center border-2 border-[#3f15e9] transition-colors duration-300 ease-in-out bg-transparent hover:bg-[#3612C4] rounded-md p-2 cursor-pointer">
                      <div className="text-white">
                        <p className="text-sm">{message.title}</p>
                        <p className="text-xs">{message.message}</p>
                      </div>
                      <div className="w-4">
                        <ArrowRight size="16" color="#ffffff" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        ) : (
          <></>
        )}
        </div>
      </div>
      <div className='pt-12'>
        <div className='bg-[#14172E] rounded-md p-4 overflow-auto lg:overflow-hidden'>
          <div className='flex justify-between items-center pb-4'>
            <p className='font-bold text-xl xs:text-2xl text-white'>Transaction History</p>
            <div className="hidden xs:block">
              <ArrangeHorizontal size="36" color="#ffffff"/>
            </div>
            <div className="block xs:hidden">
              <ArrangeHorizontal size="24" color="#ffffff"/>
            </div>
          </div>
          <table className="w-full table-auto text-white min-w-[1024px]">
            <thead className="text-sm bg-[#3f15e9]">
              <tr>
                <th className="font-normal text-left p-4">Date - Time</th>
                <th className="font-normal text-left p-4">Transaction Type</th>
                <th className="font-normal text-left p-4">Amount</th>
                <th className="font-normal text-left p-4">Reference</th>
                <th className="font-normal text-left p-4">Transaction Hash</th>
                <th className="font-normal text-left p-4">Block Explorer</th>
              </tr>
            </thead>
            {/* <tbody className="text-sm">                  
              <tr className={'bg-[#060A1E]'}>
                <td className="p-4"></td>
                <td className="p-4"></td>
                <td className="p-4"></td>
                <td className="p-4"></td>
                <td className="p-4"></td>
                <td className="p-4"></td>
              </tr>
            </tbody> */}
          </table>
          <p className="text-lg xs:text-xl text-white text-center pt-4">No data to display here</p>
        </div>
      </div>
    </div>    
  );  
}

