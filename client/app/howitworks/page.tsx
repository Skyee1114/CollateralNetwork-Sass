import { Notepad2 } from "iconsax-react";
import { TopNavbar } from "../_components/topnavbar";
import { RegisterNowButton } from "../_components/button/registernowbutton";

export default function HowItWorks() {

    return (
        <div className="w-full max-w-[1280px] mx-auto">
            <TopNavbar />
            <div className="px-5 text-white">
                <p className="font-bold text-4xl xs:text-5xl xl:text-6xl mt-0 xl:mt-16">How It Works</p>
                <p className="text-base xs:text-lg xl:text-xl pt-8">Welcome to Collateral Network, where innovative blockchain technology meets peer-to-peer (P2P) lending to revolutionize how you leverage your assets.</p>
                <p className="text-base xs:text-lg xl:text-xl pt-8">Here’s a detailed overview of how our platform works, ensuring a seamless, transparent, and secure experience for both borrowers and lenders.</p>
                <div className="flex flex-col gap-8 pt-8">
                    <div className="bg-[#050a1f] p-6">
                        <div className="flex items-center">
                            <div className="hidden xs:block">
                                <Notepad2 size="36" color="#ffffff"/>
                            </div>
                            <div className="block xs:hidden">
                                <Notepad2 size="24" color="#ffffff"/>
                            </div>
                            <p className="text-lg xs:text-xl lg:text-2xl xl:text-3xl ml-4">1. Getting Started</p>
                        </div>
                        <div className="pl-12">
                            <p className="font-bold text-lg xs:text-xl lg:text-2xl xl:text-3xl pt-4">User Registration and Onboarding</p>
                            <div className="pl-0 xs:pl-8">
                                <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4">• Sign-Up: Begin by registering on the platform using your name, email, and password.</p>
                                <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4">• Verification: Enhance security with two-step verification via email or SMS. Complete the optional KYC process to unlock additional features, though it is not mandatory.</p>
                                <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4">• Wallet Integration: Connect your cryptocurrency wallet securely to manage your assets and transactions directly on the platform.</p>
                            </div>                            
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
                            <p className="text-lg xs:text-xl lg:text-2xl xl:text-3xl ml-4">2. For Borrowers</p>
                        </div>
                        <div className="pl-12">
                            <p className="font-bold text-lg xs:text-xl lg:text-2xl xl:text-3xl pt-4">Asset Listing and Loan Application</p>
                            <div className="pl-0 xs:pl-8">
                                <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4">• List Your Assets: Borrowers can list various digital assets.</p>
                                <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4">• Create Loan Proposal: Specify the loan amount, interest rate, and repayment period. Submit detailed asset information and KYC documentation for evaluation.</p>
                                <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4">• Underwriting and Approval: The platform’s underwriting team assesses the asset’s value and loan proposal. Once approved, your loan proposal becomes available for funding by lenders.</p>
                            </div>                            
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
                            <p className="text-lg xs:text-xl lg:text-2xl xl:text-3xl ml-4">3. For Lenders</p>
                        </div>
                        <div className="pl-12">
                            <p className="font-bold text-lg xs:text-xl lg:text-2xl xl:text-3xl pt-4">Investment Opportunities</p>
                            <div className="pl-0 xs:pl-8">
                                <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4">• Browse Proposals: Access a range of loan proposals, reviewing details such as asset type, loan amount, and interest rates.</p>
                                <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4">• Select Investments: Choose loan opportunities that align with your risk preference and investment goals. Use integrated risk assessment tools to make informed decisions.</p>
                                <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4">• Track Investments: Monitor your investments through a comprehensive dashboard, which provides detailed insights into returns and loan statuses.</p>
                            </div>                            
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
                            <p className="text-lg xs:text-xl lg:text-2xl xl:text-3xl ml-4">4. Platform Features</p>
                        </div>
                        <div className="pl-12">
                            <p className="font-bold text-lg xs:text-xl lg:text-2xl xl:text-3xl pt-4">User Dashboards</p>
                            <div className="pl-0 xs:pl-8">
                                <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4">• Overview: Both borrowers and lenders have access to dashboards that display investment opportunities, active loans, and financial tracking.</p>
                            </div>    
                            <p className="font-bold text-lg xs:text-xl lg:text-2xl xl:text-3xl pt-4">Membership Tiers</p>
                            <div className="pl-0 xs:pl-8">
                                <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4">• Borrower Tiers & Benefits: The more COLT tokens you hold, the lower your success fee. For detailed information on the fee structure for borrowers, please refer to the “Borrower Tiers & Benefits” and “Lender Tiers & Benefits” section.</p>
                            </div>                            
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
                            <p className="text-lg xs:text-xl lg:text-2xl xl:text-3xl ml-4">5. Security and Compliance</p>
                        </div>
                        <div className="pl-12">
                            <p className="font-bold text-lg xs:text-xl lg:text-2xl xl:text-3xl pt-4">Enhanced Security Measures</p>
                            <div className="pl-0 xs:pl-8">
                                <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4">• Two-Step Verification: Protects user accounts with an additional layer of security.</p>
                                <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4">• Encryption and Monitoring: Employs advanced encryption and continuous monitoring to safeguard data and transactions.</p>
                                <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4">• Regular Audits: Conducts frequent security audits and complies with global financial regulations to ensure platform integrity.</p>
                            </div>                            
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
                            <p className="text-lg xs:text-xl lg:text-2xl xl:text-3xl ml-4">6. Loan Processing and Transactions</p>
                        </div>
                        <div className="pl-12">
                            <p className="font-bold text-lg xs:text-xl lg:text-2xl xl:text-3xl pt-4">Efficient and Transparent Operations</p>
                            <div className="pl-0 xs:pl-8">
                                <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4">• Smart Contracts: Utilizes smart contracts for automated and transparent execution of loan agreements.</p>
                                <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4">• Real-Time Monitoring: Tracks transactions in real-time, ensuring accuracy and preventing fraud.</p>
                                <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4">• Asset Tokenization: Tokenizes assets to enable fractional ownership and enhanced liquidity.</p>
                            </div>                            
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
                            <p className="text-lg xs:text-xl lg:text-2xl xl:text-3xl ml-4">7. Support and Community Engagement</p>
                        </div>
                        <div className="pl-12">
                            <p className="font-bold text-lg xs:text-xl lg:text-2xl xl:text-3xl pt-4">Customer Support</p>
                            <div className="pl-0 xs:pl-8">
                                <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4">• Multi-Channel Support: Access support via email, and dedicated channels for borrowers and lenders.</p>
                                <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4">• Issue Resolution: A ticketing system ensures efficient tracking and resolution of user issues.</p>
                                <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4">• Community Channels: Engage with the community through Telegram and Discord announcement channels for updates and support.</p>
                            </div>                            
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
                            <p className="text-lg xs:text-xl lg:text-2xl xl:text-3xl ml-4">8. Evolution and Roadmap</p>
                        </div>
                        <div className="pl-12">
                            <p className="font-bold text-lg xs:text-xl lg:text-2xl xl:text-3xl pt-4">Future Enhancements</p>
                            <div className="pl-0 xs:pl-8">
                                <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4">• Version Upgrades: Incremental platform updates will introduce new features and support for a broader range of assets.</p>
                                <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4">• Strategic Partnerships: Collaboration with key industry players to expand platform capabilities and market reach.</p>
                                <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4">• Continuous Improvement: Regularly incorporating user feedback to refine and enhance the platform.</p>
                            </div>                            
                        </div>                        
                    </div>
                </div>      
                <p className="text-base xs:text-lg xl:text-xl text-center xs:text-start pt-8">At Collateral Network, we’re committed to providing a robust, user-friendly, and innovative P2P lending platform that empowers you to maximize the value of your assets. Join us today and be a part of the future of decentralized finance.</p>
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
