'use client'

import { useState } from "react";
import Image from "next/image";
import { MdLabel } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { Judge } from "iconsax-react";
import { AssetsCard } from "@/app/_components/card/assetscard";

export default function DistressedAssets() {
  
  const [isInterestTypesExpanded, setIsInterestTypesExpanded] = useState(false);
  const [interestTypesChecked, setInterestTypesChecked] = useState(false);
  const [subInterestTypesChecked, setsubInterestTypesChecked] = useState({
    ten: false,
    twelve: false,
    fifteen: false,
    eighteen: false,
    twenty: false,
    twentyone: false,
  });

  const handleParentInterestCheckboxChange = () => {
    const newCheckedState = !interestTypesChecked;
    setInterestTypesChecked(newCheckedState);
    setsubInterestTypesChecked({
      ten: newCheckedState,
      twelve: newCheckedState,
      fifteen: newCheckedState,
      eighteen: newCheckedState,
      twenty: newCheckedState,
      twentyone: newCheckedState,
    });
  };

  const handleSubInterestTypeChange = (type: keyof typeof subInterestTypesChecked) => {
    const newCheckedState = !subInterestTypesChecked[type];
    setsubInterestTypesChecked((prev) => ({
      ...prev,
      [type]: newCheckedState,
    }));

    if (!newCheckedState) {
      setInterestTypesChecked(false);
    } else {
      const allChecked = Object.values({ ...subInterestTypesChecked, [type]: newCheckedState }).every(Boolean);
      if (allChecked) {
        setInterestTypesChecked(true);
      }
    }
  };

  const [isAssetTypesExpanded, setIsAssetTypesExpanded] = useState(false);
  const [assetTypesChecked, setAssetTypesChecked] = useState(false);
  const [subAssetTypesChecked, setsubAssetTypesChecked] = useState({
    businessAssets: false,
    collectibles: false,
    defi: false,
    digitalRightsandLicenses: false,
    digitalSecurities: false,
    domainsandWebsites: false,
    jewelleryandWatches: false,
    luxuryGoods: false,
    nft: false,
    realEstate: false,
    softwareandApps: false,
    technology: false,
    vehicles: false,
  });

  const handleParentAssetsCheckboxChange = () => {
    const newCheckedState = !assetTypesChecked;
    setAssetTypesChecked(newCheckedState);
    setsubAssetTypesChecked({
      businessAssets: newCheckedState,
      collectibles: newCheckedState,
      defi: newCheckedState,
      digitalRightsandLicenses: newCheckedState,
      digitalSecurities: newCheckedState,
      domainsandWebsites: newCheckedState,
      jewelleryandWatches: newCheckedState,
      luxuryGoods: newCheckedState,
      nft: newCheckedState,
      realEstate: newCheckedState,
      softwareandApps: newCheckedState,
      technology: newCheckedState,
      vehicles: newCheckedState,
    });
  };

  const handleSubAssetTypeChange = (type: keyof typeof subAssetTypesChecked) => {
    const newCheckedState = !subAssetTypesChecked[type];
    setsubAssetTypesChecked((prev) => ({
      ...prev,
      [type]: newCheckedState,
    }));

    if (!newCheckedState) {
      setAssetTypesChecked(false);
    } else {
      const allChecked = Object.values({ ...subAssetTypesChecked, [type]: newCheckedState }).every(Boolean);
      if (allChecked) {
        setAssetTypesChecked(true);
      }
    }
  };

  return (
    <div className="w-full px-8 mx-auto">
      <div className="flex justify-center items-center gap-2">
        <Judge size="36" color="#ffffff"/>
        <p className="text-4xl text-white">Distressed Assets</p>
      </div>
      <p className="text-center text-white pt-8">The Distressed Assets Tab is a specialized marketplace within the platform, featuring digital and physical assets that have been surrendered due to non-payment to original lenders. These assets are available for purchase at below market value, providing an opportunity for investors to acquire valuable items at a reduced cost. It serves as a transparent avenue for both buying and dealing with assets that have fallen into distress, aligning with the platform’s commitment to integrity and innovation.</p>
      <div className="flex justify-between gap-8 pt-12">
        <div className="flex flex-col items-center w-3/4">
          <div className="flex font-bold text-sm text-white border rounded-sm">
            <p className="py-2 px-4 border-r">VALUE HIGH &gt; LOW</p>
            <p className="py-2 px-4 border-r">VALUE LOW &gt; HIGH</p>
            <p className="py-2 px-4 border-r">ROI HIGH &gt; LOW</p>
            <p className="py-2 px-4">ROI LOW &gt; HIGH</p>
          </div>
          <div className="grid grid-cols-3 gap-8 pt-12">
            <AssetsCard title="Holiday Home #0001" fractionNo="1" value="108.79" roi="15" category="Distressed" assetStatus="" term="" bid="97.911" action="MAKE BID"/>
            <AssetsCard title="Watch #0002" fractionNo="1" value="2.18" roi="15" category="Distressed" assetStatus="" term="" bid="1.962" action="MAKE BID"/>
            <AssetsCard title="NFT #0003" fractionNo="1" value="8.16" roi="18" category="Distressed" assetStatus="" term="" bid="7.344" action="MAKE BID"/>
            <AssetsCard title="Yacht #0004" fractionNo="1" value="40.80" roi="12" category="Distressed" assetStatus="" term="" bid="36.72" action="MAKE BID"/>
            <AssetsCard title="Chair #0005" fractionNo="1" value="2.18" roi="10" category="Distressed" assetStatus="" term="" bid="1.962" action="MAKE BID"/>
            <AssetsCard title="Statue #0006" fractionNo="1" value="8.16" roi="18" category="Distressed" assetStatus="" term="" bid="7.344" action="MAKE BID"/>
          </div>
        </div>
        <div className="w-1/4">
          <p className="text-2xl text-white">Filters</p>
          <div className="pt-4 pl-4">
            <div className="flex items-center cursor-pointer">
              <button onClick={() => setIsInterestTypesExpanded(!isInterestTypesExpanded)}>
                <IoIosArrowForward
                  className={`transform transition-transform duration-500 text-xl text-white ${
                    isInterestTypesExpanded ? 'rotate-90' : ''
                  }`}
                />
              </button>
              <input
                type="checkbox"
                checked={interestTypesChecked}
                onChange={handleParentInterestCheckboxChange}
                className="w-5 h-5 ml-4 cursor-pointer"
              />
              <div className="px-4">
                <MdLabel className="text-2xl text-white"/>
              </div>              
              <p className="text-white">Interest Types</p>              
            </div>
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${isInterestTypesExpanded ? 'max-h-[560px]' : 'max-h-0'}`}
            >
              <div className="flex flex-col gap-4 pl-14 pt-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subInterestTypesChecked.ten}
                      onChange={() => handleSubInterestTypeChange('ten')}
                      className="w-5 h-5 mr-2 cursor-pointer"
                    />
                    <p className="text-white">
                      ≤10%
                    </p>
                  </div>    
                  <p className="text-sm text-white">90</p>              
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subInterestTypesChecked.twelve}
                      onChange={() => handleSubInterestTypeChange('twelve')}
                      className="w-5 h-5 mr-2 cursor-pointer"
                    />
                    <p className="text-white">
                      ≤12%
                    </p>
                  </div>
                  <p className="text-sm text-white">294</p>        
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subInterestTypesChecked.fifteen}
                      onChange={() => handleSubInterestTypeChange('fifteen')}
                      className="w-5 h-5 mr-2 cursor-pointer"
                    />
                    <p className="text-white">
                      ≤15%
                    </p>
                  </div>
                  <p className="text-sm text-white">378</p>    
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subInterestTypesChecked.eighteen}
                      onChange={() => handleSubInterestTypeChange('eighteen')}
                      className="w-5 h-5 mr-2 cursor-pointer"
                    />
                    <p className="text-white">
                      ≤18%
                    </p>
                  </div>
                  <p className="text-sm text-white">24</p> 
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subInterestTypesChecked.twenty}
                      onChange={() => handleSubInterestTypeChange('twenty')}
                      className="w-5 h-5 mr-2 cursor-pointer"
                    />
                    <p className="text-white">
                      ≤20%
                    </p>
                  </div>
                  <p className="text-sm text-white">161</p> 
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subInterestTypesChecked.twentyone}
                      onChange={() => handleSubInterestTypeChange('twentyone')}
                      className="w-5 h-5 mr-2 cursor-pointer"
                    />
                    <p className="text-white">
                      ≥21%
                    </p>
                  </div>
                  <p className="text-sm text-white">131</p> 
                </div>                            
              </div>
            </div>
          </div>


          <div className="pt-4 pl-4">
            <div className="flex items-center cursor-pointer">
              <button onClick={() => setIsAssetTypesExpanded(!isAssetTypesExpanded)}>
                <IoIosArrowForward
                  className={`transform transition-transform duration-500 text-xl text-white ${
                    isAssetTypesExpanded ? 'rotate-90' : ''
                  }`}
                />
              </button>
              <input
                type="checkbox"
                checked={assetTypesChecked}
                onChange={handleParentAssetsCheckboxChange}
                className="w-5 h-5 ml-4 cursor-pointer"
              />
              <div className="px-4">
                <MdLabel className="text-2xl text-white"/>
              </div>              
              <p className="text-white">Asset Types</p>              
            </div>
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${isAssetTypesExpanded ? 'max-h-[560px]' : 'max-h-0'}`}
            >
              <div className="flex flex-col gap-4 pl-14 pt-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subAssetTypesChecked.businessAssets}
                      onChange={() => handleSubAssetTypeChange('businessAssets')}
                      className="w-5 h-5 mr-2 cursor-pointer"
                    />
                    <p className="text-white">
                      Business Assets
                    </p>
                  </div>    
                  <p className="text-sm text-white">4</p>              
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subAssetTypesChecked.collectibles}
                      onChange={() => handleSubAssetTypeChange('collectibles')}
                      className="w-5 h-5 mr-2 cursor-pointer"
                    />
                    <p className="text-white">
                      Collectibles
                    </p>
                  </div>
                  <p className="text-sm text-white">54</p>        
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subAssetTypesChecked.defi}
                      onChange={() => handleSubAssetTypeChange('defi')}
                      className="w-5 h-5 mr-2 cursor-pointer"
                    />
                    <p className="text-white">
                      Decentralized Finance (DeFi)
                    </p>
                  </div>
                  <p className="text-sm text-white">65</p>    
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subAssetTypesChecked.digitalRightsandLicenses}
                      onChange={() => handleSubAssetTypeChange('digitalRightsandLicenses')}
                      className="w-5 h-5 mr-2 cursor-pointer"
                    />
                    <p className="text-white">
                      Digital Rights and Licenses
                    </p>
                  </div>
                  <p className="text-sm text-white">54</p> 
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subAssetTypesChecked.digitalSecurities}
                      onChange={() => handleSubAssetTypeChange('digitalSecurities')}
                      className="w-5 h-5 mr-2 cursor-pointer"
                    />
                    <p className="text-white">
                      Digital Securities
                    </p>
                  </div>
                  <p className="text-sm text-white">54</p> 
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subAssetTypesChecked.domainsandWebsites}
                      onChange={() => handleSubAssetTypeChange('domainsandWebsites')}
                      className="w-5 h-5 mr-2 cursor-pointer"
                    />
                    <p className="text-white">
                      Domains and Websites
                    </p>
                  </div>
                  <p className="text-sm text-white">24</p> 
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subAssetTypesChecked.jewelleryandWatches}
                      onChange={() => handleSubAssetTypeChange('jewelleryandWatches')}
                      className="w-5 h-5 mr-2 cursor-pointer"
                    />
                    <p className="text-white">
                      Jewellery and Watches
                    </p>
                  </div>
                  <p className="text-sm text-white">9</p> 
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subAssetTypesChecked.luxuryGoods}
                      onChange={() => handleSubAssetTypeChange('luxuryGoods')}
                      className="w-5 h-5 mr-2 cursor-pointer"
                    />
                    <p className="text-white">
                      Luxury Goods
                    </p>
                  </div>
                  <p className="text-sm text-white">24</p> 
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subAssetTypesChecked.nft}
                      onChange={() => handleSubAssetTypeChange('nft')}
                      className="w-5 h-5 mr-2 cursor-pointer"
                    />
                    <p className="text-white">
                      Non-Fungible Tokens (NFTs)
                    </p>
                  </div>
                  <p className="text-sm text-white">9</p> 
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subAssetTypesChecked.realEstate}
                      onChange={() => handleSubAssetTypeChange('realEstate')}
                      className="w-5 h-5 mr-2 cursor-pointer"
                    />
                    <p className="text-white">
                      Real Estate
                    </p>
                  </div>
                  <p className="text-sm text-white">24</p> 
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subAssetTypesChecked.softwareandApps}
                      onChange={() => handleSubAssetTypeChange('softwareandApps')}
                      className="w-5 h-5 mr-2 cursor-pointer"
                    />
                    <p className="text-white">
                      Software and Apps
                    </p>
                  </div>
                  <p className="text-sm text-white">9</p> 
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subAssetTypesChecked.technology}
                      onChange={() => handleSubAssetTypeChange('technology')}
                      className="w-5 h-5 mr-2 cursor-pointer"
                    />
                    <p className="text-white">
                      Technology
                    </p>
                  </div>
                  <p className="text-sm text-white">65</p> 
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subAssetTypesChecked.vehicles}
                      onChange={() => handleSubAssetTypeChange('vehicles')}
                      className="w-5 h-5 mr-2 cursor-pointer"
                    />
                    <p className="text-white">
                      Vehicles
                    </p>
                  </div>
                  <p className="text-sm text-white">4</p> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
