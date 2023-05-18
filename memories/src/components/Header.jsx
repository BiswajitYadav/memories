import React, { useContext, useEffect, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/image/memories_logo.png'
import MessageIcon from '@mui/icons-material/Message';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Avatar, Box, Drawer, IconButton, List, ListItemIcon, Menu, MenuItem, Modal, Tooltip } from '@mui/material';
import { BiEdit } from 'react-icons/bi'
import { MdOutlineLiveHelp } from 'react-icons/md'
import { FiSettings } from 'react-icons/fi'
import { IoMdLogOut } from 'react-icons/io'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import CloseIcon from '@mui/icons-material/Close';
import LogoutComponent from '../components/LogoutComponent';


import { list } from 'postcss';
import MainContext from '../context/MainContext';

function Header() {

  const navigate = useNavigate()

  const context = useContext(MainContext)
  const { userProfileData, fetchSessionUserProfile } = context;

  const { _id, name, email, profileURL, gender, userName, isBanned } = userProfileData;

  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const handleLogoutModalOpen = () => setLogoutModalOpen(true);
  const handleLogoutModalClosed = () => setLogoutModalOpen(false);

  const localTheme = localStorage.getItem("theme")
  const [theme, setTheme] = useState(localTheme);

  useEffect(() => {

    fetchSessionUserProfile()

    if (userProfileData) {
      sessionStorage.setItem('sessionUserID', _id)
    }

  }, [])


  useEffect(() => {

    if (isBanned === true) {
      localStorage.removeItem('auth-token')
      navigate('/login')
    }

  }, [isBanned])


  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);


  const anchor = 'left'
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const ThemeSwitcher = (themeValue) => {
    localStorage.setItem("theme", themeValue);
  }

  const list = (anchor) => (
    <Box
      className='bg-white dark:bg-[#231344] h-screen'
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <div className='flex items-center gap-2 px-2 py-2'>
          <img className='w-8' src={logo} alt="logo" />
          <div className='dark:text-white font-bold text-lg'>Memories</div>
        </div>
        <div className='dark:bg-[#231344] bg-white dark:text-white p-2 pt-10'>
          <Link to="/editprofile">
            <MenuItem>
              <ListItemIcon>
                <BiEdit className='dark:text-white' style={{ fontSize: 25 }} />
              </ListItemIcon>
              <p className='font-semibold text-[17px]'>Edit Profile</p>
            </MenuItem>
          </Link>
          <Link to="/help">
            <MenuItem>
              <ListItemIcon>
                <MdOutlineLiveHelp className='dark:text-white' style={{ fontSize: 25 }} />
              </ListItemIcon>
              <p className='font-semibold text-[17px]'>Help & Support</p>
            </MenuItem>
          </Link>
          <MenuItem onClick={handleModalOpen}>
            <ListItemIcon>
              <FiSettings className='dark:text-white' style={{ fontSize: 24 }} />
            </ListItemIcon>
            <p className='font-semibold text-[17px]'>Settings</p>
          </MenuItem>
          <div className='flex items-center justify-center mx-4 p-2 bg-[#D9D9D9] dark:bg-[#1C1132] border border-[#901EC7] rounded-md gap-4'>
            <button onClick={e => {
              ThemeSwitcher("light");
              setTheme("light")
            }}
              className={localTheme === "light" ? "bg-[#901EC7] py-2 px-5 rounded text-white duration-300 transition-all ease-in-out" : "px-5 py-2 rounded dark:text-white duration-300 transition-all ease-in-out"}><WbSunnyIcon className='' /></button>
            <button onClick={e => {
              ThemeSwitcher("dark");
              setTheme("dark")
            }}
              className={localTheme === "dark" ? "bg-[#901EC7] py-2 px-5 rounded text-white duration-300 transition-all ease-in-out" : "px-5 py-2 rounded dark:text-white duration-300 transition-all ease-in-out"}><DarkModeIcon /></button>
          </div>
          <MenuItem onClick={handleLogoutModalOpen}>
            <ListItemIcon>
              <IoMdLogOut className='dark:text-white' style={{ fontSize: 24 }} />
            </ListItemIcon>
            <button className='font-semibold text-[17px]'>Logout</button>
          </MenuItem>
        </div>
      </List>
    </Box >
  );

  return (
    <>
      <header className='hidden md:flex justify-around lg:gap-x-40 h-14 bg-white shadow-md dark:bg-[#231344]'>

        <Link to="/" className='my-auto'>
          <Tooltip title="The Memories">
            <img className='w-12 h-12' src={logo} alt="logo" />
          </Tooltip>
        </Link>

        <div className='flex gap-3 h-full item-center'>

          <NavLink className={({ isActive }) => (isActive ? 'dark:text-white border-b-4 border-[#00B2CB]  w-20 flex items-center' : 'dark:text-white dark:opacity-50  text-slate-400 w-20 flex items-center')} to="/">

            <Tooltip title="Home" className="mx-auto">
              <HomeIcon style={{ fontSize: 35 }} />
            </Tooltip>

          </NavLink>

          <NavLink className={({ isActive }) => (isActive ? 'dark:text-white border-b-4 border-[#00B2CB]  w-20 flex items-center' : 'dark:text-white dark:opacity-50  text-slate-400 w-20 flex items-center')} to="/chat">

            <Tooltip title="Messages" className="mx-auto">
              <MessageIcon style={{ fontSize: 30 }} />
            </Tooltip>

          </NavLink>

          <NavLink className={({ isActive }) => (isActive ? 'dark:text-white border-b-4 border-[#00B2CB]  w-20 flex items-center' : 'dark:text-white dark:opacity-50  text-slate-400 w-20 flex items-center')} to="/community">

            <Tooltip title="Community" className="mx-auto">
              <PeopleIcon style={{ fontSize: 30 }} />
            </Tooltip>

          </NavLink>

          <NavLink className={({ isActive }) => (isActive ? 'dark:text-white border-b-4 border-[#00B2CB]  w-20 flex items-center' : 'dark:text-white dark:opacity-50  text-slate-400 w-20 flex items-center')} to="/notification">

            <Tooltip title="Notifications" className="mx-auto">
              <NotificationsIcon style={{ fontSize: 30 }} />
            </Tooltip>

          </NavLink>

          <NavLink className={({ isActive }) => (isActive ? 'dark:text-white border-b-4 border-[#00B2CB]  w-20 flex items-center' : 'dark:text-white dark:opacity-50  text-slate-400 w-20 flex items-center')} to="/myprofile">

            <Tooltip title="Profile" className="mx-auto">
              <PersonIcon style={{ fontSize: 30 }} />
            </Tooltip>

          </NavLink>

        </div>

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={profileURL} alt={name?.slice(0, 1)} sx={{ width: 39, height: 39 }} />

          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <div className='dark:bg-[#231344] bg-white dark:text-white p-3 -my-2'>
            <Link to="/editprofile">
              <MenuItem>
                <ListItemIcon>
                  <BiEdit className='dark:text-white' style={{ fontSize: 25 }} />
                </ListItemIcon>
                <p className='font-semibold text-[17px]'>Edit Profile</p>
              </MenuItem>
            </Link>
            <Link to="/help">
              <MenuItem>
                <ListItemIcon>
                  <MdOutlineLiveHelp className='dark:text-white' style={{ fontSize: 25 }} />
                </ListItemIcon>
                <p className='font-semibold text-[17px]'>Help & Support</p>
              </MenuItem>
            </Link>
            <MenuItem onClick={handleModalOpen}>
              <ListItemIcon>
                <FiSettings className='dark:text-white' style={{ fontSize: 24 }} />
              </ListItemIcon>
              <p className='font-semibold text-[17px]'>Settings</p>
            </MenuItem>
            <div className='flex items-center justify-between mx-4 p-2 bg-[#D9D9D9] dark:bg-[#1C1132] border border-[#901EC7] rounded-md my-1 '>
              <Tooltip title="Light Mode">
                <button
                  onClick={e => {
                    ThemeSwitcher("light");
                    setTheme("light")
                  }}
                  className={localTheme === "light" ? "bg-[#901EC7] py-2 px-5 rounded text-white duration-300 transition-all ease-in-out" : "px-5 py-2 rounded dark:text-white duration-300 transition-all ease-in-out"}><WbSunnyIcon /></button>
              </Tooltip>
              <Tooltip title="Dark Mode">
                <button
                  onClick={e => {
                    ThemeSwitcher("dark")
                    setTheme("dark")
                  }} className={localTheme === "dark" ? "bg-[#901EC7] py-2 px-5 rounded text-white duration-300 transition-all ease-in-out" : "px-5 py-2 rounded dark:text-white duration-300 transition-all ease-in-out"}><DarkModeIcon /></button>
              </Tooltip>
            </div>
            <MenuItem onClick={handleLogoutModalOpen}>
              <ListItemIcon>
                <IoMdLogOut className='dark:text-white' style={{ fontSize: 24 }} />
              </ListItemIcon>
              <p className='font-semibold text-[17px]'>Logout</p>
            </MenuItem>
          </div>
        </Menu>
      </header>

      {/* Modal for settings */}
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <div className='dark:bg-[#231344] bg-white dark:text-white p-3 md:p-10 flex flex-col gap-5 rounded-lg shadow-lg dark:shadow-black'>
          <Link to="/editprofile">
            <MenuItem>
              <ListItemIcon>
                <ManageAccountsIcon className='dark:text-white' style={{ fontSize: 25 }} />
              </ListItemIcon>
              <p className='font-semibold text-[17px]'>Edit Profile</p>
            </MenuItem>
          </Link>
          <Link to="/updatepassword">
            <MenuItem>
              <ListItemIcon>
                <LockPersonIcon className='dark:text-white' style={{ fontSize: 25 }} />
              </ListItemIcon>
              <p className='font-semibold text-[17px]'>Update Password</p>
            </MenuItem>
          </Link>
          <Link to="/help">
            <MenuItem>
              <ListItemIcon>
                <LiveHelpIcon className='dark:text-white' style={{ fontSize: 25 }} />
              </ListItemIcon>
              <p className='font-semibold text-[17px]'>Help & Support</p>
            </MenuItem>
          </Link>
          <Link to="/t&c">
            <MenuItem>
              <ListItemIcon>
                <PrivacyTipIcon className='dark:text-white' style={{ fontSize: 25 }} />
              </ListItemIcon>
              <p className='font-semibold text-[17px]'>Terms & Conditions</p>
            </MenuItem>
          </Link>
        </div>
      </Modal>


      <Modal
        open={logoutModalOpen}
        onClose={handleLogoutModalClosed}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <div className='py-3 px-2 md:px-3 md:p-4 h-[60%] md:w-[60%] lg:px-5 lg:py-3 bg-white w-full dark:bg-[#231344] lg:w-[50%] xl:w-[30%] rounded-lg'>
          <div className='bg-white dark:bg-[#231344]'>
            <div className='flex justify-between dark:text-white px-3'>
              <div className='flex items-center gap-1 py-3 lg:py-5'>
                <div className='text-lg font-semibold dark:text-gray-300 text-gray-600'>Confirm Logout !</div>
              </div>
              <button>
                <CloseIcon onClick={handleLogoutModalClosed} />
              </button>
            </div>
            <div className='flex flex-col'>
              <LogoutComponent profileURL={profileURL} name={name} />
            </div>
          </div>
        </div>
      </Modal>

      {/* Navbar for small devices */}
      <header className='md:hidden bg-white shadow-md dark:bg-[#231344]'>

        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}>
          {list(anchor)}
        </Drawer>

        <div className='flex justify-between p-2 border-b-[0.9px] dark:border-b-[0.9px] border-[#D9D9D9] dark:border-[#1C1132]'>
          <Link to="/" className='my-auto'>
            <img className='w-8 h-8' src={logo} alt="" />
          </Link>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <Avatar className='my-auto' src={profileURL} alt={name?.slice(0, 1)} sx={{ width: 35, height: 35 }} />
          </IconButton>
        </div>


        <div className='flex gap-3 shadow-md bg-white dark:bg-[#231344] h-max w-screen item-center justify-center sm:pt-2'>
          <NavLink className={({ isActive }) => (isActive ? 'dark:text-white border-b-4 border-[#00B2CB] w-20 flex items-center py-1.5' : 'dark:text-white dark:opacity-50  text-slate-400 w-20 flex items-center py-1.5')} to="/">
            <Tooltip title="Home" className="mx-auto">
              <HomeIcon style={{ fontSize: 30 }} />
            </Tooltip>
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'dark:text-white border-b-4 border-[#00B2CB]  w-20 flex items-center py-1.5' : 'dark:text-white dark:opacity-50  text-slate-400 w-20 flex items-center py-1.5')} to="/chat">
            <Tooltip title="Messages" className="mx-auto">
              <MessageIcon style={{ fontSize: 25 }} />
            </Tooltip>
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'dark:text-white border-b-4 border-[#00B2CB]  w-20 flex items-center py-1.5' : 'dark:text-white dark:opacity-50  text-slate-400 w-20 flex items-center py-1.5')} to="/community">
            <Tooltip title="Community" className="mx-auto">
              <PeopleIcon style={{ fontSize: 28 }} />
            </Tooltip>
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'dark:text-white border-b-4 border-[#00B2CB]  w-20 flex items-center py-1.5' : 'dark:text-white dark:opacity-50  text-slate-400 w-20 flex items-center py-1.5')} to="/notification">
            <Tooltip title="Notifications" className="mx-auto">
              <NotificationsIcon style={{ fontSize: 27 }} />
            </Tooltip>
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'dark:text-white border-b-4 border-[#00B2CB]  w-20 flex items-center py-1.5' : 'dark:text-white dark:opacity-50  text-slate-400 w-20 flex items-center py-1.5')} to="/myprofile">
            <Tooltip title="Profile" className="mx-auto">
              <PersonIcon style={{ fontSize: 27 }} />
            </Tooltip>
          </NavLink>
        </div>
      </header>
    </>
  )
}

export default Header