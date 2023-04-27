import { Avatar, Tooltip } from '@mui/material'
import React from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import { Link } from 'react-router-dom';
import PeopleProfile from '../PeopleProfile';

const PeopleSuggestions = () => {
  return (
    <>
      <div className='hidden xl:flex flex-col bg-white shadow-lg dark:bg-[#231344] w-[25%] h-max dark:text-white p-5 gap-5 rounded-md '>
        <div className="text-sm font-semibold opacity-80">
          People you may know
        </div>

        {/* <PeopleProfile data="" /> */}

      </div>
    </>
  )
}

export default PeopleSuggestions