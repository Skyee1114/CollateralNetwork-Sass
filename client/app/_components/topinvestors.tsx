'use client'

import { useState } from 'react';
import { Notepad2 } from 'iconsax-react';
import { TopInvestorsCard } from './card/topinvestorscard';

export function TopInvestors() {
    const [selectedOption, setSelectedOption] = useState('All');

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
                    <p className="text-lg xs:text-xl lg:text-2xl xl:text-3xl text-white ml-4">Top Investors</p>
                </div>
                {/* <div className="flex gap-6">
                    {['Sellers', 'Buyers', 'All'].map((option) => (
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
                </div> */}
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
                <TopInvestorsCard number='1' name='Astaroth Alvin' amount='125.11'/>
                <TopInvestorsCard number='2' name='Harri Maślanka' amount='108.79'/>
                <TopInvestorsCard number='3' name='Melchior Acquarone' amount='102.81'/>
                <TopInvestorsCard number='4' name='Cory Andreas' amount='95.19'/>
                <TopInvestorsCard number='5' name='Bontu Jankovic' amount='68.54'/>
                <TopInvestorsCard number='6' name='Rochus Capello' amount='68'/>
                <TopInvestorsCard number='7' name='Tércio Sokół' amount='48.41'/>
                <TopInvestorsCard number='8' name='Ove Kempf' amount='42.16'/>
                <TopInvestorsCard number='9' name='Jens Lesauvage' amount='35.9'/>
                <TopInvestorsCard number='10' name='Indrani Waller' amount='28.83'/>
                <TopInvestorsCard number='11' name='Katy Larue' amount='27.2'/>
                <TopInvestorsCard number='12' name='Christian Colón' amount='23.93'/>
                <TopInvestorsCard number='13' name='Tiitus Ashworth' amount='16.1'/>
                <TopInvestorsCard number='14' name='Tacitus Adebayo' amount='12.51'/>
                <TopInvestorsCard number='15' name='Lenz De Jong' amount='7.07'/>
            </div>
        </div>
    );
}
