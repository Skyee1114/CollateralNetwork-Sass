import { Notepad2 } from "iconsax-react";
import { ArrowButton } from "./button/arrowbutton";
import { DistressedAssetAuctionCard } from "./card/distressedassetauctioncard";

export function DistressedAssetAuction() {      

    return (        
        <div className="bg-[#050a1f] p-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="hidden xs:block">
                        <Notepad2 size="36" color="#ffffff"/>
                    </div>
                    <div className="block xs:hidden">
                        <Notepad2 size="24" color="#ffffff"/>
                    </div>
                    <p className="text-lg xs:text-xl lg:text-2xl xl:text-3xl text-white ml-4">Distressed Asset Auction</p>
                </div>
                <div className="flex gap-2 xs:gap-4">
                    <ArrowButton arrow="back"/>
                    <ArrowButton arrow="forward"/>
                </div>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-8">
                <DistressedAssetAuctionCard assetName="Yacht" amount="40.8"/>
                <DistressedAssetAuctionCard assetName="Holiday Home" amount="59.84"/>
                <DistressedAssetAuctionCard assetName="Watch" amount="0.68"/>
                <DistressedAssetAuctionCard assetName="Fine Art" amount="20.4"/>
            </div>
        </div>
    )
}
