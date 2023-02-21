import { Avatar, Tooltip } from '@mui/material'
import React from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';

const PeopleSuggestions = () => {
  return (
    <>
      <div className='hidden xl:flex flex-col bg-white shadow-lg dark:bg-[#231344] w-[25%] h-max dark:text-white p-5 gap-5 rounded-md'>
        <div className="text-sm">
          People you may know
        </div>
        <div className='flex w-full justify-between'>
          <div className='flex gap-2'>
            <Avatar className='my-auto' alt="Travis Howard" src="https://www.w3schools.com/howto/img_avatar.png " sx={{ width: 40, height: 40 }} />

            <div className='flex flex-col justify-center'>
              <div className='flex gap-1'>
                <div className='dark:text-white font-semibold text-sm'>Rohit Kumar Pandit</div>
                <Tooltip title="Developer" className="text-gray-400 my-auto">
                  <VerifiedIcon style={{ fontSize: 16 }} />
                </Tooltip>
                {/* <Tooltip title="Developer" className="text-blue-400 my-auto">
              <VerifiedIcon style={{ fontSize: 16 }} />
            </Tooltip>
            <Tooltip title="Developer" className="text-yellow-400 my-auto">
              <VerifiedIcon style={{ fontSize: 16 }} />
            </Tooltip> */}
              </div>
              <div className=' text-slate-400 text-xs'>@rohit64Bit</div>
            </div>
          </div>
          <Tooltip title="Follow">
            <button className='h-max bg-gradient-to-r from-[#8948B8] to-[#8E2BC2] my-auto px-3 py-1 text-white rounded flex '>Follow</button>
          </Tooltip>
        </div>
      </div>
    </>
  )
}

export default PeopleSuggestions