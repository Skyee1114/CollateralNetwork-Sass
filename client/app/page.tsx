import Link from "next/link";
import Image from "next/image";
import { Notepad2 } from 'iconsax-react';
import { IoLogoInstagram, IoLogoLinkedin } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord, FaTelegramPlane } from "react-icons/fa";
import { TopNavbar } from "./_components/topnavbar";
import { RegisterNowButton } from "./_components/button/registernowbutton";
import { AvailableLoans } from "./_components/availableloans";
import { TopInvestors } from "./_components/topinvestors";
import { DistressedAssetAuction } from "./_components/distressedassetauction";
import { CreateandSellNFTCard } from "./_components/card/createandsellnftcard";
import { ColtLogo, FeaturedIn1, FeaturedIn2, FeaturedIn3, FeaturedIn4, FeaturedIn5 } from "@/assets/img";

export default function Home() {
  return (
    <div className="w-full max-w-[1280px] mx-auto">
      <TopNavbar />
       <div>
        <div className="flex flex-col md:flex-row gap-8 lg:gap-0 justify-between px-5">
          <div className="flex flex-col justify-center gap-4 text-white">
            <p className="font-bold text-4xl xs:text-5xl xl:text-6xl"><span className="text-[#3f15e9]">Collateral</span> Network</p>
            <p className="font-semibold text-base xs:text-lg xl:text-xl pl-0 md:pl-4">Peer-to-Peer Financial Ecosystem for Collateralized Assets</p>
            <p className="font-semibold text-base xs:text-lg xl:text-xl pl-0 md:pl-4 pt-0 md:pt-4 w-full md:w-[360px] xl:w-[400px]">Trade, Leverage, Innovate with Digital, Physical Securities & Tokens.</p>               
          </div>
          <video className="w-full md:w-[360px] lg:w-[480px] xl:w-[604px] px-0 xs:px-16 md:px-0" autoPlay muted loop>
            <source src="https://collateralnetworkuksouth.blob.core.windows.net/demo-webapp/images/banner/cna.mp4?sp=r&st=2023-08-23T14:18:11Z&se=2033-08-23T22:18:11Z&spr=https&sv=2022-11-02&sr=c&sig=53evAGu%2BXC%2Byjfs8SKK5SSMISg6Qkrw51rVuupNAAOQ%3D" type="video/mp4" />
          </video>
        </div>

        <div className="pt-12 px-5">
          <div className="bg-[#050a1f] p-6">
            <div className="flex items-center">
              <div className="hidden xs:block">
                <Notepad2 size="36" color="#ffffff"/>
              </div>
              <div className="block xs:hidden">
                <Notepad2 size="24" color="#ffffff"/>
              </div>
              <p className="text-lg xs:text-xl lg:text-2xl xl:text-3xl text-white ml-4">GET YOUR NFT APPROVED TO BORROW</p>
            </div>
            <div className="flex flex-col md:flex-row gap-6 lg:gap-8 pt-8 text-white">
              <div className="">
                <p className="text-sm xs:text-base lg:text-lg xl:text-xl">We’re getting closer and closer to our platform launch each day, and we couldn’t be more thrilled! As we move into our prelaunch phase, we want to engage with YOU, our amazing community, to shape the future of our platform.</p>
                <p className="text-sm xs:text-base lg:text-lg xl:text-xl pt-4">To ensure we’re aligning with your needs and preferences, we’re introducing an Asset Request Form. This is your chance to let us know which NFT assets you’d like to see accepted on the platform. Your input is crucial as we prepare the NFT metadata for the collections you’ll want to use as collateral for loans at launch.</p>
              </div>
              <div className="flex flex-col justify-between">
                <div className="w-full md:w-[280px] lg:w-[320px] xl:w-[400px]">
                  <p className="text-sm xs:text-base lg:text-lg xl:text-xl"><span className="text-base xs:text-lg lg:text-xl xl:text-2xl">1.</span> Register Your Account</p>
                  <p className="text-sm xs:text-base lg:text-lg xl:text-xl"><span className="text-base xs:text-lg lg:text-xl xl:text-2xl">2.</span> Head Over To Your Dashboard</p>
                  <p className="text-sm xs:text-base lg:text-lg xl:text-xl"><span className="text-base xs:text-lg lg:text-xl xl:text-2xl">3.</span> Select The NFT Request Form</p>
                  <p className="text-sm xs:text-base lg:text-lg xl:text-xl"><span className="text-base xs:text-lg lg:text-xl xl:text-2xl">4.</span> Enter The Collection & NFT Data</p>
                  <p className="text-sm xs:text-base lg:text-lg xl:text-xl"><span className="text-base xs:text-lg lg:text-xl xl:text-2xl">5.</span> Submit & Wait For Approval</p>
                  <p className="text-xs xl:text-sm">(Request updates can be found in your notifications on your dashboard)</p>
                </div>                
                <div className="flex justify-center pt-4 md:pt-0 lg:pt-4">
                  <RegisterNowButton />
                </div>
              </div>
            </div>
          </div>          
        </div>

        <div className="pt-12 px-5">
          <div className="bg-[#050a1f] p-6">            
            <div className="flex items-center">
              <div className="hidden xs:block">
                <Notepad2 size="36" color="#ffffff"/>
              </div>
              <div className="block xs:hidden">
                <Notepad2 size="24" color="#ffffff"/>
              </div>
              <p className="text-lg xs:text-xl lg:text-2xl xl:text-3xl text-white ml-4">Featured In</p>
            </div>         
            <div className="flex justify-center">
              <div className="w-[240px] xs:w-full items-center grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-0 xs:gap-x-16 gap-y-4 sm:gap-y-8 lg:gap-16 pt-8 px-8">
                <Image src={FeaturedIn1} alt='beincrypto' />
                <Image src={FeaturedIn2} alt='bitcoinist' />
                <Image src={FeaturedIn3} alt='coinspeaker' />
                <Image src={FeaturedIn4} alt='cryptonews' />
                <Image src={FeaturedIn5} alt='newsbtc' />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 px-5">
          <AvailableLoans />
        </div>  
        <div className="pt-12 px-5">
          <TopInvestors />
        </div>      
        <div className="pt-12 px-5">
          <DistressedAssetAuction />
        </div>

        <div className="pt-12 px-5">
          <div className="bg-[#050a1f] p-6">
            <div className="flex items-center">
              <div className="hidden xs:block">
                <Notepad2 size="36" color="#ffffff"/>
              </div>
              <div className="block xs:hidden">
                <Notepad2 size="24" color="#ffffff"/>
              </div>
              <p className="text-lg xs:text-xl lg:text-2xl xl:text-3xl text-white ml-4">Create and Sell your NFT</p>
            </div>                
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
              <CreateandSellNFTCard title='Set Up Your Wallet' content='With your wallet ready, you’ll unlock the ability to borrow, lend, buy, and enjoy all the features available on the site.'/>
              <CreateandSellNFTCard title='Borrowing' content='Access funds by leveraging your digital or physical assets. Set up your wallet, assess your assets, and borrow with transparency and ease.'/>
              <CreateandSellNFTCard title='Investing' content='Invest in digital or physical assets through Collateral’s P2P platform. Extend credit, earn interest, and be part of financial innovation. Set up your wallet to start lending today.'/>
              <CreateandSellNFTCard title='Buy Distressed Assets' content='Explore unique investment opportunities by bidding or buying distressed assets. Access diverse and carefully vetted options by setting up your wallet and start building your portfolio today.'/>
            </div>
          </div>
        </div>

        <div className="pt-20">
          <div className="flex flex-col items-center gap-8">
            <p className="font-bold text-xl xl:text-2xl text-white">Join the Community</p>
            <div className="flex items-center gap-4">        
              <Link href="https://www.instagram.com/collateralnwk/" target="_blank">
                <div className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-full p-1">
                  <IoLogoInstagram className="text-white w-8 h-8"/>
                </div>
              </Link>      
              <Link href="https://twitter.com/Collateralnwk" target="_blank">
                <div className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-full p-1">
                  <FaXTwitter className="text-white w-8 h-8"/>
                </div>
              </Link>
              <Link href="https://www.linkedin.com/company/91107961" target="_blank">
                <div className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-full p-1">
                  <IoLogoLinkedin className="text-white w-8 h-8"/>
                </div>
              </Link>
              <Link href="https://discord.gg/ZSnRF66EMX" target="_blank">
                <div className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-full p-1">
                  <FaDiscord className="text-white w-8 h-8"/>
                </div>
              </Link>
              <Link href="https://t.me/collateralnwk" target="_blank">
                <div className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-full p-1">
                  <FaTelegramPlane className="text-white w-8 h-8"/>
                </div>
              </Link>         
            </div>
          </div>         
        </div>
        
        <div className="flex justify-center pt-20 px-5">
          <p className="w-[920px] text-sm text-white text-center">Collateral Networks is a cutting-edge decentralized finance (DeFi) platform, operating both as a protocol platform and a Software as a Service (Saas) provider within the Ethereum blockchain. The company’s innovative mission is to serve as an interface, seamlessly facilitating peer-to-peer transactions between lenders and borrowers, all without acting as a lender or borrower itself.</p>
        </div>
        <div className="py-20 px-5">
          <p className="text-sm text-center text-white">© 2024 Collateral Network</p>
        </div>
      </div> 
    </div>    
  );
}
