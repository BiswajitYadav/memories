import { Avatar, Tooltip } from '@mui/material'
import React from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import { Link } from 'react-router-dom';
import PeopleProfile from '../PeopleProfile';
import { useState } from 'react';
import { SERVER_URL } from '../../services/helper';
import { useEffect } from 'react';
import { useContext } from 'react';
import MainContext from '../../context/MainContext';

const PeopleSuggestions = () => {

  const { mutualDataList, fetchMutualDataList } = useContext(MainContext)

  useEffect(() => {
    fetchMutualDataList()
  }, [])


  return (
    <>
      <div className='hidden xl:flex flex-col bg-white shadow-lg dark:bg-[#231344] w-[25%] h-max dark:text-white p-5 gap-2 rounded-md '>

        <div className="text-sm font-semibold opacity-80">
          People you may know
        </div>

        {
          mutualDataList?.map((data) => {
            return (
              <PeopleProfile key={data._id} userID={data._id} />
            )
          })
        }

      </div>
    </>
  )
}

export default PeopleSuggestions