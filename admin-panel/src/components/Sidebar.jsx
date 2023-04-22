import React, { useState, useContext, useEffect } from 'react'
import MainContext from '../Context/MainContext';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/image/memories_logo.png'

// icons
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import GroupIcon from '@mui/icons-material/Group';
import ArticleIcon from '@mui/icons-material/Article';
import HandshakeIcon from '@mui/icons-material/Handshake';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';


const Sidebar = () => {

    const context = useContext(MainContext)
    const { navOpen, setNavOpen } = context;

    // useEffect(() => {
    //     setNavOpen(true)
    // }, [navOpen])

    return (
        <>
            <div className={navOpen ? 'w-max py-5 pl-5 h-full bg-[#1C1132] duration-300' : 'w-full h-full bg-[#1C1132] pl-8 py-5 duration-300'}>
                <div className='flex gap-2 items-center pb-8'>
                    <img src={Logo} alt="logo" className='w-8' />
                    {
                        navOpen ? <div className='pr-5 text-lg text-white font-semibold'>Developer Portal</div> : ""
                    }
                </div>
                <div className='flex flex-col gap-3'>
                    <NavLink to='/' className={({ isActive }) => (isActive ? 'w-full bg-white text-[#1C1132] rounded-l-full flex gap-2 duration-300 py-2 px-4' : 'w-full bg-[#1C1132] text-white rounded-l-none flex gap-2 duration-300 py-2 px-4 ')}>
                        <SpaceDashboardIcon />
                        {
                            navOpen ? <div className='pr-5 font-semibold'>Dashboard</div> : ""
                        }
                    </NavLink>
                    <NavLink to='/user' className={({ isActive }) => (isActive ? 'w-full bg-white text-[#1C1132] rounded-l-full flex gap-2 duration-300 py-2 px-4' : 'w-full bg-[#1C1132] text-white rounded-l-none flex gap-2 duration-300 py-2 px-4 ')}>
                        <GroupIcon />
                        {
                            navOpen ? <div className='pr-5 font-semibold'>User</div> : ""
                        }
                    </NavLink>
                    <NavLink to='/post' className={({ isActive }) => (isActive ? 'w-full bg-white text-[#1C1132] rounded-l-full flex gap-2 duration-300 py-2 px-4' : 'w-full bg-[#1C1132] text-white rounded-l-none flex gap-2 duration-300 py-2 px-4 ')}>
                        <ArticleIcon />
                        {
                            navOpen ? <div className='pr-5 font-semibold'>Post</div> : ""
                        }
                    </NavLink>
                    <NavLink to='/partnership' className={({ isActive }) => (isActive ? 'w-full bg-white text-[#1C1132] rounded-l-full flex gap-2 duration-300 py-2 px-4' : 'w-full bg-[#1C1132] text-white rounded-l-none flex gap-2 duration-300 py-2 px-4 ')}>
                        <HandshakeIcon />
                        {
                            navOpen ? <div className='pr-5 font-semibold'>Partnership</div> : ""
                        }
                    </NavLink>
                    <NavLink to='/helpreport' className={({ isActive }) => (isActive ? 'w-full bg-white text-[#1C1132] rounded-l-full flex gap-2 duration-300 py-2 px-4' : 'w-full bg-[#1C1132] text-white rounded-l-none flex gap-2 duration-300 py-2 px-4 ')}>
                        <HelpCenterIcon />
                        {
                            navOpen ? <div className='pr-5 font-semibold'>Help Report</div> : ""
                        }
                    </NavLink>
                    <NavLink to='/postreport' className={({ isActive }) => (isActive ? 'w-full bg-white text-[#1C1132] rounded-l-full flex gap-2 duration-300 py-2 px-4' : 'w-full bg-[#1C1132] text-white rounded-l-none flex gap-2 duration-300 py-2 px-4 ')}>
                        <ReportProblemIcon />
                        {
                            navOpen ? <div className='pr-5 font-semibold'>Post Report</div> : ""
                        }
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default Sidebar