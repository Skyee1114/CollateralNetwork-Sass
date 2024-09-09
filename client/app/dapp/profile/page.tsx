'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadUser } from "@/app/_actions/auth";
import setAuthToken from "@/app/_utils/setauthtoken";
import { twofa } from "@/app/_actions/profile";
import { User } from "@/app/_utils/type";
import { useAuth } from "@/app/_context/authcontext";
import NameModal from "./_components/namemodal";
import { savePersonName, updatePersonInformation, updateContactInformation, updateAddressInformation } from "@/app/_actions/profile";
import { UserAvatar, Wallet } from "@/assets/img";


export default function Profile() {

  const [twofaEnabled, setTwofaEnabled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [nationality, setNationality] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempName, setTempName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {verifyUser} = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await loadUser();
        setUser(res.user);
        setTwofaEnabled(res.user.twofa);
        setFirstName(res.user.firstname);
        setLastName(res.user.lastname);
        setDob(res.user.dob);
        setNationality(res.user.nationality);
        setEmail(res.user.email);
        setPhoneNumber(res.user.phoneNumber);
        setAddress1(res.user.address1);
        setAddress2(res.user.address2);
        setCity(res.user.city);
        setState(res.user.state);
        setZip(res.user.zip);

        if (!res.user.name) {
          setIsModalOpen(true);
        }

        // Disable 2FA if phone number is not set
        if (!res.user.phoneNumber) {
          setTwofaEnabled(false);
          await twofa({ enabled: false });
          // toast.warning('Two-factor authentication disabled because phone number is not set.');
        }
      } catch (err: any) {
        console.error(err);
        toast.error(err.msg || 'An unexpected error occurred.'); 
    }
    };
    fetchUserData();
  }, []);

  const handleTwofaChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const isEnabled = event.target.checked;
    if (isEnabled && !phoneNumber) {
      toast.warning('Please set a phone number before enabling two-factor authentication.');
      return;
    }
    setTwofaEnabled(isEnabled);       
    try {
      await twofa({ enabled: isEnabled });
      toast.success(`Two-factor authentication ${isEnabled ? 'enabled' : 'disabled'}.`);
    } catch (err: any) {     
      console.error(err);
      setTwofaEnabled(!isEnabled);
      toast.error('Failed to update two-factor authentication setting.');
    } 
  };

  const handleUpdatePersonInformation = async () => {
    
    setAuthToken({ token: localStorage.token });
    try {
        await updatePersonInformation({ firstname, lastname, dob, nationality });    
        toast.success("Person Information successfully updated.");
    } catch (err: any) {
      console.error(err);
      toast.error(err.msg); // Show error toast
    }            
  };

  const handleUpdateContactInformation = async () => {
    
    setAuthToken({ token: localStorage.token });
    try {
        await updateContactInformation({ email, phoneNumber });    
        toast.success("Contact Information successfully updated.");

        // Disable 2FA if phone number is removed
        if (!phoneNumber) {
          setTwofaEnabled(false);
          await twofa({ enabled: false });
          toast.warning('Two-factor authentication disabled because phone number was removed.');
        }
    } catch (err: any) {
      console.error(err);
      toast.error(err.msg); // Show error toast
    }            
  };

  const handleUpdateAddressInformation = async () => {
    
    setAuthToken({ token: localStorage.token });
    try {
        await updateAddressInformation({ address1, address2, city, state, zip });    
        toast.success("Address Information successfully updated.");
    } catch (err: any) {
      console.error(err);
      toast.error(err.msg); // Show error toast
    }            
  };

  const handleSaveName = async () => {
    if (!tempName) {
      setErrorMessage('Name cannot be empty.');
      return;
    }

    try {
      await savePersonName({ name: tempName });
      verifyUser();
      setUser(prev => prev ? { ...prev, name: tempName } : null);
      setIsModalOpen(false); // Close the modal after saving
      toast.success("Name successfully saved.");
    } catch (err: any) {
      if (err.msg) {
        setErrorMessage(err.msg);
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    }
  };

  
  return (
    <div>
      <ToastContainer className='text-sm'/>
      <div className="w-full max-w-[1280px] mx-auto">
        <div className="flex justify-center items-center gap-2">
          <Image src={UserAvatar} alt="" className="w-9"/>
          <p className="text-4xl text-white">Profile</p>
        </div>
        <p className="text-center text-white pt-8">Welcome to your Profile Page! This is your personal dashboard where you can view and manage all your essential information at a glance. Here you’ll find your personal details, contact information, and address details securely stored.</p>
        <p className="text-center text-white pt-8">If you ever need to make changes, you’re just a few clicks away from updating your information. Looking to reset your account settings? You can easily do so through the ‘Reset Account Settings’ option available on this page. Take control of your Collateral Network account and keep your information up-to-date.</p>      
        <div className="pt-12">
          <div className="flex items-center">
            <Image src={Wallet} alt="" className="w-16"/>
            <div className="text-white pl-4">
              <p className="font-bold text-3xl">{user?.name}</p>
              <p>{user?.coltwallet}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8 pt-12">          
          <div>
            <div className="flex flex-col gap-8 bg-[#14172E] h-fit p-4 rounded-md text-white">  
              <p className="text-2xl">Person</p>
              <input 
                type="text" 
                placeholder='First Name' 
                value={firstname} 
                onChange={(e) => setFirstName(e.target.value)}
                className="text-white bg-transparent border-b outline-none border-white py-2" 
              />
              <input 
                type="text" 
                placeholder='Last Name' 
                value={lastname} 
                onChange={(e) => setLastName(e.target.value)}
                className="text-white bg-transparent border-b outline-none border-white py-2" 
              />
              <input 
                type="text" 
                placeholder='DOB' 
                value={dob} 
                onChange={(e) => setDob(e.target.value)}
                className="text-white bg-transparent border-b outline-none border-white py-2" 
              />
              <input 
                type="text" 
                placeholder='Nationality' 
                value={nationality} 
                onChange={(e) => setNationality(e.target.value)}
                className="text-white bg-transparent border-b outline-none border-white py-2" 
              />
            </div>
            <div 
              onClick={handleUpdatePersonInformation}
              className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md py-2 cursor-pointer"
            >
              <p className="font-medium text-xs text-center text-white">UPDATE PERSON INFORMATION</p>            
            </div>
          </div>
          
          <div>
            <div className="flex flex-col gap-8 bg-[#14172E] h-fit p-4 rounded-md text-white">  
              <p className="text-2xl">Contact</p>
              <input 
                type="text" 
                placeholder='Email Address' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="text-white bg-transparent border-b outline-none border-white py-2" 
              />
              <input 
                type="text" 
                placeholder='Mobile (+15553456789)' 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="text-white bg-transparent border-b outline-none border-white py-2" 
              />          
            </div>
            <div
              onClick={handleUpdateContactInformation} 
              className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md py-2 cursor-pointer"
            >
              <p className="font-medium text-xs text-center text-white">UPDATE CONTACT INFORMATION</p>            
            </div>
          </div>
          
          <div>
            <div className="flex flex-col gap-8 bg-[#14172E] h-fit p-4 rounded-md text-white">  
              <p className="text-2xl">Address</p>
              <input 
                type="text" 
                placeholder='Address Line 1' 
                value={address1} 
                onChange={(e) => setAddress1(e.target.value)}
                className="text-white bg-transparent border-b outline-none border-white py-2" 
              />
              <input 
                type="text" 
                placeholder='Address Line 2' 
                value={address2} 
                onChange={(e) => setAddress2(e.target.value)}
                className="text-white bg-transparent border-b outline-none border-white py-2" 
              />
              <input 
                type="text" 
                placeholder='City' 
                value={city} 
                onChange={(e) => setCity(e.target.value)}
                className="text-white bg-transparent border-b outline-none border-white py-2" 
              />
              <input 
                type="text" 
                placeholder='State' 
                value={state} 
                onChange={(e) => setState(e.target.value)}
                className="text-white bg-transparent border-b outline-none border-white py-2" 
              />
              <input 
                type="text" 
                placeholder='Zip Code' 
                value={zip} 
                onChange={(e) => setZip(e.target.value)}
                className="text-white bg-transparent border-b outline-none border-white py-2" 
              />
            </div>
            <div
              onClick={handleUpdateAddressInformation} 
              className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md py-2 cursor-pointer"
            >
              <p className="font-medium text-xs text-center text-white">UPDATE ADDRESS INFORMATION</p>            
            </div>
          </div>          
          {/* <div>
            <div className="flex flex-col gap-4 bg-[#14172E] rounded-md p-4">
              <p className="text-2xl text-white">Account Settings</p>
              <div className="flex items-center">
                <input type="checkbox" className="cursor-pointer" checked={twofaEnabled} onChange={handleTwofaChange}/>
                <p className="text-white pl-4">Phone 2FA</p>
              </div>
            </div>
            <div className="transition-colors duration-300 ease-in-out bg-[#3f15e9] hover:bg-[#3612C4] rounded-md py-2 cursor-pointer">
              <p className="font-medium text-xs text-center text-white">RESET PASSWORD</p>            
            </div>
          </div> */}
        </div>        
      </div>
      {isModalOpen && (
        <NameModal 
          tempName={tempName}
          setTempName={setTempName}
          handleSaveName={handleSaveName}
          errorMessage={errorMessage}
        />
      )}
    </div>    
  );
}
