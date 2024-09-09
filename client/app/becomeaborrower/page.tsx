import { Notepad2 } from "iconsax-react";
import { TopNavbar } from "../_components/topnavbar";
import { RegisterNowButton } from "../_components/button/registernowbutton";

export default function BecomeaBorrower() {

    return (
        <div className="w-full max-w-[1280px] mx-auto">
            <TopNavbar />
            <div className="px-5 text-white">
                <p className="font-bold text-4xl xs:text-5xl xl:text-6xl mt-0 xl:mt-16">Borrower Tiers & Benefits</p>
                <p className="font-bold text-base xs:text-lg xl:text-xl pt-8">Listing Fee for Borrowers</p>
                <p className="text-base xs:text-lg xl:text-xl pt-4">To submit a digital asset for potential funding on the Collateral Network platform, borrowers are required to pay a listing fee of $50, or the equivalent amount in ETH. This fee ensures that only serious and committed borrowers list their assets, maintaining the quality and integrity of the platform. The listing fee is utilized to support platform operations and continuous improvements, ultimately benefiting all users. This fee must be paid at the time of asset submission and is nonrefundable.</p>
                <p className="font-bold text-base xs:text-lg xl:text-xl pt-8">Success Fee for Borrowers</p>
                <p className="text-base xs:text-lg xl:text-xl pt-4">Collateral Network offers a structured membership system designed to reward users based on their engagement and investment in the platform. The more COLT tokens you hold, the lesser the success fee you will incur on your transactions. This tier system is specifically for those looking to borrow against their digital assets. For information on lender fees, please refer to the “Become an Investor” section. Here’s a detailed breakdown of the membership tiers and their benefits:</p>
                <div className="flex flex-col gap-8 pt-8">
                    <div className="bg-[#050a1f] p-6">
                        <div className="flex items-center">
                            <div className="hidden xs:block">
                                <Notepad2 size="36" color="#ffffff"/>
                            </div>
                            <div className="block xs:hidden">
                                <Notepad2 size="24" color="#ffffff"/>
                            </div>
                            <p className="text-lg xs:text-xl lg:text-2xl xl:text-3xl ml-4">1. Participant Tier</p>
                        </div>
                        <div className="pl-12 xs:pl-20">                            
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• Success Fee:</span> 10%</p>
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• COLT Tokens Held:</span> 0 ETH</p>
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• Overview:</span> This tier is for casual users or those just getting started. It provides basic access to the platform’s functionalities without requiring any COLT token holdings.</p>                         
                        </div>                        
                    </div>
                </div>    
                <div className="flex flex-col gap-8 pt-8">
                    <div className="bg-[#050a1f] p-6">
                        <div className="flex items-center">
                            <div className="hidden xs:block">
                                <Notepad2 size="36" color="#ffffff"/>
                            </div>
                            <div className="block xs:hidden">
                                <Notepad2 size="24" color="#ffffff"/>
                            </div>
                            <p className="text-lg xs:text-xl lg:text-2xl xl:text-3xl ml-4">2. Insider Tier</p>
                        </div>
                        <div className="pl-12 xs:pl-20">                            
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• Success Fee:</span> 9%</p>
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• COLT Tokens Held:</span> 0.5 ETH</p>
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• Overview:</span> As users begin to engage more with the platform, holding a small amount of COLT tokens reduces the success fee, making it more cost-effective to participate in the ecosystem.</p>                         
                        </div>                        
                    </div>
                </div>    
                <div className="flex flex-col gap-8 pt-8">
                    <div className="bg-[#050a1f] p-6">
                        <div className="flex items-center">
                            <div className="hidden xs:block">
                                <Notepad2 size="36" color="#ffffff"/>
                            </div>
                            <div className="block xs:hidden">
                                <Notepad2 size="24" color="#ffffff"/>
                            </div>
                            <p className="text-lg xs:text-xl lg:text-2xl xl:text-3xl ml-4">3. Engaged Tier</p>
                        </div>
                        <div className="pl-12 xs:pl-20">                            
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• Success Fee:</span> 8%</p>
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• COLT Tokens Held:</span> 1 ETH</p>
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• Overview:</span> This tier is designed for users who are more active and hold at least 1 ETH worth of COLT tokens, enjoying a further reduced success fee.</p>                         
                        </div>                        
                    </div>
                </div>    
                <div className="flex flex-col gap-8 pt-8">
                    <div className="bg-[#050a1f] p-6">
                        <div className="flex items-center">
                            <div className="hidden xs:block">
                                <Notepad2 size="36" color="#ffffff"/>
                            </div>
                            <div className="block xs:hidden">
                                <Notepad2 size="24" color="#ffffff"/>
                            </div>
                            <p className="text-lg xs:text-xl lg:text-2xl xl:text-3xl ml-4">4. Advanced Tier</p>
                        </div>
                        <div className="pl-12 xs:pl-20">                            
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• Success Fee:</span> 7%</p>
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• COLT Tokens Held:</span> 1.5 ETH</p>
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• Overview:</span> For users with a moderate level of engagement and investment, holding 1.5 ETH in COLT tokens offers a significant reduction in the success fee.</p>                         
                        </div>                        
                    </div>
                </div> 
                <div className="flex flex-col gap-8 pt-8">
                    <div className="bg-[#050a1f] p-6">
                        <div className="flex items-center">
                            <div className="hidden xs:block">
                                <Notepad2 size="36" color="#ffffff"/>
                            </div>
                            <div className="block xs:hidden">
                                <Notepad2 size="24" color="#ffffff"/>
                            </div>
                            <p className="text-lg xs:text-xl lg:text-2xl xl:text-3xl ml-4">5. Committed Tier</p>
                        </div>
                        <div className="pl-12 xs:pl-20">                            
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• Success Fee:</span> 6%</p>
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• COLT Tokens Held:</span> 2 ETH</p>
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• Overview:</span> As commitment grows, users holding 2 ETH in COLT tokens benefit from a more favourable success fee, encouraging further participation.</p>                         
                        </div>                        
                    </div>
                </div> 
                <div className="flex flex-col gap-8 pt-8">
                    <div className="bg-[#050a1f] p-6">
                        <div className="flex items-center">
                            <div className="hidden xs:block">
                                <Notepad2 size="36" color="#ffffff"/>
                            </div>
                            <div className="block xs:hidden">
                                <Notepad2 size="24" color="#ffffff"/>
                            </div>
                            <p className="text-lg xs:text-xl lg:text-2xl xl:text-3xl ml-4">6. Dedicated Tier</p>
                        </div>
                        <div className="pl-12 xs:pl-20">                            
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• Success Fee:</span> 5%</p>
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• COLT Tokens Held:</span> 2.5 ETH</p>
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• Overview:</span> Dedicated users holding 2.5 ETH in COLT tokens enjoy a mid-level success fee, balancing cost efficiency with engagement benefits.</p>                         
                        </div>                        
                    </div>
                </div>
                <div className="flex flex-col gap-8 pt-8">
                    <div className="bg-[#050a1f] p-6">
                        <div className="flex items-center">
                            <div className="hidden xs:block">
                                <Notepad2 size="36" color="#ffffff"/>
                            </div>
                            <div className="block xs:hidden">
                                <Notepad2 size="24" color="#ffffff"/>
                            </div>
                            <p className="text-lg xs:text-xl lg:text-2xl xl:text-3xl ml-4">7. Investor Tier</p>
                        </div>
                        <div className="pl-12 xs:pl-20">                            
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• Success Fee:</span> 4%</p>
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• COLT Tokens Held:</span> 3 ETH</p>
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• Overview:</span> This tier is tailored for investors who hold 3 ETH in COLT tokens, offering a significantly lower success fee, promoting substantial engagement.</p>                         
                        </div>                        
                    </div>
                </div>  
                <div className="flex flex-col gap-8 pt-8">
                    <div className="bg-[#050a1f] p-6">
                        <div className="flex items-center">
                            <div className="hidden xs:block">
                                <Notepad2 size="36" color="#ffffff"/>
                            </div>
                            <div className="block xs:hidden">
                                <Notepad2 size="24" color="#ffffff"/>
                            </div>
                            <p className="text-lg xs:text-xl lg:text-2xl xl:text-3xl ml-4">8. Visionary Tier</p>
                        </div>
                        <div className="pl-12 xs:pl-20">                            
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• Success Fee:</span> 3%</p>
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• COLT Tokens Held:</span> 3.5 ETH</p>
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• Overview:</span> For visionary investors with 3.5 ETH in COLT tokens, the success fee is further reduced, reflecting their higher level of investment and participation.</p>                         
                        </div>                        
                    </div>
                </div>   
                <div className="flex flex-col gap-8 pt-8">
                    <div className="bg-[#050a1f] p-6">
                        <div className="flex items-center">
                            <div className="hidden xs:block">
                                <Notepad2 size="36" color="#ffffff"/>
                            </div>
                            <div className="block xs:hidden">
                                <Notepad2 size="24" color="#ffffff"/>
                            </div>
                            <p className="text-lg xs:text-xl lg:text-2xl xl:text-3xl ml-4">9. Elite Tier</p>
                        </div>
                        <div className="pl-12 xs:pl-20">                            
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• Success Fee:</span> 2%</p>
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• COLT Tokens Held:</span> 4 ETH</p>
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• Overview:</span> Elite users who hold 4 ETH in COLT tokens benefit from one of the lowest success fees, incentivizing deep engagement and significant investment.</p>                         
                        </div>                        
                    </div>
                </div>   
                <div className="flex flex-col gap-8 pt-8">
                    <div className="bg-[#050a1f] p-6">
                        <div className="flex items-center">
                            <div className="hidden xs:block">
                                <Notepad2 size="36" color="#ffffff"/>
                            </div>
                            <div className="block xs:hidden">
                                <Notepad2 size="24" color="#ffffff"/>
                            </div>
                            <p className="text-lg xs:text-xl lg:text-2xl xl:text-3xl ml-4">10. Mogul Tier</p>
                        </div>
                        <div className="pl-12 xs:pl-20">                            
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• Success Fee:</span> 1%</p>
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• COLT Tokens Held:</span> 4.5 ETH</p>
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• Overview:</span> This tier is for top-tier investors holding 4.5 ETH in COLT tokens, enjoying a minimal success fee, making it highly advantageous for large-scale transactions.</p>                         
                        </div>                        
                    </div>
                </div>   
                <div className="flex flex-col gap-8 pt-8">
                    <div className="bg-[#050a1f] p-6">
                        <div className="flex items-center">
                            <div className="hidden xs:block">
                                <Notepad2 size="36" color="#ffffff"/>
                            </div>
                            <div className="block xs:hidden">
                                <Notepad2 size="24" color="#ffffff"/>
                            </div>
                            <p className="text-lg xs:text-xl lg:text-2xl xl:text-3xl ml-4">11. Premier Tier</p>
                        </div>
                        <div className="pl-12 xs:pl-20">                            
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• Success Fee:</span> 0.0%</p>
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• COLT Tokens Held:</span> 5 ETH</p>
                            <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4"><span className="font-bold">• Overview:</span> Premier tier members holding 5 ETH in COLT tokens benefit from a 0% success fee, providing the ultimate cost-saving benefit and maximizing their investment efficiency.</p>                         
                        </div>                        
                    </div>
                </div>   
                
                <div className="pt-8">
                    <p className="text-lg xs:text-xl xl:text-2xl font-bold">Key Benefits of Holding COLT Tokens</p>
                    <p className="text-base xs:text-lg xl:text-xl pt-4"><span className="font-bold">Reduced Fees:</span> As users hold more COLT tokens, their success fees decrease, significantly reducing transaction costs.</p>
                    <p className="text-base xs:text-lg xl:text-xl pt-4"><span className="font-bold">Exclusive Access:</span> Higher tiers often come with additional benefits such as access to premium features, advanced market analytics, and priority support.</p>
                    <p className="text-base xs:text-lg xl:text-xl pt-4"><span className="font-bold">Enhanced Engagement:</span> The tier system encourages deeper engagement with the platform, fostering a committed and active user community.</p>
                    <p className="text-base xs:text-lg xl:text-xl pt-4">By structuring the membership tiers in this way, Collateral Network ensures that users are rewarded for their loyalty and investment in the platform, creating a mutually beneficial environment for all participants. For information on lender fees, please look at the “Become an Investor” section.</p>
                </div>
                
                <div className="flex justify-center pt-8">
                    <RegisterNowButton />
                </div>

                <div className="flex flex-col items-center gap-4 py-16 xl:py-20">
                    <p className="w-full xl:w-[920px] text-sm text-center">Collateral Network acts solely as an intermediary between investors and borrowers. It is not a lender or a borrower. Our platform, which operates as a SaaS solution, facilitates the transactions between parties. All transactions are entered into independently by the parties involved. Collateral Network does not assume any responsibility for the agreements made between investors and borrowers but provides a platform for negotiation, agreement, and transaction execution.</p>
                    <p className="w-full xl:w-[920px] text-sm text-center">At Collateral Network, we’re committed to providing a robust, user-friendly, and innovative P2P lending platform that empowers you to maximize the value of your assets. Join us today and be a part of the future of decentralized finance.</p>
                </div>
                <div className="pb-20 px-5">
                    <p className="text-sm text-center">© 2024 Collateral Network</p>
                </div>
            </div>            
        </div>
    );
}
