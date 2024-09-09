'use client'

import { useState } from 'react';
import { Notepad2 } from "iconsax-react";
import { BidorBuyCard } from './card/bidorbuycard';

export function BidorBuy() {      
    const [selectedOption, setSelectedOption] = useState('All');

    return (        
        <div className="bg-[#050a1f] p-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Notepad2 size="36" color="#ffffff"/>
                    <p className="text-3xl text-white ml-4">Bid or Buy</p>
                </div>
                <div className="flex gap-6">
                    {['≤10%', '≤12%', '≤15%', '≤18%', '≤20%', 'All'].map((option) => (
                        <label key={option} className="flex items-center cursor-pointer text-white">
                            <input
                                type="radio"
                                name="investorType"
                                value={option}
                                checked={selectedOption === option}
                                onChange={() => setSelectedOption(option)}
                                className="hidden"
                            />
                            <div className={`relative inline-block w-5 h-5 mr-4 border-2 rounded-full border-[#3F15E9]`}>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className={`transition-all duration-300 ease-in-out ${selectedOption === option ? "w-2.5 h-2.5" : "w-0 h-0"}  bg-[#3F15E9] rounded-full`}></div>
                                </div>
                            </div>
                            {option}
                        </label>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-4 gap-8 pt-8">
                <BidorBuyCard name="Aodh Apeldoorn" love="6" assetName="Holiday Home" loanRate="15" totalLoan="108.79"/>
                <BidorBuyCard name="Funmilayo Mullane" love="22" assetName="Watch" loanRate="15" totalLoan="2.18"/>
                <BidorBuyCard name="Vladan Bernard" love="31" assetName="Picture Collection" loanRate="15" totalLoan="13.6"/>
                <BidorBuyCard name="Kenaniah Dunkel" love="18" assetName="NFT Art" loanRate="18" totalLoan="8.16"/>
                <BidorBuyCard name="Kōki Smolak" love="24" assetName="Chair" loanRate="10" totalLoan="2.18"/>
                <BidorBuyCard name="Gasto Etxebarria" love="9" assetName="Statue" loanRate="18" totalLoan="8.16"/>
                <BidorBuyCard name="Hodel Jean" love="4" assetName="Yacht" loanRate="12" totalLoan="40.8"/>
                <BidorBuyCard name="Haumea Costa" love="99+" assetName="Coins" loanRate="12" totalLoan="0.95"/>
            </div>
        </div>
    )
}
