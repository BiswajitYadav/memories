import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/image/memories_logo.png'
import MessageIcon from '@mui/icons-material/Message';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Tooltip } from '@mui/material';

function Header() {
  return (
    <>
      <header className='hidden md:flex justify-around lg:gap-x-40 h-14 bg-white shadow-md dark:bg-[#231344]'>
        <Link to="/home" className='my-auto'>
          <img className='w-12 h-12' src={logo} alt="" />
        </Link>
        <div className='flex gap-3 h-full item-center  '>
          <NavLink className={({ isActive }) => (isActive ? 'dark:text-white border-b-4 border-[#00B2CB]  w-20 flex items-center' : 'dark:text-white dark:opacity-50  text-slate-400 w-20 flex items-center')} to="/home">
            <Tooltip title="Home" className="mx-auto">
              <HomeIcon style={{ fontSize: 35 }} />
            </Tooltip>
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'dark:text-white border-b-4 border-[#00B2CB]  w-20 flex items-center' : 'dark:text-white dark:opacity-50  text-slate-400 w-20 flex items-center')} to="/">
            <Tooltip title="Messages" className="mx-auto">
              <MessageIcon style={{ fontSize: 30 }} />
            </Tooltip>
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'dark:text-white border-b-4 border-[#00B2CB]  w-20 flex items-center' : 'dark:text-white dark:opacity-50  text-slate-400 w-20 flex items-center')} to="/">
            <Tooltip title="Community" className="mx-auto">
              <PeopleIcon style={{ fontSize: 30 }} />
            </Tooltip>
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'dark:text-white border-b-4 border-[#00B2CB]  w-20 flex items-center' : 'dark:text-white dark:opacity-50  text-slate-400 w-20 flex items-center')} to="/">
            <Tooltip title="Notifications" className="mx-auto">
              <NotificationsIcon style={{ fontSize: 30 }} />
            </Tooltip>
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'dark:text-white border-b-4 border-[#00B2CB]  w-20 flex items-center' : 'dark:text-white dark:opacity-50  text-slate-400 w-20 flex items-center')} to="/">
            <Tooltip title="Profile" className="mx-auto">
              <PersonIcon style={{ fontSize: 30 }} />
            </Tooltip>
          </NavLink>
        </div>
        <Avatar className='my-auto' alt="Travis Howard" src="https://www.w3schools.com/howto/img_avatar.png " sx={{ width: 45, height: 45 }} />
      </header>


      {/* Navbar for small devices */}
      <header className='md:hidden bg-white shadow-md dark:bg-[#231344]'>

        <div className='flex justify-between p-2 border-b-[0.9px] dark:border-b-[0.9px] border-[#D9D9D9] dark:border-[#1C1132]'>
          <Link to="/home" className='my-auto'>
            <img className='w-8 h-8' src={logo} alt="" />
          </Link>
          <Avatar className='my-auto' alt="Travis Howard" src="https://www.w3schools.com/howto/img_avatar.png " sx={{ width: 35, height: 35 }} />
        </div>

        <div className='flex gap-3 fixed shadow-md bg-white dark:bg-[#231344] h-max w-screen item-center justify-center pt-2'>  
          <NavLink className={({ isActive }) => (isActive ? 'dark:text-white border-b-4 border-[#00B2CB]  w-20 flex items-center py-1.5' : 'dark:text-white dark:opacity-50  text-slate-400 w-20 flex items-center')} to="/home">
            <Tooltip title="Home" className="mx-auto">
              <HomeIcon style={{ fontSize: 30 }} />
            </Tooltip>
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'dark:text-white border-b-4 border-[#00B2CB]  w-20 flex items-center py-1.5' : 'dark:text-white dark:opacity-50  text-slate-400 w-20 flex items-center')} to="/">
            <Tooltip title="Messages" className="mx-auto">
              <MessageIcon style={{ fontSize: 25  }} />
            </Tooltip>
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'dark:text-white border-b-4 border-[#00B2CB]  w-20 flex items-center py-1.5' : 'dark:text-white dark:opacity-50  text-slate-400 w-20 flex items-center')} to="/">
            <Tooltip title="Community" className="mx-auto">
              <PeopleIcon style={{ fontSize: 28 }} />
            </Tooltip>
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'dark:text-white border-b-4 border-[#00B2CB]  w-20 flex items-center py-1.5' : 'dark:text-white dark:opacity-50  text-slate-400 w-20 flex items-center')} to="/">
            <Tooltip title="Notifications" className="mx-auto">
              <NotificationsIcon style={{ fontSize: 27 }} />
            </Tooltip>
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'dark:text-white border-b-4 border-[#00B2CB]  w-20 flex items-center py-1.5' : 'dark:text-white dark:opacity-50  text-slate-400 w-20 flex items-center')} to="/">
            <Tooltip title="Profile" className="mx-auto">
              <PersonIcon style={{ fontSize: 27  }} />
            </Tooltip>
          </NavLink>
        </div>
      </header>
    </>
  )
}

export default Header