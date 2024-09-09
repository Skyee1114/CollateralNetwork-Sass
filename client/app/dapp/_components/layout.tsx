'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/app/_utils/thirdwebclient";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "@/app/_context/authcontext";
import { NavItem } from "./navitem";
import { ColtLogo, Notification, UserAvatar } from "@/assets/img";

export function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {  

    const { isAdmin, user, signout } = useAuth();

    const [activeItem, setActiveItem] = useState<string>("");
    const [isNavbarVisible, setIsNavbarVisible] = useState<boolean>(true);
    const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

    const handleNavItemClick = (itemTitle: string) => {
        setActiveItem(itemTitle);
    };

    const toggleNavbar = () => {
        setIsNavbarVisible(prevState => !prevState);
    };

    const toggleDropdown = () => {
        setIsDropdownVisible(prevState => !prevState);
    };

    const handleLogout = () => {
        signout();
    };

    return (        
        <div className="bg-black">
            <div className="sticky top-0 bg-black z-[999] w-full mx-auto">
                <div className="flex justify-between items-center px-5 py-4">
                    <div className="flex items-center">
                        <GiHamburgerMenu 
                            className="text-xl text-white cursor-pointer mr-5"
                            onClick={toggleNavbar}
                        />
                        <Link href="/">
                            <Image src={ColtLogo} alt="" className="w-[24px] mr-3"/>
                        </Link>                        
                        <p className="hidden sm:block font-medium text-white text-2xl">Collateral Network</p>
                    </div>                   
                    <div className="flex items-center gap-5">  
                        <div>
                            <ConnectButton
                                client={client}
                                appMetadata={{
                                    name: "Collateral Network",
                                    url: "https://creat-or.io/",
                                    description: "Crowdfunding on the Blockchain",
                                    logoUrl: "https://path/to/my-app/logo.svg",
                                }}
                            />
                        </div>   
                        {/* <div className="hidden xs:block">
                            <Link href="/dapp/dashboard">
                                <Image src={Notification} alt="" className="w-6"/>
                            </Link>    
                        </div>                                                             */}
                        <div className="relative">
                            <Image 
                                src={UserAvatar} 
                                alt="" 
                                className="w-6 cursor-pointer" 
                                onClick={toggleDropdown}
                            />
                            {isDropdownVisible && (
                                <div className="absolute -right-2 mt-4 py-2 w-48 bg-white rounded-md z-50">
                                    <div className="absolute right-3 -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
                                    <div className="pb-1">
                                        <Link href="/dapp/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</Link>
                                    </div>                                    
                                    <div className="border-b"></div>
                                    <div className="pt-1">
                                        <div 
                                            onClick={handleLogout} 
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                        >
                                            Log out
                                        </div>
                                    </div>                                    
                                </div>
                            )}
                        </div>              
                    </div>
                </div>           
            </div>
            <div>
                <div className={`fixed bg-black z-[999] w-[260px] h-full transition-transform duration-300 ease-in-out ${isNavbarVisible ? 'translate-x-0' : '-translate-x-full'} top-[84px]`}>
                    <div className="flex flex-col">
                        <div className="text-white px-4 pb-2">
                            <p className="font-medium text-xl">{user.name}</p>
                            <p className="text-sm">Primary Account</p>
                        </div>
                        {[
                            "Dashboard",
                            "Asset Request Form",
                            "ICO Claim",
                            "Support Center",
                            "List New Asset",
                            "My Assets/Loans",                            
                            "Marketplace",
                            "My Investments",
                            "Distressed Assets",
                            "Transactions",                            
                            "Underwriting",
                            "Super Admin"
                            ].map((itemTitle) => (
                            (itemTitle === "Underwriting" || itemTitle === "Super Admin") && !isAdmin ? null : (
                                <NavItem
                                key={itemTitle}
                                itemTitle={itemTitle}
                                isActive={activeItem === itemTitle}
                                onClick={() => handleNavItemClick(itemTitle)}
                                />
                            )
                        ))}                              
                    </div>
                </div>
                <div className={`transition-all duration-300 ease-in-out ${isNavbarVisible ? 'ml-0 2xl:ml-[260px]' : 'ml-0'} mt-8 mb-24`}>
                    {children}
                </div>               
            </div>            
        </div>        
    )
}
