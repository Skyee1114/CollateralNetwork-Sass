'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Diamonds, GalleryImport, Coin1 } from "iconsax-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';
import { useAuth } from "@/app/_context/authcontext";
import Loading from "@/app/_components/loading";
import { getCollectionList, updateCollectionStatus } from "@/app/_actions/collection";
import DistributionTransactionModal from "./_components/distributiontransactionmodal";
import ICOWalletModal from "./_components/icowalletmodal";
import { getClaimedICO, getICOs } from "@/app/_actions/admin";
import { getUsers } from "@/app/_actions/admin";
import { Collection, User, Ico } from "@/app/_utils/type";
import { UserAvatar } from "@/assets/img";

export default function SuperAdmin() {

  const { isAdmin, isAdminLoading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [claimedIcos, setClaimedIcos] = useState<Ico[]>([]);
  const [icos, setIcos] = useState<Ico[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 10;
  const [pageInput, setPageInput] = useState<string>("1");
  const [activeTab, setActiveTab] = useState<string>('users');
  const [isClaimedModalOpen, setIsClaimedModalOpen] = useState<boolean>(false);
  const [selectedClaimedIco, setSelectedClaimedIco] = useState<Ico | null>(null);
  const [isICOModalOpen, setIsICOModalOpen] = useState<boolean>(false);
  const [selectedIco, setSelectedIco] = useState<Ico | null>(null);

  const [currentUserPage, setCurrentUserPage] = useState<number>(1);
  const [userPageInput, setUserPageInput] = useState<string>("1");

  useEffect(() => {
    if (!isAdminLoading && !isAdmin) {
      router.push('/');
    } else {
      const fetchUsers = async () => {
        try {       
          const res = await getUsers();    
          setUsers(res?.users || []);   
          
        } catch (err: any) {
          console.error(err);      
        }
      };
      fetchUsers();

      const fetchCollections = async () => {
        try {       
          const res = await getCollectionList();    
          setCollections(res?.collections || []);  
          
        } catch (err: any) {
          console.error(err);      
        }
      };
      fetchCollections();

      const fetchClaimedICOs = async () => {
        try {       
          const res = await getClaimedICO();    
          setClaimedIcos(res?.claimedicos || []);
          
        } catch (err: any) {
          console.error(err);      
        }
      };
      fetchClaimedICOs();

      const fetchICOs = async () => {
        try {       
          const res = await getICOs();    
          setIcos(res?.icos || []);
          
        } catch (err: any) {
          console.error(err);      
        }
      };
      fetchICOs();
    }
  }, []);
  
  if (isAdminLoading) {
    return <Loading />;
  }

  if (!isAdmin) {
    return null;
  }

  const handleCollectionStatusChange = async (id: string, allowed: number) => {
    try {
      await updateCollectionStatus({id, allowed});
      setCollections(collections.map(collection => 
        collection._id === id ? { ...collection, allowed } : collection
      ));
      toast.success('The collection status successfully updated.');    
    } catch (err) {
      console.error(err);
    }
  };

  const updateClaimedIco = (updatedIco: Ico) => {
    setClaimedIcos(prevIcos => prevIcos.map(ico => 
      ico.walletaddress === updatedIco.walletaddress ? updatedIco : ico
    ));
    setIsClaimedModalOpen(false);
  };

  const handleAddButtonClick = (ico: Ico) => {
    setSelectedClaimedIco(ico);
    setIsClaimedModalOpen(true);
  };

  const updatedIco = async () => {
    try {       
      const res = await getICOs();    
      setIcos(res?.icos || []);
      
    } catch (err: any) {
      console.error(err);      
    }
    setIsICOModalOpen(false);
  };

  const handleEditButtonClick = (ico: Ico) => {
    setSelectedIco(ico);
    setIsICOModalOpen(true);
  };

  const totalPages = Math.ceil(icos.length / rowsPerPage);
  const indexOfLastIco = currentPage * rowsPerPage;
  const indexOfFirstIco = indexOfLastIco - rowsPerPage;
  const currentIcos = icos?.slice(indexOfFirstIco, indexOfLastIco) || [];  

  // Handler to move to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
      setPageInput(String(currentPage + 1));
    }
  };

  // Handler to move to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
      setPageInput(String(currentPage - 1));
    }
  };

  // Handler to jump to a specific page
  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const handlePageInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const pageNumber = parseInt(pageInput);
      if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      } else {
        toast.error("Invalid page number.");
        setPageInput(String(currentPage)); // reset the input to the current page
      }
    }
  };

  const totalUserPages = Math.ceil(users.length / rowsPerPage);
  const indexOfLastUser = currentUserPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const currentUsers = users?.slice(indexOfFirstUser, indexOfLastUser) || [];

  const handleNextUserPage = () => {
    if (currentUserPage < totalUserPages) {
      setCurrentUserPage(prevPage => prevPage + 1);
      setUserPageInput(String(currentUserPage + 1));
    }
  };

  // Handler to move to the previous page for users
  const handlePreviousUserPage = () => {
    if (currentUserPage > 1) {
      setCurrentUserPage(prevPage => prevPage - 1);
      setUserPageInput(String(currentUserPage - 1));
    }
  };

  // Handler to jump to a specific page for users
  const handleUserPageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPageInput(e.target.value);
  };

  const handleUserPageInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const pageNumber = parseInt(userPageInput);
      if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalUserPages) {
        setCurrentUserPage(pageNumber);
      } else {
        toast.error("Invalid page number.");
        setUserPageInput(String(currentUserPage)); // reset the input to the current page
      }
    }
  };

  const handleExportUsers = () => {
    const ws = XLSX.utils.json_to_sheet(users.map((user, index) => ({ 
      'Number': index+1, 
      'Username': user.name, 
      'Email': user.email, 
      'Last Login': user.logindate,
      'Colt': user.colttoken,
      'Awaiting Assets': user.nft.awaiting,
      'Listed Assets': user.nft.listed,
      'Active Investments': user.bid.active,
      'Current ETH ROI': user.roi })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'User');
    XLSX.writeFile(wb, 'Users.xlsx');
  };      

  const handleExportCollections = () => {
    const ws = XLSX.utils.json_to_sheet(collections.map((collection, index) => ({ 
      'Number': index+1, 
      'Date - Time': collection.date, 
      'Username': collection.name, 
      'Email': collection.email,
      'Collection Name': collection.collectionname,
      'Marketplace Link': collection.marketplacelink,
      'Social Link': collection.sociallink,
      'Asset Link': collection.assetlink })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Collection');
    XLSX.writeFile(wb, 'Collections.xlsx');
  };   

  const handleExportICOClaims = () => {
    const ws = XLSX.utils.json_to_sheet(claimedIcos.map((ico, index) => ({ 
      'Number': index+1, 
      'Date - Time': ico.date, 
      'Wallet Address': ico.walletaddress, 
      'Claimed Tx Hash': ico.claimedtx,
      'Distribution Token Amount': ico.distributiontoken,
      'Distribution Tx Hash': ico.distributiontx })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Claim');
    XLSX.writeFile(wb, 'ICO Claims.xlsx');
  };   

  const handleExportICOWallets = () => {
    const ws = XLSX.utils.json_to_sheet(icos.map((ico, index) => ({ 
      'Number': index+1, 
      'Wallet Address': ico.walletaddress, 
      'Purchased Tokens': ico.purchasedtoken,
      'Bonus Tokens': ico.bonustoken,
      'Total Tokens': ico.totaltoken,
      'Email': ico.email })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Wallet');
    XLSX.writeFile(wb, 'ICO Wallets.xlsx');
  };  

  return (
    <div>
      <ToastContainer className='text-sm'/>
      <div className="w-full max-w-[1280px] mx-auto px-5">
        <div className="flex justify-center items-center gap-2">
          <div className="hidden xs:block">
            <Diamonds size="36" color="#ffffff"/>
          </div>
          <div className="block xs:hidden">
            <Diamonds size="24" color="#ffffff"/>
          </div>
          <p className="text-3xl xs:text-4xl text-white">Super Admin</p>
        </div>
        
        <div className="pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">            
            <div
              className={`border border-[#3612C4] py-4 transition-colors duration-300 ease-in-out ${activeTab === 'users' ? 'bg-[#3612C4]' : 'bg-transparent'} cursor-pointer`}
              onClick={() => setActiveTab('users')}
            >
              <p className="text-xl text-center text-white">Platform Users: {users.length}</p>
            </div>
            <div
              className={`border border-[#3612C4] py-4 transition-colors duration-300 ease-in-out ${activeTab === 'collections' ? 'bg-[#3612C4]' : 'bg-transparent'} cursor-pointer`}
              onClick={() => setActiveTab('collections')}
            >
              <p className="text-xl text-center text-white">Collections Requested: {collections.length}</p>
            </div>
            <div
              className={`border border-[#3612C4] py-4 transition-colors duration-300 ease-in-out ${activeTab === 'icoclaims' ? 'bg-[#3612C4]' : 'bg-transparent'} cursor-pointer`}
              onClick={() => setActiveTab('icoclaims')}
            >
              <p className="text-xl text-center text-white">ICO Claims: {claimedIcos.length}</p>
            </div>
            <div
              className={`border border-[#3612C4] py-4 transition-colors duration-300 ease-in-out ${activeTab === 'icowallets' ? 'bg-[#3612C4]' : 'bg-transparent'} cursor-pointer`}
              onClick={() => setActiveTab('icowallets')}
            >
              <p className="text-xl text-center text-white">ICO Wallets: {icos.length}</p>
            </div>
          </div>

          {activeTab === 'users' && (
            <div className="pt-12">
              <div className="bg-[#14172E] rounded-md p-4 overflow-auto lg:overflow-hidden">
                <div className='flex justify-between items-center pb-4'>
                  <p className='font-bold text-xl xs:text-2xl text-white'>Platform Users</p>
                  <button
                    onClick={handleExportUsers}
                    className="text-sm xs:text-base px-3 xs:px-4 py-2 transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] text-white rounded-md"
                  >
                    Export CSV
                  </button>
                  <Image src={UserAvatar} alt="" className="w-6 h-6 xs:w-8 xs:h-8" />
                </div>
                <table className="w-full table-auto text-white min-w-[1024px]">
                  <thead className="text-sm bg-[#3f15e9]">
                    <tr>
                      <th className="font-normal text-left p-4">Username</th>
                      <th className="font-normal text-left p-4">Email</th>
                      <th className="font-normal text-left p-4">Last Login</th>
                      <th className="font-normal text-left p-4">COLT</th>
                      <th className="font-normal text-left p-4">Awaiting Assets</th>
                      <th className="font-normal text-left p-4">Listed Assets</th>
                      <th className="font-normal text-left p-4">Active Investments</th>
                      <th className="font-normal text-left p-4">Current ETH ROI</th>
                      <th className="font-normal text-left p-4">User</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {currentUsers.map((user, index) => (
                      <tr key={user._id} className={index % 2 === 1 ? '' : 'bg-[#060A1E]'}>
                        <td className="p-4">{user.name}</td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">{user.logindate}</td>
                        <td className="p-4">{user.colttoken}</td>
                        <td className="p-4">{user.nft.awaiting}</td>
                        <td className="p-4">{user.nft.listed}</td>
                        <td className="p-4">{user.bid.active}</td>
                        <td className="p-4">{user.roi}</td>
                        <td className="p-4"><Image src={UserAvatar} alt=""/></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-between xs:justify-center gap-4 xs:gap-8 items-center mt-4">
                  <button
                    onClick={handlePreviousUserPage}
                    disabled={currentUserPage === 1}
                    className="text-sm xs:text-base px-3 xs:px-4 py-2 transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] text-white rounded-md disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm xs:text-base text-white">Page</span>
                    <div className="border-2 border-[#3f15e9] rounded-md px-0 xs:px-2 py-1">
                      <input
                        type="text"
                        value={userPageInput}
                        onChange={handleUserPageInputChange}
                        onKeyDown={handleUserPageInputSubmit}
                        className="text-sm xs:text-base w-12 xs:w-16 text-center outline-none bg-transparent text-white"
                      />
                    </div>
                    <span className="text-sm xs:text-base text-white">of {totalUserPages}</span>
                  </div>
                  <button
                    onClick={handleNextUserPage}
                    disabled={currentUserPage === totalUserPages}
                    className="text-sm xs:text-base px-3 xs:px-4 py-2 transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] text-white rounded-md disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'collections' && (
            <div className="pt-12">
              <div className="bg-[#14172E] rounded-md p-4 overflow-auto xl:overflow-hidden">
                <div className='flex justify-between items-center pb-4'>
                  <p className='font-bold text-xl xs:text-2xl text-white'>Collection Requested</p>
                  <button
                    onClick={handleExportCollections}
                    className="text-sm xs:text-base px-3 xs:px-4 py-2 transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] text-white rounded-md"
                  >
                    Export CSV
                  </button>
                  <div className="hidden xs:block">
                    <GalleryImport size="36" color="#ffffff"/>
                  </div>
                  <div className="block xs:hidden">
                    <GalleryImport size="24" color="#ffffff"/>
                  </div>
                </div>
                <table className="w-full table-fixed text-white min-w-[1024px]">
                  <thead className="text-sm bg-[#3f15e9]">
                    <tr>
                      <th className="font-normal text-left p-4 w-1/12">Date - Time</th>
                      <th className="font-normal text-left p-4 w-1/12">Username</th>
                      <th className="font-normal text-left p-4 w-1/12">Email</th>
                      <th className="font-normal text-left p-4 w-2/12">Collection Name</th>
                      <th className="font-normal text-left p-4 w-2/12">Marketplace Link</th>
                      <th className="font-normal text-left p-4 w-1/12">Social Link</th>
                      <th className="font-normal text-left p-4 w-2/12">Asset Link</th>
                      <th className="font-normal text-left p-4 w-2/12">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {collections.map((collection, index) => (
                      <tr key={collection._id} className={index % 2 === 1 ? '' : 'bg-[#060A1E]'}>
                        <td className="p-4 w-1/12 break-words whitespace-normal">{new Date(collection.date).toLocaleString()}</td>
                        <td className="p-4 w-1/12 break-words whitespace-normal">{collection.name}</td>
                        <td className="p-4 w-1/12 break-words whitespace-normal">{collection.email}</td>
                        <td className="p-4 w-2/12 break-words whitespace-normal">{collection.collectionname}</td>
                        <td className="p-4 w-2/12 break-words whitespace-normal"><a href={collection.marketplacelink} target="_blank" rel="noopener noreferrer" className="text-blue-400">{collection.marketplacelink}</a></td>
                        <td className="p-4 w-1/12 break-words whitespace-normal"><a href={collection.sociallink} target="_blank" rel="noopener noreferrer" className="text-blue-400">{collection.sociallink}</a></td>
                        <td className="p-4 w-2/12 break-words whitespace-normal"><a href={collection.assetlink} target="_blank" rel="noopener noreferrer" className="text-blue-400">{collection.assetlink}</a></td>
                        <td className="p-4 w-2/12">
                          <div className="flex flex-col xl:flex-row gap-2">
                            <button 
                              className={`transition-colors duration-300 ease-in-out py-2 px-4 rounded ${collection.allowed == 1 ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-700'} text-white`}
                              onClick={() => handleCollectionStatusChange(collection._id, 1)}
                              disabled={collection.allowed == 1}
                            >
                              Accept
                            </button>
                            <button 
                              className={`transition-colors duration-300 ease-in-out py-2 px-4 rounded ${collection.allowed == 2 ? 'bg-gray-500' : 'bg-red-500 hover:bg-red-700'} text-white`}
                              onClick={() => handleCollectionStatusChange(collection._id, 2)}
                              disabled={collection.allowed == 2}
                            >
                              Decline
                            </button>
                          </div>                          
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'icoclaims' && (
            <div className="pt-12">
              <div className="bg-[#14172E] rounded-md p-4 overflow-auto lg:overflow-hidden">
                <div className='flex justify-between items-center pb-4'>
                  <p className='font-bold text-xl xs:text-2xl text-white'>ICO Claims</p>
                  <button
                    onClick={handleExportICOClaims}
                    className="text-sm xs:text-base px-3 xs:px-4 py-2 transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] text-white rounded-md"
                  >
                    Export CSV
                  </button>
                  <div className="hidden xs:block">
                    <Coin1 size="36" color="#ffffff"/>
                  </div>
                  <div className="block xs:hidden">
                    <Coin1 size="24" color="#ffffff"/>
                  </div>
                </div>
                <table className="w-full table-fixed text-white min-w-[1024px]">
                  <thead className="text-sm bg-[#3f15e9]">
                    <tr>
                      <th className="font-normal text-left p-4 w-1/6">Date - Time</th>
                      <th className="font-normal text-left p-4 w-1/6">Wallet Address</th>
                      <th className="font-normal text-left p-4 w-3/12">Claimed Tx Hash</th>
                      <th className="font-normal text-left p-4 w-1/12">Distributed Token Amount</th>
                      <th className="font-normal text-left p-4 w-3/12">Distribution Tx Hash</th>
                      <th className="font-normal text-left p-4 w-1/12">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {claimedIcos.map((ico, index) => (
                      <tr key={ico._id} className={index % 2 === 1 ? '' : 'bg-[#060A1E]'}>
                        <td className="p-4 w-1/6 break-words whitespace-normal">{new Date(ico.date).toLocaleString()}</td>
                        <td className="p-4 w-1/6 break-words whitespace-normal">{ico.walletaddress}</td>
                        <td className="p-4 w-3/12 break-words whitespace-normal">{ico.claimedtx}</td>
                        <td className="p-4 w-1/12 break-words whitespace-normal">{ico.distributiontoken.toLocaleString()}</td>
                        <td className="p-4 w-3/12 break-words whitespace-normal">{ico.distributiontx}</td>
                        <td className="p-4 w-1/12 break-words whitespace-normal">
                          <button 
                            className={`transition-colors duration-300 ease-in-out py-2 px-4 rounded ${ico.distributiontx ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-700'} text-white`}
                            onClick={() => handleAddButtonClick(ico)}
                            disabled={ico.distributiontx ? true : false}
                          >
                            Add
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'icowallets' && (
            <div className="pt-12">
              <div className="bg-[#14172E] rounded-md p-4 overflow-auto lg:overflow-hidden">
                <div className='flex justify-between items-center pb-4'>
                  <p className='font-bold text-xl xs:text-2xl text-white'>ICO Wallets</p>
                  <button
                    onClick={handleExportICOWallets}
                    className="text-sm xs:text-base px-3 xs:px-4 py-2 transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] text-white rounded-md"
                  >
                    Export CSV
                  </button>
                  <div className="hidden xs:block">
                    <Coin1 size="36" color="#ffffff"/>
                  </div>
                  <div className="block xs:hidden">
                    <Coin1 size="24" color="#ffffff"/>
                  </div>
                </div>
                <table className="w-full table-fixed text-white min-w-[1024px]">
                  <thead className="text-sm bg-[#3f15e9]">
                    <tr>
                      <th className="font-normal text-left p-4 w-3/12">Wallet Address</th>
                      <th className="font-normal text-left p-4 w-1/6">Purchased Tokens</th>
                      <th className="font-normal text-left p-4 w-1/6">Bonus Tokens</th>
                      <th className="font-normal text-left p-4 w-1/6">Total Tokens</th>
                      <th className="font-normal text-left p-4 w-1/6">Email </th>
                      <th className="font-normal text-left p-4 w-1/12">Edit </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {currentIcos.map((ico, index) => (
                      <tr key={ico._id} className={index % 2 === 1 ? '' : 'bg-[#060A1E]'}>
                        <td className="p-4 w-3/12 break-words whitespace-normal">{ico.walletaddress}</td>
                        <td className="p-4 w-1/6 break-words whitespace-normal">{ico.purchasedtoken}</td>
                        <td className="p-4 w-1/6 break-words whitespace-normal">{ico.bonustoken}</td>
                        <td className="p-4 w-1/6 break-words whitespace-normal">{ico.totaltoken}</td>
                        <td className="p-4 w-1/6 break-words whitespace-normal">{ico.email}</td>
                        <td className="p-4 w-1/12 break-words whitespace-normal">
                          <button 
                            className="transition-colors duration-300 ease-in-out py-2 px-4 rounded bg-green-500 hover:bg-green-700 text-white"
                            onClick={() => handleEditButtonClick(ico)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-between xs:justify-center gap-4 xs:gap-8 items-center mt-4">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="text-sm xs:text-base px-3 xs:px-4 py-2 transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] text-white rounded-md disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm xs:text-base text-white">Page</span>
                    <div className="border-2 border-[#3f15e9] rounded-md px-0 xs:px-2 py-1">
                      <input
                        type="text"
                        value={pageInput}
                        onChange={handlePageInputChange}
                        onKeyDown={handlePageInputSubmit}
                        className="text-sm xs:text-base w-12 xs:w-16 text-center outline-none bg-transparent text-white"
                      />
                    </div>                   
                     
                    <span className="text-sm xs:text-base text-white">of {totalPages}</span>
                  </div>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="text-sm xs:text-base px-3 xs:px-4 py-2 transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] text-white rounded-md disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {selectedClaimedIco && (
          <DistributionTransactionModal 
            isOpen={isClaimedModalOpen} 
            onClose={() => setIsClaimedModalOpen(false)} 
            updateClaimedIco={updateClaimedIco} 
            walletaddress={selectedClaimedIco.walletaddress} 
          />
        )}
        {selectedIco && (
          <ICOWalletModal 
            isOpen={isICOModalOpen} 
            onClose={() => setIsICOModalOpen(false)} 
            updateIco={updatedIco} 
            ico={selectedIco}
          />
        )}
      </div>
    </div>
  );
}
