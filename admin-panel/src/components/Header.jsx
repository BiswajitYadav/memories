import { Avatar, IconButton } from '@mui/material'
import React, { useContext } from 'react'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MainContext from '../Context/MainContext';

const Header = () => {

    const context = useContext(MainContext)

    const { navOpen, setNavOpen } = context;

    const closeNav = () => setNavOpen(false)
    const openNav = () => setNavOpen(true)

    return (
        <>
            <header className='w-full h-max flex items-center justify-between py-2 px-3'>
                <IconButton onClick={navOpen ? closeNav : openNav } className='text-[#1C1132]'>
                    <MenuOpenIcon fontSize='large' />
                </IconButton>

                <Avatar
                    alt="Remy Sharp"
                    src="https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png"
                    sx={{ width: 50, height: 50 }}
                />
            </header>
        </>
    )
}

export default Header