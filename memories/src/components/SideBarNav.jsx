import React from 'react'
import { NavLink } from 'react-router-dom'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';

const SideBarNav = () => {
  return (
    <>
        <div className='bg-transparent w-[30%] xl:w-[25%] h-full py-4 xl:py-10 xl:text-lg hidden lg:block'>
            <NavLink className={({ isActive }) => (isActive ? 'dark:text-white bg-[#D9D9D9] rounded-r-lg w-full px-4 py-5 flex items-center gap-2 duration-300 font-semibold dark:bg-[#1C1132] dark:shadow-md dark:shadow-black' : 'dark:text-white w-full px-4 py-5 flex items-center gap-2 font-semibold')} to="/editprofile"><ManageAccountsIcon />Edit Profile</NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'dark:text-white bg-[#D9D9D9] rounded-r-lg w-full px-4 py-5 flex items-center gap-2 duration-300 font-semibold dark:bg-[#1C1132] dark:shadow-md dark:shadow-black' : 'dark:text-white w-full px-4 py-5 flex items-center gap-2 font-semibold')} to="/updatepassword"><LockPersonIcon />Update Password</NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'dark:text-white bg-[#D9D9D9] rounded-r-lg w-full px-4 py-5 flex items-center gap-2 duration-300 font-semibold dark:bg-[#1C1132] dark:shadow-md dark:shadow-black' : 'dark:text-white w-full px-4 py-5 flex items-center gap-2 font-semibold')} to="/help"><LiveHelpIcon />Help & Support</NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'dark:text-white bg-[#D9D9D9] rounded-r-lg w-full px-4 py-5 flex items-center gap-2 duration-300 font-semibold dark:bg-[#1C1132] dark:shadow-md dark:shadow-black' : 'dark:text-white w-full px-4 py-5 flex items-center gap-2 font-semibold')} to="/t&c"><PrivacyTipIcon />Terms & Conditions</NavLink>
        </div>
    </>
  )
}

export default SideBarNav